import { emailLayout } from './layout'

type EmailContent = { subject: string; html: string }

// ─── NGÀY 1 — Nạp Giọng Bạn Vào AI ─────────────────────────────────
export function getEmailDay1(name: string): EmailContent {
  const subject = `[Ngày 1] File BRAND_DNA của bạn đang chờ - ${name} ơi`
  const html = emailLayout(`
<div class="day-badge">Thử Thách 7 Ngày · Ngày 1 / 7</div>
<h1 class="subject-line">Tối qua mình ngồi nghĩ...</h1>
<p>Có bao nhiêu người mua tool AI rồi để đó mà không biết bắt đầu từ đâu.</p>
<p>Mình từng như vậy. Mở Claude lên, gõ vài câu, AI trả lời giống... robot. Đọc không vô, không phải giọng mình, không dám đăng.</p>
<p>Sau này mình mới hiểu vấn đề không phải ở AI. Vấn đề là AI chưa biết mình là ai.</p>
<p>Hôm nay mình sẽ sửa chuyện đó cho bạn. Task ngày 1 này chỉ mất 15 phút - nhưng nó thay đổi mọi thứ sau đó.</p>
<hr class="divider" />
<p><strong>Task hôm nay (15 phút):</strong></p>
<p>1. Tải file BRAND_DNA mẫu → <a href="https://dunghoang.com/tai-nguyen/brand-dna">bấm vào đây</a><br/>
2. Mở Claude hoặc ChatGPT → paste toàn bộ file đó vào đầu chat<br/>
3. Gõ đúng 1 câu này: <em>"Viết 1 đoạn giới thiệu về tôi, đúng giọng và phong cách đã mô tả"</em><br/>
4. Đọc kết quả</p>
<div class="highlight">Lần đầu tiên AI nói đúng giọng bạn... cảm giác hơi lạ, kiểu như nhìn vào gương nhưng gương biết nói. Mình vẫn nhớ lần đầu mình thử - ngồi đọc lại tới 3 lần.^^</div>
<div class="neo-price">💡 Thuê người viết content cho bạn: 5-8 triệu/tháng, được khoảng 30 bài. Hôm nay bạn cài xong trong 15 phút - AI viết không giới hạn, không lương, không ngày nghỉ.</div>
<p>Làm xong thì nhớ lưu lại file BRAND_DNA đã điền nhaaa - ngày mai mình dùng tiếp.</p>
<p>Gặp lại ngày mai,<br/>Dũng</p>
<p style="font-size:13px;color:#888;">P/S - Nếu gặp khó khăn chỗ nào cứ reply thẳng email này, mình đọc hết.</p>
`)
  return { subject, html }
}

// ─── NGÀY 2 — Bài Facebook Đầu Tiên ────────────────────────────────
function getEmailDay2(name: string): EmailContent {
  const subject = `[Ngày 2] Bài Facebook đầu tiên AI viết cho ${name} - xem thử đi`
  const html = emailLayout(`
<div class="day-badge">Thử Thách 7 Ngày · Ngày 2 / 7</div>
<h1 class="subject-line">Sáng nay mình test thử một thứ...</h1>
<p>Mình nhờ AI viết 1 bài Facebook về một điều mình đang bán - từ file BRAND_DNA hôm qua. Đọc xong, vợ mình hỏi "anh tự viết à?" ^^</p>
<p>Đó là dấu hiệu tốt. Khi người quen không phân biệt được AI hay mình viết - thì khách hàng càng không phân biệt được.</p>
<p>Hôm nay bạn thử luôn nhé.</p>
<hr class="divider" />
<p><strong>Task hôm nay (20 phút):</strong></p>
<p>1. Mở Claude/ChatGPT, paste lại file BRAND_DNA (hoặc mở chat hôm qua)<br/>
2. Gõ prompt này:</p>
<div class="highlight">"Viết 1 bài Facebook về [sản phẩm/dịch vụ bạn đang bán], theo đúng giọng và style đã mô tả trong file trên. Bài dài khoảng 200-300 chữ, mở đầu bằng một tình huống đời thường, không dùng ngôn ngữ bán hàng cứng nhắc."</div>
<p>3. Đọc lại, chỉnh nhỏ những chỗ chưa khớp<br/>
4. Đăng luôn - đừng để mai</p>
<p>Bài đăng hôm nay quan trọng không phải vì reach. Quan trọng vì bạn vừa tạo ra một thói quen mới: để AI viết bản nháp, bạn chỉ chỉnh và đăng.</p>
<p>Gặp lại ngày mai,<br/>Dũng</p>
`)
  return { subject, html }
}

// ─── NGÀY 3 — 10 Tiêu Đề ───────────────────────────────────────────
function getEmailDay3(name: string): EmailContent {
  const subject = `[Ngày 3] 10 tiêu đề trong 10 phút - ${name} thử xem`
  const html = emailLayout(`
<div class="day-badge">Thử Thách 7 Ngày · Ngày 3 / 7</div>
<h1 class="subject-line">Tiêu đề quyết định 80% người có đọc bài hay không.</h1>
<p>Mình từng mất 30 phút để nghĩ 1 tiêu đề. Ngồi gõ, xoá, gõ lại, xoá lại. Cuối cùng đặt đại một cái rồi đăng.</p>
<p>Giờ thì mình có 10 lựa chọn trong 10 phút - chọn cái tốt nhất, bỏ 9 cái còn lại.</p>
<hr class="divider" />
<p><strong>Task hôm nay (10 phút):</strong></p>
<p>Prompt này:</p>
<div class="highlight">"Tạo 10 tiêu đề thu hút cho bài viết về [chủ đề bạn muốn đăng]. Mỗi tiêu đề theo 1 góc khác nhau: tò mò, nỗi đau, kết quả cụ thể, phản trực giác, câu hỏi. Viết đúng giọng đã mô tả trong file BRAND_DNA."</div>
<p>Chọn 1-2 cái hay nhất → lưu lại → dùng cho bài đăng tuần này.</p>
<div class="neo-price">💡 Mình đính kèm file 489 Tiêu Đề mẫu để bạn tham khảo thêm - không cần dùng hết, đọc để hiểu cấu trúc là đủ → <a href="https://dunghoang.com/tai-nguyen/489-tieu-de">Tải về đây</a></div>
<p>Gặp lại ngày mai,<br/>Dũng</p>
`)
  return { subject, html }
}

// ─── NGÀY 4 — Caption Ảnh ───────────────────────────────────────────
function getEmailDay4(name: string): EmailContent {
  const subject = `[Ngày 4] Caption ảnh sản phẩm trong 5 phút - ${name} thử không?`
  const html = emailLayout(`
<div class="day-badge">Thử Thách 7 Ngày · Ngày 4 / 7</div>
<h1 class="subject-line">Ảnh đẹp mà caption nhạt thì cũng như không.</h1>
<p>Mình để ý một pattern ở nhiều shop online: ảnh sản phẩm chụp rất cẩn thận, nhưng caption chỉ là "Sản phẩm mới về nhé khách ơi 😊" - rồi 3 comment hỏi giá.</p>
<p>Caption tốt không bán sản phẩm - nó bán cảm giác khi có sản phẩm đó.</p>
<hr class="divider" />
<p><strong>Task hôm nay (5 phút):</strong></p>
<p>Lấy 1 ảnh sản phẩm đang có → mô tả ngắn cho AI → dùng prompt:</p>
<div class="highlight">"Viết caption cho ảnh [mô tả ảnh: màu sắc, bối cảnh, cảm giác]. Sản phẩm là [tên sản phẩm], giúp khách [lợi ích chính]. Viết 3 phiên bản: 1 giáo dục, 1 bán hàng nhẹ nhàng, 1 kết nối cảm xúc. Đúng giọng trong BRAND_DNA."</div>
<p>Chọn 1 caption → đăng cùng ảnh đó hôm nay hoặc ngày mai.</p>
<p>Gặp lại ngày mai,<br/>Dũng</p>
`)
  return { subject, html }
}

// ─── NGÀY 5 — Script Video ──────────────────────────────────────────
function getEmailDay5(name: string): EmailContent {
  const subject = `[Ngày 5] Script video 30 giây - ${name} không cần nghĩ gì trước camera nữa`
  const html = emailLayout(`
<div class="day-badge">Thử Thách 7 Ngày · Ngày 5 / 7</div>
<h1 class="subject-line">Cái khó nhất của video ngắn không phải quay - là không biết nói gì.</h1>
<p>Mình từng ngồi trước camera 10 phút mà không bấm record vì cứ không tìm ra câu mở đầu. Cuối cùng tắt máy, "thôi hôm nay không quay nữa".</p>
<p>Giờ thì mình có script sẵn trước khi bấm record.</p>
<hr class="divider" />
<p><strong>Task hôm nay (15 phút):</strong></p>
<div class="highlight">"Viết script video 30-60 giây cho TikTok/Reels về [chủ đề]. Cấu trúc: Hook 3 giây (câu mở gây tò mò hoặc chạm nỗi đau), Body 20 giây (nội dung chính, 2-3 điểm), CTA 5 giây (kêu gọi nhẹ nhàng). Viết đúng giọng BRAND_DNA, tự nhiên như nói chuyện."</div>
<p>Có script rồi thì quay 1 lần là xong - không cần nghĩ trong lúc quay nữa.</p>
<p>Gặp lại ngày mai - ngày mai có thứ mình nghĩ bạn sẽ thích nhất trong 7 ngày này,<br/>Dũng</p>
`)
  return { subject, html }
}

// ─── NGÀY 6 — Lịch Đăng Bài Cả Tuần ───────────────────────────────
function getEmailDay6(name: string): EmailContent {
  const subject = `[Ngày 6] Lịch 7 bài cho cả tuần - xong trong 30 phút`
  const html = emailLayout(`
<div class="day-badge">Thử Thách 7 Ngày · Ngày 6 / 7</div>
<h1 class="subject-line">Cái làm mình mệt nhất không phải viết bài - là nghĩ hôm nay đăng gì.</h1>
<p>Mỗi sáng dậy mở Facebook, ngồi nhìn ô trống, không biết đăng gì. Rồi thôi để đó, hôm nay bận. Tuần sau cũng vậy.</p>
<p>Hôm nay mình giải quyết chuyện đó luôn - một lần cho cả tuần.</p>
<hr class="divider" />
<p><strong>Task hôm nay (30 phút):</strong></p>
<div class="highlight">"Lên lịch nội dung 7 ngày cho tôi. Mỗi ngày 1 bài Facebook, theo đúng giọng BRAND_DNA. Phân bổ: 3 bài giáo dục (chia sẻ kiến thức/kinh nghiệm), 2 bài bán hàng nhẹ nhàng (kể chuyện + offer), 2 bài kết nối (tâm sự, hỏi ý kiến). Mỗi bài ghi: chủ đề, góc khai thác, 1-2 câu mở đầu gợi ý."</div>
<p>Sau đó dùng prompt riêng viết đầy đủ từng bài một.</p>
<div class="neo-price">💡 Thuê người lên lịch nội dung 1 tháng: 3-5 triệu. Bạn vừa làm xong 1 tuần trong 30 phút - nhân ra 1 tháng vẫn chỉ tốn 2 giờ.</div>
<p>Ngày mai là ngày cuối - mình sẽ cho bạn thấy thứ ít người ở Việt Nam đang làm được,<br/>Dũng</p>
`)
  return { subject, html }
}

// ─── NGÀY 7 — Tiểu Hà Mã Demo + Bridge ─────────────────────────────
function getEmailDay7(name: string): EmailContent {
  const subject = `[Ngày 7] Gặp Tiểu Hà Mã - đội trưởng AI của mình`
  const html = emailLayout(`
<div class="day-badge">Thử Thách 7 Ngày · Ngày 7 / 7</div>
<h1 class="subject-line">7 ngày vừa rồi bạn học được 1 trong 25 skill của Biệt Đội AI Agent.</h1>
<p>Dạy AI viết đúng giọng bạn - skill số 1. Mình gọi đây là "Nạp Giọng" vì về bản chất bạn đang lập trình cho AI hiểu bạn là ai trước khi nó làm bất kỳ việc gì cho bạn.</p>
<p>Còn 24 skill nữa. Mỗi skill thay 1 người bạn đang phải thuê hoặc tự làm.</p>
<hr class="divider" />
<p>Nhưng hôm nay mình muốn cho bạn thấy điểm đến - không phải 25 skill - mà là khi 25 skill đó chạy cùng nhau thì trông như thế nào.</p>
<p>Đây là Tiểu Hà Mã - đội trưởng AI của mình trên Telegram:</p>
<img src="https://dunghoang.com/images/tieu-ha-ma-demo.jpg" alt="Tiểu Hà Mã đang trả lời khách lúc 2h14 sáng" style="width:100%;border-radius:8px;margin:16px 0;" />
<p>2h14 sáng. Mình đang ngủ. Hà Mã đang trả lời khách, tư vấn, gửi link thanh toán - tự động hoàn toàn.</p>
<div class="neo-price">💡 Thuê 2-3 nhân viên trực 24/7 thay ca nhau: 20 triệu+/tháng. Tiểu Hà Mã trực liên tục, không nghỉ phép, không xin tăng lương.</div>
<hr class="divider" />
<p>Nếu 7 ngày này bạn thấy oke - bước tiếp là:</p>
<p><strong><a href="https://dunghoang.com/mini-368">Mini 368k</a></strong> - Học đầy đủ skill làm trang bán hàng AI trong 1 giờ. 1 skill này thôi đã thay người thiết kế landing page 8-10tr/tháng.</p>
<p><strong><a href="https://dunghoang.com/khoa-1">Khóa 1 - 686.868đ</a></strong> - Nhận cả 25 skill + Hà Mã hỏi-đáp khi kẹt trên Telegram. Mình đi cùng bạn qua từng skill.</p>
<div class="cta-block">
  <a class="cta-btn" href="https://dunghoang.com/khoa-1">Xem Khóa 1 — 686.868đ</a>
</div>
<p>Bạn chọn bước nào phù hợp thì mình ở đây.^^</p>
<p>Cảm ơn bạn đã đi cùng mình 7 ngày vừa rồi nhaaa,<br/>Dũng</p>
<p style="font-size:13px;color:#888;">P/S - Nếu bạn muốn hỏi thêm trước khi quyết định, reply email này là mình trả lời.</p>
`)
  return { subject, html }
}

// ─── EXPORT CHUNG ────────────────────────────────────────────────────
export function getEmailDay1Exported(name: string) { return getEmailDay1(name) }

export function getChallengeEmail(day: number, name: string): EmailContent {
  switch (day) {
    case 1: return getEmailDay1(name)
    case 2: return getEmailDay2(name)
    case 3: return getEmailDay3(name)
    case 4: return getEmailDay4(name)
    case 5: return getEmailDay5(name)
    case 6: return getEmailDay6(name)
    case 7: return getEmailDay7(name)
    default: return getEmailDay7(name)
  }
}
