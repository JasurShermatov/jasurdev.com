from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import path, include
from drf_yasg import openapi
from drf_yasg.views import get_schema_view
from rest_framework import permissions

schema_view = get_schema_view(
    openapi.Info(
        title="JasurDev API",
        default_version="v1",
        description="JasurDev loyihasi uchun API dokumentatsiya",
        contact=openapi.Contact(email="admin@jasurdev.uz"),
    ),
    public=True,
    permission_classes=(permissions.AllowAny,),
)

urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/home/", include("home.urls", namespace="home")),
    path("api/about-me/", include("aboutMe.urls", namespace="aboutMe")),
    path("api/posts/", include("posts.urls", namespace="posts")),
    path("api/projects/", include("projects.urls", namespace="projects")),
    # Swagger / ReDoc
    path(
        "swagger/",
        schema_view.with_ui("swagger", cache_timeout=0),
        name="schema-swagger-ui",
    ),
    path("redoc/", schema_view.with_ui("redoc", cache_timeout=0), name="schema-redoc"),
]

if settings.DEBUG:
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
