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

const goclawLesson = {
  course_id: 'khoa2_2768',
  title: 'Bonus — Thiết Lập AI Agent Đa Nhiệm Qua GoClaw',
  description: `Skill này làm gì:
Cài hệ thống AI Agent tự động hóa đa nhiệm trên nền tảng GoClaw — chạy song song nhiều tác vụ cùng lúc, giống cách Tiểu Hà Mã vận hành.

Đây là bài dành riêng cho Khóa 2. Dũng kèm trực tiếp qua Telegram từng bước.

Output bạn cầm được:
Hệ thống AI Agent cá nhân chạy trên GoClaw — tự xử lý nhiều việc song song mà không cần bạn bấm tay.

Ví dụ những gì hệ thống có thể làm sau khi cài xong:
- Theo dõi tin nhắn Messenger → phân loại → trả lời khách tiềm năng tự động
- Đọc đơn hàng mới → tạo đơn vận chuyển → gửi email xác nhận
- Lấy dữ liệu từ sheet → phân tích → gửi báo cáo tóm tắt mỗi sáng
- Nhận lead từ form → phân loại → giao việc cho đúng người

Tự động tới đâu:
Sau khi cài xong: các luồng tự chạy 24/7 không cần bạn online.
Trong lúc cài: Dũng kèm từng bước qua Telegram — bạn không tự mò được vì cần kết nối API + cấu hình đúng.

GoClaw là gì:
Nền tảng no-code/low-code cho phép kết nối nhiều app và tạo automation workflow phức tạp.
Mã nguồn mở: https://github.com/nextlevelbuilder/goclaw
Dũng đang dùng GoClaw để vận hành Tiểu Hà Mã — agent trả lời học viên 24/7 trên Telegram.

SOP tổng quan (Dũng kèm từng bước):
1. Đăng ký tài khoản GoClaw / cài bản self-host nếu cần
2. Kết nối các app bạn đang dùng: Messenger, Zalo, Gmail, Google Sheet, v.v.
3. Thiết kế workflow đầu tiên: chọn trigger → action → test
4. Cấu hình AI node: kết nối Claude/ChatGPT API để agent có thể suy nghĩ và viết
5. Test toàn bộ luồng với dữ liệu thật
6. Bật live — theo dõi 3 ngày đầu, xử lý lỗi nếu có
7. Nhân rộng: thêm workflow thứ 2, thứ 3 theo nhu cầu

Gợi ý từ Dũng:
Đừng cố build hết mọi thứ ngay. Chọn 1 việc đang tốn nhiều thời gian nhất → cài workflow cho việc đó trước.
Sau khi chạy được 1 workflow → bạn sẽ thấy cách nhân rộng ra các việc khác rất nhanh.`,
  sort_order: 31,
  is_free: false,
  duration: 180
}

async function run() {
  console.log('🚀 Đang kiểm tra bài học GoClaw trong database...');

  // 1. Kiểm tra xem đã có bài học nào chứa GoClaw chưa
  const { data: existing, error: checkErr } = await supabase
    .from('lessons')
    .select('id, title')
    .eq('course_id', 'khoa2_2768')
    .ilike('title', '%goclaw%')

  if (checkErr) {
    console.error('❌ Lỗi kiểm tra bài học:', checkErr.message);
    return;
  }

  if (existing && existing.length > 0) {
    console.log(`⚠️ Bài học GoClaw đã tồn tại (ID: ${existing[0].id}). Sẽ tiến hành cập nhật...`);
    const { error: updateErr } = await supabase
      .from('lessons')
      .update({
        description: goclawLesson.description,
        sort_order: goclawLesson.sort_order,
        duration: goclawLesson.duration,
        is_free: goclawLesson.is_free
      })
      .eq('id', existing[0].id)
    
    if (updateErr) console.error('❌ Lỗi cập nhật GoClaw:', updateErr.message);
    else console.log('✅ Đã cập nhật thông tin bài học GoClaw thành công!');
  } else {
    console.log('🔍 Không tìm thấy bài học GoClaw. Tiến hành chèn mới...');
    const { data: inserted, error: insertErr } = await supabase
      .from('lessons')
      .insert([goclawLesson])
      .select('id, title')
    
    if (insertErr) console.error('❌ Lỗi chèn bài học GoClaw:', insertErr.message);
    else console.log('✅ Đã chèn bài học GoClaw mới thành công:', inserted);
  }

  console.log('\n✨ Xử lý bài học GoClaw hoàn tất!');
}

run();
