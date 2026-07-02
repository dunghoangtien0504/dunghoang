# 💓 CEO Orchestrator — HEARTBEAT ROUTINE

Đây là quy trình tự động thực hiện của CEO Orchestrator mỗi khi nhận được tín hiệu heartbeat (chu kỳ đánh thức tự động hoặc kích hoạt sự kiện).

## 📋 Checklist công việc đánh thức (Heartbeat Steps)

- [ ] **Bước 1: Quét hộp thư và Sự kiện mới**
  - Kiểm tra xem Boss có giao mục tiêu mới trong hòm thư nhiệm vụ (Task/Ticket System) hay không.
  - Kiểm tra xem có yêu cầu phê duyệt hoặc báo cáo nào từ các Agent cấp dưới đang chờ phản hồi.

- [ ] **Bước 2: Cập nhật Trạng thái Dự án đang chạy**
  - Đọc log và tiến độ thực thi của các Agent ASSP (nếu dự án đang ở giai đoạn sản xuất).
  - Đối chiếu tiến độ thực tế với timeline đã cam kết trong kế hoạch.

- [ ] **Bước 3: Thu thập & Đánh giá Dữ liệu Chiến dịch**
  - Nếu một chiến dịch quảng cáo hoặc bán hàng vừa kết thúc, gửi yêu cầu đến **Agent Data** để thu thập báo cáo thô.
  - Chuyển tiếp báo cáo thô đến **Agent Analytics** để nhận kết quả phân tích 5 trạng thái hiệu suất.

- [ ] **Bước 4: Thực hiện cơ chế Tự học (Lessons Learned Loop)**
  - Đọc kết quả thực tế và đối chiếu với kế hoạch ban đầu.
  - Tự rút ra 3 bài học kinh nghiệm sâu sắc nhất về vận hành, chi phí, hoặc góc marketing.
  - Lưu trữ bản ghi hoàn chỉnh này vào Project Journal để làm tài liệu tham khảo cho các chu kỳ lập kế hoạch tiếp theo.

- [ ] **Bước 5: Báo cáo định kỳ cho Boss**
  - Soạn thảo báo cáo tóm tắt tiến độ, số liệu tài chính hiện tại (doanh thu, chi phí, lợi nhuận thực tế) và gửi trực tiếp lên dashboard của Boss.
  - Trình bày rõ các đề xuất hành động (Scale, Rescue, hoặc Hold) nếu chiến dịch đang chạy có dấu hiệu cần can thiệp.
