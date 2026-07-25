'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import type { SeizureType } from '@/lib/seizureTypes';

export default function SeizureTypesList() {
  const [types, setTypes] = useState<SeizureType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    supabase
      .from('seizure_types')
      .select('*')
      .order('name')
      .then(({ data, error }) => {
        if (error) setError(error.message);
        else setTypes(data ?? []);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading…</p>;
  if (error) return <p>Couldn’t load seizure types: {error}</p>;
  if (types.length === 0) return <p>No seizure types have been added yet.</p>;

  return (
    <ul style={{ listStyle: 'none', padding: 0, display: 'grid', gap: 16 }}>
      {types.map((t) => (
        <li key={t.id} style={{ border: '1px solid #ddd', borderRadius: 8, padding: 16 }}>
          <h3 style={{ margin: '0 0 4px' }}>{t.name}</h3>
          {t.category && <p style={{ opacity: 0.7, margin: 0 }}>{t.category}</p>}
          {t.summary && <p>{t.summary}</p>}
          {t.common_symptoms?.length ? <p><strong>Symptoms:</strong> {t.common_symptoms.join(', ')}</p> : null}
          {t.typical_duration && <p><strong>Typical duration:</strong> {t.typical_duration}</p>}
          {t.common_triggers?.length ? <p><strong>Triggers:</strong> {t.common_triggers.join(', ')}</p> : null}
          {t.source_name && (
            <p style={{ fontSize: 13, opacity: 0.7 }}>
              Source: {t.source_url ? <a href={t.source_url}>{t.source_name}</a> : t.source_name}
            </p>
          )}
        </li>
      ))}
    </ul>
  );
}
