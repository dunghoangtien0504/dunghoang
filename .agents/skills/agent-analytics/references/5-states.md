# 📊 5 Trạng thái Phân loại Kinh doanh

> Framework này giúp Agent Analytics phân loại tình hình kinh doanh vào đúng 1 trong 5 trạng thái.
> Mỗi trạng thái có điều kiện rõ ràng, dấu hiệu nhận biết, và hành động điển hình.
> **Quy tắc:** Luôn đọc file này TRƯỚC khi phân loại. Không tự nghĩ ra tiêu chí.

---

## 1. 🔴 Khủng hoảng (Crisis)

### Điều kiện
- Doanh thu đang **giảm** so với kỳ trước VÀ **dưới target** đáng kể (< 70% target)
- HOẶC: Profit margin < 0 (đang lỗ)
- HOẶC: CAC > LTV (mất tiền trên mỗi khách hàng)
- HOẶC: Revenue = 0 trong khi cost > 0 (đốt tiền không ra đơn)

### Dấu hiệu nhận biết
1. **Doanh thu giảm liên tục** 2+ kỳ liên tiếp, tốc độ giảm không chậm lại
2. **Chi phí quảng cáo tăng nhưng leads giảm** — thị trường không phản hồi
3. **Tỷ lệ refund / churn tăng đột biến** — khách hàng hiện tại cũng rời bỏ
4. **Cash flow âm nặng** — tiền ra nhiều hơn tiền vào, runway < 2 tháng
5. **Team morale giảm** — nếu có data định tính về team

### Ví dụ thực tế
- Tháng 5 doanh thu 80 triệu, tháng 6 giảm còn 45 triệu, target là 100 triệu
- Chi phí ads tăng từ 15 triệu lên 25 triệu nhưng leads giảm từ 200 xuống 80
- 5 khách hàng yêu cầu refund trong 1 tuần (bình thường 1 khách/tháng)
- CAC = 500K trong khi AOV chỉ 300K → lỗ 200K mỗi khách

### Hành động điển hình
- **Cắt giảm ngay** các kênh chi phí không hiệu quả
- **Phân tích gấp** nguyên nhân: sản phẩm? thị trường? đối thủ? execution?
- **Liên hệ khách hàng** hiện tại để giữ chân (retention > acquisition)
- **Tạm dừng scale**, tập trung sửa fundamentals
- **Set weekly check-in** để theo dõi recovery

---

## 2. 🟠 Dưới target nhưng đang tăng (Below Target — Improving)

### Điều kiện
- Doanh thu **dưới target** (70-95% target)
- NHƯNG trend đang **tăng** so với kỳ trước
- Các chỉ số KPI (conversion, leads) cũng đang cải thiện
- Profit margin > 0 (vẫn có lãi, dù ít)

### Dấu hiệu nhận biết
1. **Doanh thu tăng** so với kỳ trước nhưng chưa chạm target
2. **Conversion rate đang cải thiện** — funnel đang được optimize
3. **CAC đang giảm dần** — hiệu quả quảng cáo đang tốt lên
4. **Leads tăng** — traffic/awareness đang build up
5. **Team đang thực thi đúng hướng** — chỉ cần thêm thời gian

### Ví dụ thực tế
- Target tháng 100 triệu, actual 82 triệu, nhưng tháng trước chỉ 65 triệu → đang tăng 26%
- Conversion rate tăng từ 2% lên 3.5% sau khi sửa landing page
- CAC giảm từ 350K xuống 280K nhờ optimize ads
- Leads tăng 40% nhưng doanh thu chỉ tăng 26% → bottleneck ở close rate

### Hành động điển hình
- **Tiếp tục chiến lược hiện tại** — đang đúng hướng, không đổi
- **Tìm bottleneck** — chỗ nào đang chặn growth?
- **Tăng nhẹ budget** cho kênh đang hiệu quả nhất
- **Set milestone** rõ ràng: bao lâu nữa thì phải đạt target?
- **Monitor weekly** — nếu 2 tuần không tiến thì cần xét lại

---

## 3. 🟡 Đúng target (On Target)

### Điều kiện
- Doanh thu đạt **95-110% target**
- Trend ổn định hoặc tăng nhẹ
- Các KPI chính trong vùng chấp nhận được
- Profit margin khỏe mạnh (> 20% hoặc > benchmark ngành)

### Dấu hiệu nhận biết
1. **Doanh thu khớp target** — không quá cao, không quá thấp
2. **Các chỉ số KPI ổn định** — không biến động mạnh
3. **Chi phí kiểm soát được** — không có khoản chi bất ngờ
4. **Khách hàng hài lòng** — churn thấp, refund ít
5. **Team hoạt động trơn tru** — không có vấn đề lớn

### Ví dụ thực tế
- Target 100 triệu, actual 103 triệu → đạt 103%
- CAC ổn định ở 250K, LTV ổn định ở 800K → LTV/CAC = 3.2 (khỏe)
- Conversion rate duy trì 4% — consistent
- Team 3 người, ai cũng biết việc mình, không cần micro-manage

### Hành động điển hình
- **Duy trì** — không cần thay đổi lớn
- **Document** quy trình đang hoạt động tốt
- **Explore** cơ hội scale nhỏ (test kênh mới, test audience mới)
- **Build system** — tự động hóa những gì manual
- **Set target mới** cho kỳ tiếp theo (nâng 10-20%)

---

## 4. 🟢 Vượt target bền vững (Exceeding — Sustainable)

### Điều kiện
- Doanh thu **vượt target > 110%**
- Trend tăng **bền vững** (2+ kỳ liên tiếp vượt)
- CAC ổn định hoặc giảm (không phải vượt nhờ đốt tiền)
- Profit margin duy trì hoặc tăng
- LTV/CAC ratio > 3

### Dấu hiệu nhận biết
1. **Doanh thu vượt target liên tục** — không phải "ăn may" 1 tháng
2. **CAC không tăng** khi scale — hệ thống chưa bão hòa
3. **Profit margin giữ nguyên hoặc tăng** — scale không đổi margin
4. **Demand vẫn còn** — leads vẫn tăng, thị trường chưa bão hòa
5. **Team có capacity** — hoặc có thể thuê thêm mà không bottleneck

### Ví dụ thực tế
- Target 100 triệu, 3 tháng liên tiếp đạt 130, 145, 160 triệu
- CAC ổn định 200K trong cả 3 tháng — scale không tăng CAC
- Profit margin từ 25% tăng lên 28% nhờ economy of scale
- Mỗi tháng vẫn có 500+ leads mới — demand chưa cạn
- Team xử lý tốt, chưa bị overload

### Hành động điển hình
- **SCALE** — đây là thời điểm vàng để tăng budget, mở rộng
- **Tăng budget ads** 20-50% cho kênh hiệu quả nhất
- **Mở kênh mới** — có foundation vững thì test kênh bổ sung
- **Tuyển thêm người** — chuẩn bị team cho giai đoạn growth
- **Nâng target** mạnh hơn — đừng để target quá dễ
- **Document & systematize** — khi scale, cần SOP rõ ràng

---

## 5. ⚠️ Vượt target nhưng có dấu hiệu sụt (Exceeding — Warning Signs)

### Điều kiện
- Doanh thu **vượt target** (có thể vượt nhiều)
- NHƯNG có ít nhất 1 warning sign:
  - CAC đang tăng nhanh (> 20% so với kỳ trước)
  - Profit margin đang giảm
  - Conversion rate đang giảm dù leads tăng
  - Tăng trưởng chậm lại (growth rate giảm dù absolute number vẫn tăng)
  - Refund / churn bắt đầu tăng

### Dấu hiệu nhận biết
1. **Doanh thu vẫn cao** nhưng **tốc độ tăng đang chậm lại** (deceleration)
2. **CAC leo thang** — phải chi nhiều hơn để kiếm cùng 1 khách
3. **Conversion rate giảm** — traffic vẫn đến nhưng ít mua hơn
4. **Profit margin bị ép** — doanh thu tăng nhưng lãi không tăng tương ứng
5. **Dấu hiệu bão hòa** — audience cũ đã saturated, khó tìm khách mới

### Ví dụ thực tế
- Doanh thu 150 triệu (vượt target 100 triệu) NHƯNG CAC tăng từ 200K lên 320K
- Tháng trước tăng 30%, tháng này chỉ tăng 8% — deceleration rõ
- Conversion rate giảm từ 4% xuống 2.8% — landing page/offer đang mất hiệu lực
- Profit margin giảm từ 28% xuống 18% — chi phí scale đang ăn mòn lãi

### Hành động điển hình
- **CẢNH BÁO SỚM** — báo CEO biết: đang vượt target nhưng có red flags
- **Phân tích nguyên nhân** CAC tăng / conversion giảm — cụ thể là gì?
- **Tạm dừng scale thêm** — giữ nguyên budget, không tăng thêm
- **Optimize trước khi scale** — sửa funnel, refresh creative, test offer mới
- **Chuẩn bị kịch bản** nếu trend tiếp tục xấu → sẽ chuyển sang trạng thái nào?
- **Set tripwire metrics** — nếu CAC vượt X hoặc margin dưới Y% → tự động chuyển sang Rescue

---

## 📐 Bảng tổng hợp phân loại

| Trạng thái | Revenue vs Target | Trend | Profit | Hành động chính |
|------------|-------------------|-------|--------|-----------------|
| 🔴 Khủng hoảng | < 70% | Giảm | Âm/Rất thấp | Rescue ngay |
| 🟠 Dưới target | 70-95% | Tăng | Dương | Tiếp tục + tìm bottleneck |
| 🟡 Đúng target | 95-110% | Ổn | Khỏe | Duy trì + explore |
| 🟢 Vượt bền vững | > 110% | Tăng đều | Khỏe + ổn | Scale mạnh |
| ⚠️ Vượt có warning | > 110% | Chậm lại | Giảm dần | Cảnh báo + optimize |

## ⚖️ Quy tắc phân loại khi mâu thuẫn

Khi data cho tín hiệu mâu thuẫn (VD: doanh thu tăng nhưng lợi nhuận giảm), ưu tiên theo thứ tự:
1. **Profit margin** — tiền thật quan trọng hơn doanh thu
2. **CAC trend** — chi phí kiếm khách là leading indicator
3. **Revenue trend** — doanh thu là lagging indicator
4. **Conversion rate** — hiệu quả funnel cho thấy tương lai

> Nếu profit margin < 0 → BẮT BUỘC là 🔴 Khủng hoảng, bất kể các chỉ số khác.
> Nếu LTV/CAC < 1 → BẮT BUỘC là 🔴 Khủng hoảng.
