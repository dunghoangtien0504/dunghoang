// Escape HTML để chống XSS / HTML injection khi nhúng dữ liệu người dùng vào HTML
// (trang phản hồi, email template). Dùng cho MỌI biến L1 (user input) nhúng vào HTML.
export function escapeHtml(input: unknown): string {
  const s = String(input ?? '')
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}
