export type SeizureCategory = 'focal' | 'generalised' | 'unknown_onset';
export type ConsciousnessLevel = 'aware' | 'unaware' | 'unsure';

export interface SeizureType {
  id: string;
  name: string;
  category: SeizureCategory | null;
  summary: string | null;
  common_symptoms: string[] | null;
  typical_duration: string | null;
  common_triggers: string[] | null;
  source_name: string | null;
  source_url: string | null;
  last_reviewed_date: string | null;
  created_at: string;
}

export interface SymptomEntry {
  id: string;
  user_id: string;
  occurred_at: string | null;
  duration_estimate: string | null;
  consciousness_level: ConsciousnessLevel | null;
  warning_signs_before: string | null;
  physical_movements: string | null;
  what_happened_after: string | null;
  possible_triggers: string | null;
  witnessed_by: string | null;
  free_text_notes: string | null;
  created_at: string;
}
