-- ═══════════════════════════════════════════════════════════════════
-- DungHoang.com — Seed course + lessons: Setup Meta AI Agent
-- Chạy trong Supabase SQL Editor
-- ═══════════════════════════════════════════════════════════════════

-- ─── 1. Course product ───────────────────────────────────────────────────────
insert into course_products (id, name, price, description, is_active, commission_pct)
values (
  'meta-ai-agent',
  'Setup Meta AI Agent',
  199000,
  'Cài AI trả lời tự động cho Messenger / Instagram / WhatsApp Business. Không cần code. Setup 30 phút.',
  true,
  20
)
on conflict (id) do update
  set name          = excluded.name,
      price         = excluded.price,
      description   = excluded.description,
      is_active     = excluded.is_active,
      commission_pct = excluded.commission_pct;

-- ─── 2. Xóa lessons cũ nếu có ───────────────────────────────────────────────
delete from lessons where course_id = 'meta-ai-agent';

-- ─── 3. Seed lessons ─────────────────────────────────────────────────────────
insert into lessons (course_id, title, description, content_html, sort_order, is_free, is_published, duration, host_note)
values

-- BÀI 1: Tổng quan (free preview)
(
  'meta-ai-agent',
  'Chào mừng — Bạn sắp có AI trực chiến 24/7',
  'Tổng quan về skill và những gì bạn sẽ làm được sau khi setup xong.',
  '<div class="space-y-4 text-sm leading-relaxed text-gray-700">
    <p>Chào mừng bạn đến với <strong>Setup Meta AI Agent</strong>.</p>
    <p>Skill này giúp bạn cấu hình AI có sẵn trong Meta Business Suite để tự động trả lời khách trên <strong>Messenger, Instagram DM, và WhatsApp Business</strong> đúng giọng thương hiệu của bạn.</p>
    <h3 class="font-bold text-base text-gray-900 mt-6">Sau khi setup xong, AI của bạn sẽ:</h3>
    <ul class="list-none space-y-2">
      <li>✅ Tự trả lời câu hỏi về sản phẩm, giá, chính sách ship</li>
      <li>✅ Nói chuyện đúng giọng shop — không nghe như robot</li>
      <li>✅ Tự nhận biết câu hỏi nào cần chuyển cho bạn xử lý</li>
      <li>✅ Chạy 24/7 kể cả khi bạn đang ngủ</li>
    </ul>
    <h3 class="font-bold text-base text-gray-900 mt-6">Bạn sẽ làm 4 bước trong skill này:</h3>
    <ol class="list-decimal list-inside space-y-2 ml-2">
      <li>Chuẩn bị thông tin shop</li>
      <li>Điền vào 4 tài liệu template</li>
      <li>Paste vào Meta Business Suite</li>
      <li>Test và điều chỉnh trước khi bật cho khách</li>
    </ol>
    <div class="bg-amber-50 border border-amber-200 rounded-xl p-4 mt-6">
      <p class="font-semibold text-amber-800 text-sm">⏱ Thời gian thực tế: 30-45 phút</p>
      <p class="text-amber-700 text-xs mt-1">Bạn không cần biết code. Chỉ cần copy và paste đúng chỗ.</p>
    </div>
  </div>',
  1, true, true, 5,
  'Đọc bài này trước để hình dung toàn bộ quy trình. Đừng bỏ qua nhé — nhiều bạn vội bỏ qua rồi bị nhầm bước sau.'
),

-- BÀI 2: Chuẩn bị thông tin
(
  'meta-ai-agent',
  'Bước 1 — Chuẩn bị thông tin shop của bạn',
  'Thu thập đủ thông tin cần thiết trước khi điền vào template. Làm đúng bước này, bước sau sẽ rất nhanh.',
  '<div class="space-y-4 text-sm leading-relaxed text-gray-700">
    <p>Trước khi điền vào 4 tài liệu, bạn cần chuẩn bị sẵn thông tin sau. Mở một file note và điền vào:</p>

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
        <li><span class="font-medium">Giờ hỗ trợ của bạn:</span> <span class="text-gray-500">Ví dụ: 8h-21h hàng ngày</span></li>
        <li><span class="font-medium">Số điện thoại / Zalo:</span> <span class="text-gray-500">(để AI hướng dẫn khách khi cần)</span></li>
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

    <div class="bg-green-50 border border-green-200 rounded-xl p-4 mt-4">
      <p class="font-semibold text-green-800">✅ Xong bước này rồi? Sang Bước 2 ngay.</p>
      <p class="text-green-700 text-xs mt-1">Đừng bỏ qua câu hỏi khách hay hỏi — đây là phần quan trọng nhất để AI trả lời đúng.</p>
    </div>
  </div>',
  2, false, true, 15,
  'Bước này nhiều bạn làm qua loa rồi hỏi mình sao AI trả lời sai. Dành 10 phút làm kỹ ở đây là xong hết.'
),

-- BÀI 3: Điền 4 tài liệu
(
  'meta-ai-agent',
  'Bước 2 — Điền vào 4 tài liệu template',
  'Dùng thông tin đã chuẩn bị ở Bước 1 để điền vào 4 tài liệu. Đây là bước tạo ra nội dung AI sẽ dùng.',
  '<div class="space-y-5 text-sm leading-relaxed text-gray-700">
    <p>Bạn có 4 tài liệu template trong file đã nhận qua email. Lần lượt điền vào từng cái theo hướng dẫn dưới đây:</p>

    <div class="border border-gray-200 rounded-xl overflow-hidden">
      <div class="bg-blue-50 px-5 py-3 border-b border-gray-200">
        <h3 class="font-bold text-blue-900">📋 Tài liệu 1: Business Info</h3>
        <p class="text-xs text-blue-700 mt-0.5">Giới thiệu shop — AI dùng để hiểu bạn bán gì</p>
      </div>
      <div class="p-5 space-y-2">
        <p>Điền thông tin shop theo form trong file. Gồm: tên shop, mô tả ngắn, sản phẩm chính, khu vực hoạt động.</p>
        <p class="text-gray-500 text-xs">💡 Viết ngắn gọn, thực tế. Không cần văn hoa. AI hiểu tốt nhất khi thông tin rõ ràng.</p>
      </div>
    </div>

    <div class="border border-gray-200 rounded-xl overflow-hidden mt-3">
      <div class="bg-purple-50 px-5 py-3 border-b border-gray-200">
        <h3 class="font-bold text-purple-900">🧠 Tài liệu 2: Custom Instructions</h3>
        <p class="text-xs text-purple-700 mt-0.5">Hướng dẫn cách AI nói chuyện — quan trọng nhất</p>
      </div>
      <div class="p-5 space-y-2">
        <p>Điền vào phần: giọng trả lời (thân thiện / chuyên nghiệp / vui vẻ), câu trả lời mẫu cho 5 câu hỏi hay gặp, cách xử lý khi khách hỏi giá.</p>
        <p class="text-gray-500 text-xs">💡 Đây là phần quyết định AI nói chuyện "người" hay "robot". Bỏ thời gian điền kỹ phần này.</p>
      </div>
    </div>

    <div class="border border-gray-200 rounded-xl overflow-hidden mt-3">
      <div class="bg-red-50 px-5 py-3 border-b border-gray-200">
        <h3 class="font-bold text-red-900">🚫 Tài liệu 3: Avoid Certain Topics</h3>
        <p class="text-xs text-red-700 mt-0.5">Những gì AI KHÔNG được nói</p>
      </div>
      <div class="p-5 space-y-2">
        <p>Điền vào các chủ đề AI cần tránh: đối thủ, thông tin chưa xác nhận, cam kết quá mức. Template đã có sẵn các mục phổ biến — bạn chỉ cần bỏ/thêm cho phù hợp với shop.</p>
        <p class="text-gray-500 text-xs">💡 Đừng bỏ qua bước này. AI biết không nói gì cũng quan trọng như biết nói gì.</p>
      </div>
    </div>

    <div class="border border-gray-200 rounded-xl overflow-hidden mt-3">
      <div class="bg-green-50 px-5 py-3 border-b border-gray-200">
        <h3 class="font-bold text-green-900">✅ Tài liệu 4: Test Cases</h3>
        <p class="text-xs text-green-700 mt-0.5">20+ câu hỏi để test AI trước khi bật</p>
      </div>
      <div class="p-5 space-y-2">
        <p>File này đã có sẵn 20+ câu hỏi mẫu. Bạn dùng ở Bước 4 để test AI sau khi cài xong — chưa cần làm gì với file này lúc này.</p>
      </div>
    </div>
  </div>',
  3, false, true, 20,
  null
),

-- BÀI 4: Paste vào Meta Business Suite
(
  'meta-ai-agent',
  'Bước 3 — Paste vào Meta Business Suite và bật AI',
  'Hướng dẫn từng bước paste nội dung vào đúng ô trong Meta Business Suite để AI hoạt động.',
  '<div class="space-y-4 text-sm leading-relaxed text-gray-700">
    <div class="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-2">
      <p class="font-semibold text-amber-800">⚠️ Yêu cầu trước khi làm bước này</p>
      <p class="text-amber-700 text-xs mt-1">Tài khoản của bạn phải là Admin của Facebook Page. Nếu bạn chỉ là Editor thì không thấy mục AI Settings.</p>
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
          <p class="font-semibold text-gray-900">Vào mục Inbox → AI Settings</p>
          <p class="text-gray-600 mt-1">Menu trái → <strong>Inbox</strong> → góc phải trên có nút <strong>AI</strong> hoặc vào <strong>Settings → AI</strong></p>
        </div>
      </li>
      <li class="flex gap-4">
        <div class="w-7 h-7 bg-[#1D9E75] text-white rounded-full flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">3</div>
        <div>
          <p class="font-semibold text-gray-900">Điền Business Info</p>
          <p class="text-gray-600 mt-1">Paste nội dung từ <strong>Tài liệu 1 (Business Info)</strong> vào ô <em>"About your business"</em></p>
        </div>
      </li>
      <li class="flex gap-4">
        <div class="w-7 h-7 bg-[#1D9E75] text-white rounded-full flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">4</div>
        <div>
          <p class="font-semibold text-gray-900">Điền Custom Instructions</p>
          <p class="text-gray-600 mt-1">Paste nội dung từ <strong>Tài liệu 2</strong> vào ô <em>"Custom Instructions"</em> hoặc <em>"How should AI respond"</em></p>
        </div>
      </li>
      <li class="flex gap-4">
        <div class="w-7 h-7 bg-[#1D9E75] text-white rounded-full flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">5</div>
        <div>
          <p class="font-semibold text-gray-900">Điền Avoid Topics</p>
          <p class="text-gray-600 mt-1">Tìm ô <em>"Topics to avoid"</em> → paste nội dung từ <strong>Tài liệu 3</strong></p>
        </div>
      </li>
      <li class="flex gap-4">
        <div class="w-7 h-7 bg-[#1D9E75] text-white rounded-full flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">6</div>
        <div>
          <p class="font-semibold text-gray-900">Lưu và bật AI</p>
          <p class="text-gray-600 mt-1">Nhấn <strong>Save</strong> → bật toggle <em>"AI-powered replies"</em> sang ON</p>
          <div class="bg-green-50 border border-green-200 rounded-lg p-3 mt-2">
            <p class="text-green-800 text-xs font-semibold">✅ Lúc này AI đã sẵn sàng. Nhưng chưa vội cho khách — sang Bước 4 test trước.</p>
          </div>
        </div>
      </li>
    </ol>

    <div class="bg-blue-50 border border-blue-200 rounded-xl p-4 mt-4">
      <p class="font-semibold text-blue-800">🤔 Không tìm thấy mục AI trong Meta?</p>
      <p class="text-blue-700 text-xs mt-1">Meta đang roll out dần — một số tài khoản chưa có. Nhắn mình qua Telegram @KentHoang, mình hướng dẫn thêm.</p>
    </div>
  </div>',
  4, false, true, 20,
  'Bước này dễ bị nhầm ở chỗ tìm đúng ô để paste. Nếu bạn thấy giao diện khác ảnh chụp trong tài liệu — cứ nhắn mình, Meta hay thay layout lắm.'
),

-- BÀI 5: Test và hoàn thành
(
  'meta-ai-agent',
  'Bước 4 — Test AI và điều chỉnh trước khi bật cho khách',
  'Dùng Test Cases để kiểm tra AI trả lời đúng chưa. Điều chỉnh nếu cần trước khi khách thật dùng.',
  '<div class="space-y-4 text-sm leading-relaxed text-gray-700">
    <p>Đừng bật AI cho khách thật ngay. Hãy test trước để tránh AI nói sai làm mất uy tín shop.</p>

    <div class="bg-gray-50 border border-gray-200 rounded-xl p-5">
      <h3 class="font-bold text-gray-900 mb-3">Cách test AI trong Meta</h3>
      <ol class="list-decimal list-inside space-y-2 text-gray-700 ml-2">
        <li>Dùng một tài khoản Facebook khác (hoặc nhờ bạn bè) nhắn tin vào Page của bạn</li>
        <li>Gõ lần lượt các câu trong <strong>Tài liệu 4 (Test Cases)</strong></li>
        <li>Đọc câu trả lời AI — so sánh với câu trả lời mẫu trong file</li>
        <li>Nếu AI trả lời sai hoặc khó hiểu → quay lại Meta AI Settings và chỉnh Custom Instructions</li>
      </ol>
    </div>

    <div class="space-y-3 mt-4">
      <h3 class="font-bold text-gray-900">Những lỗi hay gặp và cách fix:</h3>

      <div class="border border-red-100 rounded-xl p-4 bg-red-50">
        <p class="font-semibold text-red-800 text-xs">❌ AI trả lời quá chung chung, không nói tên shop</p>
        <p class="text-red-700 text-xs mt-1">→ Thêm tên shop vào đầu Business Info: <em>"Chúng tôi là [Tên Shop]..."</em></p>
      </div>

      <div class="border border-red-100 rounded-xl p-4 bg-red-50">
        <p class="font-semibold text-red-800 text-xs">❌ AI bịa giá hoặc thông tin sai</p>
        <p class="text-red-700 text-xs mt-1">→ Thêm vào Avoid Topics: <em>"Không đưa ra giá cụ thể, hướng khách nhắn để được tư vấn"</em></p>
      </div>

      <div class="border border-red-100 rounded-xl p-4 bg-red-50">
        <p class="font-semibold text-red-800 text-xs">❌ AI không trả lời tiếng Việt</p>
        <p class="text-red-700 text-xs mt-1">→ Thêm vào Custom Instructions: <em>"Luôn trả lời bằng tiếng Việt, xưng 'shop' với khách"</em></p>
      </div>
    </div>

    <div class="bg-green-50 border border-green-200 rounded-xl p-5 mt-4">
      <h3 class="font-bold text-green-900 mb-2">🎉 AI đã chạy đúng? Xong rồi!</h3>
      <p class="text-green-800 text-sm">Bật AI lên, để nguyên chạy. Từ bây giờ khách nhắn lúc nào cũng có người trả lời — kể cả 2 giờ sáng.</p>
      <p class="text-green-700 text-xs mt-2">Nếu sau vài ngày thấy AI trả lời câu nào chưa ổn, cứ quay lại chỉnh Custom Instructions. Không cần làm lại từ đầu.</p>
    </div>

    <div class="border border-gray-200 rounded-xl p-4 mt-4 text-center">
      <p class="text-sm text-gray-600">Cần hỗ trợ thêm?</p>
      <a href="https://t.me/KentHoang" target="_blank" class="inline-block mt-2 bg-[#1D9E75] text-white text-xs font-bold px-5 py-2 rounded-lg">Nhắn Dũng qua Telegram</a>
    </div>
  </div>',
  5, false, true, 15,
  'Bước test này mất 15-20 phút nhưng cực kỳ quan trọng. Mình từng thấy shop bật AI ngay mà không test — khách hỏi về sản phẩm thì AI lại trả lời về chính sách hoàn tiền. Mất khách oan.'
);
