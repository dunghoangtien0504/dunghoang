// Token truy cập dashboard CTV — có chữ ký HMAC, KHÔNG đoán được.
// Thay cho việc dùng ref_code (đoán được: TÊN+NĂM) làm "mật khẩu" xem dữ liệu tài chính.
// Stateless: không cần cột DB mới. Bí mật ký lấy từ env (service role key luôn có sẵn
// trên cả local lẫn Vercel, chỉ tồn tại phía server).

const SECRET = process.env.AFFILIATE_TOKEN_SECRET || process.env.SUPABASE_SERVICE_ROLE_KEY || ''

async function getKey(secret: string): Promise<CryptoKey> {
  const enc = new TextEncoder()
  return crypto.subtle.importKey('raw', enc.encode(secret), { name: 'HMAC', hash: 'SHA-256' }, false, ['sign', 'verify'])
}

function b64urlEncode(s: string): string {
  return btoa(s).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '')
}
function b64urlDecode(s: string): string {
  const pad = s.length % 4 === 0 ? '' : '='.repeat(4 - (s.length % 4))
  return atob(s.replace(/-/g, '+').replace(/_/g, '/') + pad)
}

/** Tạo token dashboard cho 1 ref_code. */
export async function createAffiliateToken(refCode: string): Promise<string> {
  const payload = refCode.toUpperCase()
  const key = await getKey(SECRET)
  const sig = await crypto.subtle.sign('HMAC', key, new TextEncoder().encode(payload))
  const sigHex = Array.from(new Uint8Array(sig)).map(b => b.toString(16).padStart(2, '0')).join('')
  return `${b64urlEncode(payload)}.${sigHex}`
}

/** Verify token → trả ref_code nếu hợp lệ, null nếu không. Constant-time qua crypto.subtle.verify. */
export async function verifyAffiliateToken(token: string): Promise<string | null> {
  try {
    const parts = token.split('.')
    if (parts.length !== 2) return null
    const [payloadB64, sigHex] = parts
    const payload = b64urlDecode(payloadB64)
    const key = await getKey(SECRET)
    const sigBytes = new Uint8Array(sigHex.match(/.{1,2}/g)!.map(h => parseInt(h, 16)))
    const ok = await crypto.subtle.verify('HMAC', key, sigBytes, new TextEncoder().encode(payload))
    return ok ? payload : null
  } catch {
    return null
  }
}
