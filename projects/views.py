from django.shortcuts import get_object_or_404
from rest_framework import generics, permissions, status
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import Project, ProjectLike
from .serializers import (
    ProjectSerializer,
    ProjectCreateUpdateSerializer,
    ProjectCommentSerializer,
)


class ProjectListCreateView(generics.ListCreateAPIView):
    queryset = (
        Project.objects.all()
        .select_related("owner")
        .prefetch_related("tags", "comments", "likes")
    )
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def get_serializer_class(self):
        if self.request.method == "POST":
            return ProjectCreateUpdateSerializer
        return ProjectSerializer

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)


class ProjectDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = (
        Project.objects.all()
        .select_related("owner")
        .prefetch_related("tags", "comments", "likes")
    )
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def get_serializer_class(self):
        if self.request.method in ("PUT", "PATCH"):
            return ProjectCreateUpdateSerializer
        return ProjectSerializer


class ProjectCommentCreateView(generics.CreateAPIView):
    serializer_class = ProjectCommentSerializer
    permission_classes = [permissions.AllowAny]  # anonim comment

    def perform_create(self, serializer):
        project_id = self.kwargs.get("pk")
        project = get_object_or_404(Project, pk=project_id)
        serializer.save(project=project)


class ProjectLikeToggleView(APIView):
    permission_classes = [permissions.AllowAny]  # anonim like

    def post(self, request, pk):
        project = get_object_or_404(Project, pk=pk)
        ip_address = self.get_client_ip(request)

        like, created = ProjectLike.objects.get_or_create(
            project=project, ip_address=ip_address
        )
        if not created:
            like.delete()
            return Response({"detail": "Like removed"}, status=status.HTTP_200_OK)
        return Response({"detail": "Liked"}, status=status.HTTP_200_OK)

    @staticmethod
    def get_client_ip(request):
        x_forwarded_for = request.META.get("HTTP_X_FORWARDED_FOR")
        if x_forwarded_for:
            return x_forwarded_for.split(",")[0]
        return request.META.get("REMOTE_ADDR")
