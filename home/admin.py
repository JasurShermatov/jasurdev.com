from django.contrib import admin
from .models import Home


@admin.register(Home)
class HomeAdmin(admin.ModelAdmin):
    list_display = ("id", "hero_text_short")

    def hero_text_short(self, obj):
        return (obj.hero_text[:50] + "...") if obj.hero_text else "-"
    hero_text_short.short_description = "Hero Text"