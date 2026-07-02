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
  console.log('Querying course_products...')
  const { data: courses, error } = await supabase.from('course_products').select('*')
  if (error) {
    console.error('Error fetching course products:', error.message)
  } else {
    console.log('Course Products:', courses)
  }
}

run()
