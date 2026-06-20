// Layout HTML chung cho tất cả email
export function emailLayout(content: string): string {
  return `<!DOCTYPE html>
<html lang="vi">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<style>
  body { margin: 0; padding: 0; background: #f5f5f0; font-family: 'Georgia', serif; }
  .wrap { max-width: 600px; margin: 0 auto; padding: 32px 16px; }
  .card { background: #ffffff; border-radius: 12px; padding: 40px 36px; border: 1px solid #e8e4dd; }
  .header { text-align: center; margin-bottom: 32px; }
  .logo { font-size: 13px; color: #888; letter-spacing: 2px; text-transform: uppercase; }
  .day-badge { display: inline-block; background: #0d2b1a; color: #fff; font-size: 11px; letter-spacing: 1px; padding: 4px 12px; border-radius: 20px; margin-bottom: 16px; }
  .subject-line { font-size: 22px; font-weight: bold; color: #0d2b1a; line-height: 1.4; margin: 0 0 8px; }
  .body { font-size: 16px; line-height: 1.8; color: #333; }
  .body p { margin: 0 0 18px; }
  .highlight { background: #f0f7f2; border-left: 3px solid #1D9E75; padding: 14px 18px; border-radius: 0 8px 8px 0; margin: 24px 0; font-style: italic; color: #2d5a3d; }
  .cta-block { text-align: center; margin: 32px 0; }
  .cta-btn { display: inline-block; background: #1D9E75; color: #fff !important; text-decoration: none; padding: 14px 32px; border-radius: 8px; font-size: 15px; font-weight: bold; }
  .footer { text-align: center; margin-top: 32px; font-size: 12px; color: #aaa; }
  .footer a { color: #aaa; }
  .divider { border: none; border-top: 1px solid #eee; margin: 28px 0; }
  .neo-price { background: #fff8f0; border: 1px solid #f0d9b5; border-radius: 8px; padding: 16px 20px; margin: 20px 0; font-size: 14px; color: #8B5E00; }
</style>
</head>
<body>
<div class="wrap">
  <div class="card">
    <div class="header">
      <div class="logo">DungHoang.com</div>
    </div>
    <div class="body">${content}</div>
    <hr class="divider" />
    <div class="footer">
      Email này gửi tự động vì bạn đã đăng ký Thử Thách 7 Ngày AI Viết Bài.<br/>
      <a href="#">Huỷ nhận email</a>
    </div>
  </div>
</div>
</body>
</html>`
}
