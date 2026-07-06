// ── Chèn bài mới "Bước 3 — Cài công cụ để dùng skill" vào khóa meta-ai-agent ──
// Đẩy 2 bài cuối (Dán vào Meta Business Agent, Test AI) xuống sort_order 5, 6
// Chạy: node scripts/insert-vibe-coding-lesson-meta-ai.mjs
import { createClient } from '@supabase/supabase-js'
import { readFileSync } from 'fs'

const env = {}
readFileSync('.env.local', 'utf8').split('\n').forEach(l => {
  const m = l.match(/^([A-Z_]+)=(.*)$/)
  if (m) env[m[1]] = m[2].trim()
})
const sb = createClient(env.NEXT_PUBLIC_SUPABASE_URL, env.SUPABASE_SERVICE_ROLE_KEY)

const NEW_LESSON_CONTENT = `<div class="space-y-5 text-sm leading-relaxed text-gray-700">
    <p>Bạn vừa tải file <strong>agent-meta-business-ai.zip</strong> ở Bài trước. Nhưng file đó chưa dùng được ngay — bạn cần một "trợ lý AI" để đọc file đó và giúp bạn soạn nội dung. Bài này hướng dẫn <strong>từng cú click chuột một</strong>, làm theo đúng thứ tự là chắc chắn được.</p>

    <div class="bg-blue-50 border border-blue-200 rounded-xl p-4">
      <p class="font-semibold text-blue-800 text-sm">🎯 Mục tiêu của bài này</p>
      <p class="text-blue-700 text-xs mt-1">Cài xong 1 tài khoản Claude (AI của công ty Anthropic) trên trình duyệt, và "nạp" file skill vào đó. Không cần tải phần mềm nặng, không cần biết code.</p>
    </div>

    <h3 class="font-bold text-base text-gray-900 mt-2">Bạn cần chuẩn bị gì?</h3>
    <ul class="list-none space-y-2">
      <li>✅ Một cái máy tính (Windows hoặc Mac đều được)</li>
      <li>✅ Máy tính có kết nối mạng (wifi hoặc dây mạng)</li>
      <li>✅ Một địa chỉ Gmail (nếu chưa có, xin ai đó giúp tạo trước, mất 5 phút)</li>
      <li>✅ File <strong>agent-meta-business-ai.zip</strong> đã tải ở bài trước (thường nằm trong thư mục <strong>Downloads</strong> / <strong>Tải xuống</strong> của máy)</li>
    </ul>

    <div class="border-t border-gray-200 my-2"></div>

    <h3 class="font-bold text-base text-gray-900">Bước A — Mở trình duyệt và vào trang Claude</h3>
    <ol class="space-y-4">
      <li class="flex gap-3">
        <div class="w-6 h-6 bg-[#1D9E75] text-white rounded-full flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">1</div>
        <div>
          <p class="font-medium text-gray-900">Tìm biểu tượng trình duyệt trên máy tính</p>
          <p class="text-gray-600 mt-1">Đó là 1 trong các icon: quả cầu nhiều màu (Chrome), hình chữ C xanh (Cốc Cốc), hoặc chữ e xanh (Edge/Cốc Cốc). Bấm đúp (double-click) vào đó để mở lên.</p>
        </div>
      </li>
      <li class="flex gap-3">
        <div class="w-6 h-6 bg-[#1D9E75] text-white rounded-full flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">2</div>
        <div>
          <p class="font-medium text-gray-900">Bấm vào thanh địa chỉ trên cùng</p>
          <p class="text-gray-600 mt-1">Đó là ô dài nằm ngay trên cùng cửa sổ trình duyệt, thường có sẵn chữ hoặc trống. Bấm 1 lần vào ô đó cho con trỏ nhấp nháy.</p>
        </div>
      </li>
      <li class="flex gap-3">
        <div class="w-6 h-6 bg-[#1D9E75] text-white rounded-full flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">3</div>
        <div>
          <p class="font-medium text-gray-900">Gõ đúng chữ này: <code class="bg-gray-100 px-2 py-0.5 rounded font-mono text-xs">claude.ai</code></p>
          <p class="text-gray-600 mt-1">Gõ xong thì bấm phím <strong>Enter</strong> trên bàn phím (phím to nhất bên tay phải, có mũi tên hoặc chữ Enter/⏎).</p>
        </div>
      </li>
    </ol>

    <h3 class="font-bold text-base text-gray-900 mt-6">Bước B — Đăng ký / Đăng nhập tài khoản Claude</h3>
    <ol class="space-y-4">
      <li class="flex gap-3">
        <div class="w-6 h-6 bg-[#1D9E75] text-white rounded-full flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">4</div>
        <div>
          <p class="font-medium text-gray-900">Chưa có tài khoản? Bấm nút <strong>"Sign up"</strong></p>
          <p class="text-gray-600 mt-1">Nút này thường màu đen hoặc cam, ở giữa hoặc góc trên bên phải màn hình. Bấm vào đó.</p>
        </div>
      </li>
      <li class="flex gap-3">
        <div class="w-6 h-6 bg-[#1D9E75] text-white rounded-full flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">5</div>
        <div>
          <p class="font-medium text-gray-900">Gõ địa chỉ Gmail của bạn vào ô trống</p>
          <p class="text-gray-600 mt-1">Bấm nút <strong>Continue</strong> (Tiếp tục). Claude sẽ gửi 1 email có mã số 6 chữ số vào Gmail của bạn.</p>
        </div>
      </li>
      <li class="flex gap-3">
        <div class="w-6 h-6 bg-[#1D9E75] text-white rounded-full flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">6</div>
        <div>
          <p class="font-medium text-gray-900">Mở tab mới, vào Gmail, tìm email từ Claude</p>
          <p class="text-gray-600 mt-1">Copy mã 6 số trong email đó, quay lại tab Claude, dán mã vào ô đang chờ, bấm <strong>Continue</strong>. Vậy là có tài khoản rồi!</p>
        </div>
      </li>
      <li class="flex gap-3">
        <div class="w-6 h-6 bg-gray-300 text-white rounded-full flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">i</div>
        <div>
          <p class="font-medium text-gray-900">Đã có tài khoản rồi? Bấm <strong>"Log in"</strong> thay vì Sign up, làm tương tự bước 5-6.</p>
        </div>
      </li>
    </ol>

    <div class="bg-amber-50 border border-amber-200 rounded-xl p-4">
      <p class="font-semibold text-amber-800 text-sm">💰 Có tốn tiền không?</p>
      <p class="text-amber-700 text-xs mt-1">Claude có bản miễn phí, đủ dùng để làm bài này. Không cần đưa thẻ ngân hàng ở bước đăng ký.</p>
    </div>

    <h3 class="font-bold text-base text-gray-900 mt-6">Bước C — Nạp file skill vào Claude</h3>
    <p>Đây là bước quan trọng nhất — biến file zip bạn đã tải thành "kiến thức" mà Claude hiểu và dùng được.</p>
    <ol class="space-y-4">
      <li class="flex gap-3">
        <div class="w-6 h-6 bg-[#1D9E75] text-white rounded-full flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">7</div>
        <div>
          <p class="font-medium text-gray-900">Tìm biểu tượng bánh răng cưa ⚙️ (Settings)</p>
          <p class="text-gray-600 mt-1">Thường nằm ở góc dưới bên trái màn hình, cạnh tên hoặc ảnh đại diện của bạn. Bấm vào đó.</p>
        </div>
      </li>
      <li class="flex gap-3">
        <div class="w-6 h-6 bg-[#1D9E75] text-white rounded-full flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">8</div>
        <div>
          <p class="font-medium text-gray-900">Tìm và bấm vào chữ <strong>"Capabilities"</strong></p>
          <p class="text-gray-600 mt-1">Đây là 1 mục trong danh sách bên trái cửa sổ Settings vừa mở ra.</p>
        </div>
      </li>
      <li class="flex gap-3">
        <div class="w-6 h-6 bg-[#1D9E75] text-white rounded-full flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">9</div>
        <div>
          <p class="font-medium text-gray-900">Kéo xuống tìm mục <strong>"Skills"</strong>, bấm nút <strong>"Upload skill"</strong></p>
          <p class="text-gray-600 mt-1">Sẽ có 1 cửa sổ chọn file hiện ra — giống như khi bạn đính kèm ảnh vào Zalo/Facebook vậy.</p>
        </div>
      </li>
      <li class="flex gap-3">
        <div class="w-6 h-6 bg-[#1D9E75] text-white rounded-full flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">10</div>
        <div>
          <p class="font-medium text-gray-900">Tìm tới thư mục <strong>Downloads</strong> (Tải xuống)</p>
          <p class="text-gray-600 mt-1">Trong cửa sổ chọn file, bấm vào mục <strong>Downloads</strong> bên khung trái. Tìm file tên <strong>agent-meta-business-ai.zip</strong>, bấm 1 lần vào file đó cho nó bôi xanh, rồi bấm nút <strong>Open / Mở</strong>.</p>
          <p class="text-gray-500 text-xs mt-1">💡 Không cần giải nén file — cứ để nguyên đuôi .zip, chọn thẳng file đó là được.</p>
        </div>
      </li>
      <li class="flex gap-3">
        <div class="w-6 h-6 bg-[#1D9E75] text-white rounded-full flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">11</div>
        <div>
          <p class="font-medium text-gray-900">Chờ vài giây, thấy tên skill xuất hiện trong danh sách là xong</p>
          <p class="text-gray-600 mt-1">Bạn sẽ thấy dòng chữ có tên skill (Meta Business AI hoặc tương tự) xuất hiện, kèm nút bật/tắt (toggle). Đảm bảo nút đó đang <strong>bật (màu xanh/đen)</strong>.</p>
        </div>
      </li>
    </ol>

    <div class="bg-green-50 border border-green-200 rounded-xl p-4">
      <p class="font-semibold text-green-800 text-sm">✅ Kiểm tra đã cài đúng chưa</p>
      <p class="text-green-700 text-xs mt-1">Đóng cửa sổ Settings lại, bấm nút <strong>"New chat"</strong> (Đoạn chat mới) ở góc trên bên trái, rồi gõ câu này để test:</p>
    </div>
    <div class="bg-gray-900 rounded-xl p-4">
      <p class="text-gray-400 text-xs mb-1">Gõ đúng câu này rồi Enter:</p>
      <p class="text-green-300 font-mono text-xs">Đọc file trong skill agent-meta-business-ai, hỏi tôi từng câu để soạn nội dung Knowledge, Personality, Audience, Handover cho shop của tôi.</p>
    </div>
    <p class="text-gray-600 text-xs">Nếu Claude bắt đầu <strong>hỏi ngược lại bạn</strong> về shop (tên shop, sản phẩm, giọng nói...) — nghĩa là bạn đã làm đúng hết. Cứ trả lời thật theo thông tin đã chuẩn bị ở Bài 1, Claude sẽ soạn sẵn nội dung cho bạn.</p>

    <div class="border-t border-gray-200 my-2"></div>

    <h3 class="font-bold text-base text-gray-900">Bị kẹt ở bước nào? Đây là các lỗi hay gặp nhất:</h3>
    <div class="space-y-3">
      <div class="border border-red-100 rounded-xl p-4 bg-red-50">
        <p class="font-semibold text-red-800 text-xs">❌ Không thấy chữ "Capabilities" trong Settings</p>
        <p class="text-red-700 text-xs mt-1">→ Kéo chuột xuống thêm, đôi khi mục này nằm dưới mục "Profile" hoặc "Appearance". Nếu dùng điện thoại, hãy chuyển sang dùng máy tính — tính năng Skills hiện chỉ có trên bản máy tính (web).</p>
      </div>
      <div class="border border-red-100 rounded-xl p-4 bg-red-50">
        <p class="font-semibold text-red-800 text-xs">❌ Không tìm thấy file .zip trong Downloads</p>
        <p class="text-red-700 text-xs mt-1">→ Mở lại Bài trước, bấm lại nút tải file. File sẽ tự động rơi vào thư mục Downloads/Tải xuống của máy — đây là nơi mọi thứ tải từ mạng đều nằm ở đó mặc định.</p>
      </div>
      <div class="border border-red-100 rounded-xl p-4 bg-red-50">
        <p class="font-semibold text-red-800 text-xs">❌ Claude báo lỗi "file không hợp lệ" khi upload</p>
        <p class="text-red-700 text-xs mt-1">→ Đảm bảo bạn chọn đúng file đuôi <strong>.zip</strong>, không phải file khác cùng tên. Thử tải lại file 1 lần nữa từ Bài trước.</p>
      </div>
      <div class="border border-red-100 rounded-xl p-4 bg-red-50">
        <p class="font-semibold text-red-800 text-xs">❌ Vẫn không làm được sau khi thử hết cách trên</p>
        <p class="text-red-700 text-xs mt-1">→ Chụp màn hình chỗ bạn đang bị kẹt, gửi qua Telegram cho Dũng — có người hướng dẫn trực tiếp, không phải tự mò một mình.</p>
      </div>
    </div>

    <div class="border border-gray-200 rounded-xl p-4 mt-4 text-center">
      <p class="text-sm text-gray-600">Cài xong hết rồi, vẫn muốn hỏi thêm cho chắc?</p>
      <a href="https://t.me/KentHoang" target="_blank" class="inline-block mt-2 bg-[#1D9E75] text-white text-xs font-bold px-5 py-2 rounded-lg">Nhắn Dũng qua Telegram</a>
    </div>

    <div class="bg-[#1D9E75]/10 border border-[#1D9E75]/20 rounded-xl p-4 mt-4">
      <p class="font-semibold text-[#0D2B1A] text-sm">👉 Xong bài này?</p>
      <p class="text-gray-700 text-xs mt-1">Chat với Claude cho tới khi có đủ nội dung 4 Control (Knowledge, Personality, Audience, Handover). Lưu lại thành 1 file (copy dán vào Google Doc hoặc Notepad), rồi sang bài tiếp theo để dán vào Meta Business Agent thật.</p>
    </div>
  </div>`

async function run() {
  // 1. Day 2 bai cuoi xuong sort_order 5, 6 (lam TRUOC de tranh trung sort_order)
  const { data: toShift, error: selErr } = await sb
    .from('lessons').select('id, sort_order, title')
    .eq('course_id', 'meta-ai-agent').in('sort_order', [4, 5]).order('sort_order', { ascending: false })
  if (selErr) { console.error(selErr.message); return }

  for (const l of toShift) {
    const newOrder = l.sort_order + 1
    const { error } = await sb.from('lessons').update({ sort_order: newOrder }).eq('id', l.id)
    if (error) { console.error(`Day bai "${l.title}":`, error.message); return }
    console.log(`Da day "${l.title}" tu sort_order ${l.sort_order} -> ${newOrder}`)
  }

  // 2. Chen bai moi vao sort_order 4
  const { error: insErr } = await sb.from('lessons').insert({
    course_id: 'meta-ai-agent',
    sort_order: 4,
    is_published: true,
    is_free: false,
    duration: 20,
    title: 'Bước 3 — Cài công cụ AI để dùng skill (chi tiết từng cú click)',
    description: 'Cài Claude trên trình duyệt và nạp file skill vào — hướng dẫn từng bước, ai cũng làm theo được.',
    host_note: 'Bài này dài nhưng đừng nản — làm đúng từng bước một, đảm bảo xong trong 20 phút kể cả bạn chưa từng dùng AI bao giờ.',
    content_html: NEW_LESSON_CONTENT,
  })
  if (insErr) { console.error('Chen bai moi:', insErr.message); return }
  console.log('OK: Da chen bai moi "Buoc 3 - Cai cong cu AI" vao sort_order 4')

  console.log('\nXong.')
}

run()
