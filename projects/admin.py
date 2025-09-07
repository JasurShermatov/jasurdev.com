from django.contrib import admin
from .models import Tag, Project, ProjectLike, ProjectComment


@admin.register(Tag)
class TagAdmin(admin.ModelAdmin):
    list_display = ("name",)
    search_fields = ("name",)
    ordering = ("name",)


@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    list_display = (
        "title",
        "owner",
        "created_at",
        "updated_at",
        "likes_count",
        "comments_count",
    )
    list_filter = ("created_at", "updated_at", "tags", "owner")
    search_fields = ("title", "description", "owner__email", "owner__full_name")
    readonly_fields = ("created_at", "updated_at", "likes_count", "comments_count")
    ordering = ("-created_at",)

    fieldsets = (
        (
            "Project Info",
            {
                "fields": (
                    "title",
                    "description",
                    "image",
                    "github_link",
                    "live_demo_link",
                    "owner",
                    "tags",
                )
            },
        ),
        ("Statistics", {"fields": ("likes_count", "comments_count")}),
        ("Timestamps", {"fields": ("created_at", "updated_at")}),
    )

    def likes_count(self, obj):
        return obj.likes.count()

    likes_count.short_description = "Likes"

    def comments_count(self, obj):
        return obj.comments.count()

    comments_count.short_description = "Comments"


@admin.register(ProjectLike)
class ProjectLikeAdmin(admin.ModelAdmin):
    list_display = ("project", "ip_address", "created_at")
    list_filter = ("created_at", "project")
    search_fields = ("ip_address", "project__title")
    ordering = ("-created_at",)
    list_per_page = 25
    actions = ["delete_selected_likes"]

    # Custom bulk delete action
    def delete_selected_likes(self, request, queryset):
        count = queryset.count()
        queryset.delete()
        self.message_user(request, f"{count} ta like muvaffaqiyatli o‘chirildi.")

    delete_selected_likes.short_description = "Tanlangan like’larni o‘chirish"


@admin.register(ProjectComment)
class ProjectCommentAdmin(admin.ModelAdmin):
    list_display = ("project", "short_content", "created_at")
    list_filter = ("created_at", "project")
    search_fields = ("content", "project__title")
    ordering = ("-created_at",)
    actions = ["delete_selected_comments"]

    def short_content(self, obj):
        return obj.content[:50] + ("..." if len(obj.content) > 50 else "")

    short_content.short_description = "Content"

    def delete_selected_comments(self, request, queryset):
        count = queryset.count()
        queryset.delete()
        self.message_user(request, f"{count} ta comment muvaffaqiyatli o‘chirildi.")

    delete_selected_comments.short_description = "Tanlangan kommentlarni o‘chirish"
