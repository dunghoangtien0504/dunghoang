// ─────────────────────────────────────────────────────────────────────────────
// NGUỒN SỰ THẬT — 24 SKILL AI CỦA DŨNG HOÀNG
//
// Mỗi skill ở đây là MỘT QUY TRÌNH (SOP) CÓ THẬT, làm được bằng AI (ChatGPT/Claude)
// cộng công cụ phổ thông (Canva, Google Docs, Telegram...). KHÔNG bịa khả năng.
//
// Nguyên tắc để KHÔNG bị khách nói lừa dối:
//   - "output" = thứ học viên THỰC SỰ cầm được sau khi làm xong skill.
//   - "tự động tới đâu" ghi rõ: cái gì AI làm, cái gì học viên vẫn phải bấm tay.
//   - Không hứa "tự chạy 100% không cần đụng tay" cho việc thực ra phải review.
//
// Phân bổ khóa:
//   - Mini 368k     : chỉ skill #10 (Landing Page) + tặng kèm BRAND_DNA (#2).
//   - Khóa 1 686k   : 24 skill, tự học theo SOP + Tiểu Hà Mã hỏi-đáp Telegram.
//   - Khóa 2 2.768k : đủ 24 skill + SOP từng bước dựng cả hệ thống + Tiểu Hà Mã kèm sát 24/7 + 1 buổi 1-kèm-1.
// ─────────────────────────────────────────────────────────────────────────────

export type SkillGroup =
  | 'Nền tảng'
  | 'Chiến lược'
  | 'Phễu & Trang bán'
  | 'Viết chữ bán hàng'
  | 'Sản xuất nội dung'
  | 'Tự động hóa'

export interface Skill {
  n:        string          // số thứ tự "01".."25"
  name:     string          // tên skill (tiếng Việt, dễ hiểu)
  agent:    string          // tên agent/kỹ thuật gốc — để minh bạch nội bộ
  group:    SkillGroup
  does:     string          // skill này làm được gì (mô tả thật)
  output:   string          // học viên cầm được gì sau khi làm
  auto:     string          // tự động tới đâu — minh bạch phần phải làm tay
  inMini?:   boolean         // có trong Mini 368k không
  proven?:   boolean         // đã được chứng minh trong Challenge 7 ngày
  khoa2Only?: boolean        // chỉ có ở Khóa 2 (quá kỹ thuật để tự học Khóa 1)
}

export const SKILLS: Skill[] = [
  // ── NHÓM 1 — NỀN TẢNG ──────────────────────────────────────────────────────
  {
    n: '01', name: 'Chân Dung Khách Hàng', agent: 'Avatar Builder', group: 'Nền tảng',
    does: 'Phân tích để biết khách của bạn là ai, đang đau điều gì, muốn gì, hay nói câu gì.',
    output: 'Một bản mô tả khách hàng chi tiết để dùng cho mọi bài viết và quảng cáo sau này.',
    auto: 'AI hỏi bạn vài câu rồi tổng hợp. Bạn vẫn cần biết khách thật của mình.',
  },
  {
    n: '02', name: 'Giọng Văn Thương Hiệu (BRAND_DNA)', agent: 'Brand Voice', group: 'Nền tảng',
    does: 'Dạy AI học đúng giọng viết của bạn, để bài AI viết ra nghe như chính bạn.',
    output: 'File BRAND_DNA dán vào AI một lần, dùng mãi cho mọi skill viết chữ.',
    auto: 'Sau khi nạp BRAND_DNA, AI tự giữ giọng. Bạn đọc lại và chỉnh nếu chưa giống.',
    inMini: true, proven: true,
  },
  {
    n: '03', name: 'Tư Duy Offer Kiểu Hormozi', agent: 'Hormozi System', group: 'Nền tảng',
    does: 'Khung tư duy đóng gói và định giá sao cho giá trị cảm nhận cao hơn giá tiền.',
    output: 'Cách nghĩ về offer + bảng tự chấm offer của bạn đang mạnh hay yếu.',
    auto: 'Đây là kiến thức + template. Bạn áp dụng vào sản phẩm của mình.',
  },
  {
    n: '04', name: 'Tư Duy Vận Hành Một Mình', agent: 'Founder Pro', group: 'Nền tảng',
    does: 'Bộ khung làm việc cho người kinh doanh một mình: từ định hướng tới việc hằng ngày.',
    output: 'Các template lên kế hoạch, ưu tiên việc, review tuần.',
    auto: 'Kiến thức + template để bạn tự dùng. Không phải phần mềm chạy thay.',
  },

  // ── NHÓM 2 — CHIẾN LƯỢC ─────────────────────────────────────────────────────
  {
    n: '05', name: 'Cơ Chế Khác Biệt', agent: 'Hero Mechanism', group: 'Chiến lược',
    does: 'Đặt tên và hệ thống hóa cách bạn làm ra kết quả, để khách khó so giá với người khác.',
    output: 'Tên cơ chế riêng + sơ đồ giải thích, dùng trong trang bán và quảng cáo.',
    auto: 'AI gợi ý nhiều phương án tên. Bạn chọn cái phù hợp nhất.',
  },
  {
    n: '06', name: 'Mô Hình Doanh Thu', agent: 'Money Model', group: 'Chiến lược',
    does: 'Vẽ bậc thang sản phẩm từ rẻ tới đắt để khách mua nhiều lần, tăng dần.',
    output: 'Bản đồ các sản phẩm và mức giá, biết bán gì trước, bán gì sau.',
    auto: 'AI gợi ý mô hình. Bạn quyết giá và sản phẩm thật của mình.',
  },
  {
    n: '07', name: 'Thiết Kế Offer', agent: 'Offer Architect', group: 'Chiến lược',
    does: 'Build từng lời đề nghị khó từ chối: quà tặng, bảo hành, đảo ngược rủi ro.',
    output: 'Một offer hoàn chỉnh sẵn để đưa lên trang bán.',
    auto: 'AI dựng khung offer. Bạn điền số liệu thật và cam kết thật của mình.',
  },

  // ── NHÓM 3 — PHỄU & TRANG BÁN ───────────────────────────────────────────────
  {
    n: '08', name: 'Mồi Miễn Phí Kéo Khách', agent: 'HVCO Creator', group: 'Phễu & Trang bán',
    does: 'Nghĩ ra quà tặng miễn phí (ebook, checklist, thử thách) để khách lạ để lại liên hệ.',
    output: 'Ý tưởng mồi + dàn ý nội dung mồi để bạn làm.',
    auto: 'AI ra ý tưởng và dàn ý. Bạn hoàn thiện nội dung mồi.',
  },
  {
    n: '09', name: 'Vẽ Phễu Bán Hàng', agent: 'Funnel Strategist', group: 'Phễu & Trang bán',
    does: 'Vẽ đường đi của khách từ lúc thấy bạn tới lúc mua, từng bước nối nhau.',
    output: 'Sơ đồ phễu để biết cần làm trang nào, email nào, theo thứ tự nào.',
    auto: 'AI vẽ bản đồ. Bạn dùng nó làm kim chỉ nam khi dựng hệ thống.',
  },
  {
    n: '10', name: 'Dựng Landing Page', agent: 'Landing Page Builder', group: 'Phễu & Trang bán',
    does: 'Tạo trang bán hàng hoàn chỉnh theo cấu trúc chuyển đổi cao, không cần code.',
    output: 'Một trang bán hàng thật chạy được, dùng được ngay.',
    auto: 'AI viết toàn bộ chữ + cấu trúc. Bạn lắp vào công cụ và đăng.',
    inMini: true,
  },
  {
    n: '11', name: 'Làm Đẹp Giao Diện', agent: 'UI/UX Pro Max', group: 'Phễu & Trang bán',
    does: 'Chỉnh trang cho đẹp, dễ đọc, nhanh, chuẩn điện thoại (90% khách VN xem bằng điện thoại).',
    output: 'Hướng dẫn màu, font, bố cục để trang của bạn nhìn chuyên nghiệp.',
    auto: 'Là bộ nguyên tắc + gợi ý cụ thể. Bạn áp vào trang của mình.',
  },
  {
    n: '12', name: 'Viết Bài SEO', agent: 'SEO Website', group: 'Phễu & Trang bán',
    does: 'Viết bài chuẩn Google để khách tự tìm tới mà không tốn tiền quảng cáo.',
    output: 'Bài viết SEO sẵn dạng HTML để đăng lên website.',
    auto: 'AI viết bài hoàn chỉnh. Bạn đăng và theo dõi thứ hạng.',
  },

  // ── NHÓM 4 — VIẾT CHỮ BÁN HÀNG ──────────────────────────────────────────────
  {
    n: '13', name: 'Quảng Cáo Facebook/TikTok', agent: 'Ad Copy Machine', group: 'Viết chữ bán hàng',
    does: 'Viết copy quảng cáo nhiều góc độ khác nhau để test xem cái nào ra đơn rẻ.',
    output: 'Nhiều mẫu quảng cáo sẵn để chạy ads hoặc đăng bài.',
    auto: 'AI viết mẫu. Bạn chọn, chạy thử, giữ mẫu nào hiệu quả.',
    proven: true,
  },
  {
    n: '14', name: 'Kịch Bản Video Bán Hàng', agent: 'VSL Scriptwriter', group: 'Viết chữ bán hàng',
    does: 'Viết kịch bản video từ câu hook đầu tới lời kêu gọi cuối, có gợi ý hình ảnh.',
    output: 'Kịch bản video sẵn để quay hoặc dựng slide.',
    auto: 'AI viết script. Bạn quay/dựng và đăng.',
    proven: true,
  },
  {
    n: '15', name: 'Chuỗi Email Bán Hàng', agent: 'Email Closer', group: 'Viết chữ bán hàng',
    does: 'Viết chuỗi email nuôi dưỡng và chốt sau khi khách để lại email.',
    output: 'Bộ email sẵn để dán vào công cụ gửi email.',
    auto: 'AI viết nội dung. Bạn cài lịch gửi tự động trên công cụ email.',
    proven: true,
  },
  {
    n: '16', name: 'Vớt Khách Nguội', agent: 'Follow-Up Engine', group: 'Viết chữ bán hàng',
    does: 'Viết email/tin nhắn nhắc lại cho người từng quan tâm nhưng chưa mua.',
    output: 'Bộ tin nhắn vớt khách sẵn để gửi.',
    auto: 'AI viết. Bạn gửi cho danh sách khách cũ.',
    proven: true,
  },
  {
    n: '17', name: 'Kịch Bản Gọi Chốt Đơn', agent: 'Sales Call Script', group: 'Viết chữ bán hàng',
    does: 'Script gọi điện tư vấn và chốt: từ mở đầu, hỏi nhu cầu, tới báo giá tự tin.',
    output: 'Kịch bản gọi điện + cách xử lý từ chối.',
    auto: 'Là script để bạn dùng khi gọi khách. Phần nói là bạn.',
    proven: true,
  },

  // ── NHÓM 5 — SẢN XUẤT NỘI DUNG ──────────────────────────────────────────────
  {
    n: '18', name: 'Hệ Thống Content Đa Kênh', agent: '10X Content System', group: 'Sản xuất nội dung',
    does: 'Sản xuất bài dài, bài viral, kịch bản, và nhân 1 nội dung thành nhiều dạng.',
    output: 'Lịch content + bài viết sẵn cho Facebook/TikTok/YouTube.',
    auto: 'AI viết theo giọng bạn (cần BRAND_DNA). Bạn duyệt rồi đăng.',
    proven: true,
  },
  {
    n: '19', name: 'Marketing Việt Nam', agent: 'Marketing Pro', group: 'Sản xuất nội dung',
    does: 'Bộ khung marketing cho người Việt: bài social, ad, video, email, ra mắt sản phẩm.',
    output: 'Các framework điền vào là có nội dung đúng nền tảng VN.',
    auto: 'Kiến thức + template. Bạn áp dụng cho ngành của mình.',
  },
  {
    n: '20', name: 'Carousel Instagram', agent: 'Instagram Carousel', group: 'Sản xuất nội dung',
    does: 'Lên bài nhiều slide dạy hoặc kể chuyện, kèm caption và hashtag.',
    output: 'Nội dung từng slide + caption sẵn để thiết kế và đăng.',
    auto: 'AI viết nội dung slide. Bạn thiết kế trên Canva và đăng.',
  },
  {
    n: '21', name: 'Tiêu Đề Thu Hút', agent: 'Headline Formula', group: 'Sản xuất nội dung',
    does: 'Tạo 10 tiêu đề mỗi lần theo nhiều kiểu: câu hỏi, số liệu, tò mò, list, story.',
    output: 'Danh sách tiêu đề để chọn cái hay nhất cho mỗi bài.',
    auto: 'AI ra 10 tiêu đề/lần. Bạn chọn và dùng.',
    proven: true,
  },

  // ── NHÓM 6 — TỰ ĐỘNG HÓA & CÔNG NGHỆ ────────────────────────────────────────
  {
    n: '22', name: 'AI Agent Chat Messenger', agent: 'Meta Business AI', group: 'Tự động hóa',
    does: 'Cấu hình trợ lý AI trả lời khách tự động trên Messenger của Page bạn.',
    output: 'Bản đặc tả copy-paste vào Meta Business Suite để trợ lý trả khách.',
    auto: 'Trợ lý trả tự động phần lớn; câu khó chuyển cho bạn. Cần Page Facebook.',
  },
  {
    n: '23', name: 'Nghiên Cứu Tài Liệu Bằng AI', agent: 'NotebookLM', group: 'Tự động hóa',
    does: 'Đưa tài liệu vào AI để tóm tắt, hỏi đáp, tạo podcast/quiz/mindmap từ tài liệu.',
    output: 'Bản tóm tắt, podcast, quiz... tạo từ tài liệu của bạn.',
    auto: 'Dùng công cụ NotebookLM miễn phí của Google. Có hướng dẫn từng bước.',
  },
  {
    n: '24', name: 'Trợ Lý AI Tiểu Hà Mã (Telegram)', agent: 'GoClaw Agent', group: 'Tự động hóa',
    does: 'Trợ lý AI trên Telegram trả lời thắc mắc khi bạn học và làm, theo SOP của khóa.',
    output: 'Một nơi hỏi 24/7 khi bị kẹt, không phải chờ.',
    auto: 'Khóa 1: hỏi-đáp khi học. Khóa 2: Dũng cài Tiểu Hà Mã riêng, kèm sát theo business của bạn.',
  },
]

// Tiện ích lọc theo khóa ──────────────────────────────────────────────────────
export const MINI_SKILLS   = SKILLS.filter(s => s.inMini)            // Mini 368k
export const KHOA1_SKILLS  = SKILLS                                  // Khóa 1 (24 skill)
export const ALL_SKILLS    = SKILLS                                  // Khóa 2 (đủ 24)

export const SKILL_GROUPS: SkillGroup[] = [
  'Nền tảng', 'Chiến lược', 'Phễu & Trang bán',
  'Viết chữ bán hàng', 'Sản xuất nội dung', 'Tự động hóa',
]
