from django.db import models
from django.conf import settings


class Tag(models.Model):
    name = models.CharField(max_length=50, unique=True)

    def __str__(self):
        return self.name


class Project(models.Model):

    title = models.CharField(max_length=255)
    description = models.TextField()
    image = models.ImageField(upload_to="projects/images/", blank=True, null=True)
    github_link = models.URLField(blank=True, null=True)
    live_demo_link = models.URLField(blank=True, null=True)
    owner = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="projects",
    )
    tags = models.ManyToManyField(Tag, related_name="projects", blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["-created_at"]

    def __str__(self):
        return self.title

    @property
    def likes_count(self):
        return self.likes.count()

    @property
    def comments_count(self):
        return self.comments.count()


class ProjectLike(models.Model):

    project = models.ForeignKey(Project, on_delete=models.CASCADE, related_name="likes")
    ip_address = models.GenericIPAddressField()
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ("project", "ip_address")  # bir IP faqat 1 marta like
        ordering = ["-created_at"]

    def __str__(self):
        return f"Like from {self.ip_address} on {self.project}"


class ProjectComment(models.Model):

    project = models.ForeignKey(
        Project, on_delete=models.CASCADE, related_name="comments"
    )
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["created_at"]

    def __str__(self):
        return f"Comment on {self.project}"
