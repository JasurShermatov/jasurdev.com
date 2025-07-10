from typing import Optional
from datetime import datetime
from pydantic import BaseModel

class PostBase(BaseModel):
    title: Optional[str] = None
    slug: Optional[str] = None
    content: Optional[str] = None
    cover_image: Optional[str] = None
    tags: Optional[str] = None
    published: Optional[bool] = True

class PostCreate(PostBase):
    pass

class PostUpdate(PostBase):
    pass

class PostOut(PostBase):
    id: int
    created_at: datetime
    updated_at: Optional[datetime]
    like_count: int

    class Config:
        orm_mode = True