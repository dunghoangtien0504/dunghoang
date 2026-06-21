// Tạo tài khoản học viên + enroll vào khóa học
// Chạy: node scripts/create-user.mjs <email> <password> [courseId,courseId,...]
import { createClient } from '@supabase/supabase-js'
import { readFileSync } from 'fs'

// Đọc .env.local thủ công
const env = {}
for (const line of readFileSync('.env.local', 'utf8').split('\n')) {
  const m = line.match(/^([A-Z_]+)=(.*)$/)
  if (m) env[m[1]] = m[2].trim()
}

const supabase = createClient(
  env.NEXT_PUBLIC_SUPABASE_URL,
  env.SUPABASE_SERVICE_ROLE_KEY,
  { auth: { autoRefreshToken: false, persistSession: false } }
)

const email    = process.argv[2]
const password = process.argv[3]
const courses  = (process.argv[4] || '').split(',').filter(Boolean)

async function main() {
  // 1. Tạo user (hoặc tìm user đã tồn tại)
  let userId
  const { data: created, error: createErr } = await supabase.auth.admin.createUser({
    email,
    password,
    email_confirm: true,
  })

  if (createErr) {
    if (createErr.message?.includes('already been registered') || createErr.status === 422) {
      // User đã tồn tại → tìm id rồi update password
      const { data: list } = await supabase.auth.admin.listUsers({ perPage: 1000 })
      const existing = list.users.find(u => u.email === email)
      if (!existing) { console.error('Không tìm thấy user đã tồn tại:', createErr.message); process.exit(1) }
      userId = existing.id
      await supabase.auth.admin.updateUserById(userId, { password, email_confirm: true })
      console.log('User đã tồn tại → đã cập nhật mật khẩu. id:', userId)
    } else {
      console.error('Lỗi tạo user:', createErr.message)
      process.exit(1)
    }
  } else {
    userId = created.user.id
    console.log('Đã tạo user mới. id:', userId)
  }

  // 2. Enroll vào các khóa
  for (const courseId of courses) {
    const { error: enErr } = await supabase
      .from('enrollments')
      .upsert({ user_id: userId, course_id: courseId }, { onConflict: 'user_id,course_id' })
    if (enErr) console.error(`  Enroll ${courseId} lỗi:`, enErr.message)
    else       console.log(`  Đã enroll: ${courseId}`)
  }

  console.log('Xong.')
}

main()
