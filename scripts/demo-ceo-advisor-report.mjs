import { createClient } from '@supabase/supabase-js'
import { readFileSync } from 'fs'

const env = {}
const file = readFileSync('.env.local', 'utf8')
file.split('\n').forEach(line => {
  const m = line.match(/^([A-Z_]+)=(.*)$/)
  if (m) env[m[1]] = m[2].trim()
})

const supabase = createClient(env.NEXT_PUBLIC_SUPABASE_URL, env.SUPABASE_SERVICE_ROLE_KEY)

async function run() {
  const { data: orders, error } = await supabase
    .from('orders')
    .select('*')
    .eq('status', 'completed')

  if (error) {
    console.error('Lỗi:', error.message)
    process.exit(1)
  }

  console.log(`Tổng đơn completed: ${orders.length}`)
  console.log(JSON.stringify(orders.slice(0, 3), null, 2))

  // Group theo tháng
  const byMonth = {}
  for (const o of orders) {
    const created = o.created_at || o.createdAt
    if (!created) continue
    const month = created.slice(0, 7)
    byMonth[month] = byMonth[month] || { count: 0, revenue: 0 }
    byMonth[month].count += 1
    byMonth[month].revenue += Number(o.amount) || 0
  }
  console.log('\nTheo tháng:')
  console.log(JSON.stringify(byMonth, null, 2))

  // Group theo product
  const byProduct = {}
  for (const o of orders) {
    const key = o.course_id || o.courseId || o.product_id || 'unknown'
    byProduct[key] = byProduct[key] || { count: 0, revenue: 0 }
    byProduct[key].count += 1
    byProduct[key].revenue += Number(o.amount) || 0
  }
  console.log('\nTheo sản phẩm:')
  console.log(JSON.stringify(byProduct, null, 2))
}

run()
