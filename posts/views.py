from rest_framework import generics, permissions, status
from rest_framework.response import Response
from rest_framework.views import APIView
from django.shortcuts import get_object_or_404

from .models import Post, PostComment, PostLike
from .serializers import (
    PostSerializer,
    PostCreateUpdateSerializer,
    PostCommentSerializer,
)


class PostListCreateView(generics.ListCreateAPIView):
    """
    Postlar ro‘yxati va yangi post yaratish.
    """

    queryset = Post.objects.all().prefetch_related("tags", "comments", "likes")
    permission_classes = [permissions.AllowAny]

    def get_serializer_class(self):
        if self.request.method == "POST":
            return PostCreateUpdateSerializer
        return PostSerializer


class PostDetailView(generics.RetrieveUpdateDestroyAPIView):
    """
    Bitta postni ko‘rish, yangilash yoki o‘chirish.
    """

    queryset = Post.objects.all().prefetch_related("tags", "comments", "likes")
    permission_classes = [permissions.AllowAny]

    def get_serializer_class(self):
        if self.request.method in ("PUT", "PATCH"):
            return PostCreateUpdateSerializer
        return PostSerializer


class CommentCreateView(generics.CreateAPIView):
    """
    Postga comment qo‘shish (anonim).
    Endpoint: /api/posts/<id>/comments/
    """

    serializer_class = PostCommentSerializer
    permission_classes = [permissions.AllowAny]

    def perform_create(self, serializer):
        post_id = self.kwargs.get("pk")
        post = get_object_or_404(Post, pk=post_id)
        serializer.save(post=post)


class LikeToggleView(APIView):
    """
    Postga like/unlike qilish (IP orqali).
    Endpoint: /api/posts/<id>/like/
    """

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
        """Anonim foydalanuvchidan IP olish"""
        x_forwarded_for = request.META.get("HTTP_X_FORWARDED_FOR")
        if x_forwarded_for:
            ip = x_forwarded_for.split(",")[0]
        else:
            ip = request.META.get("REMOTE_ADDR")
        return ip
