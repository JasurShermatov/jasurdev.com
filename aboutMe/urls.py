from django.urls import path
from .views import (
    AboutMeView,
    SkillListView,
    ExperienceListView,
    ExperienceDetailView,
    CertificateListView,
    CertificateDetailView,
)

app_name = "aboutMe"

urlpatterns = [
    path("", AboutMeView.as_view(), name="about-me"),
    path("skills/", SkillListView.as_view(), name="skills-list"),
    path("experiences/", ExperienceListView.as_view(), name="experiences-list"),
    path(
        "experiences/<int:id>/",
        ExperienceDetailView.as_view(),
        name="experience-detail",
    ),
    path("certificates/", CertificateListView.as_view(), name="certificates-list"),
    path(
        "certificates/<int:id>/",
        CertificateDetailView.as_view(),
        name="certificate-detail",
    ),
]
