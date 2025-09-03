from django.contrib import admin
from .models import Tag, Post, PostLike, PostComment


@admin.register(Tag)
class TagAdmin(admin.ModelAdmin):
    list_display = ("name",)
    search_fields = ("name",)
    ordering = ("name",)


@admin.register(Post)
class PostAdmin(admin.ModelAdmin):
    list_display = (
        "title",
        "created_at",
        "updated_at",
        "likes_count",
        "comments_count",
    )
    list_filter = ("created_at", "updated_at", "tags")
    search_fields = ("title", "content")
    readonly_fields = ("created_at", "updated_at", "likes_count", "comments_count")
    ordering = ("-created_at",)

    fieldsets = (
        (
            "Post Info",
            {
                "fields": (
                    "title",
                    "content",
                    "image",
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


@admin.register(PostLike)
class PostLikeAdmin(admin.ModelAdmin):
    list_display = ("post", "ip_address", "created_at")
    list_filter = ("created_at", "post")
    search_fields = ("ip_address", "post__title")
    ordering = ("-created_at",)
    list_per_page = 25


@admin.register(PostComment)
class PostCommentAdmin(admin.ModelAdmin):
    list_display = ("post", "short_content", "created_at")
    list_filter = ("created_at", "post")
    search_fields = ("content", "post__title")
    ordering = ("-created_at",)
    actions = ["delete_selected_comments"]

    def short_content(self, obj):
        return obj.content[:50] + ("..." if len(obj.content) > 50 else "")

    short_content.short_description = "Content"

    # Custom bulk delete action
    def delete_selected_comments(self, request, queryset):
        count = queryset.count()
        queryset.delete()
        self.message_user(request, f"{count} ta comment muvaffaqiyatli o‘chirildi.")

    delete_selected_comments.short_description = "Tanlangan kommentlarni o‘chirish"
