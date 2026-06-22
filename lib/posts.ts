export interface Post {
  slug:        string
  title:       string
  description: string
  date:        string   // ISO YYYY-MM-DD
  category:    string
  readMin:     number
  content:     string  // HTML string
}

export const POSTS: Post[] = [
  {
    slug:        'ai-agent-la-gi-solopreneur-can-khong',
    title:       'AI Agent là gì? Solopreneur có cần không?',
    description: 'Bạn nghe nhiều về AI agent nhưng không rõ nó khác gì ChatGPT. Bài này giải thích đơn giản — và khi nào thì đáng dùng cho người kinh doanh một mình.',
    date:        '2026-06-10',
    category:    'AI thực chiến',
    readMin:     5,
    content: `
<p>Mình bắt đầu dùng AI agent vào tháng 9 năm ngoái. Lúc đó thực ra mình cũng không biết mình đang dùng cái gì. Mình chỉ biết là nó khác với việc gõ vào ChatGPT rồi chờ câu trả lời.</p>

<h2>ChatGPT và AI agent khác nhau chỗ nào?</h2>
<p>Dễ hiểu nhất: ChatGPT là người bạn thông minh mà bạn hỏi đâu trả lời đó. Còn AI agent giống như nhân viên — bạn giao việc, nó tự chạy, tự xử lý từng bước, rồi báo lại kết quả.</p>

<p>Ví dụ thực tế: Mình nhắn cho Tiểu Hà Mã (AI agent mình đang dùng): "Có khách hỏi giá khóa 2". Hà Mã không chỉ trả lời giá — nó hỏi thêm khách đang ở giai đoạn nào, đã mua Khóa 1 chưa, rồi mới đề xuất giá phù hợp.</p>

<p>Cái khác biệt đó là context — agent nhớ được SOP của bạn, biết business của bạn, và hành động theo đó.</p>

<h2>Solopreneur có cần không?</h2>
<p>Tùy vào bạn đang kẹt ở đâu. Mình thấy AI agent có ích nhất khi:</p>
<ul>
  <li>Bạn có quá nhiều tin nhắn khách cần trả lời cùng lúc</li>
  <li>Bạn muốn trả lời inbox tự động nhưng vẫn đúng giọng mình</li>
  <li>Bạn cần ai đó nhắc lịch, gửi follow-up, xử lý quy trình lặp đi lặp lại</li>
</ul>

<p>Còn nếu bạn chỉ cần AI viết content hay trả lời email thỉnh thoảng thì ChatGPT là đủ — không cần phức tạp thêm.</p>

<h2>Bắt đầu từ đâu?</h2>
<p>Mình hay khuyên: làm xong Skill 01 BRAND_DNA trước. Vì mọi AI agent — dù là Hà Mã hay bất kỳ tool nào — đều cần biết bạn là ai, bạn bán gì, và bạn muốn nó nói chuyện với khách theo giọng nào. Thiếu cái đó thì agent nào cũng sẽ trả lời chung chung.</p>

<p>Skill 01 mất khoảng 30-45 phút. Nhưng đó là nền cho mọi thứ sau này.</p>
`,
  },
  {
    slug:        'viet-content-facebook-bang-ai-dung-giong-minh',
    title:       'Viết content Facebook bằng AI mà vẫn đúng giọng mình — làm thế nào?',
    description: 'Vấn đề phổ biến nhất khi dùng AI viết bài: câu cứng, giọng không giống mình, đọc lên biết ngay là AI viết. Đây là cách mình giải quyết.',
    date:        '2026-06-15',
    category:    'Hướng dẫn',
    readMin:     6,
    content: `
<p>Hầu hết người dùng AI viết content rồi than: "Câu cứng quá", "Không giống mình viết", "Đọc lên biết ngay là AI".</p>

<p>Mình cũng gặp vấn đề đó. Cho đến khi mình hiểu ra vấn đề không phải ở AI — vấn đề là mình chưa bao giờ giải thích cho AI biết mình là ai.</p>

<h2>AI viết chung chung vì bạn prompt chung chung</h2>
<p>Khi bạn gõ "viết 1 bài Facebook về sản phẩm của mình" — AI không biết bạn là ai, bạn bán gì cho ai, bạn hay dùng từ gì, bạn hay mở bài kiểu nào.</p>

<p>Nó chỉ lấy pattern phổ biến nhất từ hàng triệu bài viết đã học. Kết quả: câu chung chung, giọng trung tính, không màu sắc.</p>

<h2>Giải pháp: BRAND_DNA</h2>
<p>BRAND_DNA là file mô tả giọng văn của bạn — từ cách mở bài, cấu trúc câu, những từ hay dùng, những cụm cần tránh, đến câu chuyện nền của bạn.</p>

<p>Mỗi khi nhờ AI viết, bạn paste file đó vào trước. AI đọc xong mới viết. Kết quả hoàn toàn khác.</p>

<p>Mình thử nghiệm: không có BRAND_DNA vs có BRAND_DNA — cùng một prompt, cùng chủ đề. Bài có BRAND_DNA mình không cần chỉnh gì. Bài không có thì phải sửa hết.</p>

<h2>Cách tạo BRAND_DNA nhanh</h2>
<p>Skill 01 trong Khóa 1 hướng dẫn từng bước tạo file này. Mất khoảng 30-45 phút nếu làm lần đầu. Sau đó bạn dùng mãi — không cần làm lại.</p>

<p>Những gì cần có trong file:</p>
<ul>
  <li>Bạn là ai, đang làm gì (1-2 câu thật ngắn)</li>
  <li>Bạn bán gì, cho ai</li>
  <li>Giọng văn: trang trọng hay thân mật, dùng "mình/bạn" hay "tôi/bạn"</li>
  <li>Kiểu mở bài bạn hay dùng</li>
  <li>Những từ/cụm nên tránh</li>
  <li>3-5 bài viết mẫu bạn thấy đúng giọng nhất</li>
</ul>

<p>Sau khi có file đó, mọi bài AI viết ra đều sẽ đúng giọng hơn — vì nó biết giọng của bạn là gì.</p>
`,
  },
  {
    slug:        '25-skill-ai-solopreneur-khong-can-thue-nhan-su',
    title:       '25 Skill AI giúp solopreneur không cần thuê nhân sự',
    description: 'Mỗi skill AI thay được 1 người: người viết content, người trả lời inbox, người làm ads, người setup hệ thống. Đây là bản đồ đầy đủ.',
    date:        '2026-06-20',
    category:    'AI thực chiến',
    readMin:     8,
    content: `
<p>Câu hỏi mình hay nhận: "Học AI xong thì thay được gì?"</p>

<p>Trả lời thẳng: tùy skill bạn học. Nhưng nếu học đúng bộ, bạn có thể không cần thuê người cho khá nhiều vị trí.</p>

<h2>Nhóm 1: Thay người viết content (3-5 triệu/tháng)</h2>
<p>Skill 02 Social Content, Skill 04 Video Script, Skill 05 Headline — ba cái này đủ để AI viết caption Facebook, kịch bản video ngắn, tiêu đề thu hút mỗi ngày. Bạn chỉ cần approve, không cần ngồi nghĩ từ đầu.</p>

<h2>Nhóm 2: Thay người trả lời khách (7-10 triệu/tháng)</h2>
<p>Skill 03 Sales Message + Tiểu Hà Mã (Khóa 2). Tiểu Hà Mã trả lời inbox tự động theo SOP bạn viết. Khách hỏi giá, hỏi chính sách, so sánh sản phẩm — Hà Mã xử lý. Bạn chỉ bước vào khi cần chốt.</p>

<h2>Nhóm 3: Thay người làm ads (3-5 triệu/tháng)</h2>
<p>Skill 06 Ads Copy giúp AI viết copy quảng cáo Facebook 3 góc độ khác nhau. Bạn test, giữ cái chạy tốt, bỏ cái còn lại. Không cần thuê người viết ads từng tuần.</p>

<h2>Nhóm 4: Thay người setup kỹ thuật (5-15 triệu một lần)</h2>
<p>Skill 08B Landing Page — bạn tự làm trang bán hàng mà không cần developer. Skill 23 Build App — bạn tự cài chatbot trên Telegram mà không cần code.</p>

<h2>Tính thật</h2>
<p>Mình không nói AI thay được hết mọi người. Nhưng với solopreneur bán sản phẩm số hay dịch vụ, 25 skill này tiết kiệm được ít nhất 50-70 triệu/tháng nếu so với thuê người làm những việc tương đương.</p>

<p>Và quan trọng hơn: bạn không phụ thuộc vào freelancer, không lo nhân viên nghỉ giữa chừng, không cần onboard người mới.</p>

<p>Hệ thống một khi đã chạy thì chạy. Không cần quản lý thêm.</p>
`,
  },
]

export function getPostBySlug(slug: string): Post | undefined {
  return POSTS.find(p => p.slug === slug)
}

export function getRecentPosts(n = 3): Post[] {
  return [...POSTS].sort((a, b) => b.date.localeCompare(a.date)).slice(0, n)
}
