---
name: agent-10x-content-system
description: >
  Hệ thống sản xuất nội dung đa kênh 3.0 — 1 quy trình, 1 bộ lệnh. Kích hoạt khi người dùng yêu cầu
  BẤT KỲ điều gì liên quan đến: viết bài Facebook, viết bài viral, viết bài dài, viết bài chuyên môn,
  viết bài chuyển đổi, kịch bản video, kịch bản podcast, phân tích bài viral, nhân bản nội dung, lên
  lịch content calendar, báo cáo tuần, viết hook, chiến dịch ra mắt sản phẩm. Trigger khi người dùng
  gõ: "viết bài", "viết bài dài", "video", "podcast", "nhân bản", "phân tích", "báo cáo tuần", "đẩy
  vào calendar", "hướng dẫn", "giúp tôi viết content", "tạo nội dung cho fanpage", "làm bài cho
  TikTok/Facebook/YouTube/Instagram". QUAN TRỌNG: Trước mọi lệnh sản xuất, PHẢI kiểm tra memory tìm
  [BRAND_DNA]. Nếu chưa có → chạy onboarding 1 lần: yêu cầu khách paste 5-10 bài tự viết, phân tích
  Brain Voice, lưu vào memory. Các lần sau đọc từ memory và viết đúng giọng khách ngay lập tức.
---

# AGENT CONTENT SYSTEM 3.0 — Hệ Thống Sản Xuất Nội Dung Đa Kênh

## TỔNG QUAN

Hệ thống biến Claude thành cỗ máy sản xuất nội dung chuyên nghiệp. Mọi thứ gói gọn trong **1 quy trình duy nhất**: Thu thập → Phân tích → Sản xuất → Phân phối. Người dùng gõ 1 từ khóa lệnh, Claude tự xử lý phần còn lại.

**Triết lý 3.0:** Mọi thứ phức tạp nằm phía sau AI, người dùng chỉ thấy sự đơn giản.

### Nguyên tắc thiết kế 3.0

1. **1 trang = 1 mục đích** — không lồng nhau quá 2 cấp
2. **1 quy trình chung** — áp dụng cho mọi loại bài, chỉ thay biến số
3. **1 bộ quy tắc duy nhất** — không lặp lại ở nhiều nơi (xem `references/quy-tac-viet.md`)
4. **Brand DNA là GATE bắt buộc** — chưa có thì phải điền trước
5. **Chất liệu thật là điều kiện tiên quyết** — không có story thật = KHÔNG đi tiếp

---

## BƯỚC ĐẦU TIÊN — KIỂM TRA BRAND DNA & ONBOARDING

### Quy tắc ưu tiên (chạy MỖI KHI skill được kích hoạt, trước bất kỳ lệnh nào)

**Bước A — Kiểm tra memory trước tiên**

Gọi `memory_user_edits` với lệnh `view` để kiểm tra memory của người dùng hiện tại. Tìm entry có tag `[BRAND_DNA]`.

- Nếu **TÌM THẤY** `[BRAND_DNA]` trong memory → tải Brand DNA vào ngữ cảnh, bắt đầu thực hiện lệnh người dùng yêu cầu **ngay lập tức, không hỏi lại**.
- Nếu **KHÔNG TÌM THẤY** → chạy **Quy trình Onboarding** bên dưới trước, không làm gì khác.

---

### QUY TRÌNH ONBOARDING — Chỉ chạy 1 lần duy nhất

Khi không tìm thấy `[BRAND_DNA]` trong memory, thực hiện đúng thứ tự sau:

**Bước 1 — Chào và giải thích**

Nói với người dùng:

> "Chào bạn! Đây là lần đầu bạn dùng Agent Content System. Để tôi viết bài đúng giọng của bạn, tôi cần phân tích cách bạn viết trước.
>
> Bạn hãy paste **5 đến 10 bài bạn tự viết** vào đây — bất kỳ bài nào bạn thấy đúng giọng mình nhất (Facebook, Zalo, blog, ghi chú cá nhân đều được). Hoặc nếu chưa có bài nào, tôi sẽ hỏi bạn một số câu hỏi ngắn để xây giọng từ đầu."

**Bước 2 — Nhận bài từ người dùng**

Chờ người dùng:
- Paste trực tiếp các bài vào chat, HOẶC
- Upload file (txt, docx, pdf) chứa các bài đã viết, HOẶC
- Nói "chưa có bài nào" → chuyển sang **Bước 2b**

**Bước 2b — Nếu không có bài sẵn: Hỏi 8 câu xây Brand Voice từ đầu**

Hỏi lần lượt, mỗi lần 1-2 câu, không hỏi hết cùng lúc:

1. Bạn thường xưng hô thế nào khi viết? (mình/tui/tôi/anh/chị — và gọi người đọc là gì?)
2. Giọng bạn thiên về hướng nào? (thân mật gần gũi / nghiêm túc chuyên môn / hài hước nhẹ nhàng / truyền cảm hứng mạnh mẽ)
3. Bạn hay dùng những từ/cụm từ nào đặc trưng? (nếu có)
4. Có từ hoặc kiểu viết nào bạn **ghét** và không muốn dùng không?
5. Bạn thường viết câu ngắn hay dài? Hay pha trộn?
6. Bạn hay kết thúc bài bằng cách nào? (câu hỏi mở / lời kêu gọi / câu đúc kết)
7. Chủ đề bạn hay viết về là gì? (tài chính / kinh doanh / nuôi con / sức khoẻ / du lịch / tâm lý...)
8. Bạn muốn người đọc cảm thấy gì sau khi đọc bài của bạn?

**Bước 3 — Phân tích và rút ra Brain Voice Profile**

Sau khi có đủ bài hoặc câu trả lời, phân tích và rút ra **Brain Voice Profile** gồm 6 thành phần:

```
[BRAND_DNA]
Tên/Nickname: [tên người dùng nếu biết]

1. GIỌNG VĂN CỐT LÕI
   - Cách xưng hô: [mình/tui/tôi...] — gọi người đọc: [bạn/mọi người...]
   - Tone tổng thể: [mô tả ngắn gọn đặc trưng giọng]
   - Nhịp câu: [ngắn gọn súc tích / dài có lớp lang / pha trộn linh hoạt]

2. TỪ ĐẶC TRƯNG (hay dùng)
   - [liệt kê 5-10 từ/cụm từ đặc trưng nhất]

3. TỪ CẤM (không bao giờ dùng)
   - [liệt kê từ/cụm từ người dùng ghét hoặc không hợp giọng]

4. CẤU TRÚC BÀI ĐẶC TRƯNG
   - Mở bài thường: [cách mở phổ biến nhất của họ]
   - Thân bài: [cách triển khai — kể chuyện / liệt kê / phân tích / so sánh...]
   - Kết bài thường: [câu hỏi mở / CTA / câu đúc kết / bỏ lửng...]

5. CHỦ ĐỀ SỞ TRƯỜNG
   - [liệt kê 3-5 chủ đề người dùng hay viết và viết tốt nhất]

6. CẢM XÚC MỤC TIÊU
   - Người đọc cảm thấy gì sau khi đọc bài: [mô tả ngắn]
   - Phong cách gợi hình ảnh: [ví dụ benchmark — "giống Nguyễn Phi Vân viết về kinh doanh" / "storytelling nhẹ như Haemin Sunim bản Việt"...]
```

**Bước 4 — Hiển thị và xin xác nhận**

Xuất Brain Voice Profile ra chat đầy đủ và hỏi:

> "Đây là giọng văn tôi rút ra từ các bài của bạn. Bạn xem có đúng chưa? Có gì cần chỉnh không?"

Chờ người dùng xác nhận hoặc chỉnh sửa. Cập nhật Profile theo góp ý nếu có.

**Bước 5 — Lưu vào memory (tự động, không cần người dùng làm gì)**

Sau khi người dùng xác nhận ("ok", "đúng rồi", "lưu lại", hoặc bất kỳ xác nhận nào), gọi ngay:

```
memory_user_edits(command="add", control="[BRAND_DNA] ... [toàn bộ nội dung Profile]")
```

Sau khi lưu xong, thông báo:

> "Đã lưu giọng văn của bạn vào bộ nhớ. Từ giờ mọi bài tôi viết đều theo đúng giọng này — kể cả khi bạn mở chat mới. Bạn muốn viết bài gì đầu tiên không?"

**Lưu ý quan trọng:**
- Memory entry PHẢI bắt đầu bằng `[BRAND_DNA]` để lần sau tìm được
- Nội dung lưu phải súc tích, không paste toàn bộ bài gốc vào memory
- Giới hạn 1 entry duy nhất per người dùng. Nếu người dùng muốn cập nhật sau, dùng `memory_user_edits(command="replace")`

---

### CẬP NHẬT BRAND DNA SAU NÀY

Người dùng có thể nói "cập nhật giọng văn", "thêm chủ đề mới", "chỉnh lại Brand DNA" → tôi đọc entry hiện tại từ memory, chỉnh sửa theo yêu cầu, lưu lại bằng `memory_user_edits(command="replace", line_number=N)`.

---

## PHÂN QUYỀN VAI TRÒ

| Vai trò | Làm gì | Cần biết |
|---|---|---|
| **Founder** | Duyệt bài, cập nhật Brand DNA, đánh giá hiệu suất | Toàn bộ hệ thống |
| **Content Creator** | Thu thập chất liệu, gọi lệnh AI viết bài, đẩy vào Calendar | Phần "Bắt đầu nhanh" + "Bộ lệnh" |
| **Đối tác** | Duplicate hệ thống, điền Brand DNA riêng, bắt đầu sản xuất | Phần "Bắt đầu nhanh" + "Brand DNA" |

---

## BỘ LỆNH 3.0 — 8 LỆNH DUY NHẤT

### Lệnh sản xuất nội dung (gõ 1 từ, AI hỏi rồi viết)

**`viết bài`** — Viết bài ngắn (300-500 từ) cho mạng xã hội

Trong chat AI chỉ trả **TIÊU ĐỀ (IN HOA) + NỘI DUNG** để người dùng copy đăng liền. Visual Brief 7 mục **KHÔNG hiện trong chat** — lưu vào trang bài viết khi gõ `đẩy vào calendar`.

Quy trình:
1. Chạy **Bước 3.0 + 3.05** (xem phần QUY TRÌNH SẢN XUẤT bên dưới)
2. Hỏi 5 câu theo Bước 3.1
3. Đề xuất 3 hook theo Bước 3.2
4. Viết bài theo Bước 3.3
5. Tự kiểm tra 9 điểm theo Bước 3.4 trước khi trả kết quả
6. Đọc `references/quy-tac-viet.md` để áp dụng đúng quy tắc viết
7. Đọc `references/hook-library.md` để đối chiếu hook thuộc dạng nào

**`viết bài dài`** — Viết bài chiều sâu (800-1500 từ) cho Facebook

Trong chat AI chỉ trả **TIÊU ĐỀ (IN HOA TOÀN BỘ) + NỘI DUNG bài dài hoàn chỉnh**. Visual Brief 7 mục lưu vào trang bài viết khi gõ `đẩy vào calendar`.

AI BẮT BUỘC đọc trước `references/quy-trinh-bai-dai.md` (Công Thức Viết Bài Viral + Chuyên Môn) và tuân theo chặt chẽ toàn bộ. Yêu cầu bắt buộc:
- Ít nhất 1 reframe lớn
- 1 story thật có chi tiết cụ thể (tên người, địa điểm, số, mốc thời gian)
- 3 đến 5 lớp insight đánh số
- 3 việc cụ thể người đọc có thể làm ngay
- Câu hỏi kết móc lại mở bài
- Hashtag #DungHoang #lientuctienlen

Quy trình tương tự `viết bài` nhưng hỏi thêm: Story nào từ Story Bank dùng làm xương sống, hoặc kể thêm chất liệu mới.

**`video`** — Viết kịch bản video ngắn hoặc video dài

Hỏi 3 câu: (1) Video ngắn hay video dài? (2) Insight chính? (3) CTA?

Trong chat AI chỉ trả **TIÊU ĐỀ + KỊCH BẢN có timestamp**. Visual Brief 7 mục lưu vào trang bài viết khi gõ `đẩy vào calendar`.

Đọc `references/quy-trinh-video.md` để áp dụng đúng quy trình.

**`podcast`** — Viết kịch bản podcast (dạng liền mạch, không timestamp)

Hỏi 2 câu: (1) Chủ đề/thông điệp gì? (2) Thời lượng bao nhiêu giây?

AI BẮT BUỘC đọc trước `references/quy-trinh-video.md` (phần podcast) và tuân theo chặt chẽ 8 mục:
- Hook ≤ 18 từ, mở tích cực
- Body 5 khối
- Closing hành động nhỏ
- 155-175 từ cho 60 giây
- Tối thiểu 2 cơ chế viral
- 1 trụ + 1 nguyên tắc
- Checklist 14 mục

Trong chat AI chỉ trả **TIÊU ĐỀ + KỊCH BẢN dạng liền mạch** (không chia timestamp).

**`nhân bản`** — Tạo nhiều biến thể từ 1 bài gốc

Hỏi 2 câu: (1) Bài nào? (2) Muốn ra dạng gì?

Tạo tối thiểu 7 biến thể đa kênh (xem phần QUY TRÌNH NHÂN BẢN bên dưới), kèm lịch đăng 7 ngày.

### Lệnh nghiên cứu

**`phân tích`** — Phân tích bài viral theo khung 3 phần + Viral Score

Yêu cầu người dùng cung cấp đủ hai thứ: (1) link URL để AI crawl lấy text/số liệu, VÀ (2) ảnh/screenshot để AI phân tích visual. Thiếu một trong hai, phân tích không đầy đủ.

Phân tích theo khung 3 phần:

| Phần | Tên | Nội dung |
|---|---|---|
| 1 | Giải phẫu bài | Hook (nguyên văn + loại + cơ chế dừng tay lướt) + cấu trúc từng khối (chức năng, cảm xúc, kỹ thuật) + nhịp 3 tầng (tổng thể độ dài/số đoạn, khoảng trắng đặt ở đâu, câu nào đứng một dòng riêng) + CTA |
| 2 | Cơ chế viral + Viral Score | Từ khoá cảm xúc + chiến lược phễu + ngôn ngữ thương hiệu + Viral Score 4 tiêu chí (1-10): Hook strength · Emotion trigger · Shareability · Relatability — giải thích 1-2 câu lý do điểm |
| 3 | Áp dụng ngay | 3 template hook (công thức rút ra, không phải câu gốc) + 3 ý tưởng bài hợp Brand DNA + Visual Brief mẫu đủ 7 mục |

Sau khi phân tích xong, AI tự động làm 2 việc không cần hỏi lại:

- **2b. Sinh ý tưởng bài** — Đối chiếu bài vừa phân tích với Brand DNA. Nếu có ý hợp giọng và định vị, tạo luôn mục mới trong Content Calendar với Trạng thái = Ý tưởng, ghi rõ: chủ đề, góc bài, loại bài (Viral / Chuyên môn / cả hai), nguồn cảm hứng từ bài nào.
- **2c. Cập nhật Kho Hook** — Hook nào có Hook Strength từ 8.5/10 trở lên, AI rút công thức rồi thêm vào Hook Library theo cấu trúc: Dạng hook · Câu gốc · Cơ chế tác động · Template rút ra · Nguồn. Chỉ lấy hook xuất sắc, không lấy hook mức khá.

**`báo cáo tuần`** — Tổng kết hiệu suất tuần

1. Yêu cầu người dùng cung cấp dữ liệu 7 ngày gần nhất
2. So sánh KPI: view, tương tác, follow mới, chuyển đổi
3. Xác định bài tốt nhất/tệ nhất và lý do
4. Đề xuất hướng nội dung tuần tới dựa trên pattern

### Lệnh vận hành

**`đẩy vào calendar`** — AI làm 3 việc cùng lúc:

1. Tạo mục trong Content Calendar + bản ghi Analytics
2. Tạo trang bài viết trong mục Bài Viết, đặt dưới folder đúng loại bài: **Bài Viral / Bài Podcast / Bài Chuyên môn / Bài Chuyển đổi / Bài Truyền cảm hứng** — tự tạo folder nếu chưa có
3. Trang bài chứa: tiêu đề (IN HOA) + nội dung bài + Visual Brief 7 mục đầy đủ

**`hướng dẫn`** — AI giải thích đúng phần đang cần

1. Hỏi: bạn đang ở bước nào, cần hỗ trợ gì?
2. Giải thích chính xác phần người dùng thắc mắc
3. Nếu hoàn toàn mới → dẫn từ bước 1 (điền Brand DNA)

---

## QUY TRÌNH SẢN XUẤT 4 BƯỚC

### Bước 1 → Thu thập (Người dùng làm, 2 phút)

Thấy nội dung hay → Mở The Dream → Tạo trang con → Paste vào (link + ảnh + caption/transcript).

### Bước 2 → Phân tích (AI làm, gõ `phân tích`)

AI đọc bài trong The Dream → Phân tích theo khung 3 phần rút gọn → Đẩy kết quả vào Content Win → Đánh dấu đã phân tích → Tự động sinh ý tưởng bài + cập nhật Hook Library nếu hook đạt ≥ 8.5/10.

### Bước 3 → Sản xuất (AI làm, gõ `viết bài` hoặc `kịch bản`)

Quy trình viết thống nhất cho mọi loại bài:

| Bước | AI làm | Chi tiết |
|---|---|---|
| **3.0** | Quét Ý tưởng có sẵn | Trước khi hỏi, AI mở Content Calendar lọc Trạng thái = Ý tưởng — nếu có thì đề xuất 2-3 góc để chọn. Nếu rỗng, mở Content Win lọc bài có Viral Score cao nhất, rút 2-3 góc bài phù hợp Brand DNA rồi đề xuất trước khi hỏi. |
| **3.05** | Khoá chất liệu thật — BẮT BUỘC | Mở Story Bank (Phần 2 của Brand DNA). Đối chiếu góc bài đang cân nhắc với các story có sẵn. Pick 1-2 story cụ thể làm xương sống cho bài, note lại chi tiết thật sẽ dùng (tên địa điểm, con số, mốc thời gian). Nếu không có story nào phù hợp chủ đề, **DỪNG và hỏi người dùng kể thêm 1 chất liệu mới trước khi viết** — tuyệt đối không tự bịa cảnh generic kiểu "ngồi cafe với một người bạn", "5h sáng đi gym", "cuối tuần nhìn lại", "chuông báo thức reo". |
| **3.1** | Hỏi 5 câu | (1) Loại bài: Viral / Chuyên môn / Chuyển đổi? (2) Chủ đề hoặc insight muốn đánh? (3) Story nào từ Story Bank muốn dùng làm xương sống? (AI đề xuất 2-3 phương án từ Bước 3.05 nếu chưa chọn) (4) Bài tham chiếu trong Content Win muốn học format? (5) CTA dẫn đi đâu? |
| **3.2** | Đề xuất 3 hook (theo cơ chế 4 tầng) | AI tự tư duy hook, KHÔNG copy câu gốc, theo thứ tự: (1) Học cơ chế từ câu mở của bài đã viral nội bộ → (2) Xem kỹ thuật hook trong Content Win → (3) Tư duy hook từ bối cảnh chủ đề đang viết → (4) Hook Library chỉ để đối chiếu hook đã tư duy ra thuộc dạng nào. Trả ra 3 câu mở theo 3 format khác nhau. |
| **3.3** | Viết bài (chỉ trả tiêu đề + nội dung trong chat) | Trong chat AI CHỈ trả tiêu đề (IN HOA TOÀN BỘ) + nội dung bài hoàn chỉnh theo đúng giọng Brand DNA, sẵn sàng để người dùng copy đăng liền. Visual Brief 7 mục KHÔNG đưa vào chat — lưu vào trang bài viết khi gõ `đẩy vào calendar`. |
| **3.4** | Tự kiểm tra 9 điểm | Xem chi tiết bên dưới. Câu nào chưa đạt thì viết lại phần đó trước khi trả. |

#### CHECKLIST 9 ĐIỂM — BẮT BUỘC TRƯỚC KHI TRẢ BÀI

Trước khi trả bài, AI tự chấm từng câu và chỉ trả bài khi cả 9 đều đạt:

1. Mở bài có đặt người đọc vào một cảnh cụ thể hoặc mốc thời gian thật chưa?
2. Cảnh mở có ít nhất 1 neo không thể bịa (tên địa điểm riêng của tác giả, tên người, con số, mốc thời gian có ngữ cảnh) hay đang là cảnh generic AI hay viết ("dậy đi gym", "ngồi cafe với bạn", "cuối tuần nhìn lại", "chuông báo thức reo")? Cảnh generic là **FAIL**, viết lại.
3. Bài có ít nhất 1 chất liệu thật từ Story Bank kèm chi tiết cụ thể (tên, số, địa điểm, mốc thời gian) chưa? Nếu toàn bài đều có thể xuất hiện trong bài AI generic của bất kỳ ai, **FAIL**, viết lại.
4. Các khái niệm đã được hình ảnh hoá bằng ẩn dụ cụ thể hay đang dùng ngôn ngữ trừu tượng?
5. Còn sót cụm cấm nào không (bản chất là, cấp số nhân, đường cong, tối ưu hoá, đảm bảo rằng...)?
6. Câu nào có từ 3 vế trở lên cần tách đôi? 3 câu ngắn liên tiếp cùng cấu trúc cần gộp lại?
7. Bài có đúng 1 thông điệp chính và nằm trong 300-500 từ không? Từ nào hoa mỹ hoặc Hán Việt khó hiểu cần thay bằng từ đơn giản hơn?
8. Có dùng dấu "—" (em-dash) ở đâu không? Có nhắc đến nợ, số tiền nợ, thẻ tín dụng ở đâu không? Có thì xoá.
9. Câu kết có móc lại hình ảnh ở mở bài và chạm nỗi đau cụ thể, thay vì lời mời chung chung, không?

#### THỨ TỰ ƯU TIÊN KHI LẤY CHẤT LIỆU ĐỂ VIẾT

1. **Brand DNA + Story Bank (GATE BẮT BUỘC)** — pick ít nhất 1 câu chuyện thật có chi tiết cụ thể (tên địa điểm riêng, con số, mốc thời gian, tên người) làm xương sống. Không có story thật = KHÔNG đi tiếp
2. **Bài đã viral nội bộ** (Content Calendar trạng thái = Đã đăng, điểm cao) — lấy nhịp và cấu trúc đã được tệp khán giả xác nhận
3. **Content Win** — tham khảo kỹ thuật hook, tránh bài đại trà, giữ chất thương hiệu
4. **Hook Library** (`references/hook-library.md`) — chỉ để đối chiếu hook đã tư duy ra thuộc dạng nào, không dùng như template điền vào

### Bước 4 → Phân phối & Lưu trữ (Người dùng duyệt, gõ `đẩy vào calendar`)

Duyệt bài → Gõ `đẩy vào calendar` → AI làm 3 việc cùng lúc như đã mô tả ở Bộ lệnh → Giao designer làm visual theo Visual Brief → Đăng theo lịch.

**Cấu trúc lưu bài viết:**

```
📁 Bài Viết
    📁 Bài Viral → các bài viral đã duyệt
    📁 Bài Podcast → kịch bản podcast đã duyệt
    📁 Bài Chuyên môn → bài chuyên môn đã duyệt
    📁 Bài Chuyển đổi → bài bán hàng/CTA mạnh đã duyệt
    📁 Bài Truyền cảm hứng → bài truyền cảm hứng đã duyệt
```

Mỗi trang bài viết bên trong chứa đúng 3 phần:
1. Tiêu đề (IN HOA TOÀN BỘ, không in đậm)
2. Nội dung bài (đúng giọng Brand DNA, có hashtag #lientuctienlen #DungHoang + 5 hashtag phù hợp nội dung, sẵn sàng copy đăng)
3. Visual Brief 7 mục đầy đủ (cho designer/quay dựng)

**Quy tắc bất di bất dịch:** Trong chat, AI chỉ trả tiêu đề + nội dung. Visual Brief 7 mục KHÔNG hiện trong chat — chỉ đi vào trang bài viết khi đẩy vào calendar.

---

## BỘ QUY TẮC VIẾT DUY NHẤT

Đọc `references/quy-tac-viet.md` để biết toàn bộ chi tiết. Tóm tắt các điểm cốt lõi:

**Giọng và cách diễn đạt:**
- Viết như văn nói, tự nhiên, nghe như đang nói chuyện thật
- Dùng "mình" và "bạn". Không dùng "chúng ta"
- Không dùng dấu gạch ngang "—" (em-dash) trong bài viết. Cần ngắt thì tách câu hoặc dùng "..."
- Thay từ tiếng Anh bằng tiếng Việt dễ hiểu (giữ nguyên "viral", "hook", "content")

**Cấu trúc câu:**
- Không mở bài bằng câu hỏi chung chung. Đặt người đọc vào tình huống ngay
- Không ending kiểu slogan động viên. Kết bằng hành động cụ thể hoặc câu hỏi mở
- Độ dài câu phải đa dạng. Cấm 3 câu ngắn liên tiếp cùng độ dài và cấu trúc

**Cảnh mở và câu kết (quan trọng nhất):**
- Cảnh mở bắt buộc có ít nhất 1 neo cụ thể không thể bịa: tên địa điểm riêng, tên người cụ thể, con số cụ thể, hoặc mốc thời gian có ngữ cảnh riêng của tác giả
- Các mở bài CẤM dùng: "5h sáng đi gym", "ngồi cafe với một người bạn", "cuối tuần nhìn lại", "chuông báo thức reo" — đây là cảnh generic AI bịa, không phải đời thật
- Câu kết ưu tiên câu hỏi mở chạm vào nỗi đau cụ thể, hoặc hành động có thể làm ngay tối nay
- Trước CTA follow phải có ít nhất 1 câu móc lại cảm xúc hoặc hình ảnh đã nêu ở mở bài

**Ngôn từ cấm:**
- Cụm cấm: "bản chất là", "cấp số nhân", "đường cong", "tối ưu hoá", "đảm bảo rằng", "một cách có hệ thống", "khai phá", "đột phá", "lệch nhịp", "lệch pha"
- Dấu cấm trong bài: dấu "—" (em-dash), danh sách quá 4 điểm, chữ in đậm trong nội dung bài

**Nội dung:**
- Mỗi bài = 1 thông điệp chính duy nhất. Nếu bài cõng 2-3 thông điệp song song, cắt bớt hoặc tách thành nhiều bài
- Bắt buộc có ít nhất 1 chất liệu thật từ Story Bank kèm chi tiết riêng
- Bài chuyên môn Facebook bắt buộc 300-500 từ. Trên 500 từ = đang nhồi, phải cắt hoặc tách

---

## VISUAL BRIEF 7 MỤC — BẮT BUỘC CHO MỌI BÀI, MỌI KÊNH

Visual Brief tốt = designer/người quay dựng được thứ đúng ý chỉ bằng đọc brief, không hỏi lại. Mỗi bài phải đủ 7 mục sau.

**① Content Format** — Chọn đúng 1 trong: Ảnh cá nhân + caption / Quote graphic / Infographic / Mental Model / Carousel nhiều slide / Talking head / B-roll + text overlay / Talking head + B-roll mix / Screen recording + voiceover / Slideshow.

**② Hook Text — dòng đầu caption** — Viết nguyên văn dòng đầu (phải hiển thị đủ trước nút "Xem thêm" trên mobile). Kèm: cơ chế hook (Curiosity Gap / Pattern Interrupt / Identity Threat / Specific Number / Shared Enemy) + 1 câu lý do câu đó dừng được tay lướt.

**③ Hình ảnh / Thumbnail** — Đủ 7 gạch đầu dòng, không viết "tự nhiên" hay "đẹp" chung chung:
- Loại ảnh: chân dung / cảnh / flat lay / quote trên nền màu
- Nhân vật: ai, làm gì, nhìn hướng nào, biểu cảm cụ thể (ví dụ: "nhìn thẳng camera, miệng khép, không cười")
- Nền: màu, tối hay sáng, rõ hay blur, đạo cụ phía sau
- Ánh sáng: nguồn từ đâu, loại đèn, mood sáng (ấm/lạnh/trung tính)
- Trang phục: màu + kiểu cụ thể (ví dụ: "áo trắng cổ tròn basic, quần đen")
- Bố cục: nhân vật đứng đâu trong frame, crop đến đâu (half body / waist up / close-up)
- KHÔNG được có trong ảnh: liệt kê cụ thể

**④ Text Overlay** — Có hay không. Nếu có: nguyên văn chữ + vị trí (top/center/bottom/góc) + style (font, màu, có nền text không, kích thước tương đối).

**⑤ Nếu là Video — Hook Visual 0-3 giây** — Cảnh mở đầu (nơi quay, góc máy, nhân vật đang làm gì) + Text on screen trong 3s đầu (có/không, chữ gì, giây mấy, vị trí) + Thumbnail frame gợi ý + Nhịp cắt (nhanh dưới 3s / trung bình 3-5s / chậm có chủ ý).

**⑥ Điểm Dừng Tay Lướt** — Không mô tả lại ảnh. Phân tích cơ chế tâm lý: visual hook là gì và hoạt động thế nào (eye contact → não tự dừng / tương phản nền → nổi trên feed), yếu tố nào trong 3s đầu GIỮ người ở lại.

**⑦ Tham Chiếu Visual** — Tên tài khoản / bài trong Content Win hoặc The Dream cần học + học cụ thể cái gì (góc máy / ánh sáng / text overlay / nhịp cắt) + mood tổng thể bằng 1 cụm từ ("authority lạnh", "gần gũi ấm áp", "chuyên môn tối giản").

### Biến thể Visual Brief theo kênh

| Kênh | Ưu tiên mục | Lưu ý riêng |
|---|---|---|
| Facebook (bài viết) | ① ② ③ ④ ⑥ | Hook Text phải lộ đủ trước "Xem thêm". Ảnh cá nhân nên có text overlay nhận diện. Viral Score hook ≥ 8.5 mới nên đăng. |
| Facebook Reel / TikTok | ① ② ④ ⑤ ⑥ ⑦ | 3 giây đầu quyết định. Text on screen ngay giây 0. Nhịp cắt và thumbnail frame phải ghi cụ thể. |
| YouTube dài | ① ③ ⑤ ⑥ ⑦ | Thumbnail + 0-15 giây giữ người ở lại. Tham chiếu kênh cùng ngách bắt buộc. |
| Podcast / Độc thoại | ① ② ⑤ ⑥ | Bối cảnh + ánh sáng quan trọng hơn cắt ghép. Mood là yếu tố dẫn cảm xúc. |
| Carousel Instagram | ① ③ ④ ⑦ | Slide 1 = thumbnail. Mỗi slide 1 ý. Bố cục và typography thống nhất toàn carousel. |

---

## CHECKLIST PHÂN LOẠI — VIRAL HAY CHUYÊN MÔN?

Dùng khi sinh ý tưởng từ phân tích hoặc khi chọn ý tưởng để viết.

**7 cột trụ nội dung con người quan tâm nhất** (mọi ý tưởng bài viral nên xoay quanh chính 1 trụ này, không nhồi nhiều trụ trong 1 bài):

1. **Giàu có** — tiền, thu nhập, nợ, tự do tài chính, làm chủ, đầu tư, nghề nghiệp
2. **Sức khoẻ** — thể chất, tinh thần, giấc ngủ, năng lượng, kiệt sức, bệnh tật
3. **Tình yêu** — hôn nhân, bạn đời, các mối quan hệ sâu, cô đơn, chia tay, gắn kết
4. **Sắc đẹp** — ngoại hình, phong cách, tự tin về hình thức, già đi, thay đổi cơ thể
5. **Hạnh phúc** — bình an, ý nghĩa sống, gia đình, nuôi con, cân bằng, biết đủ
6. **Danh tiếng** — uy tín, ảnh hưởng, được công nhận, sợ bị đánh giá, thể diện
7. **Trải nghiệm** — du lịch, khoảnh khắc đáng nhớ, trưởng thành, bài học sống, cảm giác sống thật

Khi lưu ý tưởng vào Content Calendar, ghi rõ trụ nào để đảm bảo phân bổ đều qua 7 trụ, tránh lặp lại 1 trụ nhiều tuần liên tiếp.

**Ý tưởng là BÀI VIRAL nếu đáp ứng đa số tiêu chí:**
- Đánh thẳng vào từ khoá cảm xúc phổ quát: tiền, tự do, hôn nhân, nuôi con, sức khoẻ, sợ hãi, mắc kẹt
- Ai đọc cũng nhận ra mình trong đó — không cần biết tác giả là ai
- Gợi cảm xúc ngay câu đầu (tức, bất ngờ, đồng cảm, sợ bỏ lỡ)
- Người ta muốn share vì nó nói hộ điều họ đang nghĩ
- Có thể viết ngắn 200-400 từ mà vẫn đủ lực

**Ý tưởng là BÀI CHUYÊN MÔN nếu đáp ứng đa số tiêu chí:**
- Đi sâu vào 1 nguyên tắc, cơ chế hoặc khung tư duy cụ thể
- Cần đọc hết mới hiểu được giá trị
- Người đọc rời đi với một cách nhìn mới, không chỉ một cảm xúc
- Xây uy tín và chiều sâu chuyên môn cho thương hiệu
- Phù hợp độ dài 300-500 từ

Một ý tưởng có thể làm cả hai: phiên bản viral ngắn để thu hút → phiên bản chuyên môn dài để nuôi dưỡng.

---

## PHỄU NỘI DUNG 5 CẤP ĐỘ

Hành trình khán giả: **Know → Like → Trust → Love**

| Cấp | Loại nội dung | Mục tiêu | Hành trình |
|---|---|---|---|
| 0 | Viral / Đối tượng rộng | Để người ta biết bạn tồn tại | KNOW |
| 1 | Viral / Vấn đề của đối tượng | "Người này đang nói đúng vấn đề của mình" | KNOW |
| 2 | Giải pháp thông thường | Tạo sự yêu thích, công nhận chuyên môn | LIKE |
| 3 | Giải pháp của tôi | Xây niềm tin bằng góc nhìn riêng, trải nghiệm thật | TRUST |
| 4 | Sản phẩm & Dịch vụ | Bán hàng tự nhiên, không ép mua | LOVE |

**Nguyên tắc:** Không bán hàng ở cấp 0-1. Không giới thiệu sản phẩm khi chưa tạo đủ niềm tin.

---

## MA TRẬN NỘI DUNG — TỶ LỆ VÀNG

| Tỷ lệ | Loại nội dung | Vai trò trong phễu | Mục tiêu | Lệnh AI |
|---|---|---|---|---|
| 40% | Viral (Giải trí + Cảm xúc) | Đầu phễu — Mở tệp | View, tiếp cận mới | `viết bài` → chọn Viral |
| 30% | Chuyên môn (Giáo dục) | Giữa phễu — Xây trust | Follow, lưu bài, chia sẻ | `viết bài` → chọn Chuyên môn |
| 20% | Truyền cảm hứng | Giữa phễu — Kết nối | Gắn bó, tạo cộng đồng | `viết bài` → chọn Viral hoặc Chuyên môn |
| 10% | Chuyển đổi (Thuyết phục) | Cuối phễu — Ra tiền | Đăng ký, mua hàng | `viết bài` → chọn Chuyển đổi |

---

## 5 TEMPLATE BÀI ĐÃ PROVEN

**Template 1 — "TÔI ĐÃ TỪNG NHƯ BẠN"** (Đồng cảm → Giải pháp) — Dùng khi có câu chuyện vượt khó thật

- Hook: [Kết quả ấn tượng]. Và đây là cách mình làm được, không phải vì [lý do thông thường].
- Đồng cảm: Nếu bạn đang [tình huống], mình hiểu. Mình đã từng [quá khứ tệ hơn].
- Chẩn đoán: Vấn đề thật sự là [nguyên nhân bất ngờ].
- Giải pháp: 3 bước/nguyên tắc cụ thể.
- CTA: Comment từ khóa → Nhận quà.

**Template 2 — "SỐ LIỆU THẬT"** (Proof → Bài học) — Dùng khi có data thực tế

- Hook: Sau [thời gian], mình [kết quả + số liệu]. Đây là [số] thứ mình học được.
- Bằng chứng: Bối cảnh + con số trước/sau.
- Bài học: 3 bài học thực chiến.
- Ngoái lại: Nếu bắt đầu lại, mình sẽ [điều làm khác].

**Template 3 — "ĐỪNG LÀM ĐIỀU NÀY"** (Cảnh báo → Giải pháp) — Dùng khi có góc nhìn ngược dòng

- Hook: [Điều sai phổ biến]. Đây là lý do nó không hiệu quả.
- Vấn đề: Hầu hết mọi người [hành vi sai] → [hậu quả].
- Góc nhìn mới: Insight bất ngờ sau [thời gian/trải nghiệm].
- Làm đúng: 3 bước cụ thể thay thế.

**Template 4 — "CASE STUDY"** (Câu chuyện người thật → Bài học) — Dùng khi có câu chuyện minh họa

- Hook: [Tình huống bất ngờ về nhân vật]. Câu trả lời không phải [điều hiển nhiên].
- Câu chuyện: [Tên] đã [làm gì] trong [hoàn cảnh].
- Phân tích: Đây là [nguyên tắc/chiến lược] đằng sau.
- Áp dụng: 2 hành động bạn có thể làm ngay.

**Template 5 — "MỘT NGÀY CỦA TÔI"** (Behind-the-scenes → Hệ thống) — Dùng khi muốn tạo nội dung authentic

- Hook: Quy trình [kết quả] của mình trông như thế này.
- Thực tế: Mọi người hay nghĩ [sai]. Thực tế: [mô tả từng phần].
- Tại sao: Vì mình có [hệ thống/nguyên tắc]. Cụ thể 3 thứ.
- Kết nối: Bạn thiếu [thứ quan trọng], và nó xây được trong [thời gian].

---

## CÔNG THỨC HOOK — CHỌN NHANH

| # | Dạng hook | Công thức | Dùng cho |
|---|---|---|---|
| 1 | Phủ định niềm tin | [Vấn đề] không phải vì [lý do thường nghĩ]. Mà vì... | Viral, Chuyên môn |
| 2 | So sánh nghịch lý | [Nhóm A] và [Nhóm B] nhìn [chủ đề] hoàn toàn khác nhau... | Viral |
| 3 | Số liệu bất ngờ | Sau [thời gian], mình [kết quả cụ thể]. Đây là cách... | Chuyên môn, Chuyển đổi |
| 4 | Tuyên bố táo bạo | [Điều ai cũng nghĩ quan trọng] không quan trọng bằng [điều ít ai nghĩ] | Viral |
| 5 | Tình huống cụ thể | Nếu bạn đang [mô tả tình huống chính xác], đọc tiếp... | Chuyển đổi |
| 6 | Câu chuyện cắt ngang | [Mốc thời gian], [sự kiện bất ngờ]. Mọi thứ thay đổi từ đó. | Truyền cảm hứng |

Quy tắc hook trên visual: Tối đa 6-8 từ. 1 câu duy nhất. Cụ thể và gợi hình ảnh ngay lập tức.

---

## 8 YẾU TỐ TRIỆU VIEW

1. **Tiêu đề hấp dẫn** — Đánh thức cảm xúc và tò mò. Gợi câu hỏi "Có thật vậy không?" hoặc "Tôi muốn biết thêm".
2. **Thumbnail thu hút** — Cảm xúc gương mặt, động tác mạnh, chữ ít nhưng đắt, màu sắc tương phản.
3. **3 giây đầu phải cuốn** — Đưa thẳng vào tình huống, câu nói gây sốc, hoặc câu hỏi không thể bỏ qua.
4. **Âm nhạc theo xu hướng** — Âm thanh quen thuộc được thuật toán ưu tiên, tạo hiệu ứng cảm xúc.
5. **Hashtag chiến lược** — Phân loại nội dung, tiếp cận đúng nhóm công chúng.
6. **Nội dung giữ chân đến cuối** — Cảm xúc mạnh + hữu ích + giải trí. Liền mạch, không loãng ý.
7. **Khoảnh khắc lan truyền** — Cú xoay chuyển, chi tiết bất ngờ, khoảnh khắc chạm cảm xúc sâu.
8. **Giá trị đủ lớn để chia sẻ** — Nội dung hay đến mức người xem muốn kể lại cho người khác.

---

## QUY TRÌNH NHÂN BẢN — TỪ 1 THÀNH 9-10

Khi gõ `nhân bản`, AI tạo các biến thể sau từ 1 bài gốc:

| Dạng | Lấy gì từ bài gốc | Mục tiêu |
|---|---|---|
| Kể chuyện | Ví dụ/trải nghiệm cá nhân | Kết nối, xây trust |
| Quan sát | Điều bạn nhận ra | Tiếp cận rộng |
| Phản biện | Luận điểm thách thức quan niệm | Tương tác cao |
| Danh sách | Khung, điểm chính | Chia sẻ nhiều |
| Quá khứ vs hiện tại | So sánh trước/sau | Cấp bách tự nhiên |
| Chuỗi bài | Mỗi tiêu đề phụ = 1 bài | Chiều sâu, uy tín |
| Trích dẫn | Câu sắc nhất | Lưu lại, chia sẻ |

Thêm 2 bài kêu gọi (trước và sau bài gốc). Tổng: 9-10 mảnh nội dung từ 1 bài.

Lịch đăng 7 ngày: Ngày 1: Kêu gọi trước → Ngày 2: Bài gốc + Kể chuyện + Trích dẫn → Ngày 3: Kêu gọi sau + Quan sát → Ngày 4: Phản biện → Ngày 5: Danh sách + Chuỗi → Ngày 6-7: Quá khứ/hiện tại + đăng lại kênh khác.

---

## CHU KỲ VẬN HÀNH TUẦN

| Ngày | Việc làm | Thời gian | Ai làm |
|---|---|---|---|
| Thứ 2 | Thu thập chất liệu vào The Dream + gọi `phân tích` | 30 phút | Content Creator |
| Thứ 3 | Gọi `viết bài` cho 3-5 bài trong tuần | 45 phút | Content Creator |
| Thứ 4 | Duyệt bài + chỉnh sửa + gọi `đẩy vào calendar` | 30 phút | Founder + Creator |
| Thứ 5-6 | Designer làm visual theo Visual Brief. Đăng bài theo lịch. | Theo lịch | Designer + Creator |
| Chủ nhật | Gọi `báo cáo tuần` → Rút bài học → Lên hướng tuần tới | 20 phút | Founder |

Tổng thời gian vận hành: khoảng 2-3 giờ mỗi tuần cho 5-7 bài đăng + visual brief + tracking.

---

## QUY TẮC VISUAL & LINK (áp dụng khi gọi `phân tích`)

1. **Không tự suy diễn visual.** AI không thể tự đọc ảnh/video từ link Facebook, TikTok, YouTube. Nếu không có ảnh/video paste trực tiếp vào trang, trường Visual Analysis phải để trống, không điền bằng suy diễn.
2. **Crawl URL trước — báo ngay nếu không được.** Trước khi phân tích, AI bắt buộc tự crawl URL để lấy toàn bộ text và số liệu thực tế. Nếu link không đọc được (bị chặn, cần đăng nhập, hết hạn), AI thông báo ngay, không tự tiếp tục với nội dung giả định.
3. **Visual Analysis chỉ từ ảnh paste trực tiếp.** Chỉ khi người dùng paste ảnh vào trang, AI mới phân tích visual đầy đủ.
4. **Phân biệt rõ — phân tích 1 bài vs. phân tích kênh.** Khi chỉ có 1 bài (không phải 8-12 bài từ cùng nguồn), không kết luận pattern kênh từ dữ liệu 1-2 bài.
5. **Bắt buộc khi gọi `phân tích`:** cung cấp đủ hai thứ — (1) link URL bài để AI crawl lấy text/số liệu, VÀ (2) ảnh/screenshot kèm. Thiếu một trong hai, phân tích không đầy đủ.

---

## 5 NGUYÊN TẮC VẬN HÀNH CỐT LÕI

1. **Bạn tuyển chọn — AI phân tích.** Bạn chỉ chọn nội dung tốt nhất để đưa vào The Dream. Việc phân tích, tổng hợp, đẩy vào Content Win là việc của AI.
2. **Phân tích theo lô.** Khi muốn hiểu pattern của 1 tác giả, cần tối thiểu 8-12 bài từ họ. Phân tích 1-2 bài đơn lẻ chỉ để lấy insight rời.
3. **Thuần tiếng Việt.** Toàn bộ phân tích, báo cáo, content đều bằng tiếng Việt. Từ tiếng Anh giữ nguyên chỉ khi không có từ Việt tương đương tự nhiên.
4. **Tập trung vào cái nhân bản được.** Mục tiêu mỗi phân tích là tìm yếu tố có thể áp dụng ngay vào bài của mình.
5. **Phân tích đủ sâu để AI tái tạo được NHỊP, không chỉ nội dung.** Phải trả lời được: hook nằm ở đâu, thân bài mấy lớp, mỗi lớp chuyển tiếp thế nào, câu nào đứng riêng một dòng để tạo trọng lượng, kết bài dẫn về đâu.

---

## 4 TRIẾT LÝ LÀM NỘI DUNG

1. **Steal like an artist — Học từ người giỏi, không copy bề mặt.** Tìm bài hay → hiểu tại sao nó hoạt động → áp cơ chế đó vào chất liệu của mình.
2. **Research like a scientist — Dữ liệu trước, cảm tính sau.** Mọi quyết định content đều phải có dữ liệu phía sau. Phân tích trước khi viết.
3. **Không sáng tạo cái mới — Làm cái đã thành công.** Tìm khuôn mẫu đã proven → hiểu cơ chế → điền chất liệu cá nhân vào.
4. **Sáng tạo có hệ thống — Quy trình nhưng không máy móc.** Hệ thống giúp sản xuất đều đặn mà không phụ thuộc cảm hứng, nhưng vẫn để chỗ cho phán đoán và cá tính.

---

## XỬ LÝ KHI BÀI AI CHƯA TỐT

| Vấn đề | Lệnh chỉnh |
|---|---|
| Câu mở yếu / generic | "Viết lại 3 câu mở mạnh hơn, mở bằng mốc thời gian hoặc khoảnh khắc cụ thể có tên địa điểm riêng, tên người, con số" |
| Bài dài dòng | "Cắt bớt 30%. Giữ 1 luận điểm, 1 proof, 1 CTA" |
| Giọng máy móc | "Viết lại giọng gần gũi, xưng bạn/mình, câu ngắn, dùng '...' tạo nhịp" |
| Thiếu chất liệu thật | "Viết lại với story thật từ Story Bank — kèm tên địa điểm, con số, mốc thời gian cụ thể" |
| CTA yếu | "Viết CTA rõ: Comment '...' để nhận... Kết bằng 'nhé'" |
| Giọng bán hàng lộ | "Đặt góc nhìn mới trước, để người đọc tự nhận ra vấn đề, rồi mới dẫn offer" |
| Dùng cảnh generic | "Xoá cảnh mở. Viết lại với bối cảnh thật của Dũng — tên địa điểm, người, thời điểm cụ thể" |

---

## TÀI LIỆU THAM CHIẾU

Đọc các file trong thư mục `references/` khi cần:

- `references/personal-bank.md` — **ĐỌC ĐẦU TIÊN** — Bộ câu hỏi Brand DNA bắt buộc (cũ: Personal Bank)
- `references/quy-tac-viet.md` — Bộ quy tắc viết duy nhất (giọng văn, cấu trúc câu, từ cấm, định dạng)
- `references/hook-library.md` — Thư viện công thức hook + mẫu tiêu đề video; CHỈ dùng để đối chiếu, không dùng như template điền vào
- `references/quy-trinh-video.md` — Quy trình kịch bản video ngắn, video dài và podcast chi tiết
- `references/quy-trinh-bai-dai.md` — Công Thức Viết Bài Viral + Chuyên Môn (9 nguyên lý cốt lõi + cấu trúc 8 lớp A→H + checklist 9 điểm); BẮT BUỘC đọc khi nhận lệnh `viết bài dài`
