# QUY TRÌNH VẬN HÀNH HỘI ĐỒNG CỐ VẤN AI
### Hệ điều hành doanh nghiệp cho người kinh doanh một mình
*Tài liệu giao cho học viên Hội Đồng Cố Vấn · DungHoang.com*

---

## Bức tranh toàn cảnh — công ty AI của bạn

```
DỮ LIỆU KINH DOANH ──→ BÁO CÁO TUẦN ──→ HỌP HỘI ĐỒNG (30 phút, thứ 2)
      ↑                                        │
      │                                        ▼
XUẤT BẢN/GỬI ĐI ←── BẠN DUYỆT (15 phút) ←── TOA VIỆC → GIAO 24 AGENT THỰC THI
```

Bạn đóng đúng 2 vai: **cấp số liệu** cho buổi họp và **duyệt** trước khi xuất bản.
Toàn bộ phần nghĩ (5 cố vấn) và phần làm (24 agent) là AI.

**Nói thẳng về chữ "tự động":** AI nghĩ và làm ra thành phẩm — nhưng KHÔNG tự đăng bài,
không tự gửi tiền, không tự quyết thay bạn. Mọi output về hàng chờ duyệt.
Đây là chủ ý: doanh nghiệp mang tên bạn, quyết định cuối phải là của bạn.

---

## NGHI THỨC 1 — HỌP HỘI ĐỒNG HÀNG TUẦN (thứ 2, 30 phút)

### Chuẩn bị (5 phút)
Điền 4 số của tuần trước vào mẫu:

```
BÁO CÁO TUẦN [số] — [ngày]
1. Engaged leads mới (người nhắn/để lại email): ___
2. Số đơn + doanh thu: ___ đơn / ___ đ
3. Lãi/lỗ tuần (thu − chi): ___ đ
4. Giờ tôi tự tay làm việc lặp lại: ___ giờ
Chuyện nóng nhất tuần này: ___________
```

### Chạy buổi họp (1 câu lệnh)
Mở Claude (đã cài 5 skill cố vấn), dán:

> "Họp hội đồng tuần. Đây là báo cáo: [dán 4 số]. Đối chiếu kế hoạch 90 ngày,
> chẩn đoán tuần qua và kê toa việc tuần này. Toa tối đa 3 việc,
> mỗi việc ghi rõ giao cho agent nào thực thi."

### Nhận về (tự động)
Cố vấn CEO chủ trì, gọi đúng cố vấn chuyên trách theo vấn đề nóng
(số bán kém → CCO, không có lead → CMO, tiền âm → CFO, quá tải giờ → CHRO),
và xuất **TOA VIỆC TUẦN** theo mẫu:

```
📋 TOA VIỆC TUẦN [số]
🩺 Chẩn đoán: [1 câu]
💊 Việc 1: [việc] → giao [tên agent] → bạn duyệt trước [ngày]
💊 Việc 2: ...
💊 Việc 3: ...
⏰ Tái khám: thứ 2 tuần sau
```

---

## NGHI THỨC 2 — GIAO VIỆC CHO AGENT (ngay sau họp, 10 phút)

Bảng nối: cố vấn kê gì → agent nào làm. Mỗi dòng là 1 câu lệnh mẫu, dán là chạy.

| Toa của cố vấn | Agent thực thi | Câu lệnh mẫu |
|---|---|---|
| "Cần content tuần này" (CMO) | 10X Content + BRAND_DNA | "Dùng skill 10X Content + file BRAND_DNA của tôi, viết 5 bài tuần này theo lịch content. Chủ đề ưu tiên: [từ toa]" |
| "Sửa lại offer/messaging" (CMO/CCO) | Offer Architect | "Dùng skill Thiết Kế Offer, sửa offer [sản phẩm] theo chẩn đoán: [dán chẩn đoán]" |
| "Cần trang bán / sửa trang" (CCO) | Landing Page Builder | "Dùng skill Dựng Landing Page, [tạo/sửa] trang cho offer vừa chốt" |
| "Chăm lead chưa mua" (CCO) | Email Closer / Follow-Up Engine | "Dùng skill Chuỗi Email, viết chuỗi 5 email cho nhóm lead [mô tả]" |
| "Vớt khách nguội" (CCO) | Follow-Up Engine | "Dùng skill Vớt Khách Nguội, viết 3 tin nhắn cho khách đã im [X] ngày" |
| "Cần mẫu ads" (CMO) | Ad Copy Machine | "Dùng skill Quảng Cáo, viết 5 mẫu ads cho offer [tên], ngân sách [X]/ngày" |
| "Trả inbox tự động" (CHRO giảm giờ) | Meta Business AI | "Dùng skill AI Agent Chat Messenger, cập nhật kịch bản trả lời với 5 câu hỏi mới tuần này" |
| "Nghiên cứu trước khi quyết" (CEO) | NotebookLM / Avatar Builder | "Dùng skill Nghiên Cứu, phân tích [tài liệu/thị trường] trước buổi họp sau" |

**Nguyên tắc giao việc:** mỗi lệnh kèm ngữ cảnh từ toa (chẩn đoán + lý do).
Agent có ngữ cảnh làm đúng gấp nhiều lần agent bị sai khiến trống không.

---

## NGHI THỨC 3 — DUYỆT VÀ XUẤT BẢN (15 phút/ngày, cố định giờ)

1. Mở hàng chờ (file nháp agent đã làm)
2. Mỗi thành phẩm: **Duyệt** (đăng/gửi luôn) — **Sửa 1 lần** (ghi chú 1 dòng, agent sửa) — **Bỏ**
3. Không sửa quá 1 vòng. Sửa mãi = làm tay kiểu mới. Nếu agent sai hoài 1 kiểu → ghi vào file BRAND_DNA/SOP để lần sau khỏi sai.

---

## NGHI THỨC 4 — TỰ ĐỘNG HÓA THEO LỊCH (cài 1 lần, chạy mãi)

Mức độ tự động tăng dần — làm chủ mức trước rồi mới lên mức sau:

| Mức | Cái gì tự chạy | Cần gì |
|---|---|---|
| 1. Thủ công có quy trình | Bạn gõ lệnh họp + giao việc mỗi tuần | Chỉ cần Claude + 5 skill (có ngay) |
| 2. Chạy theo lịch | Báo cáo tuần tự tổng hợp sáng thứ 2 · nháp content tự soạn mỗi sáng | Claude Code + lịch tự động (hướng dẫn trong khóa) |
| 3. Trực 24/7 | Chatbot trả khách Messenger · báo đơn về Telegram khi tiền vào | Skill #22 + Sepay webhook (dạy trong Khóa 1/Thử thách 7 ngày) |

Với người dùng thành thạo: mức 2+3 đưa tổng thể lên ~90% tự động —
phần 10% còn lại (duyệt + quyết) là phần KHÔNG NÊN tự động.

---

## LỊCH TUẦN CHUẨN (tổng ~2,5 giờ chủ động/tuần)

| Ngày | Việc | Thời gian |
|---|---|---|
| Thứ 2 | Họp hội đồng + giao việc agent | 40 phút |
| Thứ 3–6 | Duyệt hàng chờ mỗi sáng | 15 phút/ngày |
| Thứ 7 | Nhìn Telegram/dashboard, ghi chuyện nóng cho buổi họp sau | 10 phút |
| CN | Nghỉ. Hệ thống vẫn nhận đơn, chatbot vẫn trực. | 0 phút |
