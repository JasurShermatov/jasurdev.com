from django.urls import path
from .views import (
    ProjectListCreateView,
    ProjectDetailView,
    ProjectCommentCreateView,
    ProjectLikeToggleView,
)

app_name = "projects"

urlpatterns = [
    path("", ProjectListCreateView.as_view(), name="project-list-create"),
    path("<uuid:pk>/", ProjectDetailView.as_view(), name="project-detail"),
    path(
        "<uuid:pk>/comments/",
        ProjectCommentCreateView.as_view(),
        name="project-comment-create",
    ),
    path(
        "<uuid:pk>/like/", ProjectLikeToggleView.as_view(), name="project-like-toggle"
    ),
]
