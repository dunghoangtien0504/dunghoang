// ── BÁO CÁO HỘI ĐỒNG TUẦN ─────────────────────────────────────────────────────
// Tự tổng hợp 4 chỉ số từ Supabase cho buổi họp hội đồng thứ 2.
// Chạy: node scripts/board-report.mjs
// (Lãi/lỗ cần chi phí — nhập tay ở CHI_PHI_CO_DINH bên dưới)

import { createClient } from '@supabase/supabase-js'
import { readFileSync, writeFileSync } from 'fs'

const CHI_PHI_CO_DINH_THANG = 2_000_000 // đ/tháng: Supabase, domain, tool AI... — chỉnh theo thực tế

const env = {}
readFileSync('.env.local', 'utf8').split('\n').forEach(line => {
  const m = line.match(/^([A-Z_]+)=(.*)$/)
  if (m) env[m[1]] = m[2].trim()
})
const supabase = createClient(env.NEXT_PUBLIC_SUPABASE_URL, env.SUPABASE_SERVICE_ROLE_KEY)

const now = new Date()
const weekAgo = new Date(now.getTime() - 7 * 24 * 3600 * 1000)
const iso = d => d.toISOString()
const vnd = n => (n || 0).toLocaleString('vi-VN') + 'đ'

async function safeCount(table, filters = q => q) {
  try {
    const { count, error } = await filters(
      supabase.from(table).select('*', { count: 'exact', head: true })
    )
    return error ? `(bảng ${table}: ${error.message})` : count
  } catch { return `(không đọc được ${table})` }
}

async function run() {
  // 1. Engaged leads mới trong tuần (subscribers mới)
  const leads = await safeCount('subscribers', q => q.gte('created_at', iso(weekAgo)))

  // 2. Đơn + doanh thu tuần (đơn completed/paid)
  const { data: orders, error: oErr } = await supabase
    .from('orders').select('amount,status,course_name,created_at')
    .gte('created_at', iso(weekAgo))
  const paid = (orders || []).filter(o => ['completed', 'paid'].includes(o.status))
  const pending = (orders || []).filter(o => o.status === 'pending')
  const revenue = paid.reduce((s, o) => s + (Number(o.amount) || 0), 0)

  // 3. Lãi/lỗ tuần (doanh thu − chi phí cố định quy tuần)
  const chiPhiTuan = Math.round(CHI_PHI_CO_DINH_THANG / 4.33)
  const laiLo = revenue - chiPhiTuan

  // 4. Pageviews tuần (đo kênh content có kéo người vào không)
  const views = await safeCount('page_views', q => q.gte('created_at', iso(weekAgo)))

  const report = `BÁO CÁO HỘI ĐỒNG TUẦN — ${now.toLocaleDateString('vi-VN')}
(7 ngày: ${weekAgo.toLocaleDateString('vi-VN')} → ${now.toLocaleDateString('vi-VN')})

1. Engaged leads mới:        ${leads}
2. Đơn thanh toán thành công: ${paid.length} đơn / ${vnd(revenue)}${pending.length ? `   (đang pending: ${pending.length})` : ''}
3. Lãi/lỗ tuần (ước):         ${vnd(laiLo)}   [chi phí cố định ~${vnd(chiPhiTuan)}/tuần]
4. Pageviews website:         ${views}
5. Giờ CEO tự tay làm:        ___ (điền tay từ time audit)

Đơn theo sản phẩm:
${paid.length ? paid.map(o => `  - ${o.course_name}: ${vnd(Number(o.amount))}`).join('\n') : '  (chưa có đơn thành công tuần này)'}
${oErr ? `\n⚠ Lỗi đọc orders: ${oErr.message}` : ''}
---
Dán báo cáo này vào Claude kèm câu: "Họp hội đồng tuần. Đối chiếu kế hoạch
90 ngày, chẩn đoán và kê toa việc tuần này, ghi rõ giao agent nào."`

  console.log(report)
  const fname = `bao-cao-tuan-${now.toISOString().slice(0, 10)}.txt`
  writeFileSync(fname, report, 'utf8')
  console.log(`\n💾 Đã lưu: ${fname}`)
}

run()
