const API_BASE = '/api';

async function request<T>(path: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  });

  if (!res.ok) {
    throw new Error(`API error ${res.status}: ${await res.text()}`);
  }

  return res.json();
}

export const api = {
  tracker: {
    list: (userId: string) => request(`/track?user_id=${userId}`),
    create: (log: unknown) =>
      request('/track', { method: 'POST', body: JSON.stringify(log) }),
  },
  wearables: {
    list: (userId: string) => request(`/wearables?user_id=${userId}`),
    sync: (samples: unknown[]) =>
      request('/wearables/sync', { method: 'POST', body: JSON.stringify(samples) }),
  },
  community: {
    listGroups: () => request('/community/groups'),
    createGroup: (group: unknown) =>
      request('/community/groups', { method: 'POST', body: JSON.stringify(group) }),
    listPosts: (groupId?: string) =>
      request(groupId ? `/community/posts?group_id=${groupId}` : '/community/posts'),
    createPost: (post: unknown) =>
      request('/community/posts', { method: 'POST', body: JSON.stringify(post) }),
  },
};
