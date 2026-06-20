export interface Product {
  id:         string
  name:       string
  price:      number
  codePrefix: string
  successUrl: string
}

export const PRODUCTS: Record<string, Product> = {
  mini_368: {
    id:         'mini_368',
    name:       'Mini — Trang Bán Hàng 1 Giờ',
    price:      368000,
    codePrefix: 'DH-MINI',
    successUrl: '/cam-on-mini',
  },
  khoa1_686: {
    id:         'khoa1_686',
    name:       'Khóa 1 — Bản Tự Lập (25 Skill AI)',
    price:      686868,
    codePrefix: 'DH-K1',
    successUrl: '/cam-on-khoa-1',
  },
  khoa2_2768: {
    id:         'khoa2_2768',
    name:       'Khóa 2 — Bản Có Đội Trưởng',
    price:      2768686,
    codePrefix: 'DH-K2',
    successUrl: '/cam-on-khoa-2',
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
