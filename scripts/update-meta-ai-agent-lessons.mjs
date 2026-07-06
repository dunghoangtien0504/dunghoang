// ── Cập nhật 5 bài học khóa Meta AI Agent theo đúng Meta Business Agent (ra mắt 6/2026) ──
// - Sửa đường dẫn điều hướng đúng UI hiện tại: Tất cả công cụ → Thu hút đối tượng → Meta Business Agent
// - Đổi thuật ngữ 4 tài liệu cũ (Business Info/Custom Instructions/Avoid Topics/Test Cases)
//   sang đúng 4 Control thật của Meta: Knowledge / Personality / Audience / Handover
// - Thêm khối "Tải File Skill" (agent-meta-business-ai.zip) vào Bước 2
// Chạy: node scripts/update-meta-ai-agent-lessons.mjs
import { createClient } from '@supabase/supabase-js'
import { readFileSync } from 'fs'

const env = {}
readFileSync('.env.local', 'utf8').split('\n').forEach(l => {
  const m = l.match(/^([A-Z_]+)=(.*)$/)
  if (m) env[m[1]] = m[2].trim()
})
const sb = createClient(env.NEXT_PUBLIC_SUPABASE_URL, env.SUPABASE_SERVICE_ROLE_KEY)

const SKILL_DOWNLOAD_CARD = `
<div data-skill-download-block="true" class="rounded-2xl border-2 border-[#1D9E75] bg-white p-5">
  <p class="text-[11px] font-bold uppercase tracking-wider text-[#3D6B4A] mb-3">📦 Tải File Skill</p>
  <div class="flex items-center gap-3 mb-3">
    <div class="w-11 h-11 rounded-xl bg-[#1D9E75] flex items-center justify-center flex-shrink-0">
      <span class="text-white text-lg">📦</span>
    </div>
    <div>
      <p class="font-bold text-[#0D2B1A] text-sm">agent-meta-business-ai.zip</p>
      <p class="text-xs text-gray-500 mt-0.5">File zip, 21KB — giải nén, kéo folder vào thư mục làm việc</p>
    </div>
  </div>
  <a href="https://dunghoang.com/skills/agent-meta-business-ai.zip" download
     class="inline-block bg-[#0D2B1A] text-white font-bold text-sm px-6 py-3 rounded-xl">
    ⬇ Tải Skill Về Máy
  </a>
  <p class="text-xs text-gray-500 mt-3 leading-relaxed">
    Giải nén → kéo <strong>toàn bộ folder agent-meta-business-ai</strong> vào thư mục làm việc của bạn, rồi chat với AI
    (Claude/ChatGPT): <em>"Đọc file trong folder agent-meta-business-ai, hỏi tôi từng câu để soạn nội dung Knowledge,
    Personality, Audience, Handover cho shop của tôi."</em> AI sẽ hỏi đúng những gì bạn đã chuẩn bị ở Bước 1 và soạn sẵn
    nội dung để bạn dán thẳng vào Meta Business Agent ở Bước 3 — không cần tự nghĩ câu chữ từ đầu.
  </p>
</div>`.trim()

const LESSONS = {
  1: {
    title: 'Chào mừng — Bạn sắp có AI trực chiến 24/7',
    content_html: `<div class="space-y-4 text-sm leading-relaxed text-gray-700">
    <p>Chào mừng bạn đến với <strong>Setup Meta AI Agent</strong>.</p>
    <p>Meta vừa ra mắt chính thức <strong>Meta Business Agent</strong> (6/2026) — AI có sẵn miễn phí trong Meta Business Suite, tự động trả lời khách trên <strong>Messenger, Instagram DM, và WhatsApp Business</strong> đúng giọng thương hiệu của bạn.</p>
    <div class="bg-blue-50 border border-blue-200 rounded-xl p-4">
      <p class="text-blue-800 text-sm"><strong>Cập nhật quan trọng:</strong> tính năng này trước đây gọi chung là "Meta AI trong Business Suite", nay Meta đặt tên chính thức là <strong>Meta Business Agent</strong> — bạn sẽ thấy đúng tên này khi vào Business Suite.</p>
    </div>
    <h3 class="font-bold text-base text-gray-900 mt-6">Sau khi setup xong, AI của bạn sẽ:</h3>
    <ul class="list-none space-y-2">
      <li>✅ Tự trả lời câu hỏi về sản phẩm, giá, chính sách ship</li>
      <li>✅ Nói chuyện đúng giọng shop — không nghe như robot</li>
      <li>✅ Tự nhận biết câu hỏi nào cần chuyển cho bạn xử lý</li>
      <li>✅ Chạy 24/7 kể cả khi bạn đang ngủ, trên cả 3 kênh Messenger/Instagram/WhatsApp</li>
    </ul>
    <h3 class="font-bold text-base text-gray-900 mt-6">Bạn sẽ làm 4 bước trong skill này:</h3>
    <ol class="list-decimal list-inside space-y-2 ml-2">
      <li>Chuẩn bị thông tin shop</li>
      <li>Tải skill, dùng AI soạn sẵn nội dung cho 4 Control (Knowledge, Personality, Audience, Handover)</li>
      <li>Dán vào đúng chỗ trong Meta Business Agent</li>
      <li>Test và điều chỉnh trước khi bật cho khách</li>
    </ol>
    <div class="bg-amber-50 border border-amber-200 rounded-xl p-4 mt-6">
      <p class="font-semibold text-amber-800 text-sm">⏱ Thời gian thực tế: 30-45 phút</p>
      <p class="text-amber-700 text-xs mt-1">Bạn không cần biết code. Chỉ cần trả lời câu hỏi và dán đúng chỗ. Meta Business Agent hiện đang <strong>miễn phí</strong>, Meta có nói sẽ ra gói trả phí sau — cứ dùng ngay khi còn miễn phí.</p>
    </div>
  </div>`,
  },
  2: {
    title: 'Bước 1 — Chuẩn bị thông tin shop của bạn',
    content_html: `<div class="space-y-4 text-sm leading-relaxed text-gray-700">
    <p>Trước khi cấu hình AI, bạn cần chuẩn bị sẵn thông tin sau. Mở một file note và điền vào:</p>
    <div class="bg-gray-50 border border-gray-200 rounded-xl p-5 space-y-4">
      <h3 class="font-bold text-gray-900">📋 Thông tin cơ bản về shop</h3>
      <ul class="space-y-3 text-sm">
        <li><span class="font-medium">Tên shop:</span> <span class="text-gray-500">(tên đầy đủ hiển thị trên Facebook/Instagram)</span></li>
        <li><span class="font-medium">Ngành hàng:</span> <span class="text-gray-500">Thời trang / Skincare / Mẹ Bé / F&B / Nội thất / Spa</span></li>
        <li><span class="font-medium">Sản phẩm chủ lực:</span> <span class="text-gray-500">(2-3 sản phẩm bán chạy nhất)</span></li>
        <li><span class="font-medium">Khu vực ship:</span> <span class="text-gray-500">Toàn quốc / Một số tỉnh / TP.HCM / Hà Nội</span></li>
        <li><span class="font-medium">Phí ship:</span> <span class="text-gray-500">Miễn phí / Tính theo km / Cố định bao nhiêu</span></li>
        <li><span class="font-medium">Thời gian giao hàng:</span> <span class="text-gray-500">Ví dụ: 2-4 ngày toàn quốc</span></li>
        <li><span class="font-medium">Chính sách đổi trả:</span> <span class="text-gray-500">Bao nhiêu ngày, điều kiện gì</span></li>
        <li><span class="font-medium">Giờ hỗ trợ:</span> <span class="text-gray-500">Ví dụ: 8h-21h hàng ngày</span></li>
        <li><span class="font-medium">Số điện thoại / Zalo:</span> <span class="text-gray-500">(để AI hướng dẫn khách khi cần)</span></li>
        <li><span class="font-medium">Link website / bảng giá (nếu có):</span> <span class="text-gray-500">Meta Business Agent tự đọc thêm từ đây</span></li>
      </ul>
    </div>
    <div class="bg-gray-50 border border-gray-200 rounded-xl p-5 space-y-4 mt-4">
      <h3 class="font-bold text-gray-900">❓ 5 câu hỏi khách hay hỏi nhất</h3>
      <p class="text-gray-500 text-xs">Nghĩ lại inbox của bạn — khách hay hỏi câu gì nhất? Liệt kê ra ít nhất 5 câu:</p>
      <ol class="list-decimal list-inside space-y-2 text-gray-600 ml-2">
        <li>Câu hỏi 1: ______________________</li>
        <li>Câu hỏi 2: ______________________</li>
        <li>Câu hỏi 3: ______________________</li>
        <li>Câu hỏi 4: ______________________</li>
        <li>Câu hỏi 5: ______________________</li>
      </ol>
    </div>
    <div class="bg-blue-50 border border-blue-200 rounded-xl p-4 mt-4">
      <p class="font-semibold text-blue-800 text-sm">💡 Vì sao chuẩn bị kỹ vẫn cần thiết?</p>
      <p class="text-blue-700 text-xs mt-1">Meta Business Agent tự học từ Trang, bài đăng và các đoạn chat cũ của bạn — nhưng nó học nhanh và đúng hơn rất nhiều nếu bạn chủ động cho nó thông tin rõ ràng ngay từ đầu, thay vì để nó tự đoán.</p>
    </div>
    <div class="bg-green-50 border border-green-200 rounded-xl p-4 mt-4">
      <p class="font-semibold text-green-800">✅ Xong bước này rồi? Sang Bước 2 ngay.</p>
      <p class="text-green-700 text-xs mt-1">Đừng bỏ qua câu hỏi khách hay hỏi — đây là phần quan trọng nhất để AI trả lời đúng.</p>
    </div>
  </div>`,
  },
  3: {
    title: 'Bước 2 — Tải skill & soạn nội dung cho 4 Control',
    content_html: `<div class="space-y-5 text-sm leading-relaxed text-gray-700">
    <p>Meta Business Agent (bản chính thức 6/2026) cấu hình qua <strong>4 Control</strong> — khác với cách gọi "4 tài liệu" hồi trước, nhưng bản chất vẫn là 4 việc bạn cần chuẩn bị nội dung:</p>

    ${SKILL_DOWNLOAD_CARD}

    <div class="border border-gray-200 rounded-xl overflow-hidden mt-5">
      <div class="bg-blue-50 px-5 py-3 border-b border-gray-200">
        <h3 class="font-bold text-blue-900">🧠 Control 1: Knowledge (Kiến thức)</h3>
        <p class="text-xs text-blue-700 mt-0.5">AI dùng để hiểu bạn bán gì</p>
      </div>
      <div class="p-5 space-y-2">
        <p>Meta Business Agent tự động học từ bài đăng trên Trang, các đoạn chat cũ, và website/catalogue nếu bạn có. Bạn có thể tải thêm PDF, bảng giá, FAQ, hình ảnh sản phẩm để bổ sung.</p>
        <p class="text-gray-500 text-xs">💡 Dùng câu chat mẫu trong skill để AI (Claude/ChatGPT) soạn sẵn đoạn giới thiệu shop ngắn gọn, đúng trọng tâm — dán thẳng vào ô Knowledge.</p>
      </div>
    </div>
    <div class="border border-gray-200 rounded-xl overflow-hidden mt-3">
      <div class="bg-purple-50 px-5 py-3 border-b border-gray-200">
        <h3 class="font-bold text-purple-900">🎭 Control 2: Personality (Giọng nói)</h3>
        <p class="text-xs text-purple-700 mt-0.5">Quan trọng nhất — quyết định AI nghe tự nhiên hay như robot</p>
      </div>
      <div class="p-5 space-y-2">
        <p>Định hình tông giọng (thân thiện / chuyên nghiệp / vui vẻ), cách xưng hô với khách, cách trả lời khi khách hỏi giá. Meta cho phép bạn <strong>sửa trực tiếp bất kỳ câu trả lời nào</strong> — AI học lại ngay lập tức từ lần sửa đó.</p>
        <p class="text-gray-500 text-xs">💡 Đây là phần bạn nên dành nhiều thời gian nhất. AI viết chung chung là do phần này làm hời hợt.</p>
      </div>
    </div>
    <div class="border border-gray-200 rounded-xl overflow-hidden mt-3">
      <div class="bg-amber-50 px-5 py-3 border-b border-gray-200">
        <h3 class="font-bold text-amber-900">🎯 Control 3: Audience (Đối tượng)</h3>
        <p class="text-xs text-amber-700 mt-0.5">Chọn AI trả lời cho ai</p>
      </div>
      <div class="p-5 space-y-2">
        <p>Chọn AI trả lời <strong>tất cả mọi người</strong>, <strong>chỉ khách mới</strong>, hay <strong>chỉ khách đến từ quảng cáo</strong>. Nhiều shop chọn "chỉ khách mới" để giữ khách quen được người thật chăm sóc.</p>
      </div>
    </div>
    <div class="border border-gray-200 rounded-xl overflow-hidden mt-3">
      <div class="bg-red-50 px-5 py-3 border-b border-gray-200">
        <h3 class="font-bold text-red-900">🚫 Control 4: Handover (Chuyển giao / chủ đề tránh)</h3>
        <p class="text-xs text-red-700 mt-0.5">Những gì AI KHÔNG được tự trả lời</p>
      </div>
      <div class="p-5 space-y-2">
        <p>Đánh dấu các chủ đề AI cần chuyển ngay cho bạn: khiếu nại, mặc cả giá, thông tin chưa chắc chắn, so sánh với đối thủ. AI sẽ tự chuyển cuộc trò chuyện cho bạn khi gặp đúng chủ đề này.</p>
        <p class="text-gray-500 text-xs">💡 AI biết không nói gì cũng quan trọng như biết nói gì.</p>
      </div>
    </div>
    <div class="bg-green-50 border border-green-200 rounded-xl p-4 mt-4">
      <p class="font-semibold text-green-800 text-sm">✅ Soạn xong nội dung 4 Control từ skill?</p>
      <p class="text-green-700 text-xs mt-1">Lưu lại thành 1 file (Google Doc hoặc Notepad) rồi sang Bước 3 để dán vào đúng chỗ trong Meta Business Agent.</p>
    </div>
  </div>`,
  },
  4: {
    title: 'Bước 3 — Dán vào Meta Business Agent và bật AI',
    content_html: `<div class="space-y-4 text-sm leading-relaxed text-gray-700">
    <div class="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-2">
      <p class="font-semibold text-amber-800">⚠️ Yêu cầu trước khi làm bước này</p>
      <p class="text-amber-700 text-xs mt-1">Tài khoản của bạn phải là Admin của Facebook Page. Nếu chỉ là Editor thì không thấy mục Meta Business Agent.</p>
    </div>
    <ol class="space-y-5">
      <li class="flex gap-4">
        <div class="w-7 h-7 bg-[#1D9E75] text-white rounded-full flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">1</div>
        <div>
          <p class="font-semibold text-gray-900">Mở Meta Business Suite</p>
          <p class="text-gray-600 mt-1">Vào <strong>business.facebook.com</strong> → chọn đúng trang Facebook của bạn (góc trái trên)</p>
        </div>
      </li>
      <li class="flex gap-4">
        <div class="w-7 h-7 bg-[#1D9E75] text-white rounded-full flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">2</div>
        <div>
          <p class="font-semibold text-gray-900">Bấm biểu tượng ☰ "Tất cả công cụ"</p>
          <p class="text-gray-600 mt-1">Ở sát mép trái màn hình, biểu tượng 3 gạch ngang. Một cửa sổ liệt kê toàn bộ công cụ sẽ hiện ra.</p>
        </div>
      </li>
      <li class="flex gap-4">
        <div class="w-7 h-7 bg-[#1D9E75] text-white rounded-full flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">3</div>
        <div>
          <p class="font-semibold text-gray-900">Tìm mục "Thu hút đối tượng" → chọn "Meta Business Agent"</p>
          <p class="text-gray-600 mt-1">Trong cột <strong>Thu hút đối tượng</strong> (cùng nhóm với Hộp thư, Trung tâm khách hàng tiềm năng, Nội dung...), bạn sẽ thấy <strong>Meta Business Agent</strong>. Bấm vào đó.</p>
        </div>
      </li>
      <li class="flex gap-4">
        <div class="w-7 h-7 bg-[#1D9E75] text-white rounded-full flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">4</div>
        <div>
          <p class="font-semibold text-gray-900">Điền Knowledge Control</p>
          <p class="text-gray-600 mt-1">Dán đoạn giới thiệu shop đã soạn ở Bước 2 vào ô kiến thức. Có thể tải kèm PDF/bảng giá nếu có.</p>
        </div>
      </li>
      <li class="flex gap-4">
        <div class="w-7 h-7 bg-[#1D9E75] text-white rounded-full flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">5</div>
        <div>
          <p class="font-semibold text-gray-900">Điền Personality Control</p>
          <p class="text-gray-600 mt-1">Dán phần định hình giọng nói + cách xưng hô đã soạn ở Bước 2 vào ô này.</p>
        </div>
      </li>
      <li class="flex gap-4">
        <div class="w-7 h-7 bg-[#1D9E75] text-white rounded-full flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">6</div>
        <div>
          <p class="font-semibold text-gray-900">Chọn Audience Control</p>
          <p class="text-gray-600 mt-1">Chọn AI trả lời cho tất cả, chỉ khách mới, hay chỉ khách từ ads — tùy bạn.</p>
        </div>
      </li>
      <li class="flex gap-4">
        <div class="w-7 h-7 bg-[#1D9E75] text-white rounded-full flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">7</div>
        <div>
          <p class="font-semibold text-gray-900">Điền Handover Control (chủ đề cần chuyển giao)</p>
          <p class="text-gray-600 mt-1">Dán danh sách chủ đề cần AI tự chuyển cho bạn xử lý — khiếu nại, mặc cả giá, so sánh đối thủ.</p>
        </div>
      </li>
      <li class="flex gap-4">
        <div class="w-7 h-7 bg-[#1D9E75] text-white rounded-full flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">8</div>
        <div>
          <p class="font-semibold text-gray-900">Lưu và bật AI</p>
          <p class="text-gray-600 mt-1">Nhấn <strong>Lưu / Save</strong> → bật Meta Business Agent sang ON</p>
          <div class="bg-green-50 border border-green-200 rounded-lg p-3 mt-2">
            <p class="text-green-800 text-xs font-semibold">✅ AI đã sẵn sàng. Nhưng chưa vội — sang Bước 4 test trước đã.</p>
          </div>
        </div>
      </li>
    </ol>
    <div class="bg-blue-50 border border-blue-200 rounded-xl p-4 mt-4">
      <p class="font-semibold text-blue-800">🤔 Không tìm thấy "Meta Business Agent" trong mục Tất cả công cụ?</p>
      <p class="text-blue-700 text-xs mt-1">Meta đang roll out dần theo khu vực — một số tài khoản chưa có ngay. Nhắn mình qua Telegram @KentHoang để được hỗ trợ thêm.</p>
    </div>
  </div>`,
  },
  5: {
    content_html: `<div class="space-y-4 text-sm leading-relaxed text-gray-700">
    <p>Đừng bật AI cho khách thật ngay. Hãy test trước để tránh AI nói sai làm mất uy tín shop.</p>
    <div class="bg-gray-50 border border-gray-200 rounded-xl p-5">
      <h3 class="font-bold text-gray-900 mb-3">Cách test AI trong Meta Business Agent</h3>
      <ol class="list-decimal list-inside space-y-2 text-gray-700 ml-2">
        <li>Dùng một tài khoản Facebook khác (hoặc nhờ bạn bè) nhắn tin vào Page của bạn</li>
        <li>Gõ lần lượt các câu hỏi thường gặp đã liệt kê ở Bước 1, cùng vài câu "bẫy" (hỏi giá, hỏi so sánh đối thủ)</li>
        <li>Đọc câu trả lời AI — đúng giọng shop chưa, có bịa thông tin không</li>
        <li>Nếu AI trả lời sai → sửa trực tiếp câu trả lời đó ngay trong Meta Business Agent (Personality Control học lại ngay lập tức từ lần sửa)</li>
      </ol>
    </div>
    <div class="space-y-3 mt-4">
      <h3 class="font-bold text-gray-900">Những lỗi hay gặp và cách fix:</h3>
      <div class="border border-red-100 rounded-xl p-4 bg-red-50">
        <p class="font-semibold text-red-800 text-xs">❌ AI trả lời quá chung chung, không nói tên shop</p>
        <p class="text-red-700 text-xs mt-1">→ Thêm tên shop vào đầu Knowledge Control: "Chúng tôi là [Tên Shop]..."</p>
      </div>
      <div class="border border-red-100 rounded-xl p-4 bg-red-50">
        <p class="font-semibold text-red-800 text-xs">❌ AI bịa giá hoặc thông tin sai</p>
        <p class="text-red-700 text-xs mt-1">→ Thêm vào Handover Control: không đưa ra giá cụ thể, chuyển cho người thật khi khách hỏi giá chi tiết</p>
      </div>
      <div class="border border-red-100 rounded-xl p-4 bg-red-50">
        <p class="font-semibold text-red-800 text-xs">❌ AI không trả lời tiếng Việt</p>
        <p class="text-red-700 text-xs mt-1">→ Thêm vào Personality Control: luôn trả lời bằng tiếng Việt, xưng "shop" với khách</p>
      </div>
    </div>
    <div class="bg-green-50 border border-green-200 rounded-xl p-5 mt-4">
      <h3 class="font-bold text-green-900 mb-2">🎉 AI đã chạy đúng? Xong rồi!</h3>
      <p class="text-green-800 text-sm">Bật AI lên, để nguyên chạy. Từ bây giờ khách nhắn lúc nào cũng có người trả lời — kể cả 2 giờ sáng, trên cả Messenger, Instagram và WhatsApp.</p>
    </div>
    <div class="border border-gray-200 rounded-xl p-4 mt-4 text-center">
      <p class="text-sm text-gray-600">Cần hỗ trợ thêm?</p>
      <a href="https://t.me/KentHoang" target="_blank" class="inline-block mt-2 bg-[#1D9E75] text-white text-xs font-bold px-5 py-2 rounded-lg">Nhắn Dũng qua Telegram</a>
    </div>
  </div>`,
  },
}

async function run() {
  const { data: lessons, error } = await sb
    .from('lessons').select('id, sort_order, title').eq('course_id', 'meta-ai-agent').order('sort_order')
  if (error) { console.error(error.message); return }

  for (const lesson of lessons) {
    const patch = LESSONS[lesson.sort_order]
    if (!patch) continue
    const update = { content_html: patch.content_html }
    if (patch.title) update.title = patch.title
    const { error: updErr } = await sb.from('lessons').update(update).eq('id', lesson.id)
    if (updErr) console.error(`Bai ${lesson.sort_order}:`, updErr.message)
    else console.log(`OK Bai ${lesson.sort_order}: ${patch.title || lesson.title}`)
  }
  console.log('\nXong.')
}

run()
