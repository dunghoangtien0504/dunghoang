// ── 7 email thử thách "Dạy AI Viết Bài Đúng Giọng Bạn" ──────────────────────
// Mỗi email: 15-25 phút thực hành, 1 output cụ thể, giọng Dũng Hoàng
// BRAND_DNA: văn nói tâm sự, câu ngắn, xưng mình/bạn, cấm em-dash

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://dunghoang.com'

function layout(name: string, day: number, body: string): string {
  return `
<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Ngày ${day} — Thử Thách 7 Ngày AI</title>
</head>
<body style="margin:0;padding:0;background:#F6F0E4;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
  <div style="max-width:560px;margin:0 auto;padding:32px 16px;">

    <!-- Header -->
    <div style="background:#0D2B1A;border-radius:16px;padding:20px 24px;margin-bottom:24px;display:flex;align-items:center;gap:12px;">
      <div style="background:#F6F0E4;border-radius:8px;width:36px;height:36px;display:inline-flex;align-items:center;justify-content:center;font-weight:900;font-size:14px;color:#0D2B1A;font-family:monospace;">DH</div>
      <div>
        <div style="color:#F6F0E4;font-weight:700;font-size:14px;">Thử Thách 7 Ngày AI</div>
        <div style="color:#88860B;font-size:12px;">Ngày ${day}/7 · DungHoang.com</div>
      </div>
    </div>

    <!-- Body -->
    <div style="background:#fff;border-radius:16px;padding:28px 28px;border:1px solid #DDD8CB;line-height:1.7;color:#0D2B1A;font-size:15px;">
      <p style="margin:0 0 12px;">Bạn ơi,</p>
      ${body}
    </div>

    <!-- Footer -->
    <div style="padding:20px 8px;text-align:center;font-size:12px;color:#7A8C7E;">
      <p style="margin:0 0 6px;">
        Dũng Hoàng · <a href="${BASE_URL}" style="color:#3D6B4A;">DungHoang.com</a>
      </p>
      <p style="margin:0;">
        Không muốn nhận email nữa?
        <a href="${BASE_URL}/api/unsubscribe?email={{email}}" style="color:#7A8C7E;">Hủy đăng ký tại đây</a>
      </p>
    </div>

  </div>
</body>
</html>
`
}

// ── Day 1: Điền BRAND_DNA — dạy AI biết bạn là ai ───────────────────────────
function day1(name: string): { subject: string; html: string } {
  const body = `
<p style="margin:0 0 12px;">Mình là Dũng Hoàng. Cảm ơn bạn đã đăng ký thử thách nhé.</p>

<p style="margin:0 0 12px;">Hôm nay mình bắt đầu ngay bằng thứ quan trọng nhất...</p>

<div style="background:#EAF5EF;border-left:4px solid #2D7A4F;border-radius:0 12px 12px 0;padding:16px 20px;margin:20px 0;">
  <p style="margin:0 0 4px;font-weight:700;color:#0D2B1A;">Ngày 1 — Điền BRAND_DNA</p>
  <p style="margin:0;color:#3D6B4A;font-size:14px;">Thời gian: 15 phút. Output: AI biết bạn là ai.</p>
</div>

<p style="margin:0 0 12px;">Vấn đề lớn nhất khi dùng AI viết bài là: AI không biết bạn là ai, bạn bán gì, bạn nói chuyện kiểu nào. Nên nó viết ra thứ nghe cứng, nghe chung chung, không ai tin là của bạn.</p>

<p style="margin:0 0 12px;">BRAND_DNA là file mình tạo ra để giải quyết đúng chuyện đó. Điền xong, AI có đủ nguyên liệu để viết đúng giọng bạn.</p>

<p style="margin:0 0 16px;font-weight:700;color:#0D2B1A;">Làm theo 3 bước này:</p>

<p style="margin:0 0 8px;"><strong>Bước 1.</strong> Mở ChatGPT (hoặc Claude). Tạo cuộc trò chuyện mới.</p>

<p style="margin:0 0 8px;"><strong>Bước 2.</strong> Dán prompt này vào:</p>

<div style="background:#FAF7F2;border:1px solid #DDD8CB;border-radius:12px;padding:16px;margin:12px 0;font-family:monospace;font-size:13px;color:#0D2B1A;white-space:pre-wrap;">Tôi muốn bạn hỏi tôi 10 câu để hiểu rõ về tôi, sản phẩm của tôi, khách hàng của tôi, và giọng văn tôi hay viết. Hỏi từng câu một, chờ tôi trả lời rồi mới hỏi câu tiếp theo. Sau khi đủ 10 câu, tổng hợp lại thành file BRAND_DNA để dùng sau này.</div>

<p style="margin:0 0 8px;"><strong>Bước 3.</strong> Trả lời thật, không cần viết dài. AI hỏi gì thì trả lời đó. Càng cụ thể càng tốt.</p>

<div style="background:#FFF8E6;border:1px solid #DDD8CB;border-radius:12px;padding:16px;margin:20px 0;">
  <p style="margin:0 0 4px;font-weight:700;font-size:13px;color:#7A6000;">Kết quả bạn sẽ có sau hôm nay</p>
  <p style="margin:0;font-size:13px;color:#3D6B4A;">Một file BRAND_DNA riêng của bạn. Ngày mai mình sẽ dùng chính file này để AI viết bài đầu tiên đúng giọng bạn. Đó là lúc thú vị nhất của thử thách này.</p>
</div>

<p style="margin:20px 0 8px;">Làm xong thì lưu file BRAND_DNA lại. Ngày mai mình cần nó nhé.</p>

<p style="margin:0 0 12px;">Câu hỏi gì cứ reply thẳng vào email này. Mình đọc hết.</p>

<p style="margin:0;">Hẹn gặp ngày mai,<br/>Dũng</p>
`
  return {
    subject: `[Ngày 1/7] Bước đầu tiên — Dạy AI biết bạn là ai`,
    html: layout(name, 1, body),
  }
}

// ── Day 2: AI viết bài đầu tiên đúng giọng bạn (wow moment) ─────────────────
function day2(name: string): { subject: string; html: string } {
  const body = `
<p style="margin:0 0 12px;">Hôm qua bạn đã điền BRAND_DNA rồi. Bây giờ là phần thú vị.</p>

<div style="background:#EAF5EF;border-left:4px solid #2D7A4F;border-radius:0 12px 12px 0;padding:16px 20px;margin:20px 0;">
  <p style="margin:0 0 4px;font-weight:700;color:#0D2B1A;">Ngày 2 — AI viết bài đầu tiên đúng giọng bạn</p>
  <p style="margin:0;color:#3D6B4A;font-size:14px;">Thời gian: 20 phút. Output: 1 bài đăng Facebook hoàn chỉnh.</p>
</div>

<p style="margin:0 0 12px;">Đây là lúc hầu hết mọi người bị bất ngờ. AI không viết như robot nữa. Nó viết giống kiểu bạn hay viết.</p>

<p style="margin:0 0 16px;font-weight:700;color:#0D2B1A;">Làm theo 3 bước:</p>

<p style="margin:0 0 8px;"><strong>Bước 1.</strong> Mở cuộc trò chuyện mới với AI. Dán toàn bộ file BRAND_DNA vào đầu.</p>

<p style="margin:0 0 8px;"><strong>Bước 2.</strong> Dán prompt này:</p>

<div style="background:#FAF7F2;border:1px solid #DDD8CB;border-radius:12px;padding:16px;margin:12px 0;font-family:monospace;font-size:13px;color:#0D2B1A;white-space:pre-wrap;">Dựa vào BRAND_DNA trên, hãy viết 1 bài Facebook dài 150-200 chữ cho tôi. Chủ đề: [điền chủ đề bạn muốn viết hôm nay]. Viết đúng giọng tôi — câu ngắn, tự nhiên, kể chuyện thật, không dùng ngôn ngữ marketing. Mở đầu bằng 1 cảnh đời thường cụ thể.</div>

<p style="margin:0 0 8px;"><strong>Bước 3.</strong> Đọc bài AI viết. Thấy chỗ nào chưa đúng giọng thì sửa bổ sung vào BRAND_DNA và yêu cầu AI viết lại.</p>

<div style="background:#FFF8E6;border:1px solid #DDD8CB;border-radius:12px;padding:16px;margin:20px 0;">
  <p style="margin:0 0 8px;font-size:13px;color:#3D6B4A;font-style:italic;">Tip từ mình: Lần đầu AI thường viết 80-90% đúng. Chỉ cần bạn sửa 2-3 chỗ nhỏ rồi bổ sung vào BRAND_DNA, lần sau nó sẽ viết chuẩn hơn. Đây là quá trình "nạp giọng" — càng dùng nhiều càng chuẩn.</p>
</div>

<p style="margin:0 0 12px;">Đăng bài lên hoặc không đăng cũng được. Quan trọng là bạn thấy AI đã viết khác hẳn so với trước khi có BRAND_DNA.</p>

<p style="margin:0;">Ngày mai mình dạy cách lên lịch 30 ngày content mà không cần nghĩ.<br/>Dũng</p>
`
  return {
    subject: `[Ngày 2/7] Lần đầu AI viết bài đúng giọng bạn`,
    html: layout(name, 2, body),
  }
}

// ── Day 3: Lên 30 ngày content không cần nghĩ ────────────────────────────────
function day3(name: string): { subject: string; html: string } {
  const body = `
<p style="margin:0 0 12px;">Bạn đã có BRAND_DNA. AI đã viết được đúng giọng bạn rồi.</p>

<p style="margin:0 0 12px;">Hôm nay mình giải quyết bài toán hay gặp nhất: <strong>"Hôm nay đăng gì?"</strong></p>

<div style="background:#EAF5EF;border-left:4px solid #2D7A4F;border-radius:0 12px 12px 0;padding:16px 20px;margin:20px 0;">
  <p style="margin:0 0 4px;font-weight:700;color:#0D2B1A;">Ngày 3 — Ma trận content 30 ngày</p>
  <p style="margin:0;color:#3D6B4A;font-size:14px;">Thời gian: 20 phút. Output: lịch đề tài 30 ngày.</p>
</div>

<p style="margin:0 0 16px;font-weight:700;color:#0D2B1A;">Làm theo 2 bước:</p>

<p style="margin:0 0 8px;"><strong>Bước 1.</strong> Dán BRAND_DNA vào AI, rồi dán prompt này:</p>

<div style="background:#FAF7F2;border:1px solid #DDD8CB;border-radius:12px;padding:16px;margin:12px 0;font-family:monospace;font-size:13px;color:#0D2B1A;white-space:pre-wrap;">Dựa vào BRAND_DNA trên, tạo cho tôi ma trận content 30 ngày. Chia thành 5 trụ cột nội dung phù hợp với sản phẩm và khách hàng của tôi. Mỗi trụ cột cho 6 đề tài cụ thể. Đặt tên đề tài rõ ràng để tôi hiểu ngay sẽ viết về gì. Format: bảng 5 cột x 6 hàng.</div>

<p style="margin:0 0 8px;"><strong>Bước 2.</strong> Lưu ma trận lại. Mỗi hôm mở ra, chọn 1 ô, dùng BRAND_DNA + đề tài đó để AI viết bài. 5 phút có bài đăng.</p>

<div style="background:#FFF8E6;border:1px solid #DDD8CB;border-radius:12px;padding:16px;margin:20px 0;">
  <p style="margin:0 0 8px;font-weight:700;font-size:13px;color:#7A6000;">Tại sao 5 trụ cột?</p>
  <p style="margin:0;font-size:13px;color:#3D6B4A;">Trang cá nhân đăng 1 kiểu bài mãi thì nhàm. 5 trụ cột giúp bạn xen kẽ: hôm nay kể chuyện, ngày mai dạy, ngày kia chứng minh... Khách theo dõi lâu hơn vì không đoán được hôm nay bạn sẽ đăng gì.</p>
</div>

<p style="margin:0;">Ngày mai: viết hook. Câu đầu tiên quyết định có ai đọc tiếp hay không.<br/>Dũng</p>
`
  return {
    subject: `[Ngày 3/7] 30 ngày content — không cần nghĩ hôm nay đăng gì`,
    html: layout(name, 3, body),
  }
}

// ── Day 4: Viết hook mạnh ────────────────────────────────────────────────────
function day4(name: string): { subject: string; html: string } {
  const body = `
<p style="margin:0 0 12px;">Hồi trước mình hay mất 20 phút chỉ để nghĩ câu đầu tiên của bài.</p>

<p style="margin:0 0 12px;">Câu đầu mà không hấp dẫn thì dù bài hay thế nào cũng không ai đọc. Thuật toán cũng không ưu tiên.</p>

<div style="background:#EAF5EF;border-left:4px solid #2D7A4F;border-radius:0 12px 12px 0;padding:16px 20px;margin:20px 0;">
  <p style="margin:0 0 4px;font-weight:700;color:#0D2B1A;">Ngày 4 — Viết hook bằng AI</p>
  <p style="margin:0;color:#3D6B4A;font-size:14px;">Thời gian: 15 phút. Output: 10 câu hook cho chủ đề bạn chọn.</p>
</div>

<p style="margin:0 0 16px;font-weight:700;color:#0D2B1A;">Làm theo 2 bước:</p>

<p style="margin:0 0 8px;"><strong>Bước 1.</strong> Chọn 1 đề tài từ ma trận hôm qua. Dán BRAND_DNA + prompt này:</p>

<div style="background:#FAF7F2;border:1px solid #DDD8CB;border-radius:12px;padding:16px;margin:12px 0;font-family:monospace;font-size:13px;color:#0D2B1A;white-space:pre-wrap;">Tôi cần viết bài về chủ đề: [điền chủ đề]. Dựa vào BRAND_DNA và 5 loại hook dưới đây, viết cho tôi 10 câu mở đầu theo 5 loại (mỗi loại 2 câu):
1. Hook câu hỏi — đặt câu hỏi khách hàng đang thắc mắc
2. Hook số liệu — con số gây bất ngờ
3. Hook cảnh đời thường — mô tả 1 khoảnh khắc cụ thể
4. Hook phản trực giác — nói ngược điều mọi người hay nghĩ
5. Hook thú nhận — thừa nhận 1 điều thật gây tò mò
Viết đúng giọng tôi.</div>

<p style="margin:0 0 8px;"><strong>Bước 2.</strong> Chọn câu hook hay nhất, yêu cầu AI viết tiếp thành bài hoàn chỉnh.</p>

<div style="background:#FFF8E6;border:1px solid #DDD8CB;border-radius:12px;padding:16px;margin:20px 0;">
  <p style="margin:0;font-size:13px;color:#3D6B4A;font-style:italic;">Hook loại 3 (cảnh đời thường) là kiểu mình hay dùng nhất. "Sáng nay 7h mình ngồi cafe, nhìn sang bàn bên thấy một chị đang gõ máy tính... " — cụ thể, hình dung được, người đọc tự hỏi tiếp theo là gì.</p>
</div>

<p style="margin:0;">Ngày mai: caption mạng xã hội — ngắn hơn, format khác nhau.<br/>Dũng</p>
`
  return {
    subject: `[Ngày 4/7] Câu đầu tiên quyết định tất cả — viết hook bằng AI`,
    html: layout(name, 4, body),
  }
}

// ── Day 5: Caption ngắn cho mạng xã hội ─────────────────────────────────────
function day5(name: string): { subject: string; html: string } {
  const body = `
<p style="margin:0 0 12px;">Bài Facebook dài thì không phải lúc nào cũng phù hợp. Instagram, TikTok, Zalo — mỗi kênh cần kiểu caption khác nhau.</p>

<p style="margin:0 0 12px;">Hôm nay mình dạy cách dùng 1 ý tưởng để AI tạo ra 3-4 phiên bản cho các kênh khác nhau.</p>

<div style="background:#EAF5EF;border-left:4px solid #2D7A4F;border-radius:0 12px 12px 0;padding:16px 20px;margin:20px 0;">
  <p style="margin:0 0 4px;font-weight:700;color:#0D2B1A;">Ngày 5 — 1 ý tưởng thành nội dung đa kênh</p>
  <p style="margin:0;color:#3D6B4A;font-size:14px;">Thời gian: 20 phút. Output: 1 ý tưởng thành 4 bài cho 4 kênh.</p>
</div>

<p style="margin:0 0 8px;"><strong>Prompt:</strong></p>

<div style="background:#FAF7F2;border:1px solid #DDD8CB;border-radius:12px;padding:16px;margin:12px 0;font-family:monospace;font-size:13px;color:#0D2B1A;white-space:pre-wrap;">Tôi có ý tưởng nội dung này: [mô tả ngắn gọn ý tưởng hoặc paste bài đã viết].

Dựa vào BRAND_DNA, viết lại thành 4 phiên bản cho 4 kênh:
1. Facebook: 150-200 chữ, kể chuyện, câu dài hơn OK
2. Instagram caption: dưới 80 chữ, gợi cảm xúc, có hashtag gợi ý
3. TikTok script: 60-90 chữ, câu rất ngắn, mở đầu = hook mạnh ngay
4. Zalo cá nhân: 50-70 chữ, thân mật như nhắn cho bạn bè

Giữ đúng giọng tôi trong tất cả 4 phiên bản.</div>

<div style="background:#FFF8E6;border:1px solid #DDD8CB;border-radius:12px;padding:16px;margin:20px 0;">
  <p style="margin:0;font-size:13px;color:#3D6B4A;font-style:italic;">Đây là lúc mình tiết kiệm nhiều thời gian nhất. Thay vì viết 4 bài riêng, chỉ cần 1 ý tưởng và AI tạo ra đủ 4 phiên bản phù hợp từng kênh. Tháng đăng nhiều kênh mà không cảm giác bị choáng.</p>
</div>

<p style="margin:0;">Ngày mai: cách dùng AI để trả lời comment và inbox. Phần này tiết kiệm nhiều nhất đó.<br/>Dũng</p>
`
  return {
    subject: `[Ngày 5/7] 1 ý tưởng — 4 kênh — AI làm hết`,
    html: layout(name, 5, body),
  }
}

// ── Day 6: AI trả lời comment và inbox ───────────────────────────────────────
function day6(name: string): { subject: string; html: string } {
  const body = `
<p style="margin:0 0 12px;">Hồi trước mình ngồi trả lời inbox từ sáng đến trưa. Một mình mà phải trả lời 30-50 tin nhắn mỗi ngày, không còn thời gian làm gì khác.</p>

<p style="margin:0 0 12px;">AI không thể trả lời inbox hộ bạn hoàn toàn tự động (chưa). Nhưng nó có thể làm bạn trả lời nhanh hơn 5-10 lần.</p>

<div style="background:#EAF5EF;border-left:4px solid #2D7A4F;border-radius:0 12px 12px 0;padding:16px 20px;margin:20px 0;">
  <p style="margin:0 0 4px;font-weight:700;color:#0D2B1A;">Ngày 6 — Trả lời inbox nhanh gấp 5 lần</p>
  <p style="margin:0;color:#3D6B4A;font-size:14px;">Thời gian: 15 phút setup. Output: bộ template trả lời 20 tình huống thường gặp.</p>
</div>

<p style="margin:0 0 8px;"><strong>Prompt tạo bộ template:</strong></p>

<div style="background:#FAF7F2;border:1px solid #DDD8CB;border-radius:12px;padding:16px;margin:12px 0;font-family:monospace;font-size:13px;color:#0D2B1A;white-space:pre-wrap;">Dựa vào BRAND_DNA, tôi bán [sản phẩm/dịch vụ của bạn].

Liệt kê 20 câu hỏi hoặc tình huống khách hay nhắn vào inbox nhất. Với mỗi tình huống, viết sẵn 1 câu trả lời ngắn gọn, đúng giọng tôi, thân thiện nhưng không quá formal. Để [TÊN] là chỗ tôi điền tên khách.

Format: Tình huống: ... / Trả lời: ...</div>

<p style="margin:0 0 12px;">Lưu bộ template này vào Notes hoặc Google Doc. Khi khách nhắn, chỉ cần copy câu phù hợp, điền tên, gửi đi. 10 giây/tin thay vì 3-5 phút.</p>

<div style="background:#FFF8E6;border:1px solid #DDD8CB;border-radius:12px;padding:16px;margin:20px 0;">
  <p style="margin:0 0 8px;font-weight:700;font-size:13px;color:#7A6000;">Bonus: Trả lời comment nhanh</p>
  <p style="margin:0;font-size:13px;color:#3D6B4A;">Copy comment của khách, dán vào AI với prompt: "Tôi vừa nhận comment này: [comment]. Viết 3 cách trả lời ngắn, đúng giọng tôi theo BRAND_DNA." Chọn cái phù hợp nhất, paste lên. 30 giây/comment.</p>
</div>

<p style="margin:0;">Ngày mai là ngày cuối. Mình sẽ chỉ bạn cách ghép tất cả lại thành 1 quy trình tự chạy mỗi tuần.<br/>Dũng</p>
`
  return {
    subject: `[Ngày 6/7] Trả lời inbox nhanh gấp 5 lần nhờ AI`,
    html: layout(name, 6, body),
  }
}

// ── Day 7: Tổng kết + soft sell ──────────────────────────────────────────────
function day7(name: string): { subject: string; html: string } {
  const body = `
<p style="margin:0 0 12px;">Bạn đã đi đến ngày cuối rồi.</p>

<p style="margin:0 0 12px;">Nếu bạn làm đủ 6 ngày vừa rồi, bạn đang có:</p>

<ul style="margin:0 0 16px;padding-left:20px;color:#3D6B4A;">
  <li style="margin-bottom:6px;">File BRAND_DNA riêng của bạn</li>
  <li style="margin-bottom:6px;">AI viết được bài đúng giọng bạn</li>
  <li style="margin-bottom:6px;">Ma trận 30 ngày content</li>
  <li style="margin-bottom:6px;">Bộ hook theo 5 kiểu</li>
  <li style="margin-bottom:6px;">Content đa kênh từ 1 ý tưởng</li>
  <li style="margin-bottom:6px;">Bộ template trả lời inbox</li>
</ul>

<p style="margin:0 0 12px;">Đây là 1 trong 25 skill mình dạy trong bộ Biệt Đội AI Agent. Skill số 1 thôi — viết bài đúng giọng. 24 skill còn lại bao gồm: làm trang bán hàng, tạo phễu tự chạy, email tự động, chatbot trả lời khách, ads Facebook, báo cáo doanh thu...</p>

<p style="margin:0 0 12px;">Mình thiết kế để người kinh doanh một mình có thể tự vận hành mọi thứ mà không cần thuê đội ngũ.</p>

<div style="background:#0D2B1A;border-radius:16px;padding:24px;margin:24px 0;text-align:center;">
  <p style="margin:0 0 4px;color:#88860B;font-size:12px;font-weight:600;text-transform:uppercase;letter-spacing:1px;">Nếu bạn muốn đi tiếp</p>
  <p style="margin:0 0 16px;color:#F6F0E4;font-size:20px;font-weight:700;">Mini "Trang Bán Hàng 1 Giờ"</p>
  <p style="margin:0 0 16px;color:#C8D5C9;font-size:14px;">Skill tiếp theo sau viết bài: làm trang bán hàng. 1 tiếng. AI làm hết phần kỹ thuật. Không cần biết code.</p>
  <a href="${BASE_URL}/mini-trang-ban-hang"
     style="display:inline-block;background:#C0390E;color:#fff;font-weight:700;padding:14px 32px;border-radius:12px;text-decoration:none;font-size:15px;">
    Xem Mini — 368.000đ
  </a>
  <p style="margin:12px 0 0;color:#7A8C7E;font-size:12px;">Bảo hành 14 ngày hoàn 100%. Không hỏi lý do.</p>
</div>

<p style="margin:0 0 12px;">Còn chưa muốn mua ngay cũng không sao. File BRAND_DNA và 6 ngày vừa rồi là của bạn, dùng mãi được.</p>

<p style="margin:0 0 12px;">Cảm ơn bạn đã theo đến cuối thử thách nhé. Mình trân trọng điều đó lắm.</p>

<p style="margin:0;">Chúc bạn kinh doanh thuận,<br/>Dũng Hoàng</p>
`
  return {
    subject: `[Ngày 7/7] Bạn xong rồi. Và đây là bước tiếp theo nếu muốn.`,
    html: layout(name, 7, body),
  }
}

// ── Export ────────────────────────────────────────────────────────────────────
export const CHALLENGE_EMAILS = [day1, day2, day3, day4, day5, day6, day7]

export function getChallengeEmail(
  day: number,
  name: string,
  email?: string
): { subject: string; html: string } | null {
  const fn = CHALLENGE_EMAILS[day - 1]
  if (!fn) return null
  const result = fn(name)
  if (email) {
    result.html = result.html.replace('{{email}}', encodeURIComponent(email))
  }
  return result
}
