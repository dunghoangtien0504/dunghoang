export interface Product {
  id:         string
  name:       string
  price:      number
  codePrefix: string
  successUrl: string
}

export const PRODUCTS: Record<string, Product> = {
  // ── KHÓA PHỄU — entry product, cũng là quà tặng kèm hai khóa trên ──────────
  content_368: {
    id:         'content_368',
    name:       'Content Không Cần Cảm Hứng',
    price:      368686,
    codePrefix: 'DH-CT',
    successUrl: '/cam-on-content',
  },
  // ── KHÓA 1 — 24 skill, gồm trang bán hàng + tặng Content System ─────────────
  'khoa-1': {
    id:         'khoa-1',
    name:       '24 AI Agent for Business',
    price:      868686,
    codePrefix: 'DH-K1',
    successUrl: '/cam-on-khoa-1',
  },
  khoa2_2768: {
    id:         'khoa2_2768',
    name:       'Coaching — Cầm Tay Chỉ Việc',
    price:      3868686,
    codePrefix: 'DH-K2',
    successUrl: '/cam-on-khoa-2',
  },
  challenge_368: {
    id:         'challenge_368',
    name:       'Bí Quyết 7 Ngày Đưa AI Vào Business — Cọc 368k',
    price:      368000,
    codePrefix: 'DH-CHAL',
    successUrl: '/cam-on-thu-thach',
  },
  // ── KHÓA LANDING PAGE — Vibe Coding + 8 skill files ──────────────────────────
  'landing-page': {
    id:         'landing-page',
    name:       'Landing Page Siêu Chuyển Đổi',
    price:      686868,
    codePrefix: 'DH-LP',
    successUrl: '/cam-on-landing-page',
  },
}

/** Tên ngắn hiển thị trong admin/portal — nguồn duy nhất, dùng chung mọi nơi */
export const COURSE_SHORT_NAMES: Record<string, string> = {
  content_368:   'Content System',
  mini_368:      'Landing Page Siêu Chuyển Đổi', // giữ để không lỗi đơn hàng cũ
  'khoa-1':      '24 AI Agent',
  khoa1_686:     '24 AI Agent', // giữ để không lỗi đơn hàng cũ
  khoa2_2768:    'Coaching',
  challenge_368: 'Thử Thách 7 Ngày',
  '1kem1':       '1 Kèm 1',
  'landing-page': 'Landing Page Siêu Chuyển Đổi',
}

/** Lấy tên ngắn an toàn cho 1 course_id bất kỳ */
export function courseShortName(courseId: string): string {
  return COURSE_SHORT_NAMES[courseId] ?? courseId
}

/** Tạo order code ngẫu nhiên: DH-MINI-A3F9K2 */
export function genOrderCode(productId: string): string {
  const p = PRODUCTS[productId]
  if (!p) throw new Error(`Unknown product: ${productId}`)
  const rand = Math.random().toString(36).substring(2, 8).toUpperCase()
  return `${p.codePrefix}-${rand}`
}

/** Format tiền VNĐ: 368000 → "368.000đ" */
export function formatVND(amount: number): string {
  return amount.toLocaleString('vi-VN') + 'đ'
}

/** VietQR URL — QR image đã điền sẵn số tiền + nội dung */
export function vietQRUrl(amount: number, orderCode: string): string {
  const bank    = process.env.NEXT_PUBLIC_BANK_CODE    ?? 'MB'
  const account = process.env.NEXT_PUBLIC_ACCOUNT_NO   ?? ''
  const name    = process.env.NEXT_PUBLIC_ACCOUNT_NAME ?? ''
  const info    = encodeURIComponent(orderCode)
  const accName = encodeURIComponent(name)
  return `https://img.vietqr.io/image/${bank}-${account}-compact2.png?amount=${amount}&addInfo=${info}&accountName=${accName}`
}
