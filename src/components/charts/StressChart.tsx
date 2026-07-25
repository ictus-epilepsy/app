'use client';

// TODO: wire up to a charting lib once wearable data ingestion is live.
// Expecting data shape: { date: string; score: number }[]

export default function StressChart({ data }: { data: { date: string; score: number }[] }) {
  return (
    <div>
      <h3>Stress</h3>
      {/* placeholder — render chart here */}
    </div>
  );
}
