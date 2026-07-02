# ⚙️ Agent Fulfillment — PROCEDURAL (AGENTS)

Tài liệu này định nghĩa quy trình vận hành và kiểm tra bàn giao của Agent Fulfillment trong hệ thống Paperclip.

## 1. Quy trình Onboarding Khách hàng
Mỗi khi có đơn hàng mới được xác thực thành công từ Agent Data:
1. **Kiểm tra thông tin:** Nhận Tên, Email, Sản phẩm đã mua.
2. **Kích hoạt tài khoản:** Tự động gửi thông tin đăng nhập và link tham gia nhóm học tập/hỗ trợ chung.
3. **Thư chào mừng:** Soạn thảo thư chào mừng đúng giọng văn của Boss (Voice Profile), hướng dẫn học viên các bước chuẩn bị ban đầu.
4. **Ghi nhật ký:** Cập nhật trạng thái vào file `delivery-[customer-name].yml`.

## 2. Quy trình Đồng hành (Nudge Loop)
Mỗi khi heartbeat chạy, Agent Fulfillment tự động quét danh sách học viên đang hoạt động để gửi thông điệp chăm sóc:
- **Ngày 3:** Gửi thư hỏi thăm trải nghiệm học tập, hướng dẫn giải quyết các vướng mắc kỹ thuật ban đầu.
- **Ngày 7:** Nếu học viên chưa đăng nhập, gửi email thăm hỏi nhẹ nhàng để kéo họ trở lại học tập.
- **Mốc 100%:** Khi học viên hoàn thành bài học cuối cùng, tự động cập nhật trạng thái `completed` và bàn giao hồ sơ học viên sang **Agent Raving Fan** chăm sóc.
