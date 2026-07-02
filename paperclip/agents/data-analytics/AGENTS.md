# ⚙️ Data & Analytics — PROCEDURAL (AGENTS)

Tài liệu này định nghĩa quy trình thu thập dữ liệu và phân tích chiến lược của bộ phận Data & Analytics.

## 1. Quy trình Thu thập Số liệu (Agent Data)
1. **Tiếp nhận:** Đọc dữ liệu thô do Boss paste hoặc kết nối qua MCP (Google Sheets, BIZOS, Pancake POS).
2. **Kiểm tra tính hợp lý (Validation):**
   - Cảnh báo nếu chi phí quảng cáo hoặc doanh thu bị âm.
   - Yêu cầu nhập lại nếu tỷ lệ chuyển đổi lớn hơn 100% hoặc có giá trị rỗng ở các trường bắt buộc.
3. **Tính toán tự động:**
   - Tự động tính: `profit = revenue - cost`.
   - Tự động tính: `profit_margin = profit / revenue * 100`.
   - Tự động tính tỷ lệ tăng trưởng so với kỳ trước (`trend_vs_previous`).
4. **Xuất bản:** Tạo file YAML chuẩn cung cấp đầu vào sạch cho Agent Analytics.

## 2. Quy trình Phân tích Chiến lược (Agent Analytics)
1. **Phân loại 5 Trạng thái Hiệu suất:**
   - 🔴 **Khủng hoảng (Crisis):** Doanh số sụt giảm liên tục + dưới điểm hòa vốn.
   - 🟠 **Dưới target (Below Target):** Chưa đạt mục tiêu đề ra nhưng đang có xu hướng tăng trưởng.
   - 🟡 **Đúng target (On Target):** Các chỉ số kinh doanh ổn định, không có biến động tiêu cực.
   - 🟢 **Vượt target bền vững (Sustainable Growth):** Vượt mục tiêu, biên lợi nhuận cao, CAC/LTV đạt tỷ lệ tối ưu ≥ 3:1.
   - ⚠️ **Vượt target có cảnh báo (Warning Growth):** Doanh số tăng nhưng chi phí quảng cáo (CAC) tăng quá nhanh hoặc biên lợi nhuận bắt đầu giảm.

2. **Xây dựng 3 Đề xuất Chiến lược:**
   - **Scale (Nhân bản/Mở rộng):** Áp dụng khi ở trạng thái 🟢. Tăng ngân sách ads, mở rộng kênh phân phối, tăng giá sản phẩm.
   - **Rescue (Giải cứu/Tối ưu):** Áp dụng khi ở trạng thái 🔴 hoặc 🟠. Chạy lại Avatar/Offer với góc tiếp cận khác, cắt giảm chi phí vận hành, tối ưu tỷ lệ chuyển đổi trang đích.
   - **Hold (Giữ nguyên/Theo dõi):** Áp dụng khi ở trạng thái 🟡 hoặc ⚠️. Duy trì ngân sách hiện tại, tập trung tối ưu quy trình chăm sóc khách hàng và tiếp tục theo dõi sát số liệu.
