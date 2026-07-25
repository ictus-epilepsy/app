'use client';

import { useState } from 'react';
import { api } from '@/lib/api';

export default function SeizureLogForm({ userId }: { userId: string }) {
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    try {
      const formData = new FormData(e.currentTarget);
      await api.tracker.create({
        user_id: userId,
        occurred_at: new Date().toISOString(),
        duration_seconds: Number(formData.get('duration_seconds')) || null,
        seizure_type: formData.get('seizure_type'),
        notes: formData.get('notes'),
      });
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      {/* TODO: build out fields (type, duration, triggers, notes) */}
      <button type="submit" disabled={submitting}>
        {submitting ? 'Logging…' : 'Log Seizure'}
      </button>
    </form>
  );
}
