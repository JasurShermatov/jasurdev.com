from rest_framework import serializers
from .models import AboutMe, Skill


class AboutMeSerializer(serializers.ModelSerializer):
    """
    Singleton About Me serializer.
    Foydalanuvchiga faqat bitta record ko'rsatiladi.
    """

    profile_image_url = serializers.SerializerMethodField(read_only=True)
    resume_url = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = AboutMe
        fields = ("intro_text", "profile_image_url", "resume_url")

    def get_profile_image_url(self, obj):
        request = self.context.get("request")
        if obj.profile_image and hasattr(obj.profile_image, "url"):
            return (
                request.build_absolute_uri(obj.profile_image.url)
                if request
                else obj.profile_image.url
            )
        return None

    def get_resume_url(self, obj):
        request = self.context.get("request")
        if obj.resume and hasattr(obj.resume, "url"):
            return (
                request.build_absolute_uri(obj.resume.url)
                if request
                else obj.resume.url
            )
        return None


class SkillSerializer(serializers.ModelSerializer):
    """
    Skills / Technologies serializer.
    Frontend uchun clean, faqat read-only maydonlar.
    """

    image_url = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = Skill
        fields = ("id", "name", "image_url", "experience_years", "proficiency")
        read_only_fields = ("id",)

    def get_image_url(self, obj):
        request = self.context.get("request")
        if obj.image and hasattr(obj.image, "url"):
            return (
                request.build_absolute_uri(obj.image.url) if request else obj.image.url
            )
        return None
