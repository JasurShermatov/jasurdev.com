from rest_framework import generics, permissions
from .models import AboutMe, Skill, Experience, Certificate
from .serializers import (
    AboutMeSerializer,
    SkillSerializer,
    ExperienceSerializer,
    CertificateSerializer,
)


class AboutMeView(generics.RetrieveAPIView):
    serializer_class = AboutMeSerializer
    permission_classes = [permissions.AllowAny]

    def get_object(self):
        # Singleton: faqat bitta record
        obj, created = AboutMe.objects.get_or_create(pk=1)
        return obj


class SkillListView(generics.ListAPIView):

    queryset = Skill.objects.all().order_by("-proficiency")
    serializer_class = SkillSerializer
    permission_classes = [permissions.AllowAny]


class ExperienceListView(generics.ListAPIView):
    queryset = Experience.objects.all().order_by("-start_year", "-end_year")
    serializer_class = ExperienceSerializer
    permission_classes = [permissions.AllowAny]


class ExperienceDetailView(generics.RetrieveAPIView):
    queryset = Experience.objects.all()
    serializer_class = ExperienceSerializer
    permission_classes = [permissions.AllowAny]
    lookup_field = "id"


class CertificateListView(generics.ListAPIView):
    queryset = Certificate.objects.all().order_by("-obtained_year", "title")
    serializer_class = CertificateSerializer
    permission_classes = [permissions.AllowAny]


class CertificateDetailView(generics.RetrieveAPIView):
    queryset = Certificate.objects.all()
    serializer_class = CertificateSerializer
    permission_classes = [permissions.AllowAny]
    lookup_field = "id"
