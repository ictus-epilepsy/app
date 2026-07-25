'use client';

// TODO: wire up to a charting lib (recharts, chart.js, etc.) once wearable
// data ingestion is live. Expecting data shape: { date: string; hours: number }[]

export default function SleepChart({ data }: { data: { date: string; hours: number }[] }) {
  return (
    <div>
      <h3>Sleep</h3>
      {/* placeholder — render chart here */}
    </div>
  );
}
