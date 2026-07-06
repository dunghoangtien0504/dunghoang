// ── Thêm khối "Tải file skill" vào 22 bài Skill của Khóa 1 (course_id: khoa-1) ──
// Chạy: node scripts/add-khoa1-skill-downloads.mjs
import { createClient } from '@supabase/supabase-js'
import { readFileSync } from 'fs'

const env = {}
readFileSync('.env.local', 'utf8').split('\n').forEach(l => {
  const m = l.match(/^([A-Z_]+)=(.*)$/)
  if (m) env[m[1]] = m[2].trim()
})
const sb = createClient(env.NEXT_PUBLIC_SUPABASE_URL, env.SUPABASE_SERVICE_ROLE_KEY)

const MARKER = 'data-skill-download-block'

// Skill NN -> file zip trong /public/skills (khớp đúng file đang tồn tại thật)
const SKILL_FILES = {
  '01': 'agent-avatar-builder.zip',
  '02': 'agent-brand-voice.zip',
  '03': 'hormozi-system.zip',
  '04': 'founder-pro.zip',
  '05': 'agent-hero-mechanism.zip',
  '06': 'assp-money-model.zip',
  '07': 'agent-offer-architect.zip',
  '08': 'assp-hvco-creator.zip',
  '09': 'agent-funnel-strategist.zip',
  '10': 'agent-08b-landingpage.zip',
  '11': 'agent-ui-ux-pro-max.zip',
  '12': 'agent-seo-website.zip',
  '13': 'assp-ad-copy-machine.zip',
  '14': 'assp-vsl-scriptwriter.zip',
  '15': 'assp-email-closer.zip',
  '16': 'assp-follow-up-engine.zip',
  '17': 'assp-sales-call-script.zip',
  '18': 'agent-10x-content-system.zip',
  '19': 'marketing-pro.zip',
  '20': 'instagram-carousel.zip',
  '22': 'agent-meta-business-ai.zip',
}

// Skill 21 (Tiêu Đề Thu Hút) không có file riêng — kỹ thuật này nằm trong skill Ad Copy Machine
const SHARED_NOTE = {
  '21': { file: 'assp-ad-copy-machine.zip', note: 'Kỹ thuật viết tiêu đề nằm trong skill Ad Copy Machine (Skill 13) — dùng chung 1 file.' },
}

function downloadBlock(file, note) {
  return `
<div ${MARKER}="true" style="background: #EAF5EF; border-left: 4px solid #1D9E75; border-radius: 0 12px 12px 0; padding: 16px 24px; margin: 20px 24px 4px;">
  <p style="font-size: 11px; font-weight: 700; color: #2D7A4F; text-transform: uppercase; letter-spacing: 0.05em; margin: 0 0 8px;">📦 File Skill Tải Về</p>
  <p style="font-size: 14px; margin: 0 0 6px;">
    <a href="/skills/${file}" style="color: #1D9E75; font-weight: 700; text-decoration: underline;">Tải ${file} →</a>
  </p>
  <p style="font-size: 12px; color: #7A8C7E; margin: 0; line-height: 1.6;">
    Giải nén rồi cài vào Claude: <strong>Claude.ai</strong> → Settings → Capabilities → Skills → Upload skill.
    Hoặc <strong>Claude Code</strong> → giải nén vào thư mục <code>.claude/skills/</code> trong thư mục làm việc.
    ${note ? `<br>${note}` : ''}
  </p>
</div>`.trim()
}

async function run() {
  const entries = [
    ...Object.entries(SKILL_FILES).map(([n, file]) => [n, { file, note: null }]),
    ...Object.entries(SHARED_NOTE),
  ].sort(([a], [b]) => a.localeCompare(b))

  for (const [n, { file, note }] of entries) {
    const titlePattern = `Skill ${n}%`
    const { data: lessons, error: selErr } = await sb
      .from('lessons')
      .select('id, title, content_html')
      .eq('course_id', 'khoa-1')
      .like('title', titlePattern)

    if (selErr) { console.error(`Skill ${n}: loi doc -`, selErr.message); continue }
    if (!lessons || lessons.length === 0) { console.warn(`Skill ${n}: khong tim thay bai hoc (pattern "${titlePattern}")`); continue }

    for (const lesson of lessons) {
      const current = lesson.content_html || ''
      if (current.includes(MARKER)) {
        console.log(`Skill ${n} (${lesson.title}): da co block roi, bo qua`)
        continue
      }
      const updated = current + '\n' + downloadBlock(file, note)
      const { error: updErr } = await sb.from('lessons').update({ content_html: updated }).eq('id', lesson.id)
      if (updErr) { console.error(`Skill ${n}: loi ghi -`, updErr.message); continue }
      console.log(`OK Skill ${n} (${lesson.title}) -> ${file}`)
    }
  }
  console.log('\nXong.')
}

run()
