from django.urls import path
from .views import AboutMeView, SkillListView

app_name = "aboutMe"  # namespace ishlashi uchun shart

urlpatterns = [
    path("", AboutMeView.as_view(), name="about-me"),
    path("skills/", SkillListView.as_view(), name="skills-list"),
]