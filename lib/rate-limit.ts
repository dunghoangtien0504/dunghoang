// Rate limiter đơn giản (in-memory, sliding window) chống brute-force & spam.
// Lưu ý: trên serverless (Vercel), bộ nhớ theo từng instance — không chia sẻ tuyệt đối
// giữa các cold start, nhưng đủ chặn tấn công dồn dập từ 1 nguồn trên instance đang ấm.
// Với quy mô hiện tại, đây là lớp phòng thủ hợp lý mà không cần thêm Redis.

type Hit = { count: number; resetAt: number }
const store = new Map<string, Hit>()

// Dọn rác định kỳ để Map không phình vô hạn
let lastSweep = Date.now()
function sweep(now: number) {
  if (now - lastSweep < 60_000) return
  lastSweep = now
  store.forEach((v, k) => { if (v.resetAt <= now) store.delete(k) })
}

/**
 * @returns { ok: true } nếu còn quota, hoặc { ok: false, retryAfter } (giây) nếu vượt.
 */
export function rateLimit(key: string, limit: number, windowMs: number): { ok: boolean; retryAfter: number } {
  const now = Date.now()
  sweep(now)
  const hit = store.get(key)

  if (!hit || hit.resetAt <= now) {
    store.set(key, { count: 1, resetAt: now + windowMs })
    return { ok: true, retryAfter: 0 }
  }

  if (hit.count >= limit) {
    return { ok: false, retryAfter: Math.ceil((hit.resetAt - now) / 1000) }
  }

  hit.count++
  return { ok: true, retryAfter: 0 }
}

/** Lấy IP client từ header (Vercel/proxy set x-forwarded-for). */
export function clientIp(req: Request): string {
  const xff = req.headers.get('x-forwarded-for')
  if (xff) return xff.split(',')[0].trim()
  return req.headers.get('x-real-ip') ?? 'unknown'
}
