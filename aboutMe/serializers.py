from rest_framework import serializers

from .models import AboutMe, Skill, Experience, Certificate


class AboutMeSerializer(serializers.ModelSerializer):

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


class ExperienceSerializer(serializers.ModelSerializer):

    period = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = Experience
        fields = (
            "id",
            "title",
            "company",
            "description",
            "start_year",
            "end_year",
            "link",
            "period",
        )
        read_only_fields = ("id",)

    def get_period(self, obj):
        return (
            f"{obj.start_year} - {obj.end_year}"
            if obj.end_year
            else f"{obj.start_year} - Present"
        )


class CertificateSerializer(serializers.ModelSerializer):
    image_url = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = Certificate
        fields = (
            "id",
            "title",
            "description",
            "image_url",
            "link",
            "obtained_year",
        )
        read_only_fields = ("id",)

    def get_image_url(self, obj):
        request = self.context.get("request")
        if obj.image and hasattr(obj.image, "url"):
            return (
                request.build_absolute_uri(obj.image.url) if request else obj.image.url
            )
        return None
