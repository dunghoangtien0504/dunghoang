-- ═══════════════════════════════════════════════════════════════════
-- DungHoang.com — Student Portal Schema (chạy sau supabase-schema.sql)
-- ═══════════════════════════════════════════════════════════════════

-- ─── 1. LESSONS ─────────────────────────────────────────────────────
create table if not exists lessons (
  id           uuid primary key default gen_random_uuid(),
  course_id    text references course_products(id) on delete cascade,
  title        text not null,
  description  text,
  video_url    text,         -- YouTube embed URL hoặc link video
  duration     int default 0, -- phút
  sort_order   int default 0,
  is_free      boolean default false, -- bài preview miễn phí
  is_published boolean default true,
  created_at   timestamptz default now()
);

-- ─── 2. ENROLLMENTS ─────────────────────────────────────────────────
-- Học viên đã mua khóa nào
create table if not exists enrollments (
  id             uuid primary key default gen_random_uuid(),
  user_id        uuid references auth.users(id) on delete cascade,
  course_id      text references course_products(id),
  order_id       uuid references orders(id),
  enrolled_at    timestamptz default now(),
  unique(user_id, course_id)
);

-- ─── 3. LESSON PROGRESS ─────────────────────────────────────────────
-- Theo dõi học viên đã xem bài nào
create table if not exists lesson_progress (
  id          uuid primary key default gen_random_uuid(),
  user_id     uuid references auth.users(id) on delete cascade,
  lesson_id   uuid references lessons(id) on delete cascade,
  completed   boolean default false,
  watched_sec int default 0,
  updated_at  timestamptz default now(),
  unique(user_id, lesson_id)
);

-- ─── 4. Thêm user_id vào subscribers ────────────────────────────────
alter table subscribers add column if not exists user_id uuid references auth.users(id);

-- ─── INDEXES ────────────────────────────────────────────────────────
create index if not exists idx_lessons_course on lessons(course_id, sort_order);
create index if not exists idx_enrollments_user on enrollments(user_id);
create index if not exists idx_progress_user on lesson_progress(user_id);

-- ─── RLS ────────────────────────────────────────────────────────────
alter table lessons         enable row level security;
alter table enrollments     enable row level security;
alter table lesson_progress enable row level security;

-- Học viên chỉ xem được bài của khóa mình đã mua
create policy "Enrolled students see lessons" on lessons
  for select using (
    is_free = true
    or exists (
      select 1 from enrollments e
      where e.user_id = auth.uid()
      and e.course_id = lessons.course_id
    )
  );

-- Học viên chỉ xem enrollment của mình
create policy "Users see own enrollments" on enrollments
  for select using (user_id = auth.uid());

-- Học viên chỉ đọc/ghi progress của mình
create policy "Users manage own progress" on lesson_progress
  for all using (user_id = auth.uid());

-- ─── DỮ LIỆU MẪU — Mini 368k ────────────────────────────────────────
insert into lessons (course_id, title, description, video_url, duration, sort_order, is_free) values
  ('mini_368', 'Giới thiệu khóa học', 'Tổng quan những gì bạn sẽ học được', '', 5, 1, true),
  ('mini_368', 'Cài đặt BRAND_DNA — Nạp giọng bạn vào AI', 'Bước đầu tiên và quan trọng nhất', '', 20, 2, false),
  ('mini_368', 'Cấu trúc trang bán hàng chuyển đổi cao', 'Framework 7 phần của một landing page hiệu quả', '', 25, 3, false),
  ('mini_368', 'Dùng AI viết từng phần của trang bán', 'Headline, subheadline, bullet points, CTA', '', 30, 4, false),
  ('mini_368', 'Thiết kế nhanh bằng Canva + AI', 'Không cần biết thiết kế vẫn ra trang đẹp', '', 20, 5, false),
  ('mini_368', 'Publish và test trang bán hàng', 'Đưa trang lên live và kiểm tra lần cuối', '', 15, 6, false)
on conflict do nothing;

-- Khóa 1 — 25 Skill AI (các bài học sẽ thêm sau)
insert into lessons (course_id, title, description, sort_order, is_free) values
  ('khoa1_686', 'Tổng quan Biệt Đội AI Agent', 'Bức tranh toàn cảnh 25 skill và cách chúng kết nối', 1, true),
  ('khoa1_686', 'Skill 01 — BRAND_DNA: Nạp giọng bạn vào AI', 'Cài đặt file BRAND_DNA, test và tinh chỉnh', 2, false),
  ('khoa1_686', 'Skill 02 — Avatar Builder: Phác thảo khách hàng mơ ước', 'Dùng AI nghiên cứu thị trường và tìm insight', 3, false),
  ('khoa1_686', 'Skill 03 — Content Machine: Máy sản xuất nội dung', 'Tạo lịch content 30 ngày trong 1 giờ', 4, false),
  ('khoa1_686', 'Skill 04 — Headline Generator: 10 tiêu đề trong 5 phút', 'Công thức tiêu đề thu hút theo 5 góc', 5, false)
on conflict do nothing;
