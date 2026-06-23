import { emailLayout } from './layout'

function lpLayout(content: string): string {
  return emailLayout(content).replace(
    'Email này gửi tự động vì bạn đã đăng ký Thử Thách 7 Ngày AI Viết Bài.',
    'Email này gửi tự động vì bạn đã mua Khóa Tạo Landing Page Chuyển Đổi Cao.',
  )
}

export function getLandingEmailDay1(name: string): { subject: string; html: string } {
  const subject = `${name} ơi — đơn xác nhận rồi, đây là bước tiếp theo`
  const html = lpLayout(`
<div class="day-badge">Khóa Landing Page · Tạo Landing Page Chuyển Đổi Cao · Chào mừng</div>
<h1 class="subject-line">Xong rồi. Bạn vào rồi.</h1>

<p>Mình vừa thấy đơn của bạn được xác nhận.</p>

<p>1.868.000đ không phải số tiền nhỏ với người đang tự làm mọi thứ một mình. Mình hiểu điều đó. Cảm ơn bạn đã tin.</p>

<p>Đây là link khu học của bạn:</p>

<div class="cta-block">
  <a href="https://dunghoang.com/portal" class="cta-btn">Vào Khu Học Ngay →</a>
</div>

<p>Đăng nhập bằng email này. Nếu quên mật khẩu, bấm "Quên mật khẩu" là hệ thống gửi về ngay.</p>

<hr class="divider" />

<p><strong>Bắt đầu từ đâu?</strong></p>

<p>Khóa có 10 bài, đi theo thứ tự. Đừng nhảy thẳng vào Bài 8 xây landing page — mình biết bạn muốn thế, nhưng sẽ bí ngay vì chưa có avatar, brand-dna, offer để đưa AI xử lý.</p>

<p>Bắt đầu từ <strong>Bài 1 — Cài Công Cụ Vibe Coding</strong>. Bài này chỉ 30 phút, không khó, nhưng không làm là kẹt ở mọi bài sau.</p>

<div class="highlight"><strong>Vibe Coding là gì?</strong> Tải file skill về → bỏ vào thư mục → mở Cursor (hoặc Antigravity, Claude Code) → chat: "Đọc file này và làm hộ tôi." AI đọc skill, hỏi bạn từng câu, rồi tự viết file output. Bạn không cần biết code.</div>

<div class="neo-price">💡 Mỗi bài có 1 file output thật. Avatar → BRAND_DNA → Offer → Cơ chế khác biệt → Funnel → landing-page.html → Deploy. Cuối khóa bạn có landing page thật đang chạy với tên miền của bạn.</div>

<p>Câu hỏi gì cứ nhắn mình qua Telegram: <a href="https://t.me/KentHoang"><strong>@KentHoang</strong></a></p>

<p>Gặp bạn trong khu học,<br/>Dũng</p>

<p style="font-size:13px;color:#888;">P.S. Nếu bạn đã mua Landing Page Siêu Chuyển Đổi trước đó — cảm ơn bạn đã tin thêm một lần. Nội dung khóa này đi sâu hơn nhiều so với bộ SOP cũ.</p>
`)
  return { subject, html }
}
