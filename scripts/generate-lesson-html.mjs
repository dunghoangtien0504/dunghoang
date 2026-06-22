// Tạo HTML SOP cho tất cả skill và update thẳng Supabase
// Chạy: node scripts/generate-lesson-html.mjs
import { createClient } from '@supabase/supabase-js'
import { readFileSync } from 'fs'

const env = {}
for (const line of readFileSync('.env.local', 'utf8').split('\n')) {
  const m = line.match(/^([A-Z_]+)=(.*)$/)
  if (m) env[m[1]] = m[2].trim()
}

const supabase = createClient(
  env.NEXT_PUBLIC_SUPABASE_URL,
  env.SUPABASE_SERVICE_ROLE_KEY,
  { auth: { autoRefreshToken: false, persistSession: false } }
)

// ── Skill data ───────────────────────────────────────────────────────────────
const SKILLS = [
  { n:'01', name:'Chân Dung Khách Hàng',           group:'Nền tảng',           time:'45 phút', tool:'Claude / ChatGPT', prereq:null,
    does:'Phân tích để biết khách của bạn là ai, đang đau điều gì, muốn gì, hay nói câu gì.',
    output:'Một bản mô tả khách hàng chi tiết để dùng cho mọi bài viết và quảng cáo sau này.' },
  { n:'02', name:'Giọng Văn Thương Hiệu (BRAND_DNA)',group:'Nền tảng',          time:'60 phút', tool:'Claude / ChatGPT', prereq:null,
    does:'Dạy AI học đúng giọng viết của bạn, để bài AI viết ra nghe như chính bạn.',
    output:'File BRAND_DNA dán vào AI một lần, dùng mãi cho mọi skill viết chữ.' },
  { n:'03', name:'Tư Duy Offer Kiểu Hormozi',       group:'Nền tảng',           time:'60 phút', tool:'Claude + template', prereq:'Skill #01',
    does:'Khung tư duy đóng gói và định giá sao cho giá trị cảm nhận cao hơn giá tiền.',
    output:'Bảng tự chấm offer + cách nâng giá trị cảm nhận.' },
  { n:'04', name:'Tư Duy Vận Hành Một Mình',        group:'Nền tảng',           time:'45 phút', tool:'Claude + template', prereq:null,
    does:'Bộ khung làm việc cho người kinh doanh một mình: từ định hướng tới việc hằng ngày.',
    output:'Template lên kế hoạch tuần + checklist review.' },
  { n:'05', name:'Cơ Chế Khác Biệt',                group:'Chiến lược',         time:'60 phút', tool:'Claude / ChatGPT', prereq:'Skill #01 + #02',
    does:'Đặt tên và hệ thống hóa cách bạn làm ra kết quả, để khách khó so giá với người khác.',
    output:'Tên cơ chế riêng + sơ đồ giải thích dùng trong trang bán và quảng cáo.' },
  { n:'06', name:'Mô Hình Doanh Thu',               group:'Chiến lược',         time:'60 phút', tool:'Claude + template', prereq:'Skill #01',
    does:'Vẽ bậc thang sản phẩm từ rẻ tới đắt để khách mua nhiều lần, tăng dần.',
    output:'Bản đồ các sản phẩm và mức giá, biết bán gì trước bán gì sau.' },
  { n:'07', name:'Thiết Kế Offer',                  group:'Chiến lược',         time:'90 phút', tool:'Claude / ChatGPT', prereq:'Skill #01 + #03',
    does:'Build từng lời đề nghị khó từ chối: quà tặng, bảo hành, đảo ngược rủi ro.',
    output:'Một offer hoàn chỉnh sẵn để đưa lên trang bán.' },
  { n:'08', name:'Mồi Miễn Phí Kéo Khách',         group:'Phễu & Trang bán',   time:'45 phút', tool:'Claude / ChatGPT', prereq:'Skill #01 + #02',
    does:'Nghĩ ra quà tặng miễn phí (ebook, checklist, thử thách) để khách lạ để lại liên hệ.',
    output:'Ý tưởng mồi + dàn ý nội dung sẵn để làm.' },
  { n:'09', name:'Vẽ Phễu Bán Hàng',               group:'Phễu & Trang bán',   time:'45 phút', tool:'Claude + sơ đồ',  prereq:'Skill #06',
    does:'Vẽ đường đi của khách từ lúc thấy bạn tới lúc mua, từng bước nối nhau.',
    output:'Sơ đồ phễu để biết cần làm trang nào, email nào, theo thứ tự nào.' },
  { n:'10', name:'Dựng Landing Page',               group:'Phễu & Trang bán',   time:'60 phút', tool:'Claude + Framer/Carrd', prereq:'Skill #02',
    does:'Tạo trang bán hàng hoàn chỉnh theo cấu trúc chuyển đổi cao, không cần code.',
    output:'Một trang bán hàng thật có link chia sẻ được, dùng được ngay.' },
  { n:'11', name:'Làm Đẹp Giao Diện',              group:'Phễu & Trang bán',   time:'60 phút', tool:'Canva + hướng dẫn', prereq:'Skill #10',
    does:'Chỉnh trang cho đẹp, dễ đọc, nhanh, chuẩn điện thoại (90% khách VN xem bằng điện thoại).',
    output:'Hướng dẫn màu, font, bố cục để trang của bạn trông chuyên nghiệp.' },
  { n:'12', name:'Viết Bài SEO',                    group:'Phễu & Trang bán',   time:'60 phút', tool:'Claude + Google', prereq:'Skill #02',
    does:'Viết bài chuẩn Google để khách tự tìm tới mà không tốn tiền quảng cáo.',
    output:'Bài viết SEO sẵn dạng HTML để đăng lên website.' },
  { n:'13', name:'Quảng Cáo Facebook/TikTok',       group:'Viết chữ bán hàng', time:'45 phút', tool:'Claude / ChatGPT', prereq:'Skill #01 + #02',
    does:'Viết copy quảng cáo nhiều góc độ khác nhau để test xem cái nào ra đơn rẻ.',
    output:'3 mẫu quảng cáo sẵn để chạy ads hoặc đăng bài.' },
  { n:'14', name:'Kịch Bản Video Bán Hàng',        group:'Viết chữ bán hàng', time:'45 phút', tool:'Claude / ChatGPT', prereq:'Skill #02',
    does:'Viết kịch bản video từ câu hook đầu tới lời kêu gọi cuối, có gợi ý hình ảnh.',
    output:'Kịch bản video sẵn để quay hoặc dựng slide.' },
  { n:'15', name:'Chuỗi Email Bán Hàng',           group:'Viết chữ bán hàng', time:'60 phút', tool:'Claude / ChatGPT', prereq:'Skill #02 + #07',
    does:'Viết chuỗi email nuôi dưỡng và chốt sau khi khách để lại email.',
    output:'5 email sẵn để dán vào công cụ gửi tự động.' },
  { n:'16', name:'Vớt Khách Nguội',                group:'Viết chữ bán hàng', time:'30 phút', tool:'Claude / ChatGPT', prereq:'Skill #02',
    does:'Viết email/tin nhắn nhắc lại cho người từng quan tâm nhưng chưa mua.',
    output:'Bộ 3–5 tin nhắn vớt khách sẵn để gửi cho danh sách cũ.' },
  { n:'17', name:'Kịch Bản Gọi Chốt Đơn',         group:'Viết chữ bán hàng', time:'45 phút', tool:'Claude / ChatGPT', prereq:'Skill #07',
    does:'Script gọi điện tư vấn và chốt: từ mở đầu, hỏi nhu cầu, tới báo giá tự tin.',
    output:'Kịch bản gọi điện + cách xử lý 5 từ chối thường gặp.' },
  { n:'18', name:'Hệ Thống Content Đa Kênh',      group:'Sản xuất nội dung',  time:'90 phút', tool:'Claude / ChatGPT', prereq:'Skill #02 + #01',
    does:'Sản xuất bài dài, bài viral, kịch bản, và nhân 1 nội dung thành nhiều dạng.',
    output:'Lịch content 30 ngày + 5 bài viết sẵn cho Facebook/TikTok.' },
  { n:'19', name:'Marketing Việt Nam',              group:'Sản xuất nội dung',  time:'60 phút', tool:'Claude + template', prereq:'Skill #02',
    does:'Bộ khung marketing cho người Việt: bài social, ad, video, email, ra mắt sản phẩm.',
    output:'Framework điền vào là có nội dung đúng nền tảng VN.' },
  { n:'20', name:'Carousel Instagram',              group:'Sản xuất nội dung',  time:'45 phút', tool:'Claude + Canva',   prereq:'Skill #02',
    does:'Lên bài nhiều slide dạy hoặc kể chuyện, kèm caption và hashtag.',
    output:'Nội dung từng slide + caption + hashtag sẵn để thiết kế và đăng.' },
  { n:'21', name:'Tiêu Đề Thu Hút',                group:'Sản xuất nội dung',  time:'30 phút', tool:'Claude / ChatGPT', prereq:null,
    does:'Tạo 10 tiêu đề mỗi lần theo nhiều kiểu: câu hỏi, số liệu, tò mò, list, story.',
    output:'30+ tiêu đề cho 1 tháng content sẵn để chọn và dùng.' },
  { n:'22', name:'Chatbot Messenger & Instagram',  group:'Tự động hóa',        time:'60 phút', tool:'Meta Business Suite', prereq:'Page Facebook',
    does:'Cấu hình trợ lý AI trả lời khách tự động trên Messenger/Instagram của Page bạn.',
    output:'Kịch bản bot sẵn để copy-paste vào Meta Business Suite.' },
  { n:'23', name:'Tự Build App Đăng Bài',          group:'Tự động hóa',        time:'3–4 giờ', tool:'Cursor + Gemini API + Vercel', prereq:'Kỹ thuật — chỉ Khóa 2',
    does:'Hướng dẫn tự dựng app React đăng bài Facebook tự động.',
    output:'App đăng bài riêng trên Vercel, kết nối Page của bạn.' },
  { n:'24', name:'Nghiên Cứu Tài Liệu Bằng AI',   group:'Tự động hóa',        time:'30 phút', tool:'NotebookLM (Google)', prereq:null,
    does:'Đưa tài liệu vào AI để tóm tắt, hỏi đáp, tạo podcast/quiz/mindmap từ tài liệu.',
    output:'Bản tóm tắt, podcast, quiz tạo từ tài liệu của bạn.' },
  { n:'25', name:'Trợ Lý AI Tiểu Hà Mã (Telegram)',group:'Tự động hóa',       time:'15 phút', tool:'GoClaw + Telegram', prereq:null,
    does:'Trợ lý AI trên Telegram trả lời thắc mắc khi bạn học và làm theo SOP.',
    output:'Một nơi hỏi 24/7 khi bị kẹt ở bất kỳ bước nào.' },
]

// ── Prompt templates cho từng skill (dán thẳng vào Claude) ───────────────────
const PROMPTS = {
  '01': `[Dán BRAND_DNA vào đây nếu đã có]

Mình đang bán: [mô tả ngắn sản phẩm/dịch vụ]
Khách mua nhiều nhất của mình là: [mô tả họ — ngành, tuổi, công việc]

Hãy giúp mình xây chân dung khách hàng chi tiết với:
1. Họ là ai (nghề, tuổi, hoàn cảnh)
2. Đang khổ vì điều gì (3 pain cụ thể, dùng ngôn ngữ của họ)
3. Muốn đạt được gì (3 desire cụ thể)
4. Hay nói câu gì khi tìm giải pháp (3-5 câu thật)
5. Đã thử gì trước đây và thất bại
6. Điều gì khiến họ quyết định mua

Viết bằng tiếng Việt, dùng ngôn ngữ của người mua — không viết văn hoa.`,

  '02': `Mình muốn tạo file BRAND_DNA để dạy AI viết đúng giọng của mình.

Dưới đây là 5 bài/đoạn viết của mình:
[Paste 5 bài/post/đoạn văn thật của bạn vào đây]

Hãy phân tích và tổng hợp thành BRAND_DNA gồm:
1. Giọng văn (formal/informal, tâm sự/thông tin/hài hước...)
2. Xưng hô (mình/tôi/bạn/anh/chị...)
3. Độ dài câu điển hình
4. 5 cụm từ hay dùng
5. 5 cụm từ KHÔNG bao giờ dùng
6. Cách mở bài thường dùng
7. Cách kết bài thường dùng
8. Tone cảm xúc (ấm/lạnh/thẳng thắn/dịu dàng...)

Sau đó viết hướng dẫn 3 câu cho AI: "Khi viết cho mình, hãy..."`,

  '05': `[Dán BRAND_DNA vào đây]

Mình đang bán: [tên sản phẩm/dịch vụ]
Cách mình làm ra kết quả cho khách là: [mô tả quy trình của bạn]
Kết quả khách đạt được sau khi dùng: [kết quả cụ thể]
Đối thủ trong ngành thường làm theo cách: [họ làm thế nào]

Hãy giúp mình tìm và đặt tên "cơ chế khác biệt" — cách mình làm ra kết quả mà đối thủ không có:
1. Gợi ý 5 tên cơ chế theo các kiểu khác nhau (công thức, hệ thống, phương pháp...)
2. Giải thích sơ đồ 3-5 bước của cơ chế đó
3. Viết 1 câu giải thích dùng trong trang bán: "Không như ai khác dạy [X], mình dùng [Tên cơ chế] để [kết quả]"`,

  '07': `[Dán BRAND_DNA vào đây]

Sản phẩm/dịch vụ mình cần đóng gói thành offer:
- Tên: [tên sản phẩm]
- Giá muốn bán: [số tiền]
- Khách nhận được gì chính: [list deliverables]
- Kết quả khách đạt được: [cụ thể, đo được]

Hãy giúp mình build offer "khó từ chối" với:
1. Quà tặng kèm (3 bonus hợp lý với sản phẩm)
2. Cam kết/bảo hành (đảo ngược rủi ro)
3. Lý do mua ngay hôm nay (scarcity thật)
4. Bảng giá trị — so sánh giá offer vs giá thuê người làm thay
5. Câu CTA theo giọng của mình

Đừng hứa những gì không làm được. Mỗi mục ghi rõ lý do chọn nó.`,

  '08': `[Dán BRAND_DNA vào đây]

Mình bán: [sản phẩm/dịch vụ]
Khách mục tiêu: [mô tả từ Skill #01]
Pain lớn nhất của họ: [1 pain cụ thể nhất]

Hãy gợi ý 5 ý tưởng quà tặng miễn phí (lead magnet) để khách lạ để lại email/số điện thoại:
- Mỗi ý tưởng: tên gọi + dạng (ebook/video/checklist/thử thách) + lý do họ muốn nhận + thời gian làm

Sau đó chọn ý tưởng tốt nhất và viết dàn ý chi tiết để mình tự tạo nội dung.`,

  '12': `[Dán BRAND_DNA vào đây]

Mình cần viết bài SEO về chủ đề: [chủ đề bài viết]
Từ khóa chính: [từ khóa khách hay tìm]
Đối tượng đọc: [mô tả người đọc]
Mục tiêu của bài: [thông tin/bán hàng/tăng trust]

Hãy viết bài SEO hoàn chỉnh:
- Tiêu đề H1 (có từ khóa, thu hút click)
- Meta description (160 ký tự)
- Bài viết 800-1200 từ, chia H2/H3 rõ ràng
- Kết bài có CTA nhẹ

Viết giọng tự nhiên, không nhồi từ khóa. Độc giả đọc xong phải thấy học được thứ gì đó.`,

  '13': `[Dán BRAND_DNA vào đây]

Sản phẩm/dịch vụ: [tên + mô tả ngắn]
Giá: [số tiền]
Khách mục tiêu: [ai, đang khổ gì]
Kết quả sau khi mua: [cụ thể]
Bằng chứng/uy tín đang có: [số khách, kết quả thật, câu testimonial]

Hãy viết 3 mẫu quảng cáo Facebook, mỗi mẫu 1 góc độ khác nhau:
- Góc 1: Pain — mở bằng cảnh đau của khách
- Góc 2: Story — kể chuyện thật ngắn (120-150 từ)
- Góc 3: Result — mở bằng kết quả cụ thể

Mỗi mẫu: Hook (câu đầu) + Thân + CTA. Không dùng ngôn ngữ quảng cáo sáo rỗng.`,

  '14': `[Dán BRAND_DNA vào đây]

Mình cần kịch bản video bán hàng cho: [sản phẩm/dịch vụ]
Thời lượng video: [30 giây / 60 giây / 3 phút]
Nền tảng đăng: [TikTok / Reels / YouTube]
Kết quả khách đạt được: [cụ thể]
Có bằng chứng: [testimonial/số liệu nếu có]

Viết kịch bản video với:
- [0:00–0:03] Hook mở đầu (câu hỏi hoặc cảnh gây tò mò)
- [phần thân] Pain → Solution → Proof
- [cuối] CTA rõ ràng (nói 1 hành động duy nhất)
- Ghi chú: [cảnh quay gì, góc camera nào, text overlay]

Câu mở đầu phải đủ mạnh để ai đang lướt cũng dừng lại xem.`,

  '15': `[Dán BRAND_DNA vào đây]

Mình cần chuỗi 5 email sau khi khách để lại email (opt-in vì [lý do/mồi miễn phí]).
Sản phẩm sẽ bán cuối chuỗi: [tên + giá]
Khách đang ở stage: [mới biết đến mình / đã xem content / đã hỏi giá]

Viết 5 email, mỗi email:
- Subject line (ngắn, gây tò mò hoặc ích lợi rõ)
- Nội dung 150-250 từ
- 1 CTA rõ ràng

Email 1: Chào + tặng ngay giá trị
Email 2: Story/insight ích lợi
Email 3: Giải quyết objection lớn nhất
Email 4: Proof/testimonial hoặc kết quả thật
Email 5: Offer + urgency nhẹ

Giữ giọng tâm sự, không sale quá lộ.`,

  '16': `[Dán BRAND_DNA vào đây]

Danh sách khách nguội của mình là những người đã: [từng hỏi giá/nhắn inbox/xem trang bán nhưng chưa mua]
Lý do họ thường chưa mua: [giá cao / chưa đủ tin / chưa sẵn sàng / đang so sánh]
Sản phẩm mình muốn họ quay lại mua: [tên + giá]

Viết 3 mẫu tin nhắn/email vớt khách nguội:
- Mẫu 1: Nhắc lại value (không nhắc giá)
- Mẫu 2: Hỏi thăm nhẹ (tạo đối thoại)
- Mẫu 3: Offer đặc biệt (thêm bonus hoặc deadline)

Mỗi mẫu dưới 100 từ. Không được nghe như spam. Không dùng "Ưu đãi cuối cùng" hay "Flash sale".`,

  '17': `[Dán BRAND_DNA vào đây]

Sản phẩm mình sẽ tư vấn qua điện thoại: [tên + giá]
Khách thường ở đâu khi mình gọi: [đã điền form / nhắn inbox hỏi / được giới thiệu]
5 từ chối mình hay gặp: [liệt kê]

Viết kịch bản gọi điện tư vấn:
1. Mở đầu (dưới 20 giây, tạo không khí tốt)
2. Hỏi thăm nhu cầu (3-4 câu hỏi khám phá)
3. Giới thiệu sản phẩm (liên kết với nhu cầu vừa nghe)
4. Báo giá tự tin
5. Xử lý 5 từ chối phổ biến (mỗi từ chối 1-2 câu phản hồi)
6. Chốt và bước tiếp theo

Không dùng giọng telemarketing. Nghe như đang giúp bạn, không phải đang bán.`,

  '18': `[Dán BRAND_DNA vào đây]

Mình bán: [sản phẩm/dịch vụ]
Khách mục tiêu: [ai, từ chân dung Skill #01]
Kênh đăng chính: [Facebook / TikTok / Instagram / YouTube]
Chủ đề mình am hiểu nhất: [3-5 chủ đề bạn có thể nói mãi không hết]

Hãy tạo:
1. Lịch content 30 ngày (mỗi ngày 1 chủ đề, đa dạng format)
2. Viết sẵn 5 bài đầu tiên theo đúng giọng BRAND_DNA
3. Hướng dẫn "nhân bản" 1 bài thành 5 format: post text / reel script / story / email / thread

Mỗi bài phải có: hook mạnh + thân hữu ích + CTA nhẹ.`,

  '20': `[Dán BRAND_DNA vào đây]

Mình cần 1 bộ carousel Instagram về chủ đề: [chủ đề]
Mục tiêu carousel: [dạy kiến thức / kể chuyện / giới thiệu sản phẩm]
Số slide: [7-10 slide]

Viết nội dung từng slide:
- Slide 1: Cover (tiêu đề gây tò mò, người lạ thấy phải vuốt tiếp)
- Slide 2-N: Nội dung chính (mỗi slide 1 điểm duy nhất, ngắn)
- Slide cuối: CTA nhẹ + tag bạn bè

Kèm:
- Caption cho bài đăng (150-200 từ)
- 15-20 hashtag phù hợp ngành

Ngôn ngữ đơn giản, như đang giải thích cho bạn nghe.`,

  '21': `Mình cần 10 tiêu đề cho bài về: [chủ đề bài viết]
Đối tượng đọc: [ai]
Kênh đăng: [Facebook / TikTok / blog]

Viết 10 tiêu đề theo 5 kiểu khác nhau (2 tiêu đề/kiểu):
1. Kiểu số liệu: "X cách/lý do/bước..."
2. Kiểu câu hỏi gây tò mò
3. Kiểu kết quả cụ thể: "Làm [X] để đạt [Y] trong [Z]"
4. Kiểu tương phản: "[Không làm X] mà vẫn [đạt Y]"
5. Kiểu câu chuyện: "Mình đã [làm gì] và..."

Đánh dấu tiêu đề mạnh nhất và giải thích lý do.`,

  '03': `[Dán BRAND_DNA hoặc mô tả sản phẩm của bạn]

Tôi đang muốn nâng cấp giá trị cảm nhận cho sản phẩm: [mô tả sản phẩm/dịch vụ]
Mức giá hiện tại: [mức giá]
Khách hàng mục tiêu: [từ chân dung khách hàng]

Dựa vào công thức Value Equation của Alex Hormozi:
Value = (Dream Outcome x Perceived Likelihood of Achievement) / (Time Delay x Effort & Sacrifice)

Hãy phân tích offer hiện tại của tôi và gợi ý:
1. Dream Outcome: Làm thế nào để định nghĩa kết quả mơ ước cụ thể, cuốn hút hơn cho khách hàng?
2. Perceived Likelihood of Achievement: Đề xuất 3 cách/bằng chứng giúp khách tin tưởng họ sẽ làm được (ví dụ: bảo hành, tài liệu tặng kèm, checklist...).
3. Time Delay: Làm thế nào để giúp khách có kết quả nhỏ/chiến thắng đầu tiên nhanh nhất?
4. Effort & Sacrifice: Những gì có thể loại bỏ hoặc làm thay để giảm công sức và sự hy sinh của khách hàng?
5. Viết lại 3 phiên bản mô tả Offer mới cuốn hút nhất.`,

  '04': `Dưới đây là danh sách các đầu việc mà tôi (solopreneur) đang tự làm hàng ngày/hàng tuần:
[Liệt kê các đầu việc của bạn, ví dụ: viết content, trả lời inbox, gửi file cho khách, setup page, thiết kế ảnh...]

Hãy đóng vai trò chuyên gia tư vấn vận hành doanh nghiệp 1 người. Hãy giúp tôi phân tích và phân loại các việc này:
1. Nhóm A (Chỉ tôi mới làm được - lõi tư duy, sản phẩm): Danh sách việc giữ lại và tối ưu hóa thời gian.
2. Nhóm B (AI hoặc tự động hóa có thể làm thay): Gợi ý công cụ AI, cách tự động hóa (ví dụ: dùng Zapier, chatbot, hoặc AI generator) và skill tương ứng để setup.
3. Nhóm C (Việc không quan trọng/không tạo ra tiền): Đề xuất cắt bỏ hoặc tối giản.
4. Lên lịch làm việc tuần (Weekly Schedule) mới giúp tôi giải phóng 50% thời gian cho Nhóm B.`,

  '06': `[Dán BRAND_DNA hoặc mô tả sản phẩm của bạn]

Tôi đang kinh doanh một mình trong lĩnh vực: [mô tả lĩnh vực, ví dụ: dạy học tiếng Anh, bán đồ handmade, coaching...]
Khách hàng mục tiêu là: [từ chân dung khách hàng]

Hãy giúp tôi xây dựng "Bậc thang sản phẩm" (Value Ladder) để tối đa hóa doanh thu trên mỗi khách hàng (LTV):
1. Bậc vào cửa (Sản phẩm đầu phễu dưới 500k, giá trị cực cao, dễ quyết định mua): Gợi ý 3 ý tưởng.
2. Bậc trung (Sản phẩm chủ lực từ 500k - 3tr): Gợi ý 2 ý tưởng sản phẩm/dịch vụ.
3. Bậc cao (Sản phẩm cao cấp từ 3tr+ hoặc coaching/kèm cặp): Gợi ý 2 ý tưởng dịch vụ giá cao.
4. Chỉ ra điểm "Upsell" tự nhiên để dẫn dắt khách hàng từ bậc thấp lên bậc cao.`,

  '09': `[Dán mô tả sản phẩm và bậc thang giá của bạn]

Tôi muốn xây dựng một phễu bán hàng (sales funnel) tự động để bán: [sản phẩm muốn bán]
Nguồn traffic chính tôi muốn kéo từ: [ví dụ: Facebook cá nhân, Group, TikTok, Youtube, chạy Ads...]

Hãy thiết kế bản đồ phễu bán hàng chi tiết gồm các chặng:
1. Điểm chạm đầu tiên (Traffic): Khách thấy gì để thu hút sự chú ý?
2. Quà tặng/Mồi kéo khách (Lead Magnet): Trang nhận quà cần những nội dung gì?
3. Nuôi dưỡng (Nurture): Chuỗi nội dung/email gì để tạo niềm tin trong 3-5 ngày?
4. Trang bán hàng (Sales Page): Trình bày offer thế nào?
5. Chốt đơn & Chăm sóc sau bán: Quy trình tự động giao hàng và xin feedback.`,

  '10': `[Dán BRAND_DNA và thông tin sản phẩm của bạn]

Tôi muốn viết nội dung cho trang Landing Page bán sản phẩm/dịch vụ: [Tên sản phẩm]
Mức giá: [Mức giá]
Khách hàng mục tiêu: [Chân dung khách hàng]
Món quà đi kèm/Bảo hành: [Chi tiết nếu có]

Hãy viết cho tôi cấu trúc nội dung Landing Page bán hàng chuẩn chuyển đổi cao:
1. Tiêu đề chính (Headline) & Tiêu đề phụ (Subheadline) cuốn hút, nói rõ lợi ích.
2. Section Vấn Đề: Mô tả 3 nỗi đau lớn nhất mà khách hàng đang chịu đựng.
3. Section Giải Pháp: Giới thiệu sản phẩm của tôi giải quyết vấn đề đó thế nào.
4. Section Tính Năng & Lợi Ích: Liệt kê chi tiết những gì khách nhận được + lợi ích thực tế.
5. Section Giá Trị (Offer): Nêu bật giá bán + các quà tặng đi kèm (bonus) + cam kết bảo hành.
6. Câu kêu gọi hành động (CTA) cho nút bấm.`,

  '11': `Tôi đang dựng trang Landing Page bán sản phẩm/dịch vụ: [Tên sản phẩm]
Tính cách thương hiệu tôi muốn truyền tải: [Ví dụ: Tin cậy, chuyên nghiệp, hoặc trẻ trung, năng động, tối giản...]
Đối tượng khách hàng là: [Ví dụ: học sinh sinh viên, chủ doanh nghiệp, mẹ bỉm sữa...]

Hãy tư vấn cho tôi hệ thống thiết kế giao diện (Design System) tối giản gồm:
1. Bộ 3 màu chủ đạo (Mã màu Hex): 1 màu nền chính, 1 màu text/phụ, và 1 màu nút bấm CTA nổi bật (tương phản cao).
2. Lựa chọn Font chữ: Đề xuất cặp font Google Fonts dễ đọc, hiện đại.
3. Bố cục khoảng cách (Spacing & Padding) để trang thoáng, dễ đọc trên điện thoại.
4. Checklist 5 điểm cần kiểm tra để giao diện đạt chuẩn premium, thân thiện với thiết bị di động (mobile-first).`,

  '19': `[Dán BRAND_DNA và mô tả sản phẩm của bạn]

Tôi muốn xây dựng chiến dịch marketing ra mắt/quảng bá sản phẩm tại thị trường Việt Nam.
Sản phẩm: [Tên sản phẩm]
Kênh truyền thông chính: [Ví dụ: Facebook cá nhân, Zalo group, TikTok...]

Hãy thiết lập khung kế hoạch marketing phù hợp với hành vi mua sắm của người Việt:
1. Chiến lược kể câu chuyện cá nhân (Storytelling): Gợi ý dàn ý bài viết chia sẻ hành trình vượt khó của tôi để tạo sự đồng cảm.
2. Chiến lược tạo uy tín bằng bằng chứng thực tế (Social Proof): Cách thu thập và trình bày testimonial tự nhiên, không bị giả tạo.
3. Khung kịch bản mini game / quà tặng kích thích chia sẻ trên mạng xã hội để kéo tương tác tự nhiên.
4. Viết 3 mẫu caption ngắn chuẩn văn phong social Việt Nam (gần gũi, cuốn hút, CTA rõ ràng).`,

  '22': `Tôi muốn xây dựng kịch bản trả lời tự động cho chatbot trên Messenger/Instagram của Page bán sản phẩm: [Tên sản phẩm/dịch vụ]
Dưới đây là danh sách các câu hỏi khách hàng thường xuyên nhắn hỏi Page của tôi:
1. [Câu hỏi 1, ví dụ: Giá bao nhiêu vậy shop?]
2. [Câu hỏi 2, ví dụ: Có được kiểm tra hàng trước khi thanh toán không?]
3. [Câu hỏi 3, ví dụ: Khóa học này học online hay offline?]
4. [Câu hỏi 4, ví dụ: Có bảo hành/hoàn tiền không?]
5. [Câu hỏi 5, ví dụ: Tư vấn giúp mình nhé.]

Hãy đóng vai chuyên gia tối ưu trải nghiệm khách hàng, viết kịch bản chatbot tự động trả lời cho từng câu hỏi trên:
- Giọng văn: Gần gũi, lịch sự, ngắn gọn (dưới 100 từ mỗi câu trả lời).
- Cuối mỗi câu trả lời phải có gợi ý hành động tiếp theo (ví dụ: bấm nút để nhắn trực tiếp, điền form nhận quà...).`,

  '23': `Tôi muốn viết một ứng dụng React/Next.js đơn giản để tự động hóa việc đăng bài lên Facebook Page qua Facebook Graph API.
Yêu cầu chức năng:
1. Giao diện đơn giản có 1 ô nhập văn bản (textarea) để viết nội dung bài đăng.
2. 1 ô nhập link ảnh (nếu có).
3. 1 nút bấm "Đăng bài ngay".
4. Khi bấm, ứng dụng sẽ gọi API gửi bài viết đó lên Facebook Page của tôi bằng Page Access Token.

Hãy đóng vai chuyên gia React/Next.js, hướng dẫn tôi cấu trúc dự án và viết code cho:
1. Cách thiết lập API route trong Next.js (pages/api/post.ts hoặc App Router API route) sử dụng Fetch để POST lên https://graph.facebook.com.
2. Code giao diện React component đơn giản, đẹp mắt với Tailwind CSS hoặc CSS cơ bản.
3. Hướng dẫn các bước lấy Page Access Token và Page ID từ Facebook Developer Portal để dán vào biến môi trường .env.`,

  '24': `Tôi muốn sử dụng AI (như NotebookLM hoặc Claude) để nghiên cứu sâu một tài liệu/sách/báo cáo về chủ đề: [Tên chủ đề tài liệu, ví dụ: Báo cáo thị trường E-commerce Việt Nam 2025]

Hãy viết cho tôi bộ prompt/câu hỏi chất lượng cao để tôi hỏi AI sau khi upload tài liệu lên:
1. Prompt tóm tắt trích xuất 5 bài học cốt lõi lớn nhất.
2. Prompt tìm kiếm lỗ hổng/điểm yếu hoặc những nhận định có thể gây tranh cãi trong tài liệu.
3. Prompt rút ra 5 hành động thực tế (Actionable Items) áp dụng ngay cho business của tôi là: [mô tả ngắn business].
4. Prompt chuyển đổi tài liệu này thành kịch bản podcast 2 người thảo luận sinh động.`,

  '25': `Tôi đang học và thực hành [Tên Skill/Nhiệm vụ bạn đang làm] trong chương trình Solopreneur.
Tôi đang bị kẹt ở bước: [Mô tả chi tiết bước bị kẹt, ví dụ: deploy landing page bị lỗi trắng trang khi trỏ domain]
Thông tin lỗi/màn hình tôi thấy là: [Copy log lỗi hoặc mô tả lỗi]
Tôi đã thử những cách sau nhưng chưa được: [Ví dụ: Đã xóa cache, đã thử deploy lại...]

Nhờ Tiểu Hà Mã hướng dẫn tôi giải quyết lỗi này theo từng bước đơn giản, dễ hiểu nhé!`,
}

// ── HTML generator ────────────────────────────────────────────────────────────
function h(str) {
  return str.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;')
}

function generateHTML(skill) {
  const prompt = PROMPTS[skill.n]
  const prereq = skill.prereq

  const steps = getSteps(skill)

  return `<div style="font-family:'Segoe UI',system-ui,-apple-system,sans-serif;color:#1a2e1f;line-height:1.65;max-width:100%;">

  <!-- HEADER -->
  <div style="background:linear-gradient(135deg,#0d2b1a 0%,#1D9E75 100%);border-radius:16px;padding:28px 24px 24px;margin-bottom:24px;color:#fff;">
    <div style="display:flex;align-items:center;gap:8px;margin-bottom:12px;flex-wrap:wrap;">
      <span style="background:rgba(255,255,255,0.15);border-radius:100px;padding:3px 10px;font-size:11px;letter-spacing:1px;text-transform:uppercase;">Skill #${h(skill.n)}</span>
      <span style="background:rgba(255,255,255,0.15);border-radius:100px;padding:3px 10px;font-size:11px;">${h(skill.group)}</span>
    </div>
    <h1 style="font-size:22px;font-weight:800;margin:0 0 8px;line-height:1.3;">${h(skill.name)}</h1>
    <p style="margin:0 0 16px;opacity:0.88;font-size:14px;">${h(skill.does)}</p>
    <div style="display:flex;gap:10px;flex-wrap:wrap;">
      <span style="background:rgba(255,255,255,0.12);border:1px solid rgba(255,255,255,0.2);border-radius:100px;padding:5px 14px;font-size:12px;">⏱ ${h(skill.time)}</span>
      <span style="background:rgba(255,255,255,0.12);border:1px solid rgba(255,255,255,0.2);border-radius:100px;padding:5px 14px;font-size:12px;">🛠 ${h(skill.tool)}</span>
    </div>
  </div>

  <!-- MỤC TIÊU -->
  <div style="background:#f0faf5;border-left:4px solid #1D9E75;border-radius:0 12px 12px 0;padding:16px 18px;margin-bottom:24px;">
    <div style="font-weight:700;color:#0d2b1a;font-size:14px;margin-bottom:6px;">🎯 Bạn nhận được sau khi hoàn thành</div>
    <p style="margin:0;color:#2d5a3d;font-size:14px;">${h(skill.output)}</p>
  </div>

  ${prereq ? `<!-- PREREQ -->
  <div style="background:#fffbeb;border:1px solid #fcd34d;border-radius:12px;padding:16px 18px;margin-bottom:28px;">
    <div style="font-weight:700;color:#92400e;font-size:14px;margin-bottom:6px;">⚠️ Cần có trước khi làm skill này</div>
    <p style="margin:0;color:#78350f;font-size:13px;">Cần hoàn thành: <strong>${h(prereq)}</strong> — nếu chưa có thì làm xong trước rồi quay lại đây, kết quả sẽ tốt hơn nhiều.</p>
  </div>` : ''}

  <!-- CÁC BƯỚC -->
  ${steps.map((step, i) => `<div style="margin-bottom:24px;">
    <div style="display:flex;align-items:flex-start;gap:14px;">
      <div style="min-width:36px;height:36px;background:#0d2b1a;border-radius:50%;display:flex;align-items:center;justify-content:center;margin-top:2px;flex-shrink:0;">
        <span style="color:#fff;font-weight:800;font-size:14px;">${i+1}</span>
      </div>
      <div style="flex:1;">
        <h3 style="font-size:16px;font-weight:700;color:#0d2b1a;margin:0 0 8px;">${h(step.title)}</h3>
        <p style="color:#555;font-size:14px;margin:0 0 10px;">${h(step.body)}</p>
        ${step.prompt ? `<div style="background:#0f172a;border-radius:10px;padding:16px;font-family:'Consolas','Courier New',monospace;font-size:12px;color:#e2e8f0;white-space:pre-wrap;overflow-x:auto;line-height:1.7;">${h(step.prompt)}</div>
        <p style="color:#6b7280;font-size:13px;margin:8px 0 0;font-style:italic;">💡 Đọc lướt kết quả — nhờ Claude chỉnh nếu chỗ nào nghe chung chung hoặc chưa đúng business của bạn.</p>` : ''}
        ${step.note ? `<p style="color:#6b7280;font-size:13px;margin:8px 0 0;font-style:italic;">💡 ${h(step.note)}</p>` : ''}
      </div>
    </div>
  </div>`).join('')}

  <!-- CHECKLIST -->
  <div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:12px;padding:20px;margin-bottom:24px;">
    <div style="font-weight:700;color:#0d2b1a;font-size:14px;margin-bottom:14px;">✅ Checklist trước khi qua skill tiếp theo</div>
    ${getChecklist(skill).map(item => `<label style="display:flex;align-items:flex-start;gap:10px;margin-bottom:10px;cursor:pointer;">
      <input type="checkbox" style="margin-top:2px;accent-color:#1D9E75;">
      <span style="font-size:14px;color:#374151;">${h(item)}</span>
    </label>`).join('')}
  </div>

  <!-- AI TIP -->
  <div style="background:#fffbeb;border:1px solid #fcd34d;border-radius:12px;padding:16px 18px;margin-bottom:24px;">
    <div style="font-weight:700;color:#92400e;font-size:13px;margin-bottom:6px;">💡 Tip AI-First</div>
    <p style="margin:0;color:#78350f;font-size:13px;">${h(getTip(skill))}</p>
  </div>

  <!-- FOOTER -->
  <div style="background:#0d2b1a;border-radius:12px;padding:16px 18px;display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:10px;">
    <p style="margin:0;color:rgba(255,255,255,0.6);font-size:13px;">Skill #${h(skill.n)} xong ✓</p>
    <p style="margin:0;color:#1D9E75;font-weight:600;font-size:13px;">→ Tiếp theo: ${h(getNext(skill))}</p>
  </div>

</div>`
}

function getSteps(skill) {
  const prompt = PROMPTS[skill.n]

  const writingSkills = ['13','14','15','16','17','18','19','20','21']
  const strategySkills = ['03','04','06','09']
  const toolSkills = ['11','22','24','25']

  if (prompt && !strategySkills.includes(skill.n) && !toolSkills.includes(skill.n)) {
    return [
      { title:`Chuẩn bị BRAND_DNA`, body:'Mở file BRAND_DNA (từ Skill #02). Nếu chưa có, bỏ qua bước này — nhưng kết quả sẽ chung chung hơn.', prompt:null, note:'File BRAND_DNA dán vào đầu mỗi lần dùng AI để AI giữ đúng giọng bạn.' },
      { title:`Dán prompt vào AI`, body:`Copy prompt bên dưới, điền vào các chỗ [...] rồi paste vào Claude, ChatGPT, Cursor, Antigravity hoặc các công cụ vibe coding khác:`, prompt:prompt, note:null },
      { title:`Đọc và chỉnh kết quả`, body:'AI sẽ cho ra bản đầu. Đọc lướt — chỗ nào nghe chung chung hoặc sai business của bạn thì nhờ AI chỉnh lại. Ví dụ: "Viết lại đoạn 2 cụ thể hơn cho ngành [ngành của tôi]."', prompt:null, note:null },
      { title:`Lưu output để dùng`, body:`Lưu kết quả vào Google Docs hoặc Notion. ${skill.output} — đây là thứ bạn cầm được.`, prompt:null, note:'Đặt tên file rõ ràng để tìm lại dễ. Ví dụ: "SKILL-' + skill.n + '-' + skill.name.replace(/ /g,'-') + '.md"' },
    ]
  }

  if (skill.n === '01') return [
    { title:'Liệt kê 3 khách đang mua nhiều nhất', body:'Nghĩ đến 3 khách hàng thật đang mua nhiều nhất hoặc dễ bán nhất. Viết tên (hoặc biệt danh) và ngành nghề của họ.', prompt:null, note:'Không cần nhiều. 3 người thật tốt hơn 30 người tưởng tượng.' },
    { title:'Phân tích chân dung bằng AI', body:'Paste prompt bên dưới vào AI — điền thông tin thật về khách của bạn:', prompt:PROMPTS['01'], note:null },
    { title:'Extract câu nói thật', body:'Tìm lại các tin nhắn, bình luận, hoặc email khách đã gửi. Copy những câu hay nhất vào file chân dung. Đây là "ngôn ngữ của khách" — dùng nguyên văn trong bài viết sẽ mạnh hơn tự viết nhiều.', prompt:null, note:null },
    { title:'Lưu file chân dung', body:'Lưu vào Notion hoặc Google Docs với tên "AVATAR-[tên nhóm khách].md". Đây là tài liệu sống — cập nhật khi bạn hiểu khách hơn.', prompt:null, note:'File này sẽ được dùng ở hầu hết skill viết chữ sau này.' },
  ]

  if (skill.n === '02') return [
    { title:'Thu thập mẫu viết thật của bạn', body:'Tìm lại 5 bài viết/post/đoạn email bạn đã viết và thấy ổn. Không cần hay nhất — chỉ cần là giọng bình thường của bạn. Paste tất cả vào một file.', prompt:null, note:'Nếu chưa viết gì, hãy viết một đoạn 200 từ kể về business của bạn — bằng giọng bình thường như đang nhắn tin cho bạn bè.' },
    { title:'Tạo BRAND_DNA với AI', body:'Paste prompt bên dưới vào AI cùng với 5 bài viết của bạn:', prompt:PROMPTS['02'], note:null },
    { title:'Test BRAND_DNA ngay', body:'Dán BRAND_DNA vào đầu một cuộc chat mới. Rồi yêu cầu: "Viết 1 bài Facebook 200 từ về [chủ đề bạn biết]." Đọc kết quả — nếu nghe gần giống giọng bạn là đạt.', prompt:null, note:null },
    { title:'Chỉnh và lưu', body:'Nếu chỗ nào AI chưa bắt được giọng đúng, thêm ví dụ cụ thể vào BRAND_DNA. Lưu file cuối cùng — đây là thứ bạn dùng mãi.', prompt:null, note:'BRAND_DNA là "linh hồn" của mọi skill viết chữ. Skill nào cũng cần dán nó vào đầu.' },
  ]

  if (skill.n === '03') return [
    { title:'Hiểu Value Equation', body:'Hormozi nói giá trị cảm nhận = (Kết quả mơ ước × Xác suất thành công) / (Thời gian chờ × Công sức bỏ ra). Cái bạn cần làm: tăng tử số và giảm mẫu số.', prompt:null, note:'Không cần nhớ công thức — chỉ cần nhớ: tăng kết quả + tăng niềm tin thành công + giảm thời gian chờ + giảm công sức = giá trị cao hơn.' },
    { title:'Chấm điểm offer hiện tại với AI', body:'Copy prompt dưới đây, điền thông tin và chạy trên AI để phân tích và tự chấm điểm:', prompt:PROMPTS['03'], note:null },
    { title:'Tìm 3 điểm nâng giá trị', body:'Dựa vào bài chấm, tìm 3 điểm cụ thể có thể cải thiện. Ví dụ: thêm bảo hành, rút ngắn thời gian thấy kết quả đầu tiên, thêm hướng dẫn từng bước.', prompt:null, note:null },
    { title:'Viết lại mô tả offer mới', body:'Viết 3 câu giới thiệu offer theo cấu trúc: "[Ai] có thể [kết quả cụ thể] trong [thời gian] mà không cần [công sức lớn] — cam kết [bảo hành]."', prompt:null, note:'Câu mô tả này dùng ngay cho trang bán và quảng cáo ở các skill sau.' },
  ]

  if (skill.n === '04') return [
    { title:'Audit thời gian tuần này', body:'Viết ra tất cả việc bạn đã làm trong 3 ngày qua. Phân loại từng việc: (A) Chỉ mình làm được — (B) AI có thể làm được — (C) Việc không cần thiết.', prompt:null, note:'Đa số người phát hiện ra 40-60% thời gian đang dùng cho nhóm B — việc AI có thể làm thay.' },
    { title:'Lập danh sách AI sẽ thay', body:'Copy prompt dưới đây để AI giúp phân tích và gợi ý các việc có thể tự động hóa bằng AI:', prompt:PROMPTS['04'], note:null },
    { title:'Dựng lịch tuần mới', body:'Vẽ lịch tuần tiếp theo chỉ gồm nhóm A (việc chỉ mình làm được). Các nhóm B chuyển sang AI. Nhóm C cắt bỏ. Mục tiêu: mỗi ngày làm ít hơn nhưng đúng hơn.', prompt:null, note:null },
    { title:'Đặt 1 review mỗi tuần', body:'Mỗi thứ Sáu dành 15 phút: xem lại tuần qua, chuyển thêm 1-2 việc sang AI. Dần dần hệ thống tự chạy nhiều hơn.', prompt:null, note:'Thứ tự ưu tiên: setup xong skill nào → chuyển việc đó sang AI → qua skill tiếp theo.' },
  ]

  if (skill.n === '06') return [
    { title:'List tất cả sản phẩm đang có', body:'Viết ra tất cả thứ bạn có thể bán — từ dịch vụ 1 lần, khóa học, tư vấn, đến sản phẩm digital. Không cần đang bán thật — ý tưởng cũng được.', prompt:null, note:null },
    { title:'Vẽ bậc thang giá với AI', body:'Copy prompt dưới đây để AI đề xuất bậc thang sản phẩm tối ưu cho business của bạn:', prompt:PROMPTS['06'], note:null },
    { title:'Tìm điểm upsell tự nhiên', body:'Với mỗi sản phẩm, hỏi: "Sau khi khách mua xong, điều tiếp theo họ cần là gì?" Đó chính là sản phẩm upsell. Kết nối các sản phẩm thành hành trình tự nhiên.', prompt:null, note:'Ví dụ: Mua mini course → Muốn làm sâu hơn → Mua khóa đầy đủ → Muốn được kèm tay → Mua 1-kèm-1.' },
    { title:'Vẽ sơ đồ và lưu', body:'Vẽ sơ đồ bậc thang trên giấy hoặc Miro. Lưu lại — đây là "bản đồ tiền" của bạn. Mỗi quyết định marketing sau này đều nhắm vào việc đưa khách lên bậc tiếp theo.', prompt:null, note:null },
  ]

  if (skill.n === '09') return [
    { title:'Xác định traffic đang có', body:'Khách lạ của bạn đang ở đâu? Facebook, TikTok, Google, giới thiệu? Đây là điểm đầu phễu — bạn cần content/quảng cáo ở đó để kéo họ vào.', prompt:null, note:null },
    { title:'Thiết kế phễu bán hàng với AI', body:'Copy prompt dưới đây để AI phác thảo chi tiết phễu bán hàng tự động cho bạn:', prompt:PROMPTS['09'], note:null },
    { title:'Xác định "lỗ thủng" phễu', body:'Nhìn vào phễu vừa vẽ. Bước nào bạn chưa có? Bước nào khách hay rớt ra? Đó là điểm cần fix trước tiên — không cần phễu hoàn hảo, chỉ cần không rớt quá nhiều ở 1 bước.', prompt:null, note:null },
    { title:'Ưu tiên làm từ đâu', body:'Làm từ cuối phễu ra trước: đầu tiên có trang bán (Skill #10) → rồi mới cần traffic đổ vào. Nhiều người làm ngược — kéo traffic vào rồi không có trang nhận.', prompt:null, note:null },
  ]

  if (skill.n === '11') return [
    { title:'Audit trang hiện tại trên điện thoại', body:'Mở trang của bạn trên điện thoại (không phải máy tính). Nhìn bằng mắt khách lạ: font có đọc được không? Hình có load nhanh không? Nút có bấm được không? Ghi lại 3 vấn đề chính.', prompt:null, note:'90% khách Việt Nam xem trang bán trên điện thoại. Nếu điện thoại xấu thì máy tính đẹp cũng không quan trọng.' },
    { title:'Thiết kế giao diện cùng AI', body:'Copy prompt dưới đây để AI tư vấn hệ thống màu sắc, typography và checklist di động tối ưu:', prompt:PROMPTS['11'], note:null },
    { title:'Chỉnh font và khoảng cách', body:'Font: 1 font thôi (không mix). Size tối thiểu 16px cho thân bài, 24px+ cho tiêu đề. Khoảng cách: thêm padding/margin — trang bị chật chội trông kém chuyên nghiệp hơn trang thoáng.', prompt:null, note:null },
    { title:'Test lại và so sánh', body:'Mở trang cũ và trang mới cùng lúc. Nhờ 1 người khác xem và nói: "Em nhìn trang này thấy bán gì, cho ai?" — nếu họ nói được trong 5 giây là đạt.', prompt:null, note:null },
  ]

  if (skill.n === '22') return [
    { title:'Map 10 câu hỏi khách hay nhắn', body:'Lục lại inbox Messenger/Instagram 1 tháng qua. Liệt kê 10 câu hỏi khách hay hỏi nhất. Nhóm chúng thành 3-5 chủ đề (giá, sản phẩm, thời gian giao hàng, địa chỉ...).', prompt:null, note:'Bot chỉ cần trả lời được 10 câu này là đã giải quyết được 70-80% khối lượng inbox.' },
    { title:'Viết kịch bản bot với AI', body:'Copy prompt dưới đây, điền các câu hỏi hay gặp của bạn để AI viết kịch bản chatbot tự động:', prompt:PROMPTS['22'], note:null },
    { title:'Cài vào Meta Business Suite', body:'Vào Meta Business Suite → Inbox → Automation. Tạo câu trả lời tự động cho từng từ khóa. Bật "Instant Reply" để trả lời ngay khi khách nhắn lần đầu.', prompt:null, note:null },
    { title:'Test và tối ưu', body:'Nhờ bạn bè nhắn thử từng câu hỏi. Xem bot trả lời có đúng không. Chỉnh những chỗ còn cứng nhắc hoặc sai thông tin.', prompt:null, note:'Bot không cần hoàn hảo ngay — cứ bật lên rồi cải thiện dần theo feedback thật từ khách.' },
  ]

  if (skill.n === '24') return [
    { title:'Upload tài liệu vào NotebookLM', body:'Vào notebooklm.google.com → tạo notebook mới → upload file (PDF, Word, Google Doc, link bài viết). Có thể upload nhiều file cùng lúc cho 1 chủ đề.', prompt:null, note:'NotebookLM miễn phí 100%. Chỉ cần tài khoản Google.' },
    { title:'Hỏi sâu về tài liệu với AI', body:'Copy prompt dưới đây để hỏi sâu tài liệu trong NotebookLM hoặc Claude:', prompt:PROMPTS['24'], note:null },
    { title:'Tạo podcast và quiz', body:'Click "Audio Overview" → NotebookLM tự tạo podcast 2 người đối thoại về tài liệu. Click "Study Guide" → có quiz và mindmap. Dùng để học nhanh hoặc chia sẻ insight cho team.', prompt:null, note:null },
    { title:'Lưu lại insights vào Notion', body:'Copy những insight quan trọng nhất sang Notion hoặc Google Docs. Tạo thư mục riêng cho từng chủ đề nghiên cứu — theo thời gian sẽ có kho kiến thức đáng giá.', prompt:null, note:null },
  ]

  if (skill.n === '25') return [
    { title:'Kết nối Tiểu Hà Mã trên Telegram', body:'Tìm Tiểu Hà Mã trên Telegram theo hướng dẫn trong email xác nhận khóa học. Nếu Khóa 2 — Dũng sẽ cài riêng theo business của bạn trong tuần đầu.', prompt:null, note:'Khóa 1: Tiểu Hà Mã trả lời câu hỏi về skill và SOP. Khóa 2: được cài riêng, biết sản phẩm và giọng viết của bạn.' },
    { title:'Cách hỏi hiệu quả', body:'Copy cấu trúc sau để nhắn tin cho trợ lý AI Tiểu Hà Mã mỗi khi bạn gặp khó khăn:', prompt:PROMPTS['25'], note:null },
    { title:'Hỏi bất kỳ lúc nào kẹt', body:'Kẹt ở bước nào trong SOP → nhắn Tiểu Hà Mã luôn. Không cần đợi. Không cần ngại hỏi câu "ngớ ngẩn". Kẹt mà không hỏi mới tốn thời gian.', prompt:null, note:null },
  ]

  if (skill.n === '23') return [
    { title:'Chuẩn bị môi trường (Khóa 2 only)', body:'Skill này cần Dũng kèm sát trực tiếp. Đây là tóm tắt để bạn biết trước sẽ làm gì: Cài Node.js + Cursor → Tạo Facebook App → Lấy token → Build app React → Deploy Vercel.', prompt:null, note:'Nếu bạn đang ở Khóa 1 xem thử, đây là lý do skill này chỉ ở Khóa 2 — nhiều bước kỹ thuật cần kèm tay mới làm xong không bị kẹt giữa chừng.' },
    { title:'Kết nối với Dũng để bắt đầu', body:'Nhắn Telegram @KentHoang "Em muốn làm Skill #23". Dũng sẽ sắp lịch 1-1. Bạn cũng có thể dùng prompt dưới đây dán vào Cursor/Antigravity để tham khảo cách dựng code trước:', prompt:PROMPTS['23'], note:null },
    { title:'Test app sau khi xong', body:'App hoàn chỉnh sẽ làm được: gõ chủ đề → AI viết bài theo giọng bạn → xem preview → bấm 1 nút → bài lên Facebook Page. Không cần mở trình duyệt Facebook.', prompt:null, note:'Sau khi app chạy, tốc độ đăng bài tăng 10x — thay vì mở trình duyệt, copy, dán, format, lại mở ảnh...' },
  ]

  // Default: strategy/general skills
  return [
    { title:'Đọc mục tiêu và chuẩn bị', body:`Skill này cho bạn: ${skill.output}. Dành 5 phút đọc lại output cần đạt trước khi bắt đầu.`, prompt:null, note:null },
    { title:'Tạo output với AI', body:'Dán BRAND_DNA vào Claude. Mô tả business của bạn và yêu cầu AI giúp tạo output cụ thể theo tên skill này.', prompt:prompt || null, note:null },
    { title:'Chỉnh cho đúng business', body:'Đọc kết quả AI cho ra. Chỉnh những chỗ chưa phù hợp với thực tế business của bạn. AI gợi ý khung — bạn điền nội dung thật.', prompt:null, note:null },
    { title:'Lưu và dùng ngay', body:`Lưu file kết quả. ${skill.output} — đây là thứ bạn có thể dùng ngay trong business.`, prompt:null, note:null },
  ]
}

function getChecklist(skill) {
  const common = [
    `Đã có output cụ thể: ${skill.output}`,
    'Đã lưu file kết quả để dùng lại',
    'Đã đọc lại và chỉnh cho đúng business của mình',
  ]
  const extras = {
    '01': ['Đã có ít nhất 3 pain cụ thể của khách (không phải đoán)', 'Đã thu thập ít nhất 5 câu nói thật của khách'],
    '02': ['AI viết thử 1 bài và nghe gần đúng giọng mình', 'File BRAND_DNA đã lưu sẵn để dán vào skill tiếp theo'],
    '10': ['Trang có link chia sẻ được', 'Xem ổn trên điện thoại', 'Nút liên hệ/đặt hàng hoạt động'],
    '13': ['Đã có 3 mẫu ads với 3 góc độ khác nhau', 'Chọn được 1 mẫu để test trước'],
    '15': ['Đủ 5 email từ chào tới offer', 'Subject line của email 1 thu hút (open rate dự kiến > 30%)'],
    '22': ['Bot trả lời được 10 câu hỏi phổ biến nhất', 'Đã test thử trước khi bật thật'],
  }
  return [...common, ...(extras[skill.n] || [])]
}

function getTip(skill) {
  const tips = {
    '01': 'Câu nói thật của khách > câu bạn tự nghĩ. Cứ lấy nguyên văn inbox/comment của khách paste vào bài viết — hiệu quả hơn hẳn.',
    '02': 'BRAND_DNA không cần hoàn hảo ngay. Cứ dùng trước, chỉnh dần khi thấy chỗ nào AI chưa viết đúng giọng.',
    '03': 'Tăng giá trị cảm nhận dễ nhất: thêm cam kết hoàn tiền. Nhiều người sợ bị hoàn, nhưng thực tế chưa đến 5% khách yêu cầu.',
    '04': 'Mỗi tuần chỉ cần chuyển thêm 1 việc sang AI. 24 tuần sau sẽ có 24 việc AI làm thay — và bạn rảnh ra đúng đó.',
    '05': 'Tên cơ chế hay không cần nghe fancy. Chỉ cần nó mô tả đúng cái bạn làm, không ai khác dùng tên đó là được.',
    '06': 'Bậc thang giá càng đơn giản càng tốt. Bán 3 sản phẩm rõ ràng dễ hơn bán 10 sản phẩm tương tự nhau.',
    '07': 'Offer tốt nhất là cái bạn tự thấy "trời ơi sao rẻ vậy". Nếu bạn không cảm thấy vậy, offer chưa đủ mạnh.',
    '08': 'Mồi tốt nhất là thứ khách có thể dùng ngay trong 15 phút. Ebook 30 trang ít ai đọc. Checklist 1 trang hiệu quả hơn nhiều.',
    '09': 'Phễu đơn giản nhất hoạt động: ads → trang opt-in → email 1 → trang bán. Không cần phức tạp hơn để bắt đầu.',
    '10': 'Trang bán hay nhất là trang nói được pain của khách chính xác hơn họ tự nói được. Dùng câu từ chân dung khách (Skill #01) là sẽ được như vậy.',
    '11': 'Mobile-first: thiết kế cho điện thoại trước, máy tính sau. Hầu hết builder kéo thả đều cho preview mobile riêng — dùng đó.',
    '12': 'SEO hiệu quả nhất: 1 bài 800-1200 từ về 1 từ khóa cụ thể. Viết 12 bài như vậy = 1 bài mỗi tháng = organic traffic ổn định.',
    '13': 'Hook đầu tiên quyết định 80% hiệu quả ads. Viết 5 hook khác nhau → chạy thử cùng ngân sách nhỏ → giữ hook nào CTR cao nhất.',
    '14': '3 giây đầu tiên quyết định người xem có ở lại không. Hook mở đầu phải gây tò mò hoặc nói trúng pain ngay — không chào hỏi dài.',
    '15': 'Email 1 quan trọng nhất. Open rate email 1 cao nhất vì khách vừa opt-in còn "nóng". Tặng giá trị ngay trong email 1 — đừng bán vội.',
    '16': 'Tin nhắn vớt khách tốt nhất là không nhắc chuyện mua bán. Hỏi thăm, chia sẻ insight mới, cho họ lý do để reply. Khi đã reply rồi mới dẫn về offer.',
    '17': 'Câu hỏi hay hơn lời giới thiệu. "Anh/chị đang gặp khó khăn gì nhất với [chủ đề]?" → nghe câu trả lời → liên kết sản phẩm với đúng vấn đề đó.',
    '18': 'Nhân bản content: 1 bài dài → cắt thành 5 post ngắn → cắt lại thành 3 story → ghi âm thành podcast → quay lại thành video. 1 ý tưởng sống được 2 tuần.',
    '19': 'Framework mạnh nhất cho người Việt: câu chuyện cá nhân + bài học + áp dụng ngay. Người Việt thích học từ người đã trải qua, không phải từ chuyên gia xa cách.',
    '20': 'Slide đầu carousel là quan trọng nhất — phải đủ gây tò mò để người ta vuốt tiếp. Test 3 slide cover khác nhau và xem cái nào được save nhiều hơn.',
    '21': 'Cách test tiêu đề nhanh nhất: paste 10 tiêu đề vào nhóm Zalo bạn bè hoặc hỏi 3 người trong target. Cái nào họ muốn đọc nhất → dùng cái đó.',
    '22': 'Bật instant reply trước — bot chỉ cần trả lời được 1 câu "Xin chào! Mình cần hỗ trợ gì?" là đã tốt hơn để khách chờ 2 tiếng không ai reply.',
    '23': 'App này tiết kiệm được khoảng 20-30 phút mỗi lần đăng bài vì không phải copy-paste qua lại. 30 bài/tháng = 10-15 giờ tiết kiệm được.',
    '24': 'NotebookLM tốt nhất cho: đọc sách nhanh, nghiên cứu đối thủ, tóm tắt báo cáo dài. Upload tài liệu → hỏi "Rút ra 5 điều áp dụng được ngay cho [ngành của tôi]."',
    '25': 'Hỏi sớm là thông minh. Mỗi giờ kẹt một mình = lãng phí. Nhắn Tiểu Hà Mã là đúng cách — đó là lý do nó ở đây.',
  }
  return tips[skill.n] || `Đừng bỏ qua bước test thực tế. ${skill.output} — dùng ngay vào business và chỉnh dựa trên kết quả thật.`
}

function getNext(skill) {
  const nexts = {
    '01':'Skill #02 — Giọng Văn Thương Hiệu (BRAND_DNA)',
    '02':'Skill #03 — Tư Duy Offer Kiểu Hormozi',
    '03':'Skill #04 — Tư Duy Vận Hành Một Mình',
    '04':'Skill #05 — Cơ Chế Khác Biệt',
    '05':'Skill #06 — Mô Hình Doanh Thu',
    '06':'Skill #07 — Thiết Kế Offer',
    '07':'Skill #08 — Mồi Miễn Phí Kéo Khách',
    '08':'Skill #09 — Vẽ Phễu Bán Hàng',
    '09':'Skill #10 — Dựng Landing Page',
    '10':'Skill #11 — Làm Đẹp Giao Diện',
    '11':'Skill #12 — Viết Bài SEO',
    '12':'Skill #13 — Quảng Cáo Facebook/TikTok',
    '13':'Skill #14 — Kịch Bản Video Bán Hàng',
    '14':'Skill #15 — Chuỗi Email Bán Hàng',
    '15':'Skill #16 — Vớt Khách Nguội',
    '16':'Skill #17 — Kịch Bản Gọi Chốt Đơn',
    '17':'Skill #18 — Hệ Thống Content Đa Kênh',
    '18':'Skill #19 — Marketing Việt Nam',
    '19':'Skill #20 — Carousel Instagram',
    '20':'Skill #21 — Tiêu Đề Thu Hút',
    '21':'Skill #22 — Chatbot Messenger & Instagram',
    '22':'Skill #24 — Nghiên Cứu Tài Liệu Bằng AI',
    '23':'Skill #24 — Nghiên Cứu Tài Liệu Bằng AI',
    '24':'Skill #25 — Tiểu Hà Mã (Telegram)',
    '25':'Bắt đầu tổng hợp — dựng hệ thống 30 ngày',
  }
  return nexts[skill.n] || 'Skill tiếp theo trong danh sách'
}

// ── Map: khóa → danh sách skill numbers theo thứ tự sort_order ───────────────
const COURSE_MAP = {
  // Khóa 1: skill #23 không có → skip (chỉ 24 lessons sau intro)
  khoa1_686:  ['01','02','03','04','05','06','07','08','09','10','11','12','13','14','15','16','17','18','19','20','21','22','24','25'],
  // Khóa 2: skill #23 (Build App) đặt cuối cùng trong DB
  khoa2_2768: ['01','02','03','04','05','06','07','08','09','10','11','12','13','14','15','16','17','18','19','20','21','22','24','25','23'],
}

// ── Main ──────────────────────────────────────────────────────────────────────
async function main() {
  let totalUpdated = 0

  for (const [courseId, skillNums] of Object.entries(COURSE_MAP)) {
    console.log(`\n── ${courseId} (${skillNums.length} lessons) ──`)

    const { data: lessons, error } = await supabase
      .from('lessons')
      .select('id, title, sort_order')
      .eq('course_id', courseId)
      .order('sort_order')

    if (error) { console.error('Lỗi fetch lessons:', error.message); continue }

    // Bỏ qua lesson intro (sort_order đầu tiên nếu title không có "Skill")
    const skillLessons = lessons.filter(l => /skill\s*\d+/i.test(l.title) || /bài\s*\d+/i.test(l.title))
    const useLessons = skillLessons.length === skillNums.length ? skillLessons : lessons.filter((_, i) => i > 0)

    if (useLessons.length !== skillNums.length) {
      console.warn(`  ⚠️  DB có ${useLessons.length} skill-lessons nhưng map có ${skillNums.length} — kiểm tra lại`)
    }

    for (let i = 0; i < Math.min(useLessons.length, skillNums.length); i++) {
      const lesson  = useLessons[i]
      const skillN  = skillNums[i]
      const skill   = SKILLS.find(s => s.n === skillN)
      if (!skill) { console.warn(`  Không tìm thấy skill #${skillN}`); continue }

      const html = generateHTML(skill)
      const { error: upErr } = await supabase
        .from('lessons')
        .update({ content_html: html })
        .eq('id', lesson.id)

      if (upErr) {
        console.error(`  ✗ [${lesson.sort_order}] ${lesson.title} → Skill #${skillN}: ${upErr.message}`)
      } else {
        console.log(`  ✓ [${lesson.sort_order}] ${lesson.title} → Skill #${skillN} "${skill.name}"`)
        totalUpdated++
      }
    }
  }

  // Mini course: chỉ update skill #02 và #10
  console.log(`\n── mini_368 (2 lessons: BRAND_DNA + Landing Page) ──`)
  for (const [skillN, matchTitle] of [['02', 'BRAND_DNA'], ['10', 'Landing']]) {
    const { data: rows } = await supabase
      .from('lessons')
      .select('id, title')
      .eq('course_id', 'mini_368')
      .ilike('title', `%${matchTitle}%`)
      .limit(1)

    if (!rows || rows.length === 0) {
      console.warn(`  ⚠️  Không tìm thấy lesson có "${matchTitle}" trong mini_368`)
      continue
    }
    const skill = SKILLS.find(s => s.n === skillN)
    const html  = generateHTML(skill)
    const { error: upErr } = await supabase
      .from('lessons')
      .update({ content_html: html })
      .eq('id', rows[0].id)

    if (upErr) console.error(`  ✗ mini ${skillN}: ${upErr.message}`)
    else { console.log(`  ✓ mini ${skillN} "${skill.name}" → "${rows[0].title}"`); totalUpdated++ }
  }

  console.log(`\n✅ Xong. Tổng cộng đã update ${totalUpdated} lessons.`)
}

main().catch(console.error)
