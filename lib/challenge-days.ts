export type ChallengeDay = {
  day:    number
  title:  string
  skill:  string
  goal:   string
  sop:    string[]   // Các bước SOP
  task:   string     // Mô tả bài tập cần nộp
  proof:  string     // Hướng dẫn bằng chứng nộp
}

export const CHALLENGE_DAYS: ChallengeDay[] = [
  {
    day:   1,
    title: 'Nạp giọng văn — Dạy AI viết đúng giọng bạn',
    skill: 'BRAND DNA',
    goal:  'AI viết 1 bài Facebook nghe như chính bạn viết',
    sop: [
      'Mở ChatGPT hoặc Claude. Tạo cuộc trò chuyện mới.',
      'Copy đoạn prompt sau và paste vào: "Tôi sẽ cho bạn đọc 3 bài viết của tôi. Sau đó hãy học giọng văn của tôi và viết bài theo phong cách đó khi tôi yêu cầu. Chỉ xác nhận đã hiểu, chưa cần viết gì."',
      'Paste 3 bài viết cũ của bạn (Facebook, Zalo, email... bất kỳ). Càng dài càng tốt.',
      'Gõ: "Viết 1 bài Facebook khoảng 200 từ về [chủ đề gần nhất với business của bạn]. Viết đúng giọng tôi."',
      'Đọc lại — nếu nghe quen thì xong. Nếu chưa giống, gõ thêm: "Viết lại, bớt formal hơn, dùng ngôn ngữ gần gũi hơn."',
      'Copy bài AI viết ra → đăng lên Facebook hoặc Zalo cá nhân của bạn (không cần page, profile cá nhân là đủ).',
    ],
    task:  'Đăng bài AI viết lên Facebook/Zalo cá nhân thật',
    proof: 'Chụp màn hình bài đăng đã publish (kể cả chỉ 1 like cũng được). Paste link bài đăng + mô tả bạn đã làm gì.',
  },
  {
    day:   2,
    title: 'AI viết caption — Đăng 1 cái thật',
    skill: 'Social Content',
    goal:  'Có 3 caption sẵn, đăng 1 cái trong ngày',
    sop: [
      'Mở AI (tiếp nối cuộc trò chuyện ngày 1 để AI vẫn nhớ giọng bạn).',
      'Gõ: "Viết cho tôi 3 caption ngắn (50-100 từ mỗi cái) để đăng lên Facebook/Instagram về [sản phẩm/dịch vụ/chủ đề bạn kinh doanh]. Mỗi cái dùng một góc nhìn khác nhau."',
      'Đọc 3 cái → chọn 1 cái hay nhất.',
      'Nếu muốn chỉnh: gõ "Chỉnh cái số [X], làm ngắn hơn / thêm câu hỏi cuối / dùng emoji vừa phải."',
      'Copy caption đã chọn → đăng lên Facebook/Instagram/Zalo thật. Thêm ảnh nếu có.',
      'Lưu 2 caption còn lại vào note để dùng sau.',
    ],
    task:  'Đăng 1 caption AI viết lên mạng xã hội thật',
    proof: 'Chụp màn hình bài đăng đã publish. Paste link + ghi rõ bạn đã chọn caption nào và tại sao.',
  },
  {
    day:   3,
    title: 'AI viết email/tin nhắn chào hàng',
    skill: 'Sales Message',
    goal:  'Có 1 email chào hàng viết xong, gửi đi thật',
    sop: [
      'Chọn 1 nhóm khách hàng tiềm năng bạn đang có (list email, nhóm Zalo, danh sách SĐT...).',
      'Mở AI. Gõ: "Viết cho tôi 1 email/tin nhắn chào hàng ngắn (150-200 từ) gửi cho [mô tả khách hàng]. Sản phẩm/dịch vụ: [mô tả]. Tone: [thân thiện/chuyên nghiệp/tâm sự]. Đừng bán hàng quá lộ liễu — hỏi thăm trước."',
      'Đọc lại — chỉnh những chỗ sai thông tin về business của bạn.',
      'Gõ thêm: "Thêm 1 câu hỏi cuối để mở conversation" nếu tin nhắn đóng quá.',
      'Copy → gửi đi cho ít nhất 5 người thật (email hoặc Zalo/Messenger).',
      'Note lại phản hồi nào nhận được trong 24h.',
    ],
    task:  'Gửi email/tin nhắn chào hàng AI viết cho ít nhất 5 người thật',
    proof: 'Chụp màn hình inbox/hộp thư đã gửi (hiện tên người nhận). Ghi số người đã gửi và phản hồi nếu có.',
  },
  {
    day:   4,
    title: 'AI viết kịch bản video 60 giây',
    skill: 'Video Script',
    goal:  'Có kịch bản video sẵn để quay bất cứ lúc nào',
    sop: [
      'Mở AI. Gõ: "Viết kịch bản video ngắn 60 giây cho tôi đọc trước camera hoặc làm slide. Chủ đề: [1 vấn đề khách hàng hay gặp liên quan đến business của tôi]. Cấu trúc: Hook 5 giây đầu → Vấn đề → Giải pháp → CTA nhẹ."',
      'Đọc to thử — tính thời gian. Nếu dài hơn 60 giây, gõ: "Cắt ngắn lại còn 60 giây, giữ phần hook và CTA."',
      'Chọn 1 trong 2: (a) Quay video ngắn bằng điện thoại đọc theo kịch bản, hoặc (b) Tạo slide Canva 5-7 trang với nội dung từng đoạn.',
      'Đăng lên Facebook/TikTok/Instagram Reels, hoặc lưu vào máy nếu chưa muốn đăng ngay.',
    ],
    task:  'Quay video 60s theo kịch bản AI viết HOẶC tạo slide Canva từ kịch bản',
    proof: 'Paste kịch bản AI viết + link video đã đăng (hoặc screenshot slide đã làm xong).',
  },
  {
    day:   5,
    title: 'AI tạo 10 tiêu đề — Đăng bài với tiêu đề hay nhất',
    skill: 'Headline Formula',
    goal:  'Viết bài có tiêu đề thu hút hơn bình thường',
    sop: [
      'Mở AI. Gõ: "Tạo cho tôi 10 tiêu đề bài đăng Facebook về [chủ đề bạn muốn viết hôm nay]. Dùng đa dạng: câu hỏi, số liệu, tiêu đề tò mò, tiêu đề list, tiêu đề story. Giọng: [giọng của tôi]."',
      'Đọc 10 tiêu đề — vote ngay trong đầu 3 cái hay nhất.',
      'Gõ tiếp: "Với tiêu đề số [X], viết nội dung bài hoàn chỉnh khoảng 200 từ."',
      'Đọc lại, chỉnh nếu cần, đăng lên Facebook/Zalo.',
      'Lưu 9 tiêu đề còn lại vào note — dùng dần trong tuần tới.',
    ],
    task:  'Đăng bài Facebook/Zalo với tiêu đề AI gợi ý',
    proof: 'Chụp bài đăng đã publish. Ghi lại tiêu đề bạn chọn và tại sao chọn cái đó.',
  },
  {
    day:   6,
    title: 'AI soạn tin chốt đơn — Gửi 10 khách thật',
    skill: 'Sales Close',
    goal:  'Gửi tin chốt đơn đã được AI tối ưu cho ít nhất 10 người',
    sop: [
      'Nghĩ đến 10-20 người đã từng hỏi về sản phẩm nhưng chưa mua, hoặc khách cũ chưa mua lần 2.',
      'Mở AI. Gõ: "Viết cho tôi 3 tin nhắn chốt đơn khác nhau. Sản phẩm: [tên + giá]. Khách là người đã biết tôi/sản phẩm rồi nhưng chưa hành động. Không được spam, phải tự nhiên như tin nhắn từ người quen."',
      'Chọn 1 tin → chỉnh tên + chi tiết cá nhân hóa nếu cần.',
      'Gửi đi cho 10 người. Có thể gửi cùng lúc qua Zalo Business hoặc nhắn từng người.',
      'Note lại ai trả lời — follow up trong 24h tiếp theo.',
    ],
    task:  'Gửi tin chốt đơn AI viết cho ít nhất 10 người thật',
    proof: 'Screenshot inbox đã gửi (ẩn tên nếu muốn bảo mật). Ghi số người đã gửi và kết quả sơ bộ.',
  },
  {
    day:   7,
    title: '30 bài content 1 tháng — trong 1 giờ',
    skill: 'Content System',
    goal:  'Có lịch content 30 ngày tự động, đăng ngay hôm nay',
    sop: [
      'Mở AI. Gõ: "Lập kế hoạch content 30 ngày cho tôi. Chủ đề: [business của tôi]. Mỗi ngày 1 bài, chia đều 5 loại: chia sẻ kiến thức, câu chuyện cá nhân, hỏi thăm khách hàng, giới thiệu sản phẩm nhẹ, và bài tương tác (hỏi/poll). Liệt kê tiêu đề 30 bài theo đúng thứ tự ngày."',
      'Đọc qua — chỉnh chủ đề nào không phù hợp.',
      'Chọn 3-5 bài thích nhất. Gõ: "Viết nội dung hoàn chỉnh cho bài số [X], [Y], [Z]."',
      'Copy toàn bộ danh sách 30 tiêu đề + 3-5 bài đã viết sẵn vào Google Docs hoặc Notion.',
      'Đặt lịch đăng bài đầu tiên hôm nay.',
      'Screenshot bộ content đã có trong tay.',
    ],
    task:  'Tạo xong kế hoạch 30 bài content + viết sẵn ít nhất 3 bài hoàn chỉnh',
    proof: 'Screenshot Google Docs/Notion có danh sách 30 tiêu đề + link hoặc screenshot 3 bài đã viết xong. Đây là bằng chứng hoàn thành challenge.',
  },
]

/** Tính giờ mở khóa ngày đầu tiên: 7h sáng đầu tiên sau khi đăng ký */
export function getFirstUnlock(startedAt: Date): Date {
  const unlock = new Date(startedAt)
  unlock.setHours(7, 0, 0, 0)
  // Nếu đã qua 7h rồi thì mở khóa 7h sáng hôm sau
  if (startedAt >= unlock) {
    unlock.setDate(unlock.getDate() + 1)
  }
  return unlock
}

/** Ngày N mở khóa lúc nào */
export function getDayUnlock(firstUnlock: Date, dayNumber: number): Date {
  return new Date(firstUnlock.getTime() + (dayNumber - 1) * 24 * 60 * 60 * 1000)
}

/** Deadline nộp bài ngày N: mở khóa + 24h */
export function getDayDeadline(firstUnlock: Date, dayNumber: number): Date {
  return new Date(firstUnlock.getTime() + dayNumber * 24 * 60 * 60 * 1000)
}

/** Ngày N đã mở khóa chưa */
export function isDayUnlocked(firstUnlock: Date, dayNumber: number): boolean {
  return new Date() >= getDayUnlock(firstUnlock, dayNumber)
}
