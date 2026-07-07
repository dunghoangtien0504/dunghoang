import { emailLayout } from './layout'

export function getMetaAIAgentWelcome(name: string, accessUrl?: string): { subject: string; html: string } {
  const portalLink = accessUrl || 'https://dunghoang.com/portal/meta-ai-agent'
  const subject = `${name} ơi — tài liệu Setup Meta AI Agent của bạn đây`
  const html = emailLayout(`
<div class="day-badge">Setup Meta AI Agent · 99.000đ · Xác nhận đơn thành công</div>
<h1 class="subject-line">Mình nhận được rồi. Đây là bước tiếp theo của bạn.</h1>

<p>Thanh toán 99.000đ đã xác nhận. Cảm ơn bạn đã tin tưởng.</p>

<p>Bây giờ bạn vào khu học để làm theo từng bước. Mình đã chuẩn bị sẵn 5 bài hướng dẫn — từ chuẩn bị thông tin shop, điền template, đến paste vào Meta và test AI trước khi bật cho khách.</p>

<div class="cta-block">
  <a href="${portalLink}" class="cta-btn">Vào Khu Học Ngay →</a>
</div>

<p>Bấm nút trên là vào thẳng — lần đầu bạn chỉ cần đặt mật khẩu 1 lần, sau đó đăng nhập bằng email này bất cứ lúc nào.</p>

<hr class="divider" />

<p><strong>Bắt đầu từ bài nào?</strong></p>

<p>Bài 1 là preview miễn phí — đọc để hình dung toàn bộ quy trình trước. Sau đó làm lần lượt từ Bài 2 đến Bài 5. Đừng nhảy cóc — mỗi bài chuẩn bị input cho bài sau.</p>

<p>Thời gian thực tế: <strong>30-45 phút</strong> để xong toàn bộ setup. Sau đó AI chạy cho bạn mãi.</p>

<hr class="divider" />

<p>Kẹt bước nào thì nhắn mình:</p>
<p>
  Group Telegram: <a href="https://web.telegram.org/a/#-5493805985">Group hỗ trợ 24/7</a><br/>
  Zalo: <a href="https://zalo.me/0938725413">0938725413</a>
</p>

<p>Chúc bạn setup nhanh,<br/>Dũng Hoàng</p>
`)
  return { subject, html }
}
