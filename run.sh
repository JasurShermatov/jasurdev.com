#!/bin/bash
set -e

echo "🟢 Loaded environment variables from .env"

# 1. Apply migrations
echo "📝 Applying migrations if needed..."
python manage.py migrate --check >/dev/null 2>&1 || python manage.py migrate

# 2. Collect static files
echo "📦 Collecting static files..."
python manage.py collectstatic --noinput

# 3. Create superuser if it doesn't exist
echo "👤 Checking superuser..."
python manage.py shell -c "\
from django.contrib.auth import get_user_model; \
User = get_user_model(); \
User.objects.filter(is_superuser=True).exists() or User.objects.create_superuser('admin@admin.com', 'admin')"

# 4. Start Gunicorn with logging
echo "🚀 Starting Gunicorn server..."
exec gunicorn config.wsgi:application \
    --bind 0.0.0.0:8080 \
    --workers 3 \

    --log-level info \
    --access-logfile /app/logs/gunicorn_access.log \
    --error-logfile /app/logs/gunicorn_error.log