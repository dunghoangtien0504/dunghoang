-- ═══════════════════════════════════════════════════════════════════
-- DungHoang.com — Database Schema
-- Chạy file này trong Supabase Dashboard → SQL Editor
-- ═══════════════════════════════════════════════════════════════════

-- ─── 1. SUBSCRIBERS ─────────────────────────────────────────────────
-- Người đăng ký nhận Thử Thách 7 Ngày (opt-in form)
create table if not exists subscribers (
  id            uuid primary key default gen_random_uuid(),
  email         text unique not null,
  name          text,
  phone         text,
  source        text default 'website',      -- facebook_ad | organic | referral
  utm_source    text,
  utm_medium    text,
  utm_campaign  text,
  ref_code      text,                         -- mã affiliate giới thiệu
  tags          text[] default '{}',          -- ['challenge_7ngay', 'da_mua_mini', ...]
  created_at    timestamptz default now()
);

-- ─── 2. EMAIL_SEQUENCES ─────────────────────────────────────────────
-- Theo dõi mỗi subscriber đang ở ngày mấy trong chuỗi email
create table if not exists email_sequences (
  id              uuid primary key default gen_random_uuid(),
  subscriber_id   uuid references subscribers(id) on delete cascade,
  sequence_name   text not null,             -- 'challenge_7ngay' | 'followup_cold' | 'welcome_mini'
  current_day     int default 1,
  status          text default 'active',     -- active | completed | unsubscribed | paused
  started_at      timestamptz default now(),
  last_sent_at    timestamptz,
  completed_at    timestamptz,
  unique(subscriber_id, sequence_name)
);

-- ─── 3. EMAIL_LOGS ──────────────────────────────────────────────────
-- Log từng email đã gửi (để tracking open rate / click rate)
create table if not exists email_logs (
  id              uuid primary key default gen_random_uuid(),
  subscriber_id   uuid references subscribers(id) on delete cascade,
  sequence_name   text,
  day             int,
  subject         text,
  resend_id       text,                      -- ID từ Resend API để track
  sent_at         timestamptz default now(),
  opened_at       timestamptz,
  clicked_at      timestamptz
);

-- ─── 4. ORDERS ──────────────────────────────────────────────────────
-- Đơn hàng từ webhook Sepay
create table if not exists orders (
  id              uuid primary key default gen_random_uuid(),
  order_code      text unique not null,      -- mã khách CK: DH-368-001
  subscriber_id   uuid references subscribers(id),
  email           text not null,
  name            text,
  amount          bigint not null,           -- đơn vị: đồng
  course_id       text,                      -- 'mini_368' | 'khoa1_686' | 'khoa2_2768'
  course_name     text,
  affiliate_code  text,                      -- mã affiliate nếu có
  commission      bigint default 0,          -- hoa hồng affiliate (đồng)
  status          text default 'pending',    -- pending | completed | refunded
  sepay_ref       text,                      -- reference từ Sepay
  paid_at         timestamptz,
  created_at      timestamptz default now()
);

-- ─── 5. COURSE_PRODUCTS ─────────────────────────────────────────────
-- Danh sách sản phẩm (dùng để map order_code → khóa học)
create table if not exists course_products (
  id            text primary key,            -- 'mini_368' | 'khoa1_686' | 'khoa2_2768' | '1kem1'
  name          text not null,
  price         bigint not null,
  description   text,
  is_active     boolean default true,
  commission_pct int default 20             -- % hoa hồng affiliate
);

insert into course_products (id, name, price, commission_pct) values
  ('mini_368',   'Mini — Trang Bán Hàng 1 Giờ',         368000,    20),
  ('khoa1_686',  'Khóa 1 — Bản Tự Lập (25 Skill AI)',   686868,    20),
  ('khoa2_2768', 'Khóa 2 — Bản Có Đội Trưởng',          2768686,   10),
  ('1kem1',      '1 Kèm 1 — Dũng Cầm Tay Chỉ Việc',    6868686,   10)
on conflict (id) do nothing;

-- ─── 6. AFFILIATES ──────────────────────────────────────────────────
create table if not exists affiliates (
  id              uuid primary key default gen_random_uuid(),
  name            text not null,
  email           text unique not null,
  ref_code        text unique not null,      -- mã giới thiệu duy nhất: VD 'MINH2026'
  commission_pct  int default 20,
  total_referrals int default 0,
  total_revenue   bigint default 0,
  total_commission bigint default 0,
  pending_commission bigint default 0,
  paid_commission bigint default 0,
  status          text default 'active',     -- active | paused | banned
  joined_at       timestamptz default now()
);

-- ─── INDEXES ────────────────────────────────────────────────────────
create index if not exists idx_subscribers_email on subscribers(email);
create index if not exists idx_email_sequences_subscriber on email_sequences(subscriber_id);
create index if not exists idx_email_sequences_status on email_sequences(status, last_sent_at);
create index if not exists idx_orders_email on orders(email);
create index if not exists idx_orders_code on orders(order_code);

-- ─── ROW LEVEL SECURITY ─────────────────────────────────────────────
alter table subscribers     enable row level security;
alter table email_sequences enable row level security;
alter table email_logs      enable row level security;
alter table orders          enable row level security;
alter table course_products enable row level security;
alter table affiliates      enable row level security;

-- Public: chỉ đọc course_products (hiển thị trang bán)
create policy "Public read course_products" on course_products
  for select using (true);

-- Service role: toàn quyền (dùng trong API routes với supabaseAdmin)
-- Không cần tạo policy vì service role bypass RLS tự động
