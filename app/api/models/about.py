from sqlalchemy import Column, Integer, String, Text, DateTime
from sqlalchemy.sql import func
from app.core.database import Base

class About(Base):
    __tablename__ = "about"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(255), nullable=True)
    content = Column(Text, nullable=True)
    image = Column(String(500), nullable=True)
    tags = Column(String(255), nullable=True)  # Qo‘shimcha info yoki kategoriya
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())