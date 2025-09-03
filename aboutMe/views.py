from rest_framework import generics, permissions
from .models import AboutMe, Skill
from .serializers import AboutMeSerializer, SkillSerializer


class AboutMeView(generics.RetrieveAPIView):
    """
    Singleton About Me view.
    Foydalanuvchi faqat o'qishi mumkin.
    """
    serializer_class = AboutMeSerializer
    permission_classes = [permissions.AllowAny]

    def get_object(self):
        # Singleton: faqat bitta record
        obj, created = AboutMe.objects.get_or_create(pk=1)
        return obj


class SkillListView(generics.ListAPIView):
    """
    Barcha skill / technologies ro'yxati.
    Frontend uchun.
    """
    queryset = Skill.objects.all().order_by("-proficiency")
    serializer_class = SkillSerializer
    permission_classes = [permissions.AllowAny]