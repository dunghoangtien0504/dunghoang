const ALGORITHM = { name: 'HMAC', hash: 'SHA-256' }

async function getKey(secret: string): Promise<CryptoKey> {
  const encoder = new TextEncoder()
  return await crypto.subtle.importKey(
    'raw',
    encoder.encode(secret),
    ALGORITHM,
    false,
    ['sign', 'verify']
  )
}

export async function createToken(username: string, secret: string, maxAgeSeconds: number): Promise<string> {
  const expiry = Date.now() + maxAgeSeconds * 1000
  const payload = `${username}:${expiry}`
  const encoder = new TextEncoder()
  const key = await getKey(secret)
  const signatureBuffer = await crypto.subtle.sign('HMAC', key, encoder.encode(payload))
  
  // Convert signature to hex string
  const signatureArray = Array.from(new Uint8Array(signatureBuffer))
  const signatureHex = signatureArray.map(b => b.toString(16).padStart(2, '0')).join('')
  
  // Token format: base64(payload).signatureHex
  const token = `${btoa(payload)}.${signatureHex}`
  return token
}

export async function verifyToken(token: string, secret: string): Promise<string | null> {
  try {
    const parts = token.split('.')
    if (parts.length !== 2) return null
    const [payloadB64, signatureHex] = parts
    const payload = atob(payloadB64)
    const [username, expiryStr] = payload.split(':')
    const expiry = parseInt(expiryStr, 10)
    
    if (isNaN(expiry) || Date.now() > expiry) return null
    
    const encoder = new TextEncoder()
    const key = await getKey(secret)
    
    // Parse signature hex back to Uint8Array
    const signatureBytes = new Uint8Array(
      signatureHex.match(/.{1,2}/g)!.map(byte => parseInt(byte, 16))
    )
    
    const isValid = await crypto.subtle.verify('HMAC', key, signatureBytes, encoder.encode(payload))
    return isValid ? username : null
  } catch {
    return null
  }
}
