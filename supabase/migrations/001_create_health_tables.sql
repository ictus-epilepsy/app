create extension if not exists "pgcrypto";

create table public.seizure_logs (
    id uuid primary key default gen_random_uuid(),
    user_id uuid not null references auth.users(id) on delete cascade,
    occurred_at timestamptz not null,
    duration_seconds integer,
    severity integer not null,
    notes text,
    created_at timestamptz not null default now(),

    constraint seizure_duration_non_negative
        check (duration_seconds is null or duration_seconds >= 0),

    constraint seizure_severity_valid
        check (severity between 1 and 5)
);

create table public.lifestyle_logs (
    id uuid primary key default gen_random_uuid(),
    user_id uuid not null references auth.users(id) on delete cascade,
    logged_at timestamptz not null,
    sleep_hours numeric(4, 2),
    stress_score integer,
    caffeine_mg integer,
    alcohol_units numeric(5, 2),
    notes text,
    created_at timestamptz not null default now(),

    constraint lifestyle_sleep_valid
        check (sleep_hours is null or sleep_hours between 0 and 24),

    constraint lifestyle_stress_valid
        check (stress_score is null or stress_score between 0 and 100),

    constraint lifestyle_caffeine_valid
        check (caffeine_mg is null or caffeine_mg >= 0),

    constraint lifestyle_alcohol_valid
        check (alcohol_units is null or alcohol_units >= 0)
);

create table public.wearable_measurements (
    id uuid primary key default gen_random_uuid(),
    user_id uuid not null references auth.users(id) on delete cascade,
    measured_at timestamptz not null,
    sleep_hours numeric(4, 2),
    average_heart_rate integer,
    resting_heart_rate integer,
    stress_score integer,
    step_count integer,
    source text not null default 'mock',
    created_at timestamptz not null default now(),

    constraint wearable_sleep_valid
        check (sleep_hours is null or sleep_hours between 0 and 24),

    constraint wearable_average_heart_rate_valid
        check (
            average_heart_rate is null
            or average_heart_rate between 20 and 250
        ),

    constraint wearable_resting_heart_rate_valid
        check (
            resting_heart_rate is null
            or resting_heart_rate between 20 and 250
        ),

    constraint wearable_stress_valid
        check (stress_score is null or stress_score between 0 and 100),

    constraint wearable_steps_valid
        check (step_count is null or step_count >= 0)
);

create index seizure_logs_user_occurred_at_idx
    on public.seizure_logs (user_id, occurred_at desc);

create index lifestyle_logs_user_logged_at_idx
    on public.lifestyle_logs (user_id, logged_at desc);

create index wearable_measurements_user_measured_at_idx
    on public.wearable_measurements (user_id, measured_at desc);


alter table public.seizure_logs enable row level security;
alter table public.lifestyle_logs enable row level security;
alter table public.wearable_measurements enable row level security;

create policy "Users can view their seizure logs"
on public.seizure_logs
for select
using (auth.uid() = user_id);

create policy "Users can create their seizure logs"
on public.seizure_logs
for insert
with check (auth.uid() = user_id);

create policy "Users can update their seizure logs"
on public.seizure_logs
for update
using (auth.uid() = user_id)
with check (auth.uid() = user_id);

create policy "Users can delete their seizure logs"
on public.seizure_logs
for delete
using (auth.uid() = user_id);

create policy "Users can view their lifestyle logs"
on public.lifestyle_logs
for select
using (auth.uid() = user_id);

create policy "Users can create their lifestyle logs"
on public.lifestyle_logs
for insert
with check (auth.uid() = user_id);

create policy "Users can update their lifestyle logs"
on public.lifestyle_logs
for update
using (auth.uid() = user_id)
with check (auth.uid() = user_id);

create policy "Users can delete their lifestyle logs"
on public.lifestyle_logs
for delete
using (auth.uid() = user_id);

create policy "Users can view their wearable measurements"
on public.wearable_measurements
for select
using (auth.uid() = user_id);

create policy "Users can create their wearable measurements"
on public.wearable_measurements
for insert
with check (auth.uid() = user_id);

create policy "Users can update their wearable measurements"
on public.wearable_measurements
for update
using (auth.uid() = user_id)
with check (auth.uid() = user_id);

create policy "Users can delete their wearable measurements"
on public.wearable_measurements
for delete
using (auth.uid() = user_id);