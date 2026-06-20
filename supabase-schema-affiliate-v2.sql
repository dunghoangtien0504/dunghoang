-- ─── AFFILIATE V2 — Đúng luật thuế TNCN ────────────────────────────────────

-- Thêm cột pháp lý vào bảng affiliates
alter table affiliates
  add column if not exists full_name     text,
  add column if not exists cccd          text,
  add column if not exists tax_id        text,
  add column if not exists bank_account  text,
  add column if not exists bank_name     text,
  add column if not exists phone         text,
  add column if not exists min_payout    bigint default 500000,   -- ngưỡng rút tối thiểu (500k)
  add column if not exists cookie_days   int default 30,
  add column if not exists notes         text;

-- Bảng yêu cầu rút tiền
create table if not exists affiliate_payouts (
  id                uuid primary key default gen_random_uuid(),
  affiliate_id      uuid references affiliates(id) on delete cascade,
  ref_code          text not null,

  gross_amount      bigint not null,                       -- hoa hồng gộp (trước thuế)
  tax_amount        bigint not null default 0,             -- thuế TNCN 10% (nếu >= 2tr)
  net_amount        bigint not null,                       -- thực nhận = gross - tax

  taxable           boolean default false,                 -- có phải khấu trừ 10% không
  bank_account      text,
  bank_name         text,

  status            text default 'pending',                -- pending | approved | paid | rejected
  requested_at      timestamptz default now(),
  approved_at       timestamptz,
  paid_at           timestamptz,
  paid_by           text,                                  -- admin email xử lý
  note              text,

  -- Chứng từ khấu trừ
  tax_cert_issued   boolean default false,
  tax_cert_url      text
);

-- Index
create index if not exists idx_payouts_affiliate on affiliate_payouts(affiliate_id);
create index if not exists idx_payouts_status on affiliate_payouts(status);

-- RLS
alter table affiliate_payouts enable row level security;

-- ─── RPC: cộng commission vào affiliate sau khi đơn completed ────────────────
create or replace function affiliate_add_commission(
  p_affiliate_id uuid,
  p_amount       bigint
) returns void language plpgsql security definer as $$
begin
  update affiliates
  set
    total_commission    = total_commission    + p_amount,
    pending_commission  = pending_commission  + p_amount,
    total_referrals     = total_referrals     + 1
  where id = p_affiliate_id;
end;
$$;

-- ─── RPC: trừ pending và cộng paid khi payout được duyệt ─────────────────────
create or replace function affiliate_process_payout(
  p_affiliate_id uuid,
  p_gross_amount bigint
) returns void language plpgsql security definer as $$
begin
  update affiliates
  set
    pending_commission = pending_commission - p_gross_amount,
    paid_commission    = paid_commission    + p_gross_amount
  where id = p_affiliate_id;
end;
$$;
