from django.urls import path
from .views import PostListCreateView, PostDetailView, CommentCreateView, LikeToggleView

app_name = "posts"

urlpatterns = [
    # /api/posts/
    path("", PostListCreateView.as_view(), name="post-list-create"),
    # /api/posts/<uuid:pk>/
    path("<uuid:pk>/", PostDetailView.as_view(), name="post-detail"),
    # /api/posts/<uuid:pk>/comments/
    path("<uuid:pk>/comments/", CommentCreateView.as_view(), name="post-comment-create"),
    # /api/posts/<uuid:pk>/like/
    path("<uuid:pk>/like/", LikeToggleView.as_view(), name="post-like-toggle"),
]