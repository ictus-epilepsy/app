import SeizureTypesList from '@/components/SeizureTypesList';
import SymptomEntryForm from '@/components/SymptomEntryForm';

export default function SeizureInfoPage() {
  return (
    <main style={{ maxWidth: 760, margin: '0 auto', padding: 24 }}>
      <h1>Seizure information</h1>
      <p>Reference information about seizure types, plus a private log for your own symptoms.</p>

      <section style={{ marginTop: 24 }}>
        <h2>Seizure types</h2>
        <SeizureTypesList />
      </section>

      <section style={{ marginTop: 32 }}>
        <h2>Log a symptom entry</h2>
        <SymptomEntryForm />
      </section>
    </main>
  );
}
