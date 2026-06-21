-- ═══════════════════════════════════════════════════════════════════
-- Challenge Portal — thêm submission fields vào lesson_progress
-- và host_note vào lessons
-- ═══════════════════════════════════════════════════════════════════

-- Thêm cột submission cho học viên nộp bằng chứng hoàn thành
alter table lesson_progress
  add column if not exists submission_url  text,
  add column if not exists submission_note text,
  add column if not exists submitted_at    timestamptz,
  add column if not exists approved        boolean default null,  -- null=chưa duyệt, true=ok, false=reject
  add column if not exists admin_note      text;

-- Thêm cột host_note để admin ghi lời nhắn riêng cho từng ngày
alter table lessons
  add column if not exists host_note text;
