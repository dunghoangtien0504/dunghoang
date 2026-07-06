// ── Gắn/nâng cấp khối "Tải File Skill" (thiết kế card đẹp) cho các khóa ────────
// - khoa-1        : THAY THẾ toàn bộ block cũ (đơn giản) bằng thiết kế mới
// - khoa2_2768    : THÊM MỚI cho Skill 01-22 (hiện đang thiếu hoàn toàn),
//                   bỏ qua Skill 26-29 (đã có link + thiết kế riêng từ trước)
// Chạy: node scripts/add-skill-downloads.mjs
import { createClient } from '@supabase/supabase-js'
import { readFileSync } from 'fs'

const env = {}
readFileSync('.env.local', 'utf8').split('\n').forEach(l => {
  const m = l.match(/^([A-Z_]+)=(.*)$/)
  if (m) env[m[1]] = m[2].trim()
})
const sb = createClient(env.NEXT_PUBLIC_SUPABASE_URL, env.SUPABASE_SERVICE_ROLE_KEY)

const MARKER = 'data-skill-download-block'

// Skill NN -> file zip trong /public/skills + dung luong (KB, lam tron)
const SKILL_FILES = {
  '01': { file: 'agent-avatar-builder.zip',     kb: 16 },
  '02': { file: 'agent-brand-voice.zip',        kb: 9 },
  '03': { file: 'hormozi-system.zip',           kb: 28 },
  '04': { file: 'founder-pro.zip',              kb: 226 },
  '05': { file: 'agent-hero-mechanism.zip',     kb: 9 },
  '06': { file: 'assp-money-model.zip',         kb: 10 },
  '07': { file: 'agent-offer-architect.zip',    kb: 20 },
  '08': { file: 'assp-hvco-creator.zip',        kb: 7 },
  '09': { file: 'agent-funnel-strategist.zip',  kb: 11 },
  '10': { file: 'agent-08b-landingpage.zip',    kb: 27 },
  '11': { file: 'agent-ui-ux-pro-max.zip',      kb: 2482 },
  '12': { file: 'agent-seo-website.zip',        kb: 17 },
  '13': { file: 'assp-ad-copy-machine.zip',     kb: 19 },
  '14': { file: 'assp-vsl-scriptwriter.zip',    kb: 13 },
  '15': { file: 'assp-email-closer.zip',        kb: 10 },
  '16': { file: 'assp-follow-up-engine.zip',    kb: 6 },
  '17': { file: 'assp-sales-call-script.zip',   kb: 7 },
  '18': { file: 'agent-10x-content-system.zip', kb: 32 },
  '19': { file: 'marketing-pro.zip',            kb: 134 },
  '20': { file: 'instagram-carousel.zip',       kb: 4 },
  '22': { file: 'agent-meta-business-ai.zip',   kb: 21 },
  '26': { file: 'Agent-AOE-Web.zip',            kb: 3 },
  '27': { file: 'Agent-Sales-B2B.zip',          kb: 3 },
  '28': { file: 'Agent-image-prompt.zip',       kb: 3 },
  '29': { file: 'Agent-experience-customer.zip',kb: 3 },
}

// Skill 21 (Tiêu Đề Thu Hút) không có file riêng — dùng chung với Ad Copy Machine (#13)
const SHARED_NOTE = {
  '21': { file: 'assp-ad-copy-machine.zip', kb: 19, note: 'Kỹ thuật viết tiêu đề nằm trong skill Ad Copy Machine (Skill 13) — dùng chung 1 file.' },
}

function folderName(file) {
  return file.replace(/\.(zip|skill)$/i, '')
}

function downloadBlock(n, { file, kb, note }) {
  const folder = folderName(file)
  return `
<div ${MARKER}="true" style="margin: 24px 0 8px;">
  <p style="font-size: 11px; font-weight: 700; color: #3D6B4A; text-transform: uppercase; letter-spacing: 0.05em; margin: 0 0 12px;">📦 Tải File Skill</p>
  <div style="background: white; border: 2px solid #1D9E75; border-radius: 12px; padding: 20px;">
    <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 12px;">
      <div style="background: #1D9E75; border-radius: 10px; padding: 10px 14px; flex-shrink: 0;"><span style="color: white; font-size: 18px;">📦</span></div>
      <div>
        <p style="font-size: 15px; font-weight: 700; color: #0D2B1A; margin: 0;">${file}</p>
        <p style="font-size: 12px; color: #666; margin: 2px 0 0;">File zip, ${kb}KB — giải nén, kéo folder vào thư mục làm việc</p>
      </div>
    </div>
    <a href="https://dunghoang.com/skills/${file}" download style="display: inline-block; background: #0D2B1A; color: #F6F0E4; padding: 12px 24px; border-radius: 10px; text-decoration: none; font-weight: 700; font-size: 14px;">⬇ Tải Skill #${n} Về Máy</a>
    <p style="font-size: 12px; color: #888; margin: 12px 0 0; line-height: 1.6;">Giải nén → kéo <strong>toàn bộ folder ${folder}</strong> vào thư mục làm việc của bạn.${note ? `<br>${note}` : ''}</p>
  </div>
</div>`.trim()
}

async function upsertBlock(courseId, n, meta, { replaceExisting }) {
  const titlePattern = `Skill ${n}%`
  const { data: lessons, error } = await sb
    .from('lessons').select('id, title, content_html')
    .eq('course_id', courseId).like('title', titlePattern)

  if (error) { console.error(`${courseId} Skill ${n}: loi doc -`, error.message); return }
  if (!lessons || lessons.length === 0) { console.warn(`${courseId} Skill ${n}: khong tim thay bai (pattern "${titlePattern}")`); return }

  for (const lesson of lessons) {
    let current = lesson.content_html || ''
    const hasMine    = current.includes(MARKER)
    const hasAnyLink = current.includes('/skills/')

    if (hasAnyLink && !hasMine) {
      console.log(`${courseId} Skill ${n}: da co link tai rieng (khong phai cua script), bo qua`)
      continue
    }
    if (hasMine) {
      if (!replaceExisting) { console.log(`${courseId} Skill ${n}: da co block, bo qua`); continue }
      const idx = current.indexOf(`<div ${MARKER}`)
      if (idx !== -1) current = current.slice(0, idx).trim()
    }

    const updated = current + '\n' + downloadBlock(n, meta)
    const { error: updErr } = await sb.from('lessons').update({ content_html: updated }).eq('id', lesson.id)
    if (updErr) console.error(`${courseId} Skill ${n}: loi ghi -`, updErr.message)
    else console.log(`OK ${courseId} Skill ${n} (${lesson.title}) -> ${meta.file}`)
  }
}

async function run() {
  const all = { ...SKILL_FILES, ...SHARED_NOTE }
  const entries = Object.entries(all).sort(([a], [b]) => a.localeCompare(b))

  console.log('=== khoa-1: thay the toan bo block cu bang thiet ke moi ===')
  for (const [n, meta] of entries) {
    await upsertBlock('khoa-1', n, meta, { replaceExisting: true })
  }

  console.log('\n=== khoa2_2768: them moi cho Skill 01-22 (bo qua 26-29 da co san) ===')
  for (const [n, meta] of entries) {
    if (['26', '27', '28', '29'].includes(n)) continue
    await upsertBlock('khoa2_2768', n, meta, { replaceExisting: false })
  }

  console.log('\nXong.')
}

run()
