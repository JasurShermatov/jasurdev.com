from rest_framework import serializers
from .models import Home


class HomeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Home
        fields = ("id", "hero_image", "hero_text")
        read_only_fields = ("id",)