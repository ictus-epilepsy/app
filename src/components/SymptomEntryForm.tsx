'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import type { ConsciousnessLevel } from '@/lib/seizureTypes';

export default function SymptomEntryForm() {
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSaving(true);
    setMessage(null);

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      setMessage('Please sign in before saving an entry.');
      setSaving(false);
      return;
    }

    const form = new FormData(e.currentTarget);
    const str = (k: string) => ((form.get(k) as string) || '').trim() || null;
    const occurred = form.get('occurred_at') as string;

    const { error } = await supabase.from('symptom_entries').insert({
      user_id: user.id, // must equal auth.uid() per your RLS policy
      occurred_at: occurred ? new Date(occurred).toISOString() : null,
      duration_estimate: str('duration_estimate'),
      consciousness_level: (str('consciousness_level') as ConsciousnessLevel | null),
      warning_signs_before: str('warning_signs_before'),
      physical_movements: str('physical_movements'),
      what_happened_after: str('what_happened_after'),
      possible_triggers: str('possible_triggers'),
      witnessed_by: str('witnessed_by'),
      free_text_notes: str('free_text_notes'),
    });

    setSaving(false);
    if (error) {
      setMessage('Error saving: ' + error.message);
    } else {
      setMessage('Saved.');
      e.currentTarget.reset();
    }
  }

  const field = { display: 'grid', gap: 4, marginBottom: 12 } as const;

  return (
    <form onSubmit={handleSubmit} style={{ display: 'grid', maxWidth: 520 }}>
      <label style={field}>When did it happen?
        <input type="datetime-local" name="occurred_at" />
      </label>
      <label style={field}>Duration estimate
        <input name="duration_estimate" placeholder="e.g. about 30 seconds" />
      </label>
      <label style={field}>Consciousness level
        <select name="consciousness_level" defaultValue="">
          <option value="" disabled>Choose…</option>
          <option value="aware">Aware</option>
          <option value="unaware">Unaware</option>
          <option value="unsure">Unsure</option>
        </select>
      </label>
      <label style={field}>Warning signs beforehand
        <input name="warning_signs_before" />
      </label>
      <label style={field}>Physical movements
        <input name="physical_movements" />
      </label>
      <label style={field}>What happened after
        <input name="what_happened_after" />
      </label>
      <label style={field}>Possible triggers
        <input name="possible_triggers" />
      </label>
      <label style={field}>Witnessed by
        <input name="witnessed_by" />
      </label>
      <label style={field}>Notes
        <textarea name="free_text_notes" rows={3} />
      </label>
      <button type="submit" disabled={saving}>{saving ? 'Saving…' : 'Save entry'}</button>
      {message && <p role="status">{message}</p>}
    </form>
  );
}
