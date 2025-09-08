from decimal import Decimal

from django import forms
from django.contrib import admin
from django.db import models
from django.utils.html import format_html

from .models import AboutMe, Experience, Certificate
from .models import Skill


@admin.register(AboutMe)
class AboutMeAdmin(admin.ModelAdmin):
    list_display = ("intro_text", "profile_image_preview", "resume_link")
    readonly_fields = ("id",)
    fieldsets = ((None, {"fields": ("intro_text", "profile_image", "resume")}),)

    def has_add_permission(self, request):
        return not AboutMe.objects.exists()

    def has_delete_permission(self, request, obj=None):
        return False

    def changelist_view(self, request, extra_context=None):
        obj = AboutMe.objects.first()
        if obj:
            from django.shortcuts import redirect
            return redirect(f"/admin/{obj._meta.app_label}/{obj._meta.model_name}/{obj.pk}/change/")
        return super().changelist_view(request, extra_context)

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
    list_display = (
        "name",
        "get_experience_years",
        "proficiency_display",
        "image_preview",
    )
    search_fields = ("name",)
    list_filter = ("experience_years", "proficiency")
    ordering = ("-proficiency",)

    fieldsets = (
        (
            None,
            {
                "fields": (
                    "name",
                    "image",
                    "experience_years",
                    "proficiency",
                )
            },
        ),
    )

    # Admin formda step=0.1 bo‘lishi uchun (masalan 2.5 yil)
    formfield_overrides = {
        models.DecimalField: {"widget": forms.NumberInput(attrs={"step": "0.1"})},
    }

    def get_experience_years(self, obj):

        value = obj.experience_years

        if value is None:
            return "—"

        value = Decimal(value)

        if value == value.quantize(Decimal(1)):
            return str(int(value))

        return str(value.normalize())

    get_experience_years.short_description = "Experience (years)"
    get_experience_years.admin_order_field = "experience_years"

    def proficiency_display(self, obj):
        """
        Proficiency (foiz) ni ko‘rsatadi, masalan: 75 (% belgi bilan)
        """
        return f"{obj.proficiency} %"

    proficiency_display.short_description = "Proficiency"
    proficiency_display.admin_order_field = "proficiency"

    def image_preview(self, obj):
        """
        Admin ro‘yxatda skill rasmi preview ko‘rinadi
        """
        if obj.image:
            return format_html(
                '<img src="{}" style="height: 40px; border-radius: 3px;" />',
                obj.image.url,
            )
        return "—"

    image_preview.short_description = "Image"
    image_preview.allow_tags = True



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
