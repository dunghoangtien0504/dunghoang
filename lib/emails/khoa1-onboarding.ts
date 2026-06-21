import { emailLayout } from './layout'

// Layout riêng cho Khóa 1 — footer khác challenge
function k1Layout(content: string): string {
  return emailLayout(content).replace(
    'Email này gửi tự động vì bạn đã đăng ký Thử Thách 7 Ngày AI Viết Bài.',
    'Email này gửi tự động vì bạn đã mua Khóa 1 — 24 Skill AI Bán Hàng.',
  )
}

type EmailContent = { subject: string; html: string }

// ─── EMAIL 1 — Gửi ngay sau thanh toán (Ngày 0) ─────────────────────
export function getKhoa1EmailDay1(name: string): EmailContent {
  const subject = `${name} ơi — đơn của bạn xác nhận rồi, đây là bước tiếp theo`
  const html = k1Layout(`
<div class="day-badge">Khóa 1 · 24 Skill AI · Chào mừng</div>
<h1 class="subject-line">Xong rồi. Bạn vào rồi.</h1>

<p>Mình vừa thấy đơn của bạn được xác nhận.</p>

<p>868.686đ không phải số tiền nhỏ với một người đang tự làm mọi thứ một mình. Mình biết điều đó. Cảm ơn bạn đã tin.</p>

<p>Đây là link khu học của bạn:</p>

<div class="cta-block">
  <a href="https://dunghoang.com/portal" class="cta-btn">Vào Khu Học Ngay →</a>
</div>

<p>Đăng nhập bằng email này. Nếu quên mật khẩu, bấm "Quên mật khẩu" là hệ thống gửi về ngay.</p>

<hr class="divider" />

<p><strong>Bắt đầu từ đâu?</strong></p>

<p>Đừng mở hết 24 skill một lúc. Sẽ choáng. Mình biết vì mình từng như vậy.</p>

<p>Chỉ cần làm 1 việc:</p>

<div class="highlight">Mở <strong>Skill 01 — BRAND_DNA</strong>. Đọc SOP. Làm theo từng bước. Khoảng 30-45 phút là xong. Skill đó quan trọng hơn 23 skill còn lại cộng lại, vì tất cả đều dùng output của nó.</div>

<div class="neo-price">💡 Bạn vừa "thuê" 24 nhân sự AI chạy hằng ngày. Thuê người thật làm cùng nhiêu việc: 50-70 triệu/tháng. Bạn trả 1 lần, không lương, không ngày nghỉ.</div>

<p>Câu hỏi gì cứ nhắn mình qua Telegram: <a href="https://t.me/KentHoang"><strong>@KentHoang</strong></a></p>

<p>Gặp bạn trong khu học,<br/>Dũng</p>

<p style="font-size:13px;color:#888;">P.S. Email tiếp theo mình sẽ kể cho bạn nghe chuyện lần đầu AI viết đúng giọng mình trông như thế nào. Buồn cười lắm.</p>
`)
  return { subject, html }
}

// ─── EMAIL 2 — Ngày 1: Hook cảm xúc BRAND_DNA ───────────────────────
export function getKhoa1EmailDay2(name: string): EmailContent {
  const subject = `Lần đầu AI viết đúng giọng mình — mình ngồi đọc lại tới 3 lần`
  const html = k1Layout(`
<div class="day-badge">Khóa 1 · Ngày 1</div>
<h1 class="subject-line">9 giờ tối. Mình đang ngồi làm một mình.</h1>

<p>Hồi đó mình đang cố viết caption Facebook cho homestay.</p>

<p>Gõ xoá. Gõ xoá. Sau 45 phút mình có được 3 câu... mà đọc lên nghe như thông báo của siêu thị.</p>

<p>Mình nhớ cái cảm giác đó. Biết mình muốn nói gì. Nhưng không ra thành chữ đúng. Không phải không biết viết. Là viết xong không thấy đó là tiếng nói của mình.</p>

<hr class="divider" />

<p>Rồi một tối mình thử nạp BRAND_DNA vào Claude.</p>

<p>File đó mình điền khoảng 20 phút: mình là ai, bán gì, nói chuyện với ai, giọng văn mình hay dùng, mấy câu ví dụ mình từng viết.</p>

<p>Rồi mình gõ: <em>"Viết 1 caption Facebook về homestay của mình, theo đúng giọng đã mô tả."</em></p>

<p>AI viết ra. Mình đọc lại.</p>

<p>Mình ngồi yên một lúc.</p>

<div class="highlight">Không phải vì nó sai. Mà vì nó đúng đến mức mình không tin là AI viết. Mình đọc đi đọc lại 3 lần. Vợ mình hỏi "anh sao vậy?" Mình không biết giải thích sao.</div>

<p>Đó là lúc mình hiểu: AI không viết kém. AI viết chung chung vì mình chưa giới thiệu bản thân với nó.</p>

<p>BRAND_DNA sửa điều đó. Xong 1 lần, dùng mãi mãi cho tất cả 23 skill còn lại.</p>

<hr class="divider" />

<p>Bạn đã làm Skill 01 chưa?</p>

<p>Nếu chưa, dành 30-45 phút tối nay đi. Xong rồi ngày mai mình kể tiếp.</p>

<div class="cta-block">
  <a href="https://dunghoang.com/portal" class="cta-btn">Làm Skill 01 Ngay →</a>
</div>

<p>Dũng</p>
`)
  return { subject, html }
}

// ─── EMAIL 3 — Ngày 4: Check-in + giữ nhịp ──────────────────────────
export function getKhoa1EmailDay3(name: string): EmailContent {
  const subject = `${name}, bạn đang ở skill mấy rồi?`
  const html = k1Layout(`
<div class="day-badge">Khóa 1 · Ngày 4</div>
<h1 class="subject-line">Mình muốn hỏi thật một câu.</h1>

<p>Bạn đang ở skill mấy rồi?</p>

<p>Mình hỏi vì mình biết giai đoạn này. Ngày 1 hào hứng. Ngày 2 bắt đầu. Ngày 3 cuộc sống chen vào, bỏ qua 1 buổi. Ngày 4 thấy mình "đang bị trễ" rồi... thôi ngại quá, để mai.</p>

<p>Không phải lười. Không phải không muốn. Là 24 skill nhìn vào nhiều quá, không biết bắt đầu từ đâu sau khi bỏ lỡ 1 ngày.</p>

<hr class="divider" />

<p>Mình có một cách mình hay dùng khi bị trễ:</p>

<div class="highlight"><strong>Đừng nhìn 24 skill.</strong> Nhìn skill tiếp theo thôi.<br/><br/>Bạn đang ở đâu? Làm xong skill đó trước. Rồi mới nhìn cái kế tiếp.</div>

<p>Nếu bạn vừa xong BRAND_DNA (Skill 01), bước tiếp theo mình gợi ý:</p>

<p>
  Skill 02 — Social Content (viết caption, 30 phút)<br/>
  Skill 03 — Sales Message (viết tin chào hàng)<br/>
  Skill 04 — Video Script (kịch bản video 60 giây)
</p>

<p>Làm được 4 skill đầu là bạn đang dùng AI thực tế mỗi ngày rồi. Không cần cố xong hết 24 cái mới thấy kết quả.</p>

<hr class="divider" />

<p>Có chỗ nào trong SOP bạn không hiểu hoặc làm không ra kết quả như mô tả, nhắn mình qua Telegram. Mình đọc hết và trả lời thường trong 24 tiếng.</p>

<div class="cta-block">
  <a href="https://t.me/KentHoang" class="cta-btn">Nhắn @KentHoang →</a>
</div>

<p>Dũng</p>

<p style="font-size:13px;color:#888;">P.S. Không cần phải trả lời email này. Nhưng nếu bạn muốn kể mình nghe bạn đang ở skill nào, mình thích nghe lắm.</p>
`)
  return { subject, html }
}

// ─── EMAIL 4 — Ngày 8: Story học viên + milestone ────────────────────
export function getKhoa1EmailDay4(name: string): EmailContent {
  const subject = `Chị Lan làm 1 buổi ra 3 caption — và điều mình không ngờ`
  const html = k1Layout(`
<div class="day-badge">Khóa 1 · Ngày 8</div>
<h1 class="subject-line">Chị nhắn mình lúc 8 giờ tối.</h1>

<p>"Anh ơi em không biết viết bài, hay là thôi để em học cái khác."</p>

<p>Chị Lan bán homestay nhỏ, 3 phòng, tự quản lý một mình. Mới mua Khóa 1 được 2 ngày.</p>

<p>Mình nói: "Em cứ làm Skill 01 đã. 30 phút thôi. Xong rồi tính."</p>

<p>Chị làm. 45 phút sau nhắn lại: "Xong rồi anh."</p>

<hr class="divider" />

<p>Mình bảo làm Skill 02 tiếp, viết caption. Chị làm.</p>

<p>Khoảng 1 tiếng sau chị gửi cho mình 3 caption.</p>

<p>Mình đọc. Ổn. Đúng kiểu chị viết, đúng giọng người bán homestay hay tâm sự với khách. Mình hỏi "em chỉnh nhiều không?" Chị nói "em không chỉnh gì cả anh."</p>

<div class="highlight">Đó là lúc chị hiểu. Không phải AI viết giỏi hơn chị. Mà AI viết được khi nó biết chị là ai. BRAND_DNA làm điều đó.</div>

<p>Chị Lan giờ đang dùng AI viết content homestay mỗi tuần. Mình không biết chị có "thay đổi cuộc đời" hay không. Nhưng chị không còn nhìn vào trang trắng hỏi "hôm nay viết gì" nữa.</p>

<hr class="divider" />

<p>Bạn đang ở đâu sau 8 ngày?</p>

<p>Không cần nhiều. Chỉ cần 1 skill đang dùng thực tế mỗi ngày là đúng hướng rồi.</p>

<p>Nếu có skill nào bạn làm rồi nhưng output chưa đúng ý, nhắn mình tên skill đó. Mình sẽ xem lại SOP cùng bạn.</p>

<div class="cta-block">
  <a href="https://dunghoang.com/portal" class="cta-btn">Vào Khu Học →</a>
</div>

<p>Dũng</p>
`)
  return { subject, html }
}

// ─── EMAIL 5 — Ngày 15: Upsell Khóa 2 (tự nhiên, không push) ────────
export function getKhoa1EmailDay5(name: string): EmailContent {
  const subject = `Câu hỏi thật sau 2 tuần — ${name} trả lời được không?`
  const html = k1Layout(`
<div class="day-badge">Khóa 1 · Ngày 15</div>
<h1 class="subject-line">Bạn đã học được 2 tuần rồi.</h1>

<p>Mình muốn hỏi thật: bạn đã dùng được bao nhiêu skill vào business thực tế của bạn rồi?</p>

<p>Không có câu trả lời đúng sai. Mình hỏi vì biết mỗi người đi với tốc độ khác nhau, business khác nhau.</p>

<hr class="divider" />

<p>Với những người đã làm được 10-15 skill, thường xuất hiện 1 câu hỏi:</p>

<p><em>"Mình muốn kết hợp tất cả thành một hệ thống chạy tự động thay vì dùng lẻ tẻ từng cái. Nhưng không biết bắt đầu từ đâu."</em></p>

<p>Đó là lý do mình có <strong>Khóa 2 — Bản Có Đội Trưởng</strong>.</p>

<hr class="divider" />

<p>Khóa 2 thêm vào 3 thứ Khóa 1 chưa có:</p>

<p><strong>1. Skill 23 — Build App (GoClaw):</strong> Biến bộ prompt thành AI agent chạy trên Telegram. Không cần code. Mình cài cùng bạn.</p>

<p><strong>2. Tiểu Hà Mã — AI agent thật:</strong> Con agent mình đang dùng trong business mình hằng ngày. Bạn nhận bản clone, không cần xây từ đầu.</p>

<p><strong>3. Buổi Soi Hệ Thống 1-kèm-1:</strong> Mình ngồi cùng bạn xem bạn đang ở đâu, thiếu gì, nên thêm skill nào tiếp theo.</p>

<div class="neo-price">💡 Đã mua Khóa 1 (868.686đ)? Nâng lên Khóa 2 chỉ cần thêm <strong>1.900.000đ</strong>. Không phải trả lại 2.768.686đ. Số tiền cũ được tính vào hết.</div>

<p>Không phải ai cũng cần Khóa 2. Nếu bạn đang dùng tốt 10-15 skill và chưa cần hệ thống tự chạy thì Khóa 1 là đủ rồi.</p>

<p>Nhưng nếu bạn muốn hỏi thêm trước khi quyết định, nhắn mình qua Telegram. Mình sẽ hỏi bạn vài câu về business bạn đang làm. Phù hợp thì mình nói, không phù hợp mình cũng nói thẳng.</p>

<div class="cta-block">
  <a href="https://t.me/KentHoang" class="cta-btn">Hỏi mình trước khi quyết định →</a>
</div>

<p>Dũng</p>

<p style="font-size:13px;color:#888;">P.S. Rollover hoạt động mãi mãi. 868.686đ bạn đã trả sẽ được tính vào Khóa 2 bất cứ khi nào bạn muốn nâng. Không có deadline.</p>
`)
  return { subject, html }
}

// ─── DISPATCHER ──────────────────────────────────────────────────────
// Map ngày gửi thực tế → email nào
// Ngày 0: Email 1 (welcome)
// Ngày 1: Email 2 (BRAND_DNA story)
// Ngày 4: Email 3 (check-in)
// Ngày 8: Email 4 (case study)
// Ngày 15: Email 5 (upsell)
const DAY_MAP: Record<number, (name: string) => EmailContent> = {
  0:  getKhoa1EmailDay1,
  1:  getKhoa1EmailDay2,
  4:  getKhoa1EmailDay3,
  8:  getKhoa1EmailDay4,
  15: getKhoa1EmailDay5,
}

export function getKhoa1Email(day: number, name: string): EmailContent | null {
  const fn = DAY_MAP[day]
  return fn ? fn(name) : null
}

export const KHOA1_SEQUENCE_DAYS = Object.keys(DAY_MAP).map(Number).sort((a, b) => a - b)
// → [0, 1, 4, 8, 15]
