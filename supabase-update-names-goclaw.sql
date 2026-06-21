-- ═══════════════════════════════════════════════════════════════════
-- 1. Đổi tên khóa học trong course_products
-- ═══════════════════════════════════════════════════════════════════

update course_products set name = 'Tự Chiến — 24 Skill AI'         where id = 'khoa1_686';
update course_products set name = 'Có Đội — 25 Skill + Tiểu Hà Mã' where id = 'khoa2_2768';

-- ═══════════════════════════════════════════════════════════════════
-- 2. Thêm bài học Goclaw vào Khóa 2 (sort_order 27 — sau Skill 23)
-- ═══════════════════════════════════════════════════════════════════

insert into lessons (course_id, title, description, sort_order, is_free, duration) values
('khoa2_2768',
 'Bonus — Thiết Lập AI Agent Đa Nhiệm Qua GoClaw',
 'Skill này làm gì:
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
Sau khi chạy được 1 workflow → bạn sẽ thấy cách nhân rộng ra các việc khác rất nhanh.',
 27, false, 180);
