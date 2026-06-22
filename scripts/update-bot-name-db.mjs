import { createClient } from '@supabase/supabase-js'
import { readFileSync } from 'fs'

// Đọc .env.local
const env = {}
try {
  const file = readFileSync('.env.local', 'utf8')
  file.split('\n').forEach(line => {
    const m = line.match(/^([A-Z_]+)=(.*)$/)
    if (m) env[m[1]] = m[2].trim()
  })
} catch (e) {
  console.error('Không tìm thấy .env.local', e)
  process.exit(1)
}

const supabase = createClient(
  env.NEXT_PUBLIC_SUPABASE_URL,
  env.SUPABASE_SERVICE_ROLE_KEY
)

async function run() {
  console.log('🚀 Đang kết nối database để thay đổi tên bot hỗ trợ...')

  // Lấy tất cả bài học có chứa @lungmatkp3_bot
  const { data: lessons, error: fetchErr } = await supabase
    .from('lessons')
    .select('id, title, description')
    .ilike('description', '%@lungmatkp3_bot%')

  if (fetchErr) {
    console.error('❌ Lỗi truy vấn lessons:', fetchErr.message)
    return
  }

  console.log(`🔍 Tìm thấy ${lessons?.length || 0} bài học chứa @lungmatkp3_bot.`)

  for (const lesson of (lessons || [])) {
    const newDescription = lesson.description.replace(/@lungmatkp3_bot/g, '@tieuhama_bot')
    const { error: updateErr } = await supabase
      .from('lessons')
      .update({ description: newDescription })
      .eq('id', lesson.id)

    if (updateErr) {
      console.error(`❌ Lỗi cập nhật bài học "${lesson.title}":`, updateErr.message)
    } else {
      console.log(`✅ Đã cập nhật xong bài học: "${lesson.title}"`)
    }
  }

  console.log('✨ Cập nhật database hoàn tất!')
}

run()
