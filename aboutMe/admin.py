from django.contrib import admin
from .models import AboutMe, Skill


@admin.register(AboutMe)
class AboutMeAdmin(admin.ModelAdmin):
    """
    Singleton model: faqat bitta About Me record.
    """
    list_display = ("intro_text", "profile_image", "resume")
    readonly_fields = ("id",)

    fieldsets = (
        (None, {
            "fields": ("intro_text", "profile_image", "resume")
        }),
    )

    def has_add_permission(self, request):
        # Singleton: faqat bitta record bo'lishi kerak
        return not AboutMe.objects.exists()

    def has_delete_permission(self, request, obj=None):
        return False


@admin.register(Skill)
class SkillAdmin(admin.ModelAdmin):
    """
    Skills / Technologies admin paneli.
    """
    list_display = ("name", "experience_years", "proficiency", "image_preview")
    search_fields = ("name",)
    list_filter = ("experience_years",)

    fieldsets = (
        (None, {
            "fields": ("name", "image", "experience_years", "proficiency")
        }),
    )

    def image_preview(self, obj):
        if obj.image:
            return f'<img src="{obj.image.url}" style="height: 50px;" />'
        return "-"
    image_preview.allow_tags = True
    image_preview.short_description = "Image Preview"