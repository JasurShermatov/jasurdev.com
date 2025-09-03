from django.urls import path
from .views import (
    ProjectListCreateView,
    ProjectDetailView,
    ProjectCommentCreateView,
    ProjectLikeToggleView,
)

app_name = "projects"

urlpatterns = [
    # /api/projects/
    path("", ProjectListCreateView.as_view(), name="project-list-create"),
    # /api/projects/<id>/
    path("<uuid:pk>/", ProjectDetailView.as_view(), name="project-detail"),
    # /api/projects/<id>/comments/
    path(
        "<uuid:pk>/comments/",
        ProjectCommentCreateView.as_view(),
        name="project-comment-create",
    ),
    # /api/projects/<id>/like/
    path(
        "<uuid:pk>/like/", ProjectLikeToggleView.as_view(), name="project-like-toggle"
    ),
]
