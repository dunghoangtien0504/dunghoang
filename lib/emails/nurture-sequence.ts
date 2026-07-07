import { emailLayout } from './layout'
import { PRODUCTS, formatVND } from '../products'

type EmailContent = { subject: string; html: string }

// ─────────────────────────────────────────────────────────────────────────────
// CHUỖI CHĂM SÓC CHÉO — chạy cho MỌI khách hàng, bất kể mua khóa nào trước
// Nhịp: 2 ngày/email. Chu kỳ 5 email lặp lại mãi: 4 email giá trị → 1 email bán hàng.
// Email bán hàng luôn gợi ý đúng khóa TIẾP THEO khách chưa sở hữu, theo bậc thang giá.
// ─────────────────────────────────────────────────────────────────────────────

// Bậc thang giá — dùng để tìm "khóa tiếp theo" khách chưa mua
export const NURTURE_LADDER = [
  'meta-ai-agent',
  'content_368',
  'landing-page',
  'khoa-1',
  'hoi-dong-co-van',
  'khoa2_2768',
] as const

/** Tìm khóa tiếp theo trong bậc thang mà khách CHƯA sở hữu. null nếu đã có hết. */
export function findNextCourse(ownedCourseIds: string[]): string | null {
  const owned = new Set(ownedCourseIds)
  // Hội Đồng Cố Vấn đã bao gồm Khóa 1 → coi như sở hữu luôn Khóa 1
  if (owned.has('hoi-dong-co-van')) owned.add('khoa-1')
  for (const id of NURTURE_LADDER) {
    if (!owned.has(id)) return id
  }
  return null
}

const nurtureLayout = (content: string, email: string) =>
  emailLayout(content, email).replace(
    'Email này gửi tự động vì bạn đã đăng ký Thử Thách 7 Ngày AI Viết Bài.',
    'Email này gửi tự động trong chuỗi chăm sóc học viên DungHoang.com.',
  )

// ─── EMAIL GIÁ TRỊ 1 — Xử lý câu hỏi giá không mất khách ────────────────────
function valueEmail1(name: string, email: string): EmailContent {
  const subject = `Khách hỏi giá xong im luôn — mình từng xử lý sai cả năm trời`
  const html = nurtureLayout(`
<div class="day-badge">Mẹo nhỏ hôm nay</div>
<h1 class="subject-line">Khách hỏi giá xong biến mất.</h1>

<p>Chuyện quen không? Khách nhắn hỏi giá, mình trả lời xong... im luôn. Không phản hồi, không từ chối, chỉ biến mất.</p>

<p>Mình từng nghĩ là do giá cao. Sau này mới hiểu: vấn đề không phải con số, mà là cách trả lời giá <em>trơ trọi một mình</em>, không có gì đi kèm.</p>

<hr class="divider" />

<p>Cách mình sửa: không bao giờ để câu trả lời giá đứng một mình. Luôn đi kèm 1 trong 3 thứ: lý do vì sao giá đó hợp lý, một lựa chọn nhỏ hơn để khách dễ quyết, hoặc một câu hỏi ngược lại để hiểu đúng nhu cầu khách trước khi chốt giá.</p>

<div class="highlight">Câu lệnh mình hay dùng với AI: "Khách hỏi giá [sản phẩm]. Viết lại câu trả lời giá kèm 1 lý do hợp lý và 1 câu hỏi ngược nhẹ nhàng để hiểu thêm nhu cầu, giọng thân thiện không giải thích dài dòng."</div>

<p>Thử áp dụng cho tin nhắn tiếp theo bạn trả lời khách xem sao.</p>

<p>Dũng</p>
`, email)
  return { subject, html }
}

// ─── EMAIL GIÁ TRỊ 2 — Công thức 1 câu mở đầu ───────────────────────────────
function valueEmail2(name: string, email: string): EmailContent {
  const subject = `1 câu mở đầu quyết định khách đọc tiếp hay lướt qua`
  const html = nurtureLayout(`
<div class="day-badge">Mẹo nhỏ hôm nay</div>
<h1 class="subject-line">3 giây đầu tiên quyết định tất cả.</h1>

<p>Người đọc quyết định trong 3 giây đầu: đọc tiếp hay lướt qua. Câu đầu tiên không hay, phần còn lại dù viết công phu đến đâu cũng không ai thấy.</p>

<p>Mình hay dùng 1 công thức đơn giản cho câu mở đầu: bắt đầu bằng một cảnh cụ thể, không phải một lời giới thiệu chung chung.</p>

<div class="highlight">So sánh: "Hôm nay mình muốn chia sẻ về vấn đề chốt đơn" (chung chung, ai cũng viết được) so với "3 giờ chiều, khách nhắn hỏi giá lần thứ 3 trong tuần" (cụ thể, khiến người đọc tò mò chuyện gì xảy ra tiếp).</div>

<p>Câu lệnh cho AI: "Viết lại câu mở đầu này thành 1 cảnh cụ thể có thời gian, địa điểm hoặc hành động rõ ràng, không dùng câu giới thiệu chung chung."</p>

<p>Bạn thử áp dụng cho bài đăng tiếp theo xem khác biệt thế nào.</p>

<p>Dũng</p>
`, email)
  return { subject, html }
}

// ─── EMAIL GIÁ TRỊ 3 — Tự duyệt bài trước khi đăng ──────────────────────────
function valueEmail3(name: string, email: string): EmailContent {
  const subject = `Cách mình tự "duyệt bài" của chính mình trước khi đăng`
  const html = nurtureLayout(`
<div class="day-badge">Mẹo nhỏ hôm nay</div>
<h1 class="subject-line">Viết xong đừng đăng ngay.</h1>

<p>Mình từng đăng bài ngay sau khi viết xong, rồi 10 phút sau đọc lại thấy sai chính tả, câu lủng củng, hoặc nghe không giống mình. Sửa hoài vẫn không hết.</p>

<p>Giờ mình có 1 bước nhỏ trước khi đăng: nhờ chính AI đọc lại và tự chấm.</p>

<div class="highlight">Câu lệnh: "Đọc lại bài này như một khách hàng khó tính. Chỉ ra chỗ nào nghe giả tạo, chỗ nào dài dòng thừa, và chỗ nào chưa rõ ràng. Không cần viết lại, chỉ cần chỉ ra vấn đề."</div>

<p>AI sẽ chỉ ra được 2-3 chỗ mình tự đọc không thấy vì đã quá quen với bài viết của mình. Sửa xong mới đăng, tiết kiệm được cảnh xóa đăng lại vì lỡ tay.</p>

<p>Dũng</p>
`, email)
  return { subject, html }
}

// ─── EMAIL GIÁ TRỊ 4 — Giữ giọng văn nhất quán không cần BRAND_DNA đầy đủ ───
function valueEmail4(name: string, email: string): EmailContent {
  const subject = `Chưa làm BRAND_DNA vẫn giữ được giọng văn nhất quán`
  const html = nurtureLayout(`
<div class="day-badge">Mẹo nhỏ hôm nay</div>
<h1 class="subject-line">Không cần file dài mới giữ được giọng.</h1>

<p>Nhiều bạn nhắn hỏi mình: "Chưa làm BRAND_DNA đầy đủ thì AI viết có bị chung chung không?" Câu trả lời: đỡ hơn nhiều nếu bạn cho AI biết 3 điều này trước khi viết bất kỳ bài nào.</p>

<div class="highlight">3 câu trả lời nhanh, dán vào đầu mỗi lần chat với AI:<br/>1. Mình nói chuyện với khách kiểu gì (thân thiện, chuyên nghiệp, hài hước...)<br/>2. Mình hay dùng từ xưng hô gì với khách (bạn, anh chị, tên riêng...)<br/>3. Một câu mình từng viết mà mình thấy đúng là "giọng mình"</div>

<p>3 câu đó không thay được BRAND_DNA đầy đủ, nhưng đủ để AI không viết ra thứ nghe như văn mẫu. Làm được BRAND_DNA đầy đủ vẫn tốt hơn nhiều, chỉ là nếu chưa có thời gian thì đây là cách chữa cháy.</p>

<p>Dũng</p>
`, email)
  return { subject, html }
}

const VALUE_EMAILS: Array<(name: string, email: string) => EmailContent> = [
  valueEmail1, valueEmail2, valueEmail3, valueEmail4,
]

// ─── EMAIL BÁN HÀNG — gợi ý đúng khóa tiếp theo khách chưa sở hữu ───────────
// Slug trang bán thật của từng khóa — KHÔNG trùng với product.id nên phải map riêng
const SALES_PAGE_SLUG: Record<string, string> = {
  'meta-ai-agent':   'meta-ai-agent',
  content_368:       'he-thong-content',
  'landing-page':    'landing-page',
  'khoa-1':          '24-ai-agent',
  'hoi-dong-co-van': 'hoi-dong-co-van',
  khoa2_2768:        'coaching',
}

const COURSE_PITCH: Record<string, { hook: string; body: string }> = {
  'meta-ai-agent': {
    hook: 'AI trực page thay bạn — kể cả lúc 2 giờ sáng',
    body: 'Setup AI có sẵn trong Meta Business Suite để tự trả lời khách trên Messenger, Instagram, WhatsApp. Không cần code, không mất phí duy trì. Chỉ cần điền đúng thông tin và dán vào đúng chỗ.',
  },
  content_368: {
    hook: 'Content không cần cảm hứng — Workspace Notion đang chạy thật của mình',
    body: 'Brand DNA + Story Bank + Hook Library + AI Commands trong 1 workspace. Gõ "viết bài" là có bài sẵn theo đúng giọng bạn, 15-20 phút mỗi bài.',
  },
  'landing-page': {
    hook: 'Tự dựng landing page chuyển đổi cao — không cần biết code',
    body: '10 buổi thực hành Vibe Coding, mỗi buổi ra 1 file thật. Kết khóa bạn có trang bán hàng chạy thật trên tên miền riêng, tự động nhận tiền qua QR.',
  },
  'khoa-1': {
    hook: '24 AI agent thay việc của cả một đội ngũ',
    body: 'Từ viết content, dựng landing page, đến trả lời khách tự động. Mỗi agent 30-60 phút là có việc dùng được ngay, không phải học lý thuyết suông.',
  },
  'hoi-dong-co-van': {
    hook: '5 giám đốc AI cố vấn chiến lược cho business bạn',
    body: 'CEO, CFO, CMO, CCO, CHRO — mỗi vị trí là 1 skill AI phân tích và kê toa việc theo đúng số liệu thật của bạn, không phán bừa. Đã bao gồm trọn bộ 24 AI agent của Khóa 1.',
  },
  khoa2_2768: {
    hook: 'AI Agent riêng cho business bạn + Dũng kèm sát 1-1',
    body: 'Ngoài đủ 24 skill, Dũng trực tiếp setup 1 AI Agent Telegram biết đúng sản phẩm và khách hàng của bạn, cộng 1 buổi soi hệ thống 1 kèm 1.',
  },
}

function salesEmail(name: string, nextCourseId: string | null, email: string): EmailContent {
  if (!nextCourseId) {
    // Đã sở hữu hết bậc thang — mời làm cộng tác viên thay vì bán tiếp
    const subject = `${name} đã có gần như trọn bộ rồi — mình có 1 đề nghị khác`
    const html = nurtureLayout(`
<div class="day-badge">Lời mời đặc biệt</div>
<h1 class="subject-line">Bạn đã đi được một chặng dài rồi.</h1>

<p>Nhìn lại, bạn đã sở hữu gần như trọn bộ hệ thống mình xây dựng. Mình không có khóa nào mới để mời bạn cả — mà mình nghĩ có 1 điều khác có thể phù hợp hơn.</p>

<p>Mình có chương trình cộng tác viên: giới thiệu người khác đến DungHoang.com, nhận hoa hồng 10-20% mỗi đơn thành công. Bạn đã dùng hệ thống này thật, nói chuyện với người khác về nó sẽ tự nhiên hơn bất kỳ ai.</p>

<div class="cta-block">
  <a href="https://dunghoang.com/cong-tac-vien" class="cta-btn">Xem chương trình CTV →</a>
</div>

<p>Không có KPI, không ép buộc. Chỉ là một cách nữa để những gì bạn đang dùng mang lại giá trị thêm cho bạn.</p>

<p>Dũng</p>
`, email)
    return { subject, html }
  }

  const product = PRODUCTS[nextCourseId]
  const pitch   = COURSE_PITCH[nextCourseId]
  const slug    = SALES_PAGE_SLUG[nextCourseId]
  if (!product || !pitch || !slug) {
    // Fallback an toàn — không nên xảy ra vì NURTURE_LADDER khớp PRODUCTS
    return valueEmail1(name, email)
  }

  const subject = `${name}, đây có thể là bước tiếp theo phù hợp với bạn`
  const html = nurtureLayout(`
<div class="day-badge">Gợi ý cho bạn</div>
<h1 class="subject-line">${pitch.hook}</h1>

<p>Mấy email trước mình gửi vài mẹo nhỏ dùng được ngay. Hôm nay mình muốn kể thêm về một thứ có thể hợp với bạn ở giai đoạn này.</p>

<p>${pitch.body}</p>

<div class="neo-price">Đầu tư: <strong>${formatVND(product.price)}</strong> — trả một lần, dùng mãi mãi. Nếu bạn đã mua khóa khác trước đó, nhắn mình qua Telegram để mình tính phần rollover phù hợp cho bạn.</div>

<p>Không phải lúc nào cũng đúng thời điểm. Nếu chưa cần thì cứ để đó, mình vẫn gửi mẹo nhỏ đều đặn cho bạn ở các email sau. Còn nếu tò mò, đọc thêm ở đây:</p>

<div class="cta-block">
  <a href="https://dunghoang.com/${slug}" class="cta-btn">Xem chi tiết ${product.name} →</a>
</div>

<p>Dũng</p>
`, email)
  return { subject, html }
}

/**
 * Lấy email đúng theo vị trí trong chu kỳ (0-4, lặp lại mãi):
 * 0,1,2,3 = email giá trị · 4 = email bán hàng (gợi ý khóa tiếp theo chưa sở hữu)
 */
export function getNurtureEmail(cycleIndex: number, name: string, email: string, ownedCourseIds: string[]): EmailContent {
  const slot = ((cycleIndex % 5) + 5) % 5
  if (slot === 4) {
    return salesEmail(name, findNextCourse(ownedCourseIds), email)
  }
  return VALUE_EMAILS[slot](name, email)
}
