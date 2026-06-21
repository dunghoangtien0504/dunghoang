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
  // ── TRANG BÁN HÀNG — skill Landing Page, tặng kèm Content System ────────────
  mini_368: {
    id:         'mini_368',
    name:       'Trang Bán Hàng — Làm Trong 1 Buổi',
    price:      686868,
    codePrefix: 'DH-MINI',
    successUrl: '/cam-on-mini',
  },
  // ── KHÓA 1 — 25 skill, gồm trang bán hàng + tặng Content System ─────────────
  khoa1_686: {
    id:         'khoa1_686',
    name:       'Tự Chiến — 24 Skill AI',
    price:      868686,
    codePrefix: 'DH-K1',
    successUrl: '/cam-on-khoa-1',
  },
  khoa2_2768: {
    id:         'khoa2_2768',
    name:       'Có Đội — 25 Skill + Tiểu Hà Mã',
    price:      2768686,
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
