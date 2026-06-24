-- ============================================================
-- INSERT khóa landing_186 vào Supabase
-- Chạy trong Supabase SQL Editor (hoặc psql)
-- Thứ tự: courses → lessons (có FK course_id)
-- ============================================================

-- 1. INSERT course
INSERT INTO courses (id, name, slug, price, description, is_active)
VALUES (
  'landing_186',
  'Tạo Landing Page Chuyển Đổi Cao',
  'landing_186',
  1868000,
  'Dùng Vibe Coding + 8 skill file để tự thiết kế landing page từ đầu: chân dung khách, giọng văn, offer Hormozi, cơ chế khác biệt, phễu bán hàng, build HTML, UI/UX, deploy Vercel, SePay, Meta Pixel.',
  true
)
ON CONFLICT (id) DO UPDATE SET
  name        = EXCLUDED.name,
  price       = EXCLUDED.price,
  description = EXCLUDED.description,
  is_active   = EXCLUDED.is_active;

-- ============================================================
-- 2. INSERT 10 lessons
--    order_index: 1–10
--    content_html: paste từ file portal-baiX-*.html tương ứng
-- ============================================================

INSERT INTO lessons (course_id, title, order_index, content_html, is_free)
VALUES

-- BÀI 1
(
  'landing_186',
  'Tổng Quan + Cài Công Cụ Vibe Coding',
  1,
  '<!-- paste nội dung portal-bai1-tong-quan-cai-cong-cu.html vào đây -->',
  true   -- bài 1 miễn phí xem trước
),

-- BÀI 2
(
  'landing_186',
  'Skill #01 — Chân Dung Khách Hàng',
  2,
  '<!-- paste nội dung portal-bai2-skill01-avatar.html vào đây -->',
  false
),

-- BÀI 3
(
  'landing_186',
  'Skill #02 — Giọng Văn Thương Hiệu (BRAND_DNA)',
  3,
  '<!-- paste nội dung portal-bai3-skill02-brand-dna.html vào đây -->',
  false
),

-- BÀI 4
(
  'landing_186',
  'Skill #03 — Tư Duy Offer Kiểu Hormozi',
  4,
  '<!-- paste nội dung portal-bai4-skill03-hormozi.html vào đây -->',
  false
),

-- BÀI 5
(
  'landing_186',
  'Skill #05 — Cơ Chế Khác Biệt',
  5,
  '<!-- paste nội dung portal-bai5-skill05-hero-mechanism.html vào đây -->',
  false
),

-- BÀI 6
(
  'landing_186',
  'Skill #07 — Thiết Kế Offer Hoàn Chỉnh',
  6,
  '<!-- paste nội dung portal-bai6-skill07-offer-architect.html vào đây -->',
  false
),

-- BÀI 7
(
  'landing_186',
  'Skill #09 — Phễu Bán Hàng',
  7,
  '<!-- paste nội dung portal-bai7-skill09-funnel-strategist.html vào đây -->',
  false
),

-- BÀI 8
(
  'landing_186',
  'Skill #10 — Xây Landing Page Thật',
  8,
  '<!-- paste nội dung portal-bai8-skill10-landing-page.html vào đây -->',
  false
),

-- BÀI 9
(
  'landing_186',
  'Skill #11 — Nâng Cấp Giao Diện (UI/UX)',
  9,
  '<!-- paste nội dung portal-bai9-skill11-uiux.html vào đây -->',
  false
),

-- BÀI 10
(
  'landing_186',
  'Deploy + SePay + Meta Pixel Tracking',
  10,
  '<!-- paste nội dung portal-bai10-deploy-payment-tracking.html vào đây -->',
  false
)

ON CONFLICT (course_id, order_index) DO UPDATE SET
  title        = EXCLUDED.title,
  content_html = EXCLUDED.content_html,
  is_free      = EXCLUDED.is_free;

-- ============================================================
-- 3. VERIFY — kiểm tra kết quả
-- ============================================================
SELECT id, title, order_index, is_free,
       LEFT(content_html, 60) AS content_preview
FROM   lessons
WHERE  course_id = 'landing_186'
ORDER  BY order_index;
