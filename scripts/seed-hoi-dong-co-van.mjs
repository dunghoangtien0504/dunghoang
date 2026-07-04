// ── Seed khóa Hội Đồng Cố Vấn AI vào portal ──────────────────────────────────
// Chạy: node scripts/seed-hoi-dong-co-van.mjs
import { createClient } from '@supabase/supabase-js'
import { readFileSync } from 'fs'

const env = {}
readFileSync('.env.local', 'utf8').split('\n').forEach(l => {
  const m = l.match(/^([A-Z_]+)=(.*)$/)
  if (m) env[m[1]] = m[2].trim()
})
const sb = createClient(env.NEXT_PUBLIC_SUPABASE_URL, env.SUPABASE_SERVICE_ROLE_KEY)

// Khối HTML dùng chung cho 5 bài cố vấn
const advisorHtml = (a) => `<div class="space-y-4 text-sm leading-relaxed text-gray-700">
  <p><strong>${a.role}</strong> — ${a.tagline}</p>
  <h3 class="font-bold text-base text-gray-900 mt-4">Khi nào mang việc đến cố vấn này</h3>
  <ul class="list-none space-y-1.5">${a.when.map(w => `<li>• ${w}</li>`).join('')}</ul>
  <h3 class="font-bold text-base text-gray-900 mt-4">Cố vấn làm việc theo 4 bước</h3>
  <ol class="list-decimal list-inside space-y-1.5 ml-2">
    <li><strong>Chẩn đoán</strong> — hỏi ngược bạn số liệu thật trước, không phán bừa</li>
    <li><strong>Kê toa</strong> — tối đa 3 ưu tiên cho 90 ngày, kèm cảnh báo việc KHÔNG nên làm</li>
    <li><strong>Thực thi</strong> — mở đúng playbook chuyên sâu đi kèm skill</li>
    <li><strong>Bảng tổng kết</strong> — toa việc + KPI đo + lịch tái khám</li>
  </ol>
  <h3 class="font-bold text-base text-gray-900 mt-4">Câu lệnh mẫu (dán vào Claude sau khi cài skill)</h3>
  <div class="bg-gray-50 border border-gray-200 rounded-xl p-4 font-mono text-xs leading-relaxed">${a.prompt}</div>
  <div class="bg-amber-50 border border-amber-200 rounded-xl p-4 mt-4">
    <p class="font-semibold text-amber-800 text-sm">Nguyên tắc của cố vấn này</p>
    <p class="text-amber-700 text-xs mt-1">${a.principle}</p>
  </div>
</div>`

const ADVISORS = [
  {
    n: 3, slug: 'ceo', role: 'CEO — Quản Trị Kiến Tạo', tagline: 'chủ tịch hội đồng, người chẩn đoán tổng thể và quyết thứ tự ưu tiên.',
    when: ['Không biết nên làm gì trước, làm gì sau', 'Muốn scale / tái cấu trúc / thêm sản phẩm mới', 'Doanh thu tăng mà lợi nhuận không tăng', 'Cảm giác "càng làm càng đuối"'],
    prompt: '"Tôi là [nghề], kinh doanh [mô tả]. Doanh thu ___/tháng, chi phí ___, lợi nhuận ___. Kênh khách chính: ___. Tôi đang định [quyết định]. Hãy chẩn đoán giai đoạn doanh nghiệp tôi và kê toa 90 ngày."',
    principle: 'Đúng thứ tự 4 giai đoạn: Sống sót → Chuẩn hóa → Tối ưu → Tự động. Nhảy cóc là chết. CEO sẽ CẢN bạn làm việc chưa tới lúc.',
  },
  {
    n: 4, slug: 'cfo', role: 'CFO — Tài Chính & Dòng Tiền', tagline: 'người canh két sắt, biến cảm giác "hình như có lãi" thành con số biết chắc.',
    when: ['Có lãi mà không thấy tiền đâu', 'Cân nhắc vay vốn / đầu tư mở rộng', 'Muốn biết giá bán hiện tại lời thật bao nhiêu', 'Chi phí tăng nhanh hơn doanh thu'],
    prompt: '"Doanh thu 3 tháng gần nhất: ___. Chi phí cố định: ___. Chi phí biến đổi: ___. Tôi đang cân nhắc [khoản đầu tư]. Hãy soi sức khỏe tài chính và tính giúp tôi có nên xuống tiền không."',
    principle: 'Cash flow > Profit > Revenue. CAC hoàn vốn quá 30 ngày thì đó là sở thích đốt tiền, chưa phải doanh nghiệp.',
  },
  {
    n: 5, slug: 'cmo', role: 'CMO — Marketing Thu Hút', tagline: 'người lo dòng khách chảy vào — chọn kênh, thiết kế offer, đo từng đồng ads.',
    when: ['Chạy ads mà không ra lead', 'Không biết nên làm kênh nào trước', 'Cần lead magnet kéo khách lạ', 'Lập kế hoạch marketing quý/năm'],
    prompt: '"Sản phẩm: ___ giá ___. Khách mục tiêu: ___. Kênh đang có: ___. Ngân sách marketing: ___/tháng. Số lead hiện tại: ___/tuần. Hãy kê kế hoạch thu hút khách 90 ngày theo Core Four."',
    principle: 'Thị trường > Sản phẩm > Offer > Messaging — đúng thứ tự đó. Không bao giờ tối ưu ads khi offer còn yếu.',
  },
  {
    n: 6, slug: 'cco', role: 'CCO — Bán Hàng & Kênh Phân Phối', tagline: 'người biến lead thành tiền và giữ khách quay lại mua tiếp.',
    when: ['Nhiều người hỏi mà ít người chốt', 'Khách mua 1 lần rồi biến mất', 'Muốn thiết kế upsell / gói cao cấp', 'Muốn mở đại lý / cộng tác viên'],
    prompt: '"Sản phẩm ___ giá ___. Mỗi tuần có ___ người hỏi, chốt được ___. Quy trình bán hiện tại: [mô tả]. Hãy soi pipeline của tôi và kê toa tăng tỷ lệ chốt + thiết kế bước bán tiếp theo."',
    principle: 'Bán như bác sĩ: khám trước, kê toa sau. 80% đơn chốt ở lần theo đuổi thứ 5-7 — không phải lần đầu.',
  },
  {
    n: 7, slug: 'chro', role: 'CHRO — Nhân Sự & Lương Khoán', tagline: 'người lo chuyện con người: khi nào tuyển, tuyển ai, trả lương kiểu gì để người tự chạy.',
    when: ['Quá tải, muốn thuê người đầu tiên nhưng sợ', 'Có nhân viên mà việc vẫn dồn về mình', 'Muốn thiết kế lương khoán theo kết quả', 'Nhân sự nghỉ liên tục không hiểu vì sao'],
    prompt: '"Tôi đang tự làm hết, mỗi tuần tốn ___ giờ cho [liệt kê việc]. Doanh thu ___/tháng. Tôi có nên tuyển chưa, tuyển vị trí gì trước, và trả lương kiểu gì?"',
    principle: 'Khoán đến đâu, trao quyền đến đó. Và ở giai đoạn Sống sót: đội của bạn là AI trước, con người sau.',
  },
]

const LESSONS = [
  {
    sort_order: 1, is_free: true, duration: 8,
    title: 'Chào mừng — Công ty AI của bạn',
    description: 'Bức tranh toàn cảnh: 5 giám đốc + 24 nhân viên + quy trình vận hành, và 2 việc duy nhất của bạn.',
    host_note: 'Đọc bài này trước tiên — hiểu bức tranh rồi mọi bài sau sẽ rất nhanh.',
    content_html: `<div class="space-y-4 text-sm leading-relaxed text-gray-700">
      <p>Chào mừng bạn đến với <strong>Hội Đồng Cố Vấn AI</strong> — từ hôm nay bạn không kinh doanh một mình nữa.</p>
      <h3 class="font-bold text-base text-gray-900 mt-4">Công ty AI của bạn có 3 tầng</h3>
      <ul class="list-none space-y-2">
        <li>🏛 <strong>5 Giám đốc</strong> (CEO, CFO, CMO, CCO, CHRO) — tầng NGHĨ: chẩn đoán, kê toa, cản bạn khỏi quyết định sai</li>
        <li>👷 <strong>24 Nhân viên AI</strong> (trọn bộ Khóa 1, đã mở sẵn trong khu học của bạn) — tầng LÀM: viết content, dựng trang bán, email, trả inbox</li>
        <li>🔄 <strong>Quy trình vận hành</strong> — sợi dây nối 2 tầng: giám đốc kê toa việc → nhân viên thực thi → bạn duyệt</li>
      </ul>
      <h3 class="font-bold text-base text-gray-900 mt-4">Việc của bạn chỉ còn 2 thứ</h3>
      <ol class="list-decimal list-inside space-y-1.5 ml-2">
        <li><strong>Họp hội đồng 30 phút</strong> mỗi thứ 2 — mang 4 con số tuần trước đến</li>
        <li><strong>Duyệt thành phẩm 15 phút</strong> mỗi ngày — trước khi đăng/gửi</li>
      </ol>
      <p>Tổng cộng ~2,5 giờ chủ động mỗi tuần. Phần còn lại AI nghĩ và làm.</p>
      <div class="bg-amber-50 border border-amber-200 rounded-xl p-4 mt-4">
        <p class="font-semibold text-amber-800 text-sm">Nói thẳng về chữ "tự động"</p>
        <p class="text-amber-700 text-xs mt-1">AI không tự đăng bài, không tự gửi tiền, không tự quyết thay bạn. Mọi thứ về hàng chờ duyệt. Đây là chủ ý — doanh nghiệp mang tên bạn, quyết định cuối phải là của bạn.</p>
      </div>
      <p class="mt-4">Lộ trình gợi ý: bài 2 cài skill (20 phút) → đọc lướt 5 bài cố vấn → bài 8 học quy trình → bài 9 họp buổi đầu tiên ngay trong tuần này.</p>
    </div>`,
  },
  {
    sort_order: 2, is_free: false, duration: 20,
    title: 'Cài 5 skill giám đốc vào Claude',
    description: 'Tải bộ skill và cài vào Claude — 20 phút, không cần biết code.',
    host_note: 'Kẹt ở bước nào cứ nhắn Telegram @KentHoang kèm ảnh chụp màn hình, mình chỉ liền.',
    content_html: `<div class="space-y-4 text-sm leading-relaxed text-gray-700">
      <h3 class="font-bold text-base text-gray-900">Bước 1 — Tải bộ skill</h3>
      <p>Tải trọn bộ 5 giám đốc (khuyên dùng): <a href="/skills/BO-5-SKILL-HDQT-MINI.zip" class="text-green-700 underline font-semibold">BO-5-SKILL-HDQT-MINI.zip</a></p>
      <p>Hoặc tải lẻ từng vị trí:</p>
      <ul class="list-none space-y-1">
        <li>• <a href="/skills/ceo-quan-tri-kien-tao.zip" class="text-green-700 underline">CEO — Quản Trị Kiến Tạo</a></li>
        <li>• <a href="/skills/cfo-tai-chinh-dong-tien.zip" class="text-green-700 underline">CFO — Tài Chính & Dòng Tiền</a></li>
        <li>• <a href="/skills/cmo-marketing-thu-hut.zip" class="text-green-700 underline">CMO — Marketing Thu Hút</a></li>
        <li>• <a href="/skills/cco-ban-hang-kenh-phan-phoi.zip" class="text-green-700 underline">CCO — Bán Hàng & Kênh Phân Phối</a></li>
        <li>• <a href="/skills/chro-nhan-su-luong-khoan.zip" class="text-green-700 underline">CHRO — Nhân Sự & Lương Khoán</a></li>
      </ul>
      <h3 class="font-bold text-base text-gray-900 mt-4">Bước 2 — Cài vào Claude</h3>
      <p><strong>Cách A — Claude.ai (dễ nhất):</strong> vào <em>Settings → Capabilities → Skills → Upload skill</em>, chọn file zip vừa tải. Lặp lại cho đủ 5 skill (hoặc 1 file trọn bộ).</p>
      <p><strong>Cách B — Claude Code (cho bạn nào dùng máy tính nhiều):</strong> giải nén vào thư mục <code>.claude/skills/</code> trong thư mục làm việc của bạn.</p>
      <h3 class="font-bold text-base text-gray-900 mt-4">Bước 3 — Test</h3>
      <div class="bg-gray-50 border border-gray-200 rounded-xl p-4 font-mono text-xs">"Công ty mình đang [mô tả 1 vấn đề thật]. Hội đồng cố vấn nghĩ sao?"</div>
      <p>Nếu Claude bắt đầu hỏi ngược bạn số liệu (thay vì khuyên ngay) — skill đã chạy đúng. Cố vấn thật không bao giờ phán khi chưa khám.</p>
    </div>`,
  },
  ...ADVISORS.map(a => ({
    sort_order: a.n, is_free: false, duration: 15,
    title: `Cố vấn ${a.role}`,
    description: a.tagline.charAt(0).toUpperCase() + a.tagline.slice(1),
    host_note: null,
    content_html: advisorHtml(a),
  })),
  {
    sort_order: 8, is_free: false, duration: 25,
    title: 'Quy Trình Vận Hành Hội Đồng — hệ điều hành công ty AI',
    description: '4 nghi thức: họp thứ 2, giao việc cho agent, duyệt hàng ngày, tự động hóa theo lịch.',
    host_note: 'Đây là bài quan trọng nhất khóa. In lịch tuần chuẩn ra dán trước bàn làm việc.',
    content_html: `<div class="space-y-4 text-sm leading-relaxed text-gray-700">
      <h3 class="font-bold text-base text-gray-900">Nghi thức 1 — Họp hội đồng (thứ 2, 30 phút)</h3>
      <p>Điền 4 số tuần trước: <strong>leads mới · đơn + doanh thu · lãi/lỗ · giờ tự tay làm</strong>. Rồi dán vào Claude:</p>
      <div class="bg-gray-50 border border-gray-200 rounded-xl p-4 font-mono text-xs leading-relaxed">"Họp hội đồng tuần. Báo cáo: [4 số]. Đối chiếu kế hoạch 90 ngày, chẩn đoán tuần qua và kê toa việc tuần này — tối đa 3 việc, ghi rõ giao agent nào thực thi."</div>
      <h3 class="font-bold text-base text-gray-900 mt-4">Nghi thức 2 — Giao việc cho 24 agent (10 phút)</h3>
      <p>Toa ghi việc gì, tra bảng nối để lấy câu lệnh giao đúng agent:</p>
      <ul class="list-none space-y-1.5">
        <li>• Cần content → <strong>Hệ Thống Content (#18) + BRAND_DNA (#02)</strong></li>
        <li>• Sửa offer → <strong>Thiết Kế Offer (#07)</strong></li>
        <li>• Trang bán → <strong>Dựng Landing Page (#10)</strong></li>
        <li>• Chăm lead / vớt khách nguội → <strong>Email (#15) / Follow-Up (#16)</strong></li>
        <li>• Mẫu quảng cáo → <strong>Ads (#13)</strong></li>
        <li>• Trả inbox tự động → <strong>Meta Business AI (#22)</strong></li>
      </ul>
      <p class="text-xs text-gray-500">Nguyên tắc: giao việc luôn kèm chẩn đoán từ toa. Agent có ngữ cảnh làm đúng gấp nhiều lần agent bị sai khiến trống không.</p>
      <h3 class="font-bold text-base text-gray-900 mt-4">Nghi thức 3 — Duyệt (15 phút/ngày, cố định giờ)</h3>
      <p>Mỗi thành phẩm chỉ 3 lựa chọn: <strong>Duyệt · Sửa 1 lần · Bỏ</strong>. Không sửa vòng 2 — nếu agent sai hoài 1 kiểu, ghi vào file BRAND_DNA/SOP để hết sai từ gốc.</p>
      <h3 class="font-bold text-base text-gray-900 mt-4">Nghi thức 4 — Tự động hóa theo lịch</h3>
      <ol class="list-decimal list-inside space-y-1 ml-2">
        <li><strong>Mức 1:</strong> gõ lệnh họp + giao việc mỗi tuần (bạn đang ở đây)</li>
        <li><strong>Mức 2:</strong> báo cáo tuần tự tổng hợp, nháp content tự soạn mỗi sáng (lịch tự động trong Claude Code)</li>
        <li><strong>Mức 3:</strong> chatbot trực Messenger 24/7 + Telegram báo đơn khi tiền vào (học ở skill #22 + Thử Thách 7 Ngày)</li>
      </ol>
      <div class="bg-green-50 border border-green-200 rounded-xl p-4 mt-4">
        <p class="font-semibold text-green-800 text-sm">Lịch tuần chuẩn (~2,5 giờ chủ động)</p>
        <p class="text-green-700 text-xs mt-1">Thứ 2: họp + giao việc (40ph) · Thứ 3-6: duyệt (15ph/ngày) · Thứ 7: ghi chuyện nóng (10ph) · CN: nghỉ — hệ thống vẫn nhận đơn.</p>
      </div>
    </div>`,
  },
  {
    sort_order: 9, is_free: false, duration: 40,
    title: 'Buổi họp hội đồng đầu tiên của bạn — làm ngay hôm nay',
    description: 'Thực hành: điền 4 số, chạy buổi họp thật, nhận toa việc đầu tiên và giao cho agent.',
    host_note: 'Làm xong buổi họp đầu, chụp toa việc gửi @KentHoang — mình xem giúp toa có hợp lý không, miễn phí.',
    content_html: `<div class="space-y-4 text-sm leading-relaxed text-gray-700">
      <p>Đừng để sang tuần. Buổi họp đầu tiên làm ngay hôm nay, dù số xấu — số xấu chính là thứ hội đồng cần thấy.</p>
      <h3 class="font-bold text-base text-gray-900 mt-4">Bước 1 — Điền báo cáo (5 phút, ước lượng cũng được)</h3>
      <div class="bg-gray-50 border border-gray-200 rounded-xl p-4 font-mono text-xs leading-relaxed">BÁO CÁO TUẦN 1 — [ngày]<br/>1. Leads mới tuần qua: ___<br/>2. Đơn + doanh thu: ___<br/>3. Lãi/lỗ ước: ___<br/>4. Giờ tôi tự tay làm việc lặp lại: ___<br/>Chuyện nóng nhất: ___________</div>
      <h3 class="font-bold text-base text-gray-900 mt-4">Bước 2 — Chạy buổi họp</h3>
      <p>Dán báo cáo + câu lệnh họp (bài 8) vào Claude. Cố vấn sẽ hỏi ngược vài câu — trả lời thật, đừng làm đẹp số.</p>
      <h3 class="font-bold text-base text-gray-900 mt-4">Bước 3 — Nhận toa và giao việc</h3>
      <p>Toa có tối đa 3 việc. Chọn việc số 1, tra bảng nối ở bài 8, giao ngay cho agent tương ứng. Thành phẩm đầu tiên của công ty AI thường ra trong 15 phút.</p>
      <h3 class="font-bold text-base text-gray-900 mt-4">Bước 4 — Đặt lịch cố định</h3>
      <p>Mở lịch điện thoại, tạo sự kiện lặp: <strong>"Họp hội đồng" — thứ 2 hàng tuần, 30 phút</strong>. Nghi thức chỉ có tác dụng khi nó cố định.</p>
      <div class="bg-amber-50 border border-amber-200 rounded-xl p-4 mt-4">
        <p class="font-semibold text-amber-800 text-sm">Nhắc lại: 24 nhân viên AI của bạn ở đâu?</p>
        <p class="text-amber-700 text-xs mt-1">Khóa "24 AI Agent for Business" đã được mở sẵn trong khu học của bạn (nằm cùng trang danh sách khóa). Chưa học hết cũng không sao — cần agent nào cho toa việc thì học đúng agent đó trước.</p>
      </div>
    </div>`,
  },
]

async function run() {
  // 1. Course product
  const { error: cErr } = await sb.from('course_products').upsert({
    id: 'hoi-dong-co-van',
    name: 'Hội Đồng Cố Vấn AI',
    price: 2868686,
    description: 'Trọn bộ công ty AI: 5 giám đốc (CEO/CFO/CMO/CCO/CHRO) + 24 nhân viên AI + quy trình vận hành tuần. Bạn họp 30 phút thứ 2, duyệt 15 phút mỗi ngày.',
    is_active: true,
    commission_pct: 20,
  }, { onConflict: 'id' })
  if (cErr) { console.error('course_products:', cErr.message); process.exit(1) }
  console.log('✓ course_products: hoi-dong-co-van')

  // 2. Xóa lessons cũ rồi chèn mới
  await sb.from('lessons').delete().eq('course_id', 'hoi-dong-co-van')
  for (const l of LESSONS) {
    const { error } = await sb.from('lessons').insert({
      course_id: 'hoi-dong-co-van',
      is_published: true,
      ...l,
    })
    if (error) { console.error(`Bài ${l.sort_order}:`, error.message); process.exit(1) }
    console.log(`✓ Bài ${l.sort_order}: ${l.title}`)
  }
  console.log(`\nXong — ${LESSONS.length} bài đã vào portal.`)
}

run()
