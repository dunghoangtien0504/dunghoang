import { emailLayout } from './layout'

const COURSE_INFO: Record<string, { name: string; drive_link: string; telegram_link: string }> = {
  content_368:  { name: 'Content Không Cần Cảm Hứng',          drive_link: 'https://dunghoang.com/portal', telegram_link: 'https://t.me/KentHoang' },
  mini_368:     { name: 'Landing Page Siêu Chuyển Đổi',         drive_link: 'https://dunghoang.com/portal', telegram_link: 'https://t.me/KentHoang' },
  landing_186:  { name: 'Landing Page Siêu Chuyển Đổi',         drive_link: 'https://dunghoang.com/portal', telegram_link: 'https://t.me/KentHoang' },
  khoa1_686:    { name: '24 AI Agent for Business',              drive_link: 'https://dunghoang.com/portal', telegram_link: 'https://t.me/KentHoang' },
  khoa2_2768:   { name: 'Coaching — Cầm Tay Chỉ Việc',          drive_link: 'https://dunghoang.com/portal', telegram_link: 'https://t.me/KentHoang' },
  '1kem1':      { name: '1 Kèm 1 — Dũng Cầm Tay Chỉ Việc',     drive_link: 'https://dunghoang.com/portal', telegram_link: 'https://t.me/KentHoang' },
}

export function getWelcomeEmail(name: string, courseId: string, courseName?: string): { subject: string; html: string } {
  const info = COURSE_INFO[courseId] || COURSE_INFO['khoa1_686']
  const displayName = courseName || info.name

  const subject = `Cảm ơn ${name} - Link khu học của bạn đây`
  const html = emailLayout(`
<h1 class="subject-line">Mình nhận được thanh toán rồi nhaaa ${name} ^^</h1>
<p>Cảm ơn bạn đã tin tưởng đăng ký <strong>${displayName}</strong>.</p>
<p>Đây là link vào khu học của bạn:</p>
<div class="cta-block">
  <a class="cta-btn" href="${info.drive_link}">Vào khu học ngay</a>
</div>
<p>Và đây là link nhóm Telegram để hỏi Tiểu Hà Mã khi kẹt bất cứ lúc nào:</p>
<div class="cta-block">
  <a href="${info.telegram_link}" style="color:#1D9E75;font-weight:bold;">Vào nhóm Telegram →</a>
</div>
<hr class="divider" />
<p>Mình có 1 đề nghị nhỏ: đừng xem hết tất cả ngay ngày hôm nay.</p>
<p>Học 1 skill → làm thử ngay → thấy kết quả → học skill tiếp theo. Cách đó hiệu quả hơn xem xong rồi để đó.</p>
<p>Gặp bạn trong nhóm nhé,<br/>Dũng</p>
<p style="font-size:13px;color:#888;">Chính sách: 14 ngày hoàn tiền nếu bạn không hài lòng - reply email này là xong, không hỏi lý do.</p>
`)
  return { subject, html }
}
