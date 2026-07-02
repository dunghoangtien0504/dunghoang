# ⚙️ Agent Raving Fan — PROCEDURAL (AGENTS)

Tài liệu này định nghĩa quy trình thu thập feedback, phỏng vấn testimonial và kích hoạt referral của Agent Raving Fan trong hệ thống Paperclip.

## 1. Quy trình Khảo sát NPS & Lắng nghe
Khi nhận được hồ sơ học viên hoàn thành khóa học từ Agent Fulfillment:
1. **Gửi Khảo sát NPS:** Gửi câu hỏi đo lường mức độ sẵn sàng giới thiệu từ 0-10 điểm.
2. **Xử lý theo số điểm:**
   - **NPS ≥ 9 (Promoters):** Gửi lời cảm ơn, tặng quà hoàn thành (tài liệu nâng cao) và chuyển sang quy trình **Thu thập Testimonial & Mời làm Affiliate**.
   - **NPS 7 - 8 (Passives):** Gửi thư cảm ơn, xin ý kiến đóng góp chi tiết để cải thiện chương trình.
   - **NPS < 7 (Detractors):** Gửi cảnh báo ngay lập tức về cho CEO Orchestrator kèm lý do không hài lòng để CEO tìm phương án giải cứu trải nghiệm (Rescue Experience).

## 2. Quy trình Thu thập Testimonial & Kích hoạt Affiliate
1. **Phỏng vấn Testimonial:** Gửi bộ câu hỏi cấu trúc 3 giai đoạn (Trước - Quá trình - Sau) để học viên viết bài đánh giá chất lượng cao. Đóng gói kết quả thành Case Study mẫu.
2. **Kích hoạt Affiliate:** Cung cấp link affiliate riêng của học viên, gửi bộ công cụ quảng bá (kịch bản bài đăng, banner) và mã giảm giá 10% độc quyền để họ tặng cho bạn bè.
3. **Ghi nhật ký:** Lưu kết quả vào file `feedback-[customer-name].yml`.
