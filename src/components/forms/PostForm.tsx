'use client';

import { useState } from 'react';
import { api } from '@/lib/api';

export default function PostForm({
  userId,
  groupId,
  onPostCreated,
}: {
  userId: string;
  groupId: string;
  onPostCreated?: () => void;
}) {
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    try {
      const formData = new FormData(e.currentTarget);
      await api.community.createPost({
        title: formData.get('title'),
        content: formData.get('content'),
        group_id: groupId,
        author_id: userId,
      });
      e.currentTarget.reset();
      onPostCreated?.();
    } catch (err) {
      setError('Something went wrong posting — try again.');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="title">Title</label>
        <input id="title" name="title" type="text" required />
      </div>
      <div>
        <label htmlFor="content">What's on your mind?</label>
        <textarea id="content" name="content" required />
      </div>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <button type="submit" disabled={submitting}>
        {submitting ? 'Posting…' : 'Post'}
      </button>
    </form>
  );
}
