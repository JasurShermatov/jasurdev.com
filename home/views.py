from rest_framework.response import Response
from rest_framework.views import APIView

from .models import Home
from .serializers import HomeSerializer
from posts.models import Post
from posts.serializers import PostSerializer
from projects.models import Project
from projects.serializers import ProjectSerializer


class HomeView(APIView):

    def get(self, request, *args, **kwargs):
        home_content = Home.objects.first()  # Default bitta content bo‘ladi
        home_data = HomeSerializer(home_content).data if home_content else None

        last_posts = Post.objects.order_by("-created_at")[:3]
        last_projects = Project.objects.order_by("-created_at")[:3]

        posts_data = PostSerializer(
            last_posts, many=True, context={"request": request}
        ).data
        projects_data = ProjectSerializer(
            last_projects, many=True, context={"request": request}
        ).data

        return Response(
            {
                "home": home_data,
                "last_posts": posts_data,
                "last_projects": projects_data,
            }
        )
