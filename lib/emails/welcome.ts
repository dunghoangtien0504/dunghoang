import { emailLayout } from './layout'

const COURSE_INFO: Record<string, { name: string; drive_link: string; telegram_link: string }> = {
  mini_368:   { name: 'Mini — Trang Bán Hàng 1 Giờ',       drive_link: 'https://drive.google.com/LINK_MINI',   telegram_link: 'https://t.me/DungHoangAI' },
  khoa1_686:  { name: 'Khóa 1 — Bản Tự Lập (25 Skill AI)', drive_link: 'https://drive.google.com/LINK_KHOA1',  telegram_link: 'https://t.me/DungHoangAI' },
  khoa2_2768: { name: 'Khóa 2 — Bản Có Đội Trưởng',        drive_link: 'https://drive.google.com/LINK_KHOA2',  telegram_link: 'https://t.me/DungHoangAI' },
  '1kem1':    { name: '1 Kèm 1 — Dũng Cầm Tay Chỉ Việc',  drive_link: '',                                     telegram_link: 'https://t.me/DungHoangAI' },
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
