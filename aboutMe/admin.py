from django.contrib import admin
from django.utils.html import format_html
from .models import AboutMe, Skill, Experience, Certificate


@admin.register(AboutMe)
class AboutMeAdmin(admin.ModelAdmin):

    list_display = ("intro_text", "profile_image_preview", "resume_link")
    readonly_fields = ("id",)

    fieldsets = ((None, {"fields": ("intro_text", "profile_image", "resume")}),)

    def has_add_permission(self, request):
        return not AboutMe.objects.exists()

    def has_delete_permission(self, request, obj=None):
        return False

    def profile_image_preview(self, obj):
        if obj.profile_image:
            return format_html(
                '<img src="{}" style="height: 60px; border-radius: 5px;" />',
                obj.profile_image.url,
            )
        return "-"

    profile_image_preview.short_description = "Profile Image"

    def resume_link(self, obj):
        if obj.resume:
            return format_html(
                '<a href="{}" target="_blank">Download Resume</a>', obj.resume.url
            )
        return "-"

    resume_link.short_description = "Resume"


@admin.register(Skill)
class SkillAdmin(admin.ModelAdmin):
    list_display = ("name", "experience_years", "proficiency", "image_preview")
    search_fields = ("name",)
    list_filter = ("experience_years", "proficiency")
    ordering = ("-proficiency",)

    fieldsets = (
        (None, {"fields": ("name", "image", "experience_years", "proficiency")}),
    )

    def image_preview(self, obj):
        if obj.image:
            return format_html(
                '<img src="{}" style="height: 50px; border-radius: 3px;" />',
                obj.image.url,
            )
        return "-"

    image_preview.short_description = "Image Preview"


@admin.register(Experience)
class ExperienceAdmin(admin.ModelAdmin):
    list_display = ("title", "company", "period", "link_display")
    search_fields = ("title", "company")
    list_filter = ("start_year", "end_year")
    ordering = ("-start_year", "-end_year")

    fieldsets = (
        (
            None,
            {
                "fields": (
                    "title",
                    "company",
                    "description",
                    "start_year",
                    "end_year",
                    "link",
                )
            },
        ),
    )

    def period(self, obj):
        return (
            f"{obj.start_year} - {obj.end_year}"
            if obj.end_year
            else f"{obj.start_year} - Present"
        )

    period.short_description = "Period"

    def link_display(self, obj):
        if obj.link:
            return format_html('<a href="{}" target="_blank">Link</a>', obj.link)
        return "-"

    link_display.short_description = "Company/Project Link"


@admin.register(Certificate)
class CertificateAdmin(admin.ModelAdmin):
    list_display = ("title", "obtained_year", "image_preview", "link_display")
    search_fields = ("title",)
    list_filter = ("obtained_year",)
    ordering = ("-obtained_year", "title")

    fieldsets = (
        (
            None,
            {
                "fields": (
                    "title",
                    "description",
                    "image",
                    "link",
                    "obtained_year",
                )
            },
        ),
    )

    def image_preview(self, obj):
        if obj.image:
            return format_html(
                '<img src="{}" style="height: 50px; border-radius: 3px;" />',
                obj.image.url,
            )
        return "-"

    image_preview.short_description = "Image Preview"

    def link_display(self, obj):
        if obj.link:
            return format_html('<a href="{}" target="_blank">Link</a>', obj.link)
        return "-"

    link_display.short_description = "Certificate Link"
