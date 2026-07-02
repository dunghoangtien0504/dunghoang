import { createClient } from '@supabase/supabase-js'
import { readFileSync } from 'fs'

// Load .env.local
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
  console.log('Searching for GoClaw in any lesson...')
  const { data: gRows, error: gErr } = await supabase
    .from('lessons')
    .select('id, title, course_id, sort_order, is_published')
    .ilike('title', '%goclaw%')
  
  if (gErr) {
    console.error('Error:', gErr.message)
  } else {
    console.log('GoClaw lessons found:', gRows)
  }

  console.log('\nChecking all lessons for khoa2_2768 (including unpublished)...')
  const { data: allL, error: lErr } = await supabase
    .from('lessons')
    .select('id, title, sort_order, is_published')
    .eq('course_id', 'khoa2_2768')
    .order('sort_order')
  
  if (lErr) {
    console.error('Error:', lErr.message)
  } else {
    allL.forEach(l => {
      console.log(`[Sort: ${l.sort_order}] ${l.title} (Published: ${l.is_published})`)
    })
  }
}

run()
