-- ═══════════════════════════════════════════════════════════════════
-- PAGE_VIEWS — Tracking lưu lượng truy cập website
-- Chạy file này trong Supabase Dashboard → SQL Editor
-- ═══════════════════════════════════════════════════════════════════

create table if not exists page_views (
  id          uuid primary key default gen_random_uuid(),
  path        text not null,
  referrer    text,
  user_agent  text,
  country     text,
  device      text,          -- 'mobile' | 'tablet' | 'desktop'
  session_id  text,          -- fingerprint đơn giản để đếm unique visits
  created_at  timestamptz default now()
);

-- Indexes cho truy vấn nhanh theo thời gian và đường dẫn
create index if not exists idx_pv_created  on page_views (created_at desc);
create index if not exists idx_pv_path     on page_views (path);
create index if not exists idx_pv_session  on page_views (session_id);

-- RLS
alter table page_views enable row level security;
-- Service role bypass RLS tự động, không cần policy cho admin
