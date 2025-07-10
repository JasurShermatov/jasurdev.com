from sqlalchemy import Column, Integer, String, Text, Boolean, DateTime
from sqlalchemy.sql import func
from app.core.database import Base

class Post(Base):
    __tablename__ = "posts"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(255), nullable=True)
    slug = Column(String(255), nullable=True, unique=True)
    content = Column(Text, nullable=True)
    cover_image = Column(String(500), nullable=True)
    tags = Column(String(255), nullable=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
    published = Column(Boolean, default=True)
    like_count = Column(Integer, default=0)