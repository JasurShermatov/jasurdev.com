from django.db import models
import uuid
import os


def hero_image_upload_path(instance, filename):
    """Upload path: media/home/hero/<uuid>.<ext>"""
    ext = os.path.splitext(filename)[1] or ".jpg"
    return f"home/hero/{uuid.uuid4()}{ext.lower()}"


class Home(models.Model):
    """
    Home page hero/intro model.
    Foydalanuvchiga landing page uchun rasm va optional text beradi.
    """
    hero_image = models.ImageField(
        upload_to=hero_image_upload_path,
        blank=True,
        null=True
    )
    hero_text = models.TextField(blank=True, null=True, max_length=500)

    class Meta:
        verbose_name = "Home Content"
        verbose_name_plural = "Home Contents"

    def __str__(self):
        return f"Home content (ID: {self.id})"