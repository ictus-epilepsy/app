'use client';

import { useEffect, useState } from 'react';
import { api } from '@/lib/api';
import PostForm from '@/components/forms/PostForm';

// TEMPORARY: there's no login system yet, so we're pretending to be one
// fixed user. Once auth is added, this should come from the logged-in
// user's session instead of being hardcoded.
const TEMP_USER_ID = 'REPLACE-WITH-A-REAL-user_profile.user_id-FROM-YOUR-DB';

type Group = {
  id: string;
  title: string;
  description: string | null;
};

type Post = {
  id: string;
  title: string;
  content: string;
  created_at: string;
  author?: { avatar: number; bio: string | null } | null;
};

export default function CommunityPage() {
  const [groups, setGroups] = useState<Group[]>([]);
  const [selectedGroupId, setSelectedGroupId] = useState<string | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Step 1: when the page first loads, go grab the list of groups.
  useEffect(() => {
    api
      .community.listGroups()
      .then((data) => {
        const list = data as Group[];
        setGroups(list);
        if (list.length > 0) setSelectedGroupId(list[0].id);
      })
      .catch(() => setError('Could not load groups.'))
      .finally(() => setLoading(false));
  }, []);

  // Step 2: whenever the selected group changes, go grab that group's posts.
  useEffect(() => {
    if (!selectedGroupId) return;
    api.community
      .listPosts(selectedGroupId)
      .then((data) => setPosts(data as Post[]))
      .catch(() => setError('Could not load posts.'));
  }, [selectedGroupId]);

  function refreshPosts() {
    if (!selectedGroupId) return;
    api.community.listPosts(selectedGroupId).then((data) => setPosts(data as Post[]));
  }

  if (loading) return <p>Loading…</p>;

  return (
    <main>
      <h1>Community</h1>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {groups.length === 0 && (
        <p>No groups yet — add one in Supabase's Table Editor (community_groups) to test this page.</p>
      )}

      {/* Pick which group you're viewing */}
      <nav>
        {groups.map((group) => (
          <button
            key={group.id}
            onClick={() => setSelectedGroupId(group.id)}
            style={{ fontWeight: group.id === selectedGroupId ? 'bold' : 'normal' }}
          >
            {group.title}
          </button>
        ))}
      </nav>

      {selectedGroupId && (
        <>
          <PostForm userId={TEMP_USER_ID} groupId={selectedGroupId} onPostCreated={refreshPosts} />

          <ul>
            {posts.map((post) => (
              <li key={post.id}>
                <h3>{post.title}</h3>
                <p>{post.content}</p>
                <small>{new Date(post.created_at).toLocaleString()}</small>
              </li>
            ))}
          </ul>
        </>
      )}
    </main>
  );
}
