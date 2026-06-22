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
  console.log('🚀 Đang kết nối database để dọn dẹp các Skill...')

  // 1. Cập nhật tên của các sản phẩm khóa học trong table course_products
  console.log('\n--- Cập nhật course_products ---')
  const { error: errP1 } = await supabase
    .from('course_products')
    .update({ name: 'Khóa 1 — Bản Tự Lập (24 Skill AI)' })
    .eq('id', 'khoa1_686')
  if (errP1) console.error('❌ Lỗi cập nhật tên khoa1_686:', errP1.message)
  else console.log('✅ Đã đổi tên khoa1_686 thành: Khóa 1 — Bản Tự Lập (24 Skill AI)')

  const { error: errP2 } = await supabase
    .from('course_products')
    .update({ name: 'Khóa 2 — Bản Có Đội Trưởng (24 Skill)' })
    .eq('id', 'khoa2_2768')
  if (errP2) console.error('❌ Lỗi cập nhật tên khoa2_2768:', errP2.message)
  else console.log('✅ Đã đổi tên khoa2_2768 thành: Khóa 2 — Bản Có Đội Trưởng (24 Skill)')

  // 2. Xóa bài học Skill 23 cũ nếu còn tồn tại
  console.log('\n--- Xóa Skill 23 cũ ---')
  const { data: deleted, error: errDel } = await supabase
    .from('lessons')
    .delete()
    .or('title.ilike.%Skill 23%,title.ilike.%Đăng Bài%')
    .select('id, title, course_id')
  if (errDel) {
    console.error('❌ Lỗi xóa Skill 23 cũ:', errDel.message)
  } else {
    console.log(`✅ Đã xóa ${deleted?.length || 0} bài học Skill 23 cũ:`, deleted)
  }

  // 3. Cập nhật tiêu đề Skill 24 cũ -> Skill 23
  console.log('\n--- Cập nhật Skill 24 cũ thành Skill 23 ---')
  const { data: list24, error: errL24 } = await supabase
    .from('lessons')
    .select('id, title, course_id')
    .ilike('title', '%Skill 24%')
  
  if (errL24) {
    console.error('❌ Lỗi tìm Skill 24:', errL24.message)
  } else {
    for (const lesson of (list24 || [])) {
      const newTitle = lesson.title.replace(/Skill 24/gi, 'Skill 23')
      const { error: errUp } = await supabase
        .from('lessons')
        .update({ title: newTitle })
        .eq('id', lesson.id)
      if (errUp) console.error(`❌ Lỗi đổi tên bài ${lesson.id}:`, errUp.message)
      else console.log(`✅ Đã đổi tên: "${lesson.title}" -> "${newTitle}"`)
    }
  }

  // 4. Cập nhật tiêu đề Skill 25 cũ -> Skill 24
  console.log('\n--- Cập nhật Skill 25 cũ thành Skill 24 ---')
  const { data: list25, error: errL25 } = await supabase
    .from('lessons')
    .select('id, title, course_id')
    .ilike('title', '%Skill 25%')
  
  if (errL25) {
    console.error('❌ Lỗi tìm Skill 25:', errL25.message)
  } else {
    for (const lesson of (list25 || [])) {
      const newTitle = lesson.title.replace(/Skill 25/gi, 'Skill 24')
      const { error: errUp } = await supabase
        .from('lessons')
        .update({ title: newTitle })
        .eq('id', lesson.id)
      if (errUp) console.error(`❌ Lỗi đổi tên bài ${lesson.id}:`, errUp.message)
      else console.log(`✅ Đã đổi tên: "${lesson.title}" -> "${newTitle}"`)
    }
  }

  console.log('\n✨ Dọn dẹp database hoàn tất!')
}

run()
