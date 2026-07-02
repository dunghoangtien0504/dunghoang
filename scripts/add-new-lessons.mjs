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

const skillDefs = [
  {
    n: '26',
    id: 'Agent-AOE-Web',
    name: 'Skill 26 — Tối Ưu Website Cho AI (Agent-AOE-Web)',
    group: 'AEO & Tối ưu AI',
    time: '25 phút',
    tool: 'Cursor / Claude Code / Antigravity',
    does: 'Cài đặt tệp llms.txt và robots.txt tối ưu để các chatbot AI (như ChatGPT, Perplexity, Claude) quét và đề xuất thương hiệu của bạn khi khách hàng tìm kiếm trên AI.',
    output: 'File llms.txt và robots.txt chuẩn AI-aware được tải lên thư mục gốc website của bạn.',
    steps: [
      {
        title: 'Nạp file cấu hình vào AI',
        body: 'Tải bộ file cấu hình của Agent bên dưới. Bạn có thể giải nén và chạy file install-rules.bat để tự động cài đặt Cursor Rules (.mdc) và Claude Code rules, hoặc nạp file .skill vào Antigravity.'
      },
      {
        title: 'Giao việc cho Agent-AOE-Web',
        body: 'Mở Cursor hoặc Claude Code và gõ lệnh gọi @Agent-AOE-Web, cung cấp thông tin doanh nghiệp, website, sản phẩm chính và định vị của bạn.'
      },
      {
        title: 'AI tạo file cấu hình tự động',
        body: 'AI đọc thông tin và tự động sinh mã Markdown cho file llms.txt cùng luật Robots.txt tối ưu nhất cho các bot AI.'
      },
      {
        title: 'Đưa file lên website',
        body: 'Copy mã nguồn và tạo các file llms.txt và robots.txt trong thư mục gốc của website (thư mục public đối với Next.js, hoặc root đối với WordPress).'
      }
    ],
    checklist: [
      'Đã tạo file llms.txt ở thư mục public/root của website',
      'Đã cấu hình file robots.txt cho phép các bot AI có lợi đi vào website',
      'Truy cập thử domain.com/llms.txt và kiểm tra cấu trúc Markdown'
    ],
    tip: 'Đây là chuẩn SEO mới nhất của kỷ nguyên AI. Hãy thiết lập sớm để chatbot AI biết bạn là ai và giới thiệu khách cho bạn.',
    duration: 25
  },
  {
    n: '27',
    id: 'Agent-Sales-B2B',
    name: 'Skill 27 — Bán Hàng Chủ Động B2B (Agent-Sales-B2B)',
    group: 'Outbound & Sales',
    time: '45 phút',
    tool: 'Cursor / Claude Code / Antigravity',
    does: 'Xây dựng chiến dịch tiếp cận chủ động (Outbound) qua Cold Email/Cold DM và chuẩn bị kịch bản cuộc gọi khám phá (Discovery Call) chất lượng cao để chốt đơn dịch vụ cao cấp.',
    output: 'Mẫu tin nhắn tiếp cận cá nhân hóa + Kịch bản cuộc gọi SPIN Selling chuẩn chỉnh.',
    steps: [
      {
        title: 'Nạp file cấu hình Agent',
        body: 'Tải bộ file cấu hình bên dưới và chạy file install-rules.bat để cài đặt Agent-Sales-B2B vào công cụ làm việc của bạn.'
      },
      {
        title: 'Khai báo sản phẩm & khách hàng',
        body: 'Cung cấp thông tin chi tiết về dịch vụ của bạn (bao gồm giá cả) và tệp khách hàng mục tiêu hoặc nạp trực tiếp file avatar.md đã làm ở Skill 02.'
      },
      {
        title: 'Tạo mẫu Outreach & Kịch bản SPIN',
        body: 'AI sẽ thiết kế 2 mẫu tin nhắn tiếp cận cá nhân hóa cao cùng kịch bản cuộc gọi Discovery Call 15-30 phút gồm các chặng: Bắt đầu (Frame), Đặt câu hỏi khai thác nỗi đau (SPIN), Đánh giá mức độ nghiêm túc và Chốt lịch hẹn tiếp theo.'
      },
      {
        title: 'Thực hành gọi điện',
        body: 'Sử dụng kịch bản và checklist để gọi điện tư vấn. Tuyệt đối lắng nghe 70% thời lượng cuộc gọi và để khách tự nói ra nỗi đau của họ.'
      }
    ],
    checklist: [
      'Đã có 2 mẫu tin nhắn tiếp cận gửi lạnh được cá nhân hóa',
      'Đã xây dựng bộ câu hỏi SPIN Selling tìm nỗi đau khách hàng',
      'Đã thực hành cuộc gọi đầu tiên và chấm điểm theo checklist'
    ],
    tip: 'Đừng bán hàng ngay ở tin nhắn tiếp cận đầu tiên. Mục tiêu duy nhất của tin nhắn đầu tiên là đặt được lịch hẹn cho một cuộc gọi khám phá.',
    duration: 45
  },
  {
    n: '28',
    id: 'Agent-image-prompt',
    name: 'Skill 28 — Thiết Kế Prompt Ảnh Quảng Cáo (Agent-image-prompt)',
    group: 'Hình ảnh & Quảng cáo',
    time: '30 phút',
    tool: 'Cursor / Claude Code / Midjourney / DALL-E 3',
    does: 'Thiết kế các dòng lệnh (prompt) tạo hình ảnh quảng cáo và bài đăng mạng xã hội chuyên nghiệp bằng Midjourney và DALL-E 3 để tự làm hình ảnh truyền thông đẹp mắt mà không tốn tiền thuê designer.',
    output: 'Thư viện prompt tiếng Anh chi tiết kèm tham số kỹ thuật để tạo ảnh thật.',
    steps: [
      {
        title: 'Nạp Agent-image-prompt',
        body: 'Tải bộ cấu hình Agent bên dưới và cài đặt vào Cursor/Claude/Antigravity của bạn.'
      },
      {
        title: 'Mô tả ý tưởng hình ảnh',
        body: 'Kích hoạt @Agent-image-prompt và mô tả ngắn gọn bối cảnh hoặc ý tưởng ảnh quảng cáo bạn muốn tạo bằng tiếng Việt.'
      },
      {
        title: 'AI tạo Prompt tiếng Anh chuẩn studio',
        body: 'AI sẽ tự động dịch chuyển ý tưởng của bạn thành các dòng prompt tiếng Anh chi tiết bao gồm: chủ thể, ánh sáng, góc máy, tiêu cự camera và các tham số như tỷ lệ khung hình (--ar) cho Midjourney và DALL-E 3.'
      },
      {
        title: 'Tạo ảnh bằng Midjourney / DALL-E',
        body: 'Copy các prompt tiếng Anh dán trực tiếp vào Midjourney hoặc DALL-E 3 để xem kết quả và lựa chọn ảnh đẹp nhất và tải về sử dụng.'
      }
    ],
    checklist: [
      'Đã tạo được prompt tiếng Anh chi tiết cho ảnh quảng cáo',
      'Đã dán prompt vào Midjourney hoặc DALL-E 3 thành công',
      'Đã có tối thiểu 3 ảnh quảng cáo chất lượng cao để sử dụng'
    ],
    tip: 'Midjourney hiểu tiếng Anh tốt nhất. Sử dụng prompt tiếng Anh chuẩn nhiếp ảnh sẽ giúp bạn có những bức ảnh thật như được chụp trong studio.',
    duration: 30
  },
  {
    n: '29',
    id: 'Agent-experience-customer',
    name: 'Skill 29 — Trải Nghiệm Giữ Chân Khách Hàng (Agent-experience-customer)',
    group: 'Trải nghiệm khách hàng',
    time: '35 phút',
    tool: 'Cursor / Claude Code / Antigravity',
    does: 'Thiết kế trải nghiệm người dùng (UX) và các điểm kích hoạt hành vi (nudge) để giữ chân khách hàng sử dụng sản phẩm số hoặc hoàn thành khóa học của bạn.',
    output: 'Bản kế hoạch chu trình kích hoạt người dùng (user onboarding) và các triggers nhắc nhở.',
    steps: [
      {
        title: 'Nạp Agent-experience-customer',
        body: 'Tải bộ cấu hình Agent bên dưới và nạp vào Cursor/Claude/Antigravity.'
      },
      {
        title: 'Khai báo hành vi muốn kích hoạt',
        body: 'Kích hoạt Agent và mô tả sản phẩm số/khóa học của bạn, cùng hành vi bạn muốn khách hàng thực hiện nhất (ví dụ: mở app học bài, nộp bài tập đúng hạn).'
      },
      {
        title: 'AI thiết kế Onboarding & Triggers',
        body: 'AI thiết kế chu trình Onboarding tạo "Aha! Moment" nhanh nhất và soạn các mẫu tin nhắn nhắc nhở (nudge) tự động dựa trên mô hình Fogg (B=MAP).'
      },
      {
        title: 'Cài đặt tự động hóa',
        body: 'Đưa các nudge và phần thưởng chúc mừng vào quy trình gửi tin nhắn tự động (email hoặc Zalo) để nhắc nhở và kích thích khách hàng hành động.'
      }
    ],
    checklist: [
      'Đã thiết kế chu trình kích hoạt Onboarding cho khách mới',
      'Đã có bộ 3 mẫu tin nhắn nudge nhắc nhở dựa trên hành vi',
      'Đã thiết kế mốc chúc mừng và phần thưởng khi khách hoàn thành mục tiêu'
    ],
    tip: 'Để thay đổi hành vi, hãy làm cho hành động đầu tiên của khách hàng cực kỳ dễ dàng (giảm độ khó) trước khi cố gắng tăng động lực cho họ.',
    duration: 35
  }
]

function generateHtmlForNewSkill(skill) {
  const downloadZipUrl = `/skills/${skill.id}.zip`
  const downloadSkillUrl = `/skills/${skill.id}.skill`

  const stepsHtml = skill.steps.map((step, idx) => `
    <div style="margin-bottom: 20px;">
      <div style="display: flex; align-items: flex-start; gap: 14px;">
        <div style="min-width: 32px; height: 32px; background: #0D2B1A; border-radius: 50%; display: flex; align-items: center; justify-content: center; flex-shrink: 0; margin-top: 2px;">
          <span style="color: white; font-weight: 800; font-size: 13px;">${idx + 1}</span>
        </div>
        <div style="flex: 1;">
          <h4 style="font-size: 15px; font-weight: 700; color: #0D2B1A; margin: 0 0 6px;">${step.title}</h4>
          <p style="font-size: 13px; color: #4a5568; margin: 0; line-height: 1.6;">${step.body}</p>
        </div>
      </div>
    </div>
  `).join('')

  const checklistHtml = skill.checklist.map(item => `
    <div style="display: flex; align-items: flex-start; gap: 10px; margin-bottom: 8px;">
      <span style="color: #1D9E75; font-weight: 700; flex-shrink: 0; font-size: 14px;">✓</span>
      <span style="font-size: 13px; color: #2d3748;">${item}</span>
    </div>
  `).join('')

  return `<div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; color: #1a1a1a; background: #F6F0E4; border-radius: 16px; overflow: hidden; max-width: 100%;">
  <!-- Header -->
  <div style="background: #0D2B1A; padding: 24px 28px;">
    <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 8px; flex-wrap: wrap;">
      <span style="background: #88860B; color: white; font-size: 11px; font-weight: 700; padding: 3px 10px; border-radius: 20px; letter-spacing: 0.05em; text-transform: uppercase;">SKILL ${skill.n}</span>
      <span style="color: #C8D5C9; font-size: 12px; font-weight: 600;">${skill.group}</span>
    </div>
    <h2 style="color: #F6F0E4; font-size: 22px; font-weight: 800; margin: 0 0 8px; line-height: 1.3;">${skill.name}</h2>
    <p style="color: #C8D5C9; font-size: 14px; margin: 0; line-height: 1.6;">${skill.does}</p>
    <div style="display: flex; gap: 10px; margin-top: 14px; flex-wrap: wrap;">
      <span style="background: rgba(255,255,255,0.1); border: 1px solid rgba(255,255,255,0.15); border-radius: 20px; padding: 4px 12px; font-size: 12px; color: #F6F0E4;">⏱ Thời lượng: ${skill.time}</span>
      <span style="background: rgba(255,255,255,0.1); border: 1px solid rgba(255,255,255,0.15); border-radius: 20px; padding: 4px 12px; font-size: 12px; color: #F6F0E4;">🛠 Công cụ: ${skill.tool}</span>
    </div>
  </div>

  <!-- Output Box -->
  <div style="background: #EAF5EF; border-left: 4px solid #1D9E75; padding: 16px 28px; margin: 0;">
    <p style="font-size: 12px; font-weight: 700; color: #2D7A4F; text-transform: uppercase; letter-spacing: 0.05em; margin: 0 0 6px;">🎯 Bạn nhận được sau khi hoàn thành</p>
    <p style="font-size: 14px; color: #1a1a1a; margin: 0; line-height: 1.5;">${skill.output}</p>
  </div>

  <!-- Content Area -->
  <div style="padding: 28px;">
    <!-- Download Block -->
    <div style="background: white; border: 1px solid #DDD8CB; border-radius: 12px; padding: 20px; margin-bottom: 28px; text-align: center; box-shadow: 0 2px 4px rgba(0,0,0,0.02);">
      <p style="font-size: 13px; font-weight: 700; color: #0D2B1A; margin-top: 0; margin-bottom: 12px; letter-spacing: 0.03em;">📥 TẢI FILE CẤU HÌNH AGENT (RULES)</p>
      <div style="display: flex; justify-content: center; gap: 12px; flex-wrap: wrap;">
        <a href="${downloadZipUrl}" style="background: #1D9E75; color: white; text-decoration: none; padding: 10px 18px; border-radius: 8px; font-size: 13px; font-weight: 600; display: inline-flex; align-items: center; gap: 6px;" download>
          Tải file .ZIP (Cursor/Claude)
        </a>
        <a href="${downloadSkillUrl}" style="background: #0D2B1A; color: white; text-decoration: none; padding: 10px 18px; border-radius: 8px; font-size: 13px; font-weight: 600; display: inline-flex; align-items: center; gap: 6px;" download>
          Tải file .skill (Antigravity)
        </a>
      </div>
      <p style="font-size: 11px; color: #718096; margin-top: 10px; margin-bottom: 0; line-height: 1.5;">
        💡 <i>Dùng file .zip để tự động cài rules vào project Cursor hoặc nạp làm Claude Code Agent. Dùng file .skill nếu bạn sử dụng Antigravity.</i>
      </p>
    </div>

    <!-- Road map -->
    <p style="font-size: 11px; font-weight: 700; color: #3D6B4A; text-transform: uppercase; letter-spacing: 0.05em; margin: 0 0 16px;">💬 SOP TỪNG BƯỚC THỰC HIỆN</p>
    <div style="margin-bottom: 28px;">
      ${stepsHtml}
    </div>

    <!-- Checklist -->
    <p style="font-size: 11px; font-weight: 700; color: #3D6B4A; text-transform: uppercase; letter-spacing: 0.05em; margin: 0 0 12px;">✅ Checklist hoàn thành bài</p>
    <div style="background: white; border: 1px solid #DDD8CB; border-radius: 12px; padding: 16px 20px; margin-bottom: 28px;">
      ${checklistHtml}
    </div>

    <!-- Advice / Tip -->
    <div style="background: #EAF5EF; border-left: 4px solid #1D9E75; border-radius: 0 12px 12px 0; padding: 16px 20px;">
      <p style="font-size: 12px; font-weight: 700; color: #2D7A4F; margin: 0 0 6px;">💡 Gợi ý từ Dũng</p>
      <p style="font-size: 13px; color: #2d3748; margin: 0; line-height: 1.6;">${skill.tip}</p>
    </div>
  </div>
</div>`
}

async function run() {
  console.log('🚀 Đang kết nối database để cập nhật 4 Skill mới...');

  // 1. Cập nhật sort_order của Skill 23 cũ thành 30 (chỉ ở khoa2_2768)
  console.log('\n--- Cập nhật sort_order của Skill 23 cũ ---');
  const { error: errUp23 } = await supabase
    .from('lessons')
    .update({ sort_order: 30 })
    .eq('course_id', 'khoa2_2768')
    .ilike('title', '%Skill 23%')
  if (errUp23) console.error('❌ Lỗi cập nhật sort_order Skill 23:', errUp23.message);
  else console.log('✅ Đã cập nhật sort_order Skill 23 thành 30');

  // 2. Cập nhật sort_order của GoClaw cũ thành 31 (chỉ ở khoa2_2768)
  console.log('\n--- Cập nhật sort_order của GoClaw cũ ---');
  const { error: errUpGoClaw } = await supabase
    .from('lessons')
    .update({ sort_order: 31 })
    .eq('course_id', 'khoa2_2768')
    .ilike('title', '%GoClaw%')
  if (errUpGoClaw) console.error('❌ Lỗi cập nhật sort_order GoClaw:', errUpGoClaw.message);
  else console.log('✅ Đã cập nhật sort_order GoClaw thành 31');

  // 3. Xóa các bài học trùng lặp cũ nếu có trước khi chèn mới
  console.log('\n--- Dọn dẹp bài học cũ nếu trùng tên ---');
  for (const s of skillDefs) {
    const { error: errDel } = await supabase
      .from('lessons')
      .delete()
      .ilike('title', `%${s.name}%`)
    if (errDel) console.error(`❌ Lỗi xóa bài cũ ${s.name}:`, errDel.message);
  }

  // 4. Chèn 4 bài học mới cho cả khoa-1 và khoa2_2768
  console.log('\n--- Chèn 4 bài học mới ---');
  const insertPayloads = [];
  for (const courseId of ['khoa-1', 'khoa2_2768']) {
    for (const s of skillDefs) {
      const htmlContent = generateHtmlForNewSkill(s);
      // Tạo description vắn tắt từ does để hiển thị ở danh sách bài học
      const desc = `${s.does}\n\n* Output bạn nhận được:\n${s.output}\n\n* SOP từng bước:\n${s.steps.map((st, i) => `${i+1}. ${st.title}`).join('\n')}`;

      insertPayloads.push({
        course_id: courseId,
        title: s.name,
        description: desc,
        content_html: htmlContent,
        sort_order: parseInt(s.n),
        is_free: false,
        duration: s.duration
      });
    }
  }

  const { data, error: errInsert } = await supabase
    .from('lessons')
    .insert(insertPayloads)
    .select('id, title, course_id')
  
  if (errInsert) {
    console.error('❌ Lỗi chèn bài học mới:', errInsert.message);
  } else {
    console.log(`✅ Đã chèn thành công ${data?.length || 0} bài học mới:`, data.map(d => `${d.course_id}: ${d.title}`));
  }

  console.log('\n✨ Cập nhật database hoàn tất!');
}

run();
