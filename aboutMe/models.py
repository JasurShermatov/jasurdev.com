from django.db import models


def resume_upload_path(instance, filename):
    return f"about_me/resume/{filename}"


def profile_image_upload_path(instance, filename):
    return f"about_me/profile/{filename}"


def skill_image_upload_path(instance, filename):
    return f"about_me/skills/{filename}"

class AboutMe(models.Model):
    intro_text = models.TextField(blank=True, help_text="Short intro about yourself")
    resume = models.FileField(
        upload_to=resume_upload_path,
        blank=True,
        null=True,
        help_text="Upload your resume",
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

    name = models.CharField(max_length=100)
    image = models.ImageField(upload_to=skill_image_upload_path, blank=True, null=True)
    experience_years = models.DecimalField(
        max_digits=4, decimal_places=1,
        default=0.0,
    )
    proficiency = models.PositiveSmallIntegerField(
        default=0, help_text="Proficiency in % (0-100)"
    )

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = "Skill / Technology"
        verbose_name_plural = "Skills / Technologies"

    def __str__(self):
        return f"{self.name} ({self.proficiency}%)"


def experience_link_upload_path(instance, filename):
    return f"about_me/experience/{filename}"


def certificate_upload_path(instance, filename):
    return f"about_me/certificates/{filename}"


class Experience(models.Model):

    title = models.CharField(max_length=200, help_text="Job title or position")
    company = models.CharField(max_length=200, help_text="Company name")
    description = models.TextField(
        blank=True, help_text="Description of responsibilities"
    )
    start_year = models.PositiveSmallIntegerField(help_text="Start year")
    end_year = models.PositiveSmallIntegerField(
        blank=True, null=True, help_text="End year (optional, leave empty if current)"
    )
    link = models.URLField(
        blank=True, null=True, help_text="Company or project link (optional)"
    )

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = "Experience"
        verbose_name_plural = "Experiences"
        ordering = ["-start_year", "-end_year"]

    def __str__(self):
        period = (
            f"{self.start_year} - {self.end_year}"
            if self.end_year
            else f"{self.start_year} - Present"
        )
        return f"{self.title} at {self.company} ({period})"


class Certificate(models.Model):

    title = models.CharField(
        max_length=200, help_text="Certificate or achievement title"
    )
    description = models.TextField(blank=True, help_text="Optional description")
    image = models.ImageField(
        upload_to=certificate_upload_path,
        blank=True,
        null=True,
        help_text="Upload certificate image (optional)",
    )
    link = models.URLField(
        blank=True, null=True, help_text="Optional link to certificate or achievement"
    )
    obtained_year = models.PositiveSmallIntegerField(
        blank=True, null=True, help_text="Year obtained (optional)"
    )

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = "Certificate / Achievement"
        verbose_name_plural = "Certificates / Achievements"
        ordering = ["-obtained_year", "title"]

    def __str__(self):
        year = f" ({self.obtained_year})" if self.obtained_year else ""
        return f"{self.title}{year}"
