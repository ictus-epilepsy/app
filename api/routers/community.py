from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from datetime import datetime
from typing import Optional
from uuid import UUID

from db import supabase

router = APIRouter()


# ---------- Schemas ----------

class GroupCreate(BaseModel):
    title: str
    description: Optional[str] = None


class Group(BaseModel):
    id: UUID
    created_at: datetime
    title: str
    description: Optional[str] = None


class PostCreate(BaseModel):
    title: str
    content: str
    group_id: UUID
    author_id: UUID  # in production, derive this from the auth session instead


class Post(BaseModel):
    id: UUID
    created_at: datetime
    title: str
    content: str
    group_id: UUID
    author_id: UUID


# ---------- Groups ----------

@router.get("/groups")
def list_groups():
    res = supabase.table("community_groups").select("*").order("created_at", desc=True).execute()
    return res.data


@router.post("/groups", status_code=201)
def create_group(group: GroupCreate):
    res = supabase.table("community_groups").insert(group.model_dump()).execute()
    if not res.data:
        raise HTTPException(status_code=500, detail="Failed to create group")
    return res.data[0]


# ---------- Posts ----------

@router.get("/posts")
def list_posts(group_id: Optional[UUID] = None):
    # Pull posts and join the author's profile (avatar/bio) in one round trip.
    # Supabase's PostgREST embed syntax: "author:user_profile(*)" follows the
    # author_id -> user_profile.user_id foreign key, assuming it's set up in the DB.
    query = supabase.table("community_posts").select(
        "*, author:user_profile(user_id, avatar, bio)"
    ).order("created_at", desc=True)

    if group_id:
        query = query.eq("group_id", str(group_id))

    res = query.execute()
    return res.data


@router.get("/posts/{post_id}")
def get_post(post_id: UUID):
    res = supabase.table("community_posts").select(
        "*, author:user_profile(user_id, avatar, bio)"
    ).eq("id", str(post_id)).single().execute()

    if not res.data:
        raise HTTPException(status_code=404, detail="Post not found")
    return res.data


@router.post("/posts", status_code=201)
def create_post(post: PostCreate):
    payload = post.model_dump()
    payload["group_id"] = str(payload["group_id"])
    payload["author_id"] = str(payload["author_id"])

    res = supabase.table("community_posts").insert(payload).execute()
    if not res.data:
        raise HTTPException(status_code=500, detail="Failed to create post")
    return res.data[0]


@router.delete("/posts/{post_id}", status_code=204)
def delete_post(post_id: UUID):
    res = supabase.table("community_posts").delete().eq("id", str(post_id)).execute()
    if not res.data:
        raise HTTPException(status_code=404, detail="Post not found")
    return None
