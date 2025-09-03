from django.db import models

def resume_upload_path(instance, filename):
    return f"about_me/resume/{filename}"

def profile_image_upload_path(instance, filename):
    return f"about_me/profile/{filename}"

def skill_image_upload_path(instance, filename):
    return f"about_me/skills/{filename}"

class AboutMe(models.Model):
    """
    Singleton model: faqat bitta record bo'ladi.
    Admin orqali o'zgartiriladi.
    """

    intro_text = models.TextField(blank=True, help_text="Short intro about yourself")
    resume = models.FileField(
        upload_to=resume_upload_path, blank=True, null=True, help_text="Upload your resume"
    )
    profile_image = models.ImageField(
        upload_to=profile_image_upload_path, blank=True, null=True
    )

    class Meta:
        verbose_name = "About Me"
        verbose_name_plural = "About Me"

    def save(self, *args, **kwargs):
        self.pk = 1  # singleton
        super().save(*args, **kwargs)

    def __str__(self):
        return "About Me"


class Skill(models.Model):
    """
    Skills / Technologies tab.
    Foydalanuvchi (faqat admin) tomonidan qo'shiladi.
    """

    name = models.CharField(max_length=100)
    image = models.ImageField(upload_to=skill_image_upload_path, blank=True, null=True)
    experience_years = models.PositiveSmallIntegerField(default=0, help_text="Years of experience")
    proficiency = models.PositiveSmallIntegerField(default=0, help_text="Proficiency in % (0-100)")

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = "Skill / Technology"
        verbose_name_plural = "Skills / Technologies"

    def __str__(self):
        return f"{self.name} ({self.proficiency}%)"