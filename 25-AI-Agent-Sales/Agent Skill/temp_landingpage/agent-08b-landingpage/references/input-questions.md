# Bộ Câu Hỏi Đầu Vào — Luồng Độc Lập

Dùng khi người dùng chưa có file nào từ Agent trước. Mục tiêu: thu thập đủ nguyên liệu để build landing page chính xác. Hỏi theo 3 cụm, mỗi cụm 1 message.

---

## Nguyên tắc khi hỏi

- Hỏi 1 cụm/message — không dồn 13 câu vào 1 lần (gây ngợp), cũng không hỏi từng câu lẻ (quá chậm).
- Mỗi câu kèm 1 dòng giải thích vì sao cần — để người dùng trả lời đúng trọng tâm.
- Câu trụ cột (Pain, Kết quả, Bằng chứng) trả lời mơ hồ → hỏi lại 1 lần. Sai 3 câu này = cả trang yếu.
- Nếu người dùng nói "tôi không biết / chưa có" ở câu bằng chứng → ghi nhận, dùng placeholder, KHÔNG bịa.

---

## CỤM 1 — Nền Tảng (bắt buộc)

> **Để build landing page đúng trọng tâm, tôi cần hiểu rõ 5 điều cốt lõi trước:**
>
> **1. Sản phẩm/dịch vụ của bạn là gì? Bán cho ai?**
> *(Mô tả ngắn — tên sản phẩm + đối tượng khách. Ví dụ: "khóa học nấu ăn cho mẹ bỉm sữa 28-40 tuổi")*
>
> **2. Pain lớn nhất của khách là gì — điều gì khiến họ mất ngủ lúc 3h sáng?**
> *(Chỉ chọn 1 pain mạnh nhất. Đây là trục của toàn trang — không dàn trải nhiều pain.)*
>
> **3. Kết quả lý tưởng khách muốn đạt là gì?**
> *(Càng cụ thể càng tốt — đo được, kể lại cho người thân nghe được. "Tăng 30% doanh số" tốt hơn "phát triển kinh doanh".)*
>
> **4. Khách đã từng thử cách gì và thất bại?**
> *(Để tôi định vị sản phẩm của bạn KHÁC đi — không phải "thêm một cái nữa giống vậy".)*
>
> **5. Điều gì buộc khách phải hành động NGAY hôm nay, không để mai?**
> *(Đây là scarcity/urgency thật. Phải có lý do cụ thể — hết suất, tăng giá, đóng cổng... Không bịa countdown giả.)*

### Cách xử lý câu trả lời Cụm 1
- Câu 2 (Pain): nếu trả lời chung như "muốn nhiều khách hơn" → hỏi: "Cụ thể điều gì đang đau nhất — không có khách, có khách mà không chốt được, hay chốt được mà không quay lại?"
- Câu 3 (Kết quả): nếu không có số → gợi ý: "Có con số nào không? Bao nhiêu đơn, bao nhiêu tiền, tiết kiệm bao nhiêu giờ?"
- Câu 5: nếu không có urgency thật → ghi nhận, ở B.12 sẽ dùng scarcity nhẹ (giá trị/bonus theo đợt) thay vì bịa số suất.

---

## CỤM 2 — Offer & Bằng Chứng

> **Tiếp theo, về sản phẩm và bằng chứng:**
>
> **6. Giá bán bao nhiêu? Có cho trả góp / chia nhỏ thanh toán không?**
> *(Giá + hình thức thanh toán. Chia nhỏ giúp giảm rào cản tâm lý ở phần chốt.)*
>
> **7. Trong sản phẩm có những gì? Liệt kê các phần khách nhận được.**
> *(Tối đa 7-10 món — não người chỉ nhớ 7±2. Mỗi món là 1 thứ đếm được.)*
>
> **8. Có bonus/quà tặng kèm theo không? Giá trị mỗi cái?**
> *(Bonus phải liên quan trực tiếp, tạo thêm kết quả — không nhồi thứ không ai cần.)*
>
> **9. Bằng chứng & uy tín: Bạn là ai? Đã làm được gì? Bao nhiêu khách đã dùng? Có testimonial/feedback thật không?**
> *(Đây là phần quyết định độ tin. Người Việt cần trust trước khi nghe bán. Có gì nói nấy — không có thì để trống, tôi sẽ đánh dấu placeholder.)*
>
> **10. Bạn cam kết/bảo hành gì cho khách?**
> *(Để xây Risk Reversal — đảo ngược rủi ro. Ví dụ: "không hài lòng hoàn tiền 30 ngày".)*

### Cách xử lý câu trả lời Cụm 2
- Câu 7: nếu liệt kê >10 món → gom nhóm lại còn 7-10 dòng chính.
- Câu 9: đây là câu QUAN TRỌNG NHẤT về độ tin. Nếu trống hoàn toàn → cảnh báo nhẹ: "Trang sẽ thuyết phục hơn nhiều nếu có ít nhất 1-2 bằng chứng thật. Bạn có feedback khách, ảnh kết quả, hay con số nào không?" Vẫn build được nếu không có, dùng `[CẦN BỔ SUNG: testimonial thật]`.
- Câu 10: map vào Risk Reversal 4 cấp (xem wepower-16-steps.md B.10). Cam kết càng mạnh → cấp càng cao.

---

## CỤM 3 — Định Hướng Chiến Lược

> **Cuối cùng, 3 câu định hướng để tôi viết đúng giọng và đúng đích:**
>
> **11. Khách đến trang này chủ yếu từ đâu?**
> *A. Quảng cáo Facebook / nội dung viral (khách lạ — Cold)*
> *B. Đã xem content của bạn, đang cân nhắc (Warm)*
> *C. Trong email list / đã biết rõ sản phẩm (Hot)*
> *(Quyết định công thức copy và độ dài phần thuyết phục.)*
>
> **12. Khách của bạn thường quyết định mua như thế nào?**
> *A. Quyết nhanh, thích kết quả ngay, ghét vòng vo (nhóm D)*
> *B. Bị thuyết phục bởi câu chuyện, cảm xúc, cộng đồng (nhóm I)*
> *C. Cần chắc chắn, muốn bảo hành, hỏi kỹ trước khi mua (nhóm S)*
> *D. So sánh số liệu, đọc review, phân tích logic (nhóm C)*
> *(Nhóm đa số → giọng văn chính. Trang vẫn trigger cả 4 nhóm.)*
>
> **13. Khi khách bấm nút trên trang, bạn muốn họ làm gì?**
> *(Mua thẳng / Để lại số điện thoại / Nhắn Zalo / Đăng ký tư vấn / Vào nhóm? — Quyết định text và đích của CTA.)*

### Cách xử lý câu trả lời Cụm 3
- Câu 11 → chọn bộ công thức: Cold (PAS/AIDA/BAB), Warm (PPPP/ACC), Hot (SLAP/Hook-Value-CTA).
- Câu 12 → nếu người dùng không chắc, mặc định viết cân bằng, ưu tiên I (story) + S (guarantee) vì phổ biến nhất ở khách Việt.
- Câu 13 → quyết định CTA: mua thẳng thì nút "Đăng Ký Ngay"; để lại SĐT thì form ngắn; Zalo thì nút mở Zalo + số float.

---

## Sau khi đủ 13 câu

Tóm tắt lại cho người dùng xác nhận trong 4-5 dòng:
- Pain trục: ...
- Kết quả hứa hẹn: ...
- Offer + giá: ...
- Temperature + DISC chính: ...
- CTA đích: ...

> "Đúng chưa? Có gì cần sửa không? Nếu ổn, tôi bắt đầu build landing page."

Chỉ build sau khi người dùng xác nhận hoặc im lặng đồng ý. Nếu có brand color/tên thương hiệu riêng → hỏi thêm 1 câu: "Bạn có bộ màu thương hiệu riêng muốn dùng không, hay để tôi dùng dark theme mặc định?"
