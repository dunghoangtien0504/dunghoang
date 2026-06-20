-- ─── CHALLENGE CÓ CỌC — Bí Quyết 7 Ngày Đưa AI Vào Business ───────────────

-- Bảng đăng ký challenge
create table if not exists challenge_enrollments (
  id              uuid primary key default gen_random_uuid(),
  user_id         uuid references auth.users(id) on delete set null,
  email           text not null,
  name            text,
  order_code      text not null unique,
  deposit_amount  bigint default 368000,
  started_at      timestamptz default now(),
  -- Ngày 1 mở khóa: 7h sáng đầu tiên sau khi đăng ký
  first_unlock_at timestamptz,
  status          text default 'active',   -- active | completed | failed | refunded
  all_completed   boolean default false,
  completed_at    timestamptz,
  refund_requested_at  timestamptz,
  refunded_at          timestamptz,
  created_at      timestamptz default now()
);

-- Bảng nộp bài từng ngày
create table if not exists challenge_submissions (
  id            uuid primary key default gen_random_uuid(),
  enrollment_id uuid references challenge_enrollments(id) on delete cascade,
  day_number    int not null check (day_number between 1 and 7),
  proof_text    text,                      -- Mô tả / link / ghi chú
  submitted_at  timestamptz default now(),
  deadline      timestamptz not null,
  is_on_time    boolean generated always as (submitted_at <= deadline) stored,
  status        text default 'pending',   -- pending | approved | rejected
  admin_note    text,
  reviewed_at   timestamptz,
  unique(enrollment_id, day_number)
);

-- Index
create index if not exists idx_challenge_enrollments_email on challenge_enrollments(email);
create index if not exists idx_challenge_enrollments_user  on challenge_enrollments(user_id);
create index if not exists idx_challenge_submissions_enroll on challenge_submissions(enrollment_id);

-- RLS
alter table challenge_enrollments enable row level security;
alter table challenge_submissions  enable row level security;

-- Thêm cột first_unlock_at nếu bảng đã tồn tại
alter table challenge_enrollments
  add column if not exists first_unlock_at timestamptz;
