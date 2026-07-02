# XÂY DỰNG CCSC – BỘ ĐIỀU KHIỂN TRUNG TÂM DOANH NGHIỆP

## CCSC là gì

**Central Control System of Company** — bảng điều khiển sức khỏe DN, là *"bảng chia cà rốt"* cấp toàn công ty. HĐQT giao đề bài (lợi nhuận + hạn mức) cho CEO qua CCSC; CEO chỉ được quyết trong khung này.

CCSC trả lời 1 câu duy nhất: **"Mỗi đồng doanh thu sẽ đi đâu?"**

## Khi nào xây CCSC

- DN đã ở giai đoạn **Chuẩn hóa** (doanh thu ổn định ≥6 tháng).
- KHÔNG xây khi đang ở giai đoạn Sống sót — sẽ đóng băng mô hình chưa work.

## Quy trình 3 bước (NMT)

### Bước 1 — Định vị doanh nghiệp (chốt thông số hiện tại)

Lấy số trung bình 3-6 tháng gần nhất:

| Thông số | Đơn vị | Ghi chú |
|---|---|---|
| Doanh thu | VND/tháng | Phân theo nhóm SP nếu có |
| Giá vốn (COGS) | VND & % DT | |
| Chi phí Marketing | VND & % DT | Bao gồm hoa hồng, ads, lương Sales |
| Chi phí Nhân sự (gross) | VND & % DT | Lương + thưởng + BHXH |
| Chi phí Vận hành | VND & % DT | Mặt bằng, điện nước, kho, vận chuyển |
| Chi phí Quản lý | VND & % DT | Phần mềm, kế toán, văn phòng |
| Lợi nhuận ròng | VND & % DT | Sau thuế |
| Công nợ phải thu | Số ngày DSO | |
| Tồn kho | Số ngày | |
| Dòng tiền hoạt động | VND/tháng | |

→ **Output**: 1 bảng số phản ánh DN hiện tại.

### Bước 2 — Lập kế hoạch (phân tích BSC → cơ cấu → hạn mức)

1. Phân tích BSC 4 mặt trận (xem `bsc-4-mat-tran.md`) → ra mục tiêu định lượng.
2. Vẽ cơ cấu tổ chức tương ứng → xác định số phòng ban, số tầng nhân sự.
3. Lập **hạn mức %** cho từng bộ phận (đây là phần quan trọng nhất):

**Khung hạn mức tham khảo** (DN dịch vụ B2C, biên gộp ~50%):

| Khoản | % DT mục tiêu | Note |
|---|---|---|
| Giá vốn | 30-40% | Tùy ngành |
| Marketing | 10-15% | Bao gồm CAC + nhân sự MKT |
| Nhân sự (không tính MKT) | 20-25% | |
| Vận hành | 5-10% | |
| Quản lý | 3-5% | |
| **Lợi nhuận ròng tối thiểu** | **15-20%** | Đây là "đề bài" của HĐQT |

> **Lưu ý**: chỉ là tham khảo. Mỗi ngành mỗi khác. F&B: vốn cao hơn. SaaS: nhân sự cao hơn, vốn thấp. **Phải tự chốt theo ngành mình.**

4. Dự phóng doanh thu 12 tháng tới (theo BSC).

### Bước 3 — Triển khai CCSC (số hóa + chốt)

1. Đưa các hạn mức vào file Excel CCSC (template NMT: CC.II.x).
2. Tính ra **dòng tiền dự kiến** 12 tháng — kiểm tra có âm tháng nào không.
3. Thử các phương án (sensitivity analysis):
   - Nếu doanh thu giảm 20%, dòng tiền còn dương không?
   - Nếu lương tăng 15%, lợi nhuận còn ≥15%?
4. Chọn phương án **vừa khả thi vừa có biên an toàn**.
5. CEO ký xác nhận với HĐQT → CCSC chính thức.

## Vận hành CCSC sau khi xây

- **Hàng tuần**: cập nhật thực tế vào CCSC, so với hạn mức → đèn xanh/đỏ.
- **Hàng tháng**: họp HĐQT, giải trình các đèn đỏ.
- **Hàng quý**: review tổng thể, điều chỉnh hạn mức nếu môi trường đổi.
- **Hàng năm**: tái lập CCSC nguyên bộ.

## Kết nối Hormozi: LTV / CAC

Hormozi đo sức khỏe DN bằng **LTV/CAC ≥ 3** và **CAC payback ≤ 30 ngày**. Đây thực ra là **2 chỉ số nên cài vào CCSC**:

| Chỉ số | Công thức | Ngưỡng |
|---|---|---|
| CAC | Tổng chi phí MKT + Sales / số khách mới | Tính theo tháng |
| LTV | Doanh thu trung bình/khách × % biên gộp × thời gian giữ chân | |
| LTV/CAC | LTV ÷ CAC | ≥ 3 = khỏe, < 3 = lỗ |
| CAC payback | Tháng để doanh thu/khách bù chi phí thu khách | ≤ 1 tháng (tốt), ≤ 3 (chấp nhận) |

**Cài vào đâu**: thêm 2 dòng mới ở CCSC dưới "Chi phí Marketing" → "CAC thực tế", "CAC payback (ngày)". Đèn đỏ khi vượt ngưỡng.

## Sai lầm thường gặp khi xây CCSC

1. **Copy CCSC của DN khác** → mỗi ngành biên gộp khác nhau. Hạn mức của DN bạn của bạn sai với DN bạn.
2. **Chốt hạn mức quá chặt từ đầu** → không có "phòng khi sai số" → đèn đỏ liên tục → mất tin vào CCSC.
3. **Không tính đến tăng trưởng** → DN phát triển nhanh mà hạn mức không nới → khoá tăng trưởng.
4. **Không cập nhật khi môi trường đổi** → CCSC năm cũ không còn ý nghĩa năm mới.
5. **CEO không tự làm** → giao kế toán làm → CEO không hiểu sâu → không vận hành được.

## Khi người dùng nói "tôi muốn xây CCSC"

Hỏi 3 câu trước khi bắt đầu:
1. DN ổn định doanh thu chưa? (Nếu chưa → không xây vội)
2. Có 6 tháng số liệu sạch chưa? (Nếu chưa → đi gom số liệu trước)
3. CEO có sẵn sàng cam kết hạn mức với HĐQT/cổ đông chưa? (Nếu chưa → đừng xây, sẽ thành tài liệu chết)

Nếu cả 3 đều "có" → xây ngay, theo 3 bước trên.
