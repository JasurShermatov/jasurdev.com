from rest_framework import serializers
from .models import Tag, Project, ProjectLike, ProjectComment


class TagSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tag
        fields = ["id", "name"]
        ref_name = "ProjectsTagSerializer"


class ProjectCommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProjectComment
        fields = ["id", "content", "created_at"]
        read_only_fields = ["id", "created_at"]


class ProjectSerializer(serializers.ModelSerializer):
    tags = TagSerializer(many=True, read_only=True)
    likes_count = serializers.IntegerField(read_only=True)
    comments_count = serializers.IntegerField(read_only=True)
    comments = ProjectCommentSerializer(many=True, read_only=True)

    class Meta:
        model = Project
        fields = [
            "id",
            "title",
            "description",
            "image",
            "github_link",
            "live_demo_link",
            "owner",
            "tags",
            "likes_count",
            "comments_count",
            "comments",
            "created_at",
            "updated_at",
        ]
        read_only_fields = [
            "owner",
            "likes_count",
            "comments_count",
            "created_at",
            "updated_at",
        ]


class ProjectCreateUpdateSerializer(serializers.ModelSerializer):
    tags = serializers.PrimaryKeyRelatedField(
        many=True, queryset=Tag.objects.all(), required=False
    )

    class Meta:
        model = Project
        fields = [
            "title",
            "description",
            "image",
            "github_link",
            "live_demo_link",
            "tags",
        ]

    def create(self, validated_data):
        tags = validated_data.pop("tags", [])
        project = Project.objects.create(**validated_data)
        project.tags.set(tags)
        return project

    def update(self, instance, validated_data):
        tags = validated_data.pop("tags", None)
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()
        if tags is not None:
            instance.tags.set(tags)
        return instance
