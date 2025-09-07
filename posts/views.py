from django.shortcuts import get_object_or_404
from rest_framework import generics, permissions, status
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import Post, PostLike
from .serializers import (
    PostSerializer,
    PostCreateUpdateSerializer,
    PostCommentSerializer,
)


class PostListCreateView(generics.ListCreateAPIView):
    queryset = Post.objects.all().prefetch_related("tags", "comments", "likes")
    permission_classes = [permissions.AllowAny]

    def get_serializer_class(self):
        if self.request.method == "POST":
            return PostCreateUpdateSerializer
        return PostSerializer


class PostDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Post.objects.all().prefetch_related("tags", "comments", "likes")
    permission_classes = [permissions.AllowAny]

    def get_serializer_class(self):
        if self.request.method in ("PUT", "PATCH"):
            return PostCreateUpdateSerializer
        return PostSerializer


class CommentCreateView(generics.CreateAPIView):
    serializer_class = PostCommentSerializer
    permission_classes = [permissions.AllowAny]

    def perform_create(self, serializer):
        post_id = self.kwargs.get("pk")
        post = get_object_or_404(Post, pk=post_id)
        serializer.save(post=post)


class LikeToggleView(APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request, pk):
        post = get_object_or_404(Post, pk=pk)
        ip = self.get_client_ip(request)

        like, created = PostLike.objects.get_or_create(post=post, ip_address=ip)

        if not created:
            like.delete()
            return Response({"detail": "Like removed"}, status=status.HTTP_200_OK)

        return Response({"detail": "Liked"}, status=status.HTTP_200_OK)

    def get_client_ip(self, request):
        x_forwarded_for = request.META.get("HTTP_X_FORWARDED_FOR")
        if x_forwarded_for:
            ip = x_forwarded_for.split(",")[0]
        else:
            ip = request.META.get("REMOTE_ADDR")
        return ip
