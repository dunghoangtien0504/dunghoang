import fs from 'fs'
import path from 'path'

// Read environment variables from .env.local
const envPath = path.resolve(process.cwd(), '.env.local')
let env = {}
try {
  const envContent = fs.readFileSync(envPath, 'utf8')
  envContent.split('\n').forEach(line => {
    const match = line.match(/^\s*([\w.-]+)\s*=\s*(.*)\s*$/)
    if (match) {
      let value = match[1] ? match[2].trim() : ''
      if (value.startsWith('"') && value.endsWith('"')) value = value.slice(1, -1)
      if (value.startsWith("'") && value.endsWith("'")) value = value.slice(1, -1)
      env[match[1]] = value
    }
  })
} catch (err) {
  console.log('⚠️ Không đọc được .env.local, sử dụng giá trị mặc định')
}

// Read parameters from command line
const orderCode = process.argv[2] || 'DH-K1-TEST1234'
const amount = Number(process.argv[3]) || 868686

async function run() {
  const webhookUrl = `${env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/api/webhooks/sepay`
  const secret = env.SEPAY_WEBHOOK_SECRET || 'DH_SEPAY_2026'

  console.log(`🚀 Đang giả lập webhook Sepay tới: ${webhookUrl}`)
  console.log(`📦 Mã đơn: ${orderCode}, Số tiền nhận: ${amount.toLocaleString('vi-VN')}₫`)

  const payload = {
    id: Math.floor(Math.random() * 1000000),
    gateway: 'MBBank',
    transactionDate: new Date().toISOString(),
    accountNumber: env.NEXT_PUBLIC_ACCOUNT_NO || '333303838',
    subAccount: null,
    transferType: 'in',
    transferAmount: amount,
    accumulatedBalance: 50000000,
    code: null,
    transactionContent: `Chuyen khoan don hang ${orderCode}`,
    referenceCode: `FT${Math.floor(Math.random() * 1000000000)}`,
    content: `Chuyen khoan don hang ${orderCode}`
  }

  try {
    const res = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Apikey ${secret}`
      },
      body: JSON.stringify(payload)
    })

    const data = await res.json()
    console.log(`\n✅ Kết quả từ server (HTTP ${res.status}):`)
    console.log(JSON.stringify(data, null, 2))
  } catch (err) {
    console.error('\n❌ Lỗi kết nối:', err.message)
  }
}

run()
