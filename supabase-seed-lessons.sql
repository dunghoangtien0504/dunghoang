-- ═══════════════════════════════════════════════════════════════════
-- DungHoang.com — Seed đủ 24 lessons Khóa 1 + 25 lessons Khóa 2
-- Chạy sau supabase-schema-portal.sql + supabase-schema-challenge-portal.sql
-- ═══════════════════════════════════════════════════════════════════

-- Xóa sample lessons cũ trước khi seed đúng
delete from lessons where course_id in ('mini_368','khoa1_686','khoa2_2768','content_368');

-- ─── MINI (686.868đ) — chỉ 2 skill: BRAND_DNA + Landing Page ────────────────
insert into lessons (course_id, title, description, sort_order, is_free, duration) values
('mini_368', 'Chào mừng — Cách học hiệu quả nhất',
 'Skill này làm gì: Giải thích luồng học và tư duy AI-First.
Bạn không phải là người thực thi — bạn là người ra lệnh và kiểm duyệt.
AI làm phần kỹ thuật và viết chữ. Bạn đọc lại và quyết định.

Kết quả cần đạt:
- Hiểu tư duy AI-First trước khi bắt đầu
- Biết sẽ làm được gì sau 2 skill này

Hãy bắt đầu với Skill 02 BRAND_DNA ngay sau khi xem bài này.',
 1, true, 5),

('mini_368', 'Skill 02 — Giọng Văn Thương Hiệu (BRAND_DNA)',
 'Skill này làm gì:
Dạy AI học đúng giọng viết của bạn. Sau bước này, mọi bài AI viết sẽ nghe như chính bạn viết.

Output bạn cầm được:
File BRAND_DNA dán vào AI 1 lần, dùng mãi cho tất cả skill viết chữ.

Tự động tới đâu:
AI hỏi bạn vài câu về giọng văn, câu chuyện, khách hàng → tổng hợp thành file BRAND_DNA.
Bạn đọc lại, chỉnh chỗ nào chưa giống mình.

SOP từng bước:
1. Mở Claude hoặc ChatGPT
2. Paste prompt BRAND_DNA (trong tài liệu kèm theo)
3. Trả lời 8 câu hỏi AI đặt ra — trả lời thật, không cần văn vẻ
4. AI tổng hợp ra file BRAND_DNA
5. Đọc lại, chỉnh chỗ nào chưa đúng giọng
6. Lưu file này — đây là "bộ nhớ giọng văn" của bạn

Gợi ý từ Dũng:
Bước quan trọng nhất là trả lời thật, kể cả chuyện bạn từng vấp. AI viết hay nhất khi có chất liệu thật.',
 2, false, 25),

('mini_368', 'Skill 10 — Dựng Landing Page Trong 1 Buổi',
 'Skill này làm gì:
Tạo trang bán hàng hoàn chỉnh theo cấu trúc chuyển đổi cao, không cần code.

Output bạn cầm được:
Một trang bán hàng thật đang chạy được, dùng được ngay.

Tự động tới đâu:
AI viết toàn bộ chữ + cấu trúc 15 section. Bạn lắp vào công cụ (Antigravity hoặc tương tự) và đăng.

SOP từng bước:
1. Chuẩn bị: mở file BRAND_DNA (từ Skill 02)
2. Paste BRAND_DNA vào AI rồi nói: "Tôi muốn làm landing page cho [sản phẩm/dịch vụ]"
3. AI hỏi thêm về: pain khách, kết quả bạn hứa, giá, bảo hành — trả lời đủ
4. AI viết 15 section hoàn chỉnh
5. Đọc lại từng section, chỉnh chỗ nào chưa đúng với thực tế
6. Mở Antigravity AI → tạo trang mới → paste từng section vào
7. Xem trước trên điện thoại — 90% khách VN xem bằng phone
8. Chỉnh màu, font nếu cần → publish → lấy link

Gợi ý từ Dũng:
Đừng cố viết hoàn hảo từ đầu. Chạy trang "đủ tốt" rồi cải thiện dần theo phản hồi thật.',
 3, false, 45);

-- ─── KHÓA 1 (868.686đ) — 24 skill (trừ #23) ─────────────────────────────────

insert into lessons (course_id, title, description, sort_order, is_free, duration) values

-- Bài mở đầu
('khoa1_686', 'Chào mừng — Tư Duy AI-First Trước Khi Bắt Đầu',
 'Bức tranh toàn cảnh 24 skill và cách chúng kết nối thành một hệ thống bán hàng tự chạy.

Tư duy cốt lõi:
Bạn là người ra lệnh và kiểm duyệt. AI là nhân viên thực thi.
Đừng cố "học" AI — hãy cố "giao việc" cho AI.

Thứ tự học hợp lý:
Nhóm Nền Tảng (01-04) → Nhóm Chiến Lược (05-07) → Phễu & Trang Bán (08-12) → Viết Chữ (13-17) → Sản Xuất Nội Dung (18-21) → Tự Động Hóa (22, 24, 25)

Gợi ý từ Dũng:
Học 1 skill → làm thử ngay → thấy kết quả → học skill tiếp. Không nên xem hết một lúc.',
 1, true, 10),

-- NHÓM 1: NỀN TẢNG
('khoa1_686', 'Skill 01 — Chân Dung Khách Hàng',
 'Skill này làm gì:
Phân tích để biết khách của bạn là ai, đang đau điều gì, muốn gì, hay nói câu gì.

Output bạn cầm được:
Bản mô tả khách hàng chi tiết dùng cho mọi bài viết và quảng cáo sau này.

Tự động tới đâu:
AI hỏi bạn vài câu rồi tổng hợp. Bạn vẫn cần biết khách thật của mình — AI không đoán được.

SOP từng bước:
1. Mở Claude/ChatGPT, paste prompt Avatar Builder (trong tài liệu)
2. Trả lời: bạn đang bán gì, khách là ai, họ hay phàn nàn gì nhất
3. AI đặt thêm 8 câu hỏi — trả lời thật, cụ thể
4. AI tổng hợp ra bản chân dung khách hàng
5. Đọc lại — chỉnh chỗ nào chưa đúng với khách thật bạn đang có
6. Lưu file này: dùng cho Skill 07, 09, 10, 13, 14, 15

Gợi ý từ Dũng:
Câu trả lời bạn hay thấy khách nói trong tin nhắn/comment là chất liệu quý nhất.',
 2, false, 30),

('khoa1_686', 'Skill 02 — Giọng Văn Thương Hiệu (BRAND_DNA)',
 'Skill này làm gì:
Dạy AI học đúng giọng viết của bạn. Sau bước này, bài AI viết nghe như chính bạn.

Output bạn cầm được:
File BRAND_DNA dán vào AI 1 lần, dùng mãi cho tất cả skill viết chữ.

Tự động tới đâu:
AI hỏi về giọng văn, câu chuyện, khách hàng → tổng hợp thành file.
Bạn đọc lại, chỉnh chỗ chưa giống mình.

SOP từng bước:
1. Mở AI → paste prompt BRAND_DNA
2. Trả lời 8 câu: giọng bạn thường dùng, câu chuyện thật của bạn, khách hàng bạn nói chuyện như thế nào
3. AI tổng hợp ra file BRAND_DNA
4. Test: dán BRAND_DNA vào AI rồi nói "viết 1 đoạn giới thiệu về tôi" — xem có giống giọng bạn không
5. Chỉnh thêm nếu chưa giống, test lại
6. Lưu file — đây là "bộ nhớ" của AI về bạn

Gợi ý từ Dũng:
Kể một chuyện bạn từng vấp ngã thật — AI sẽ học được giọng khiêm nhường, gần gũi mà không phải dạy đời.',
 3, false, 25),

('khoa1_686', 'Skill 03 — Tư Duy Offer Kiểu Hormozi',
 'Skill này làm gì:
Khung tư duy đóng gói và định giá sao cho giá trị cảm nhận cao hơn giá tiền.

Output bạn cầm được:
Cách nghĩ về offer + bảng tự chấm offer của bạn đang mạnh hay yếu.

Tự động tới đâu:
Đây là kiến thức + template. Bạn áp dụng vào sản phẩm của mình.

SOP từng bước:
1. Đọc khung Value Equation: Giá trị = (Kết quả mong muốn × Xác suất thành công) / (Thời gian × Công sức)
2. Áp vào sản phẩm hiện tại của bạn: điểm nào cao, điểm nào thấp
3. Paste vào AI: "Đây là sản phẩm của tôi: [mô tả]. Dùng Value Equation phân tích điểm mạnh yếu"
4. AI gợi ý cách tăng giá trị cảm nhận: thêm bonus, bảo hành, giảm thời gian, v.v.
5. Chọn 2-3 cải tiến khả thi nhất, áp vào offer
6. Dùng kết quả cho Skill 07 (Thiết Kế Offer)

Gợi ý từ Dũng:
Tăng "xác suất thành công" trong mắt khách (testimonial, cam kết, bảo hành) thường dễ hơn giảm giá.',
 4, false, 35),

('khoa1_686', 'Skill 04 — Tư Duy Vận Hành Một Mình',
 'Skill này làm gì:
Bộ khung làm việc cho người kinh doanh một mình: từ định hướng tới việc hằng ngày.

Output bạn cầm được:
Template lên kế hoạch, ưu tiên việc, review tuần.

Tự động tới đâu:
Kiến thức + template để bạn tự dùng. Không phải phần mềm chạy thay.

SOP từng bước:
1. Paste vào AI: "Tôi đang kinh doanh một mình với [mô tả business]. Liệt kê tất cả việc đang làm mỗi tuần"
2. AI giúp phân loại: Quan trọng-khẩn cấp / Quan trọng-không khẩn / Không quan trọng
3. Xác định 3 việc "needle mover" — việc nếu làm xong thì doanh thu tăng rõ nhất
4. Dùng template Weekly Review (trong tài liệu): mỗi chủ nhật review 15 phút
5. Đặt lịch lặp lại trên phone: Thứ 2 sáng — Top 3 việc tuần này là gì?

Gợi ý từ Dũng:
Làm một mình rất dễ bị hút vào việc bận mà không tạo ra tiền. Weekly Review giúp bạn nhận ra trước khi lãng phí cả tháng.',
 5, false, 30),

-- NHÓM 2: CHIẾN LƯỢC
('khoa1_686', 'Skill 05 — Cơ Chế Khác Biệt',
 'Skill này làm gì:
Đặt tên và hệ thống hóa cách bạn làm ra kết quả, để khách khó so giá với người khác.

Output bạn cầm được:
Tên cơ chế riêng + sơ đồ giải thích, dùng trong trang bán và quảng cáo.

Tự động tới đâu:
AI gợi ý nhiều phương án tên. Bạn chọn cái phù hợp nhất.

SOP từng bước:
1. Liệt kê: bạn làm gì khác so với người cùng ngành? (quy trình, thứ tự, công cụ, cam kết)
2. Paste vào AI: "Đây là cách tôi làm [kết quả] cho khách: [mô tả]. Đặt tên cho cơ chế này — gợi ý 5 tên khác nhau"
3. AI ra 5 tên — chọn 1-2 cái bạn thích nhất
4. Nhờ AI giải thích cơ chế đó trong 3 bước, dùng ngôn ngữ đơn giản
5. Vẽ sơ đồ đơn giản trên Canva (hoặc nhờ AI mô tả để bạn vẽ)
6. Dùng tên + sơ đồ này trong Skill 10 (Landing Page) và 13 (Ads)

Gợi ý từ Dũng:
Khi có tên riêng, khách hỏi "Cơ chế X là gì?" thay vì "Sao đắt vậy?". Đó là dấu hiệu của positioning tốt.',
 6, false, 40),

('khoa1_686', 'Skill 06 — Mô Hình Doanh Thu',
 'Skill này làm gì:
Vẽ bậc thang sản phẩm từ rẻ tới đắt để khách mua nhiều lần, tăng dần.

Output bạn cầm được:
Bản đồ các sản phẩm và mức giá — biết bán gì trước, bán gì sau.

Tự động tới đâu:
AI gợi ý mô hình. Bạn quyết giá và sản phẩm thật của mình.

SOP từng bước:
1. Paste vào AI: "Tôi đang bán [danh sách sản phẩm/dịch vụ hiện tại]. Giúp tôi vẽ bậc thang sản phẩm theo kiểu Value Ladder"
2. AI sắp xếp thành: Mồi miễn phí → Tripwire rẻ → Core offer → Upsell → VIP
3. Với mỗi bậc, AI gợi ý mức giá và loại sản phẩm phù hợp
4. Điền vào template Money Model (trong tài liệu)
5. Xác định: bậc nào đang thiếu trong business của bạn?
6. Dùng kết quả cho Skill 07 (Thiết Kế Offer) và 09 (Vẽ Phễu)

Gợi ý từ Dũng:
Đừng cố build hết ngay. Chọn 1 bậc đang thiếu quan trọng nhất rồi build cái đó trước.',
 7, false, 35),

('khoa1_686', 'Skill 07 — Thiết Kế Offer',
 'Skill này làm gì:
Build từng lời đề nghị khó từ chối: quà tặng, bảo hành, đảo ngược rủi ro.

Output bạn cầm được:
Một offer hoàn chỉnh sẵn để đưa lên trang bán.

Tự động tới đâu:
AI dựng khung offer. Bạn điền số liệu thật và cam kết thật của mình.

SOP từng bước:
1. Chọn 1 sản phẩm muốn build offer (bắt đầu với sản phẩm bán chạy nhất)
2. Paste vào AI: "Tôi bán [mô tả sản phẩm] giá [X]. Dùng khung Godfather Offer để build offer khó từ chối"
3. AI gợi ý 9 thành phần: tên offer, cam kết kết quả, bonus, bảo hành, khan hiếm, v.v.
4. Điền thông tin thật vào từng thành phần (không bịa số liệu)
5. AI viết lại offer dưới dạng ngôn ngữ bán hàng
6. Test bằng cách đọc cho 1 người ngoài nghe — họ có hỏi "đăng ký ở đâu?" không?

Gợi ý từ Dũng:
Bảo hành 14 ngày hoàn 100% thường tăng conversion hơn giảm giá 30%.',
 8, false, 45),

-- NHÓM 3: PHỄU & TRANG BÁN
('khoa1_686', 'Skill 08 — Mồi Miễn Phí Kéo Khách',
 'Skill này làm gì:
Nghĩ ra quà tặng miễn phí để khách lạ để lại liên hệ.

Output bạn cầm được:
Ý tưởng mồi + dàn ý nội dung để bạn làm (ebook, checklist, thử thách, video ngắn).

Tự động tới đâu:
AI ra ý tưởng và dàn ý. Bạn hoàn thiện nội dung mồi.

SOP từng bước:
1. Paste vào AI: "Tôi bán [sản phẩm/dịch vụ] cho [khách hàng]. Nghĩ ra 5 ý tưởng lead magnet miễn phí thu hút đúng tệp"
2. AI ra 5 ý tưởng — chọn cái vừa dễ làm vừa có giá trị thật với khách
3. Nhờ AI viết dàn ý chi tiết cho mồi đó
4. Dùng AI viết nội dung từng phần
5. Đóng gói thành PDF hoặc Google Doc chia sẻ được
6. Dùng mồi này trong Skill 09 (Phễu) và 12 (Opt-in page)

Gợi ý từ Dũng:
Mồi tốt nhất giải quyết được 1 vấn đề cụ thể trong 5-10 phút đọc, không phải cả cuốn sách.',
 9, false, 40),

('khoa1_686', 'Skill 09 — Vẽ Phễu Bán Hàng',
 'Skill này làm gì:
Vẽ đường đi của khách từ lúc thấy bạn tới lúc mua, từng bước nối nhau.

Output bạn cầm được:
Sơ đồ phễu để biết cần làm trang nào, email nào, theo thứ tự nào.

Tự động tới đâu:
AI vẽ bản đồ. Bạn dùng nó làm kim chỉ nam khi dựng hệ thống.

SOP từng bước:
1. Paste vào AI: "Traffic của tôi chủ yếu từ [Facebook/TikTok/zalo/giới thiệu]. Sản phẩm chính giá [X]. Vẽ phễu bán hàng phù hợp"
2. AI vẽ phễu theo nhiệt độ traffic: Cold/Warm/Hot
3. Xác định điểm rò rỉ hiện tại: khách hay thoát ở đâu nhất?
4. AI gợi ý cách vá từng điểm rò rỉ
5. Lên kế hoạch build từng bước: trang nào làm trước, trang nào làm sau
6. Dùng sơ đồ này để biết skill nào cần học tiếp theo

Gợi ý từ Dũng:
Đừng cố dựng phễu hoàn hảo 10 bước. Phễu 3 bước chạy được còn tốt hơn phễu 10 bước chỉ trên giấy.',
 10, false, 35),

('khoa1_686', 'Skill 10 — Dựng Landing Page',
 'Skill này làm gì:
Tạo trang bán hàng hoàn chỉnh theo cấu trúc chuyển đổi cao, không cần code.

Output bạn cầm được:
Một trang bán hàng thật đang chạy được, dùng được ngay.

Tự động tới đâu:
AI viết toàn bộ chữ + cấu trúc 15 section. Bạn lắp vào Antigravity hoặc công cụ tương tự và đăng.

SOP từng bước:
1. Chuẩn bị: file BRAND_DNA (Skill 02), bản offer (Skill 07), sơ đồ phễu (Skill 09)
2. Paste vào AI: "[BRAND_DNA] + [Offer] — Viết landing page 15 section cho sản phẩm này"
3. AI viết từng section: Hero, Pain, Bridge, Features, Pricing, FAQ, CTA…
4. Đọc lại từng section — chỉnh chỗ nào chưa đúng thực tế
5. Mở Antigravity AI → tạo trang mới → paste từng section
6. Xem trước trên điện thoại, chỉnh UI nếu cần
7. Publish → copy link → test bằng cách gửi cho người thật xem

Gợi ý từ Dũng:
Section Pain là quan trọng nhất. Nếu khách đọc tới đó mà gật đầu, họ sẽ đọc tiếp.',
 11, false, 60),

('khoa1_686', 'Skill 11 — Làm Đẹp Giao Diện',
 'Skill này làm gì:
Chỉnh trang cho đẹp, dễ đọc, nhanh, chuẩn điện thoại.

Output bạn cầm được:
Hướng dẫn màu, font, bố cục để trang nhìn chuyên nghiệp.

Tự động tới đâu:
Là bộ nguyên tắc + gợi ý cụ thể. Bạn áp vào trang của mình.

SOP từng bước:
1. Chụp ảnh màn hình trang hiện tại, paste vào AI: "Trang này có vấn đề gì về visual?"
2. AI chỉ ra: font khó đọc, màu sắc lộn xộn, CTA không nổi bật…
3. Áp nguyên tắc 3 màu: 1 màu nền chính + 1 màu nhấn CTA + 1 màu text
4. Nguyên tắc font: tối đa 2 font, heading đậm, body nhẹ
5. Kiểm tra mobile: text ≥16px, button ≥48px chiều cao, khoảng trắng thoải mái
6. Dùng AI để viết lại section nào đang dài quá hoặc đặc chữ quá

Gợi ý từ Dũng:
90% khách VN xem trên điện thoại. Trang đẹp trên máy tính nhưng khó đọc trên phone = mất đơn.',
 12, false, 30),

('khoa1_686', 'Skill 12 — Viết Bài SEO',
 'Skill này làm gì:
Viết bài chuẩn Google để khách tự tìm tới mà không tốn tiền quảng cáo.

Output bạn cầm được:
Bài viết SEO sẵn dạng text để đăng lên website/blog.

Tự động tới đâu:
AI viết bài hoàn chỉnh. Bạn đăng và theo dõi thứ hạng.

SOP từng bước:
1. Xác định từ khóa: "Tôi bán [sản phẩm] — khách của tôi hay search gì trên Google?"
2. AI gợi ý 10 từ khóa dài (long-tail) ít cạnh tranh hơn
3. Chọn 1 từ khóa → AI viết outline bài SEO: tiêu đề H1, H2, H3
4. AI viết toàn bộ bài (1500-2000 từ) theo outline
5. Chỉnh cho tự nhiên hơn, thêm thông tin thật/ví dụ thật của bạn
6. Đăng lên website, theo dõi thứ hạng sau 2-4 tuần

Gợi ý từ Dũng:
1 bài SEO tốt có thể kéo khách về mãi mãi. Đừng bỏ qua chỉ vì không thấy kết quả ngay.',
 13, false, 40),

-- NHÓM 4: VIẾT CHỮ BÁN HÀNG
('khoa1_686', 'Skill 13 — Quảng Cáo Facebook/TikTok',
 'Skill này làm gì:
Viết copy quảng cáo nhiều góc độ để test xem cái nào ra đơn rẻ.

Output bạn cầm được:
Nhiều mẫu quảng cáo sẵn để chạy ads hoặc đăng bài organic.

Tự động tới đâu:
AI viết mẫu. Bạn chọn, chạy thử, giữ mẫu nào hiệu quả.

SOP từng bước:
1. Chuẩn bị BRAND_DNA + mô tả chân dung khách (Skill 01)
2. Paste vào AI: "Viết 3 mẫu quảng cáo cho [sản phẩm] theo 3 góc: (a) kể chuyện, (b) pain trực tiếp, (c) kết quả cụ thể"
3. AI viết 3 mẫu, mỗi mẫu: hook mạnh → body → CTA
4. Đọc lại — chỉnh chỗ nào không đúng thực tế
5. Test: chạy A/B giữa 2 mẫu với budget nhỏ (50-100k/ngày)
6. Giữ mẫu thắng, nhờ AI viết thêm biến thể của mẫu đó

Gợi ý từ Dũng:
Hook (câu đầu tiên) quyết định 80% hiệu quả. Dành nhiều thời gian nhất cho dòng đầu tiên.',
 14, false, 45),

('khoa1_686', 'Skill 14 — Kịch Bản Video Bán Hàng',
 'Skill này làm gì:
Viết kịch bản video từ câu hook đầu tới lời kêu gọi cuối, có gợi ý hình ảnh.

Output bạn cầm được:
Kịch bản video sẵn để quay hoặc dựng slide.

Tự động tới đâu:
AI viết script. Bạn quay/dựng và đăng.

SOP từng bước:
1. Xác định: video này cho platform nào (TikTok/Reels 60-90s hay YouTube 5-10p)?
2. Paste vào AI: "Viết kịch bản video [độ dài] giới thiệu [sản phẩm] cho [khách hàng]. Bắt đầu bằng hook mạnh"
3. AI viết: Hook → Vấn đề → Giải pháp → Proof → CTA → kèm gợi ý hình ảnh từng đoạn
4. Đọc to kịch bản — nghe có tự nhiên không? Chỉnh chỗ nào gượng
5. Quay hoặc dựng slide theo kịch bản
6. Edit, thêm caption, đăng

Gợi ý từ Dũng:
Người xem quyết định dừng hay tiếp tục trong 3 giây đầu. Hook phải gây tò mò ngay lập tức.',
 15, false, 45),

('khoa1_686', 'Skill 15 — Chuỗi Email Bán Hàng',
 'Skill này làm gì:
Viết chuỗi email nuôi dưỡng và chốt sau khi khách để lại email.

Output bạn cầm được:
Bộ email sẵn để dán vào công cụ gửi email tự động.

Tự động tới đâu:
AI viết nội dung. Bạn cài lịch gửi tự động trên công cụ email (Mailchimp, ConvertKit, v.v.).

SOP từng bước:
1. Xác định: khách vừa để lại email để nhận gì (mồi miễn phí từ Skill 08)?
2. Paste vào AI: "Viết chuỗi 5 email cho người vừa nhận [mồi]. Email 1: chào + giao mồi. Email 2-4: nuôi dưỡng. Email 5: chào mua"
3. AI viết 5 email theo trình tự
4. Chỉnh cho đúng giọng (dùng BRAND_DNA)
5. Tạo tài khoản Mailchimp (miễn phí) → tạo automation → dán 5 email vào
6. Test: gửi cho email của mình trước, xem có lỗi format không

Gợi ý từ Dũng:
Email nuôi dưỡng (email 2-4) là nơi khách quyết định tin bạn hay không. Chia sẻ thật, không chỉ bán.',
 16, false, 50),

('khoa1_686', 'Skill 16 — Vớt Khách Nguội',
 'Skill này làm gì:
Viết email/tin nhắn nhắc lại cho người từng quan tâm nhưng chưa mua.

Output bạn cầm được:
Bộ tin nhắn vớt khách sẵn để gửi.

Tự động tới đâu:
AI viết. Bạn gửi cho danh sách khách cũ.

SOP từng bước:
1. Tập hợp danh sách: ai đã hỏi/like/comment nhưng chưa mua trong 30-90 ngày qua
2. Paste vào AI: "Viết 3 tin nhắn vớt khách nguội cho [sản phẩm]. Giọng tâm sự, không bán cứng"
3. AI viết 3 mẫu: mẫu 1 nhắc nhẹ, mẫu 2 hỏi thăm, mẫu 3 offer đặc biệt
4. Chọn mẫu phù hợp với từng nhóm khách
5. Gửi thủ công hoặc qua Zalo/Messenger — đừng dùng tool spam
6. Theo dõi ai phản hồi — chuyển sang chăm sóc cá nhân

Gợi ý từ Dũng:
Đừng gửi kiểu "Em nhắc lại offer". Hỏi thăm thật, hỏi họ đang gặp vấn đề gì — đó mới là vớt khách.',
 17, false, 35),

('khoa1_686', 'Skill 17 — Kịch Bản Gọi Chốt Đơn',
 'Skill này làm gì:
Script gọi điện tư vấn và chốt: từ mở đầu, hỏi nhu cầu, tới báo giá tự tin.

Output bạn cầm được:
Kịch bản gọi điện + cách xử lý từ chối.

Tự động tới đâu:
Script để bạn dùng khi gọi khách. Phần nói chuyện là bạn.

SOP từng bước:
1. Paste vào AI: "Viết script gọi điện chốt đơn cho [sản phẩm giá X]. Khách là [mô tả]. Mục tiêu: đặt lịch tư vấn / chốt ngay"
2. AI viết script: Mở đầu → Hỏi tình huống → Xác nhận vấn đề → Giới thiệu giải pháp → Báo giá → Xử lý từ chối → Chốt
3. Luyện đọc to 3 lần trước khi gọi thật
4. Thêm phần xử lý các từ chối hay gặp nhất (AI gợi ý từ chối phổ biến cho ngành bạn)
5. Gọi thật → ghi âm (nếu được phép) → nghe lại → cải thiện script

Gợi ý từ Dũng:
Câu quan trọng nhất là câu hỏi: "Nếu giải quyết được vấn đề X, điều đó có ý nghĩa gì với bạn?" Để khách tự nói giá trị.',
 18, false, 40),

-- NHÓM 5: SẢN XUẤT NỘI DUNG
('khoa1_686', 'Skill 18 — Hệ Thống Content Đa Kênh',
 'Skill này làm gì:
Sản xuất bài dài, bài viral, kịch bản và nhân 1 nội dung thành nhiều dạng.

Output bạn cầm được:
Lịch content + bài viết sẵn cho Facebook/TikTok/YouTube.

Tự động tới đâu:
AI viết theo giọng bạn (cần BRAND_DNA từ Skill 02). Bạn duyệt rồi đăng.

SOP từng bước:
1. Chuẩn bị BRAND_DNA + chủ đề muốn làm content tháng này
2. Paste vào AI: "Lên lịch content 30 ngày cho [chủ đề] gồm: Facebook dài, TikTok ngắn, email. Tỷ lệ 40% giá trị, 30% câu chuyện, 20% cảm hứng, 10% bán hàng"
3. AI lên lịch 30 bài theo cấu trúc
4. Chọn 5 bài quan trọng nhất → nhờ AI viết full
5. Đọc lại, chỉnh giọng, đăng
6. Nhân 1 bài dài thành: short-form video + carousel + email (AI làm được)

Gợi ý từ Dũng:
Đừng viết mới 100% mỗi ngày. 1 bài hay nhân ra 7 dạng khác nhau tiết kiệm thời gian gấp 7 lần.',
 19, false, 50),

('khoa1_686', 'Skill 19 — Marketing Việt Nam',
 'Skill này làm gì:
Bộ khung marketing cho người Việt: bài social, ad, video, email, ra mắt sản phẩm.

Output bạn cầm được:
Framework điền vào là có nội dung đúng nền tảng VN.

Tự động tới đâu:
Kiến thức + template. Bạn áp dụng cho ngành của mình.

SOP từng bước:
1. Đọc tài liệu "5 đặc điểm người mua VN" (trong phần tài liệu)
2. Áp framework vào 1 chiến dịch cụ thể bạn đang cần làm
3. Paste vào AI: "Tôi cần ra mắt [sản phẩm] cho khách VN [mô tả]. Dùng framework marketing VN để lên kế hoạch"
4. AI lên kế hoạch theo đặc thù VN: Zalo, Facebook, community, word-of-mouth
5. Xác định kênh nào phù hợp nhất với business bạn
6. Làm 1 chiến dịch nhỏ để test trước khi scale

Gợi ý từ Dũng:
Khách VN tin người thật, tin cộng đồng hơn tin quảng cáo. Social proof và word-of-mouth mạnh hơn nhiều so với copy hay.',
 20, false, 40),

('khoa1_686', 'Skill 20 — Carousel Instagram',
 'Skill này làm gì:
Lên bài nhiều slide dạy hoặc kể chuyện, kèm caption và hashtag.

Output bạn cầm được:
Nội dung từng slide + caption sẵn để thiết kế và đăng.

Tự động tới đâu:
AI viết nội dung slide. Bạn thiết kế trên Canva và đăng.

SOP từng bước:
1. Chọn chủ đề carousel: tips ngắn gọn, câu chuyện thật, hoặc so sánh trước/sau
2. Paste vào AI: "Viết carousel 7 slide về [chủ đề]. Slide 1: hook gây tò mò. Slide 2-6: nội dung. Slide 7: CTA"
3. AI viết text từng slide (ngắn, tối đa 30-50 chữ/slide)
4. AI viết caption + 15-20 hashtag phù hợp
5. Mở Canva → dùng template carousel → điền text
6. Xuất PNG → đăng Instagram/Facebook

Gợi ý từ Dũng:
Slide đầu tiên là thứ khách thấy trong feed. Nếu không gây tò mò ngay — họ lướt qua. Đầu tư nhiều nhất vào slide 1.',
 21, false, 35),

('khoa1_686', 'Skill 21 — Tiêu Đề Thu Hút',
 'Skill này làm gì:
Tạo 10 tiêu đề mỗi lần theo nhiều kiểu: câu hỏi, số liệu, tò mò, list, story.

Output bạn cầm được:
Danh sách tiêu đề để chọn cái hay nhất cho mỗi bài.

Tự động tới đâu:
AI ra 10 tiêu đề/lần. Bạn chọn và dùng.

SOP từng bước:
1. Xác định: bài này nói về chủ đề gì, đọc xong khách được gì?
2. Paste vào AI: "Viết 10 tiêu đề cho bài [chủ đề]. Theo 5 công thức: câu hỏi / số liệu / tò mò / danh sách / câu chuyện"
3. AI ra 10 tiêu đề theo 5 kiểu khác nhau
4. Chọn 2-3 cái hay nhất — đọc to, nghe có kéo bạn muốn đọc tiếp không?
5. Test: nếu đang chạy ads, A/B test tiêu đề
6. Lưu tiêu đề tốt vào một file — dần dần tích lũy thành kho hook riêng

Gợi ý từ Dũng:
Dành 10 phút mỗi sáng để viết 10 tiêu đề cho bài hôm nay. Sau 30 ngày bạn có kho 300 tiêu đề.',
 22, false, 25),

-- NHÓM 6: TỰ ĐỘNG HÓA (trừ #23)
('khoa1_686', 'Skill 22 — Chatbot Messenger & Instagram',
 'Skill này làm gì:
Cấu hình trợ lý AI trả lời khách tự động trên Messenger/Instagram của Page bạn.

Output bạn cầm được:
Bản đặc tả copy-paste vào Meta Business Suite để bot trả khách.

Tự động tới đâu:
Bot trả tự động phần lớn câu hỏi thường gặp. Câu khó chuyển cho bạn.
Cần có Page Facebook đang hoạt động.

SOP từng bước:
1. Paste vào AI: "Tôi bán [sản phẩm]. Viết kịch bản chatbot trả lời 10 câu hỏi hay gặp nhất"
2. AI viết 10 câu hỏi + trả lời tự động
3. Mở Meta Business Suite → Inbox → Tự động hóa
4. Tạo tự động hóa cho từng câu hỏi: khi khách nhắn "[từ khóa]" → bot trả "[nội dung]"
5. Thêm nút CTA ở cuối mỗi trả lời: "Xem thêm tại..." hoặc "Nhắn để được tư vấn"
6. Test bằng cách nhắn thử từ tài khoản cá nhân

Gợi ý từ Dũng:
Bot không cần trả lời được hết. Mục tiêu là xử lý 80% câu hỏi đơn giản để bạn tập trung vào 20% khách nghiêm túc.',
 23, false, 45),

('khoa1_686', 'Skill 24 — Nghiên Cứu Tài Liệu Bằng AI',
 'Skill này làm gì:
Đưa tài liệu vào AI để tóm tắt, hỏi đáp, tạo podcast/quiz/mindmap.

Output bạn cầm được:
Tóm tắt, quiz, mindmap... tạo từ tài liệu của bạn.

Tự động tới đâu:
Dùng NotebookLM (miễn phí của Google). Có hướng dẫn từng bước.

SOP từng bước:
1. Mở notebook.google.com → tạo notebook mới
2. Upload tài liệu: PDF, Google Doc, URL bài báo, YouTube video
3. Hỏi AI trong notebook: "Tóm tắt tài liệu này trong 10 điểm chính"
4. Tạo Audio Overview (podcast 2 người thảo luận về tài liệu) — dùng để nghe khi đi
5. Tạo Study Guide → Quiz để test hiểu biết
6. Dùng cho: nghiên cứu đối thủ, đọc sách nhanh, chuẩn bị bài dạy

Gợi ý từ Dũng:
Chụp màn hình hoặc paste transcript phỏng vấn khách vào đây — AI tóm tắt insight quan trọng nhất trong 2 phút.',
 24, false, 30),

('khoa1_686', 'Skill 25 — Trợ Lý AI Tiểu Hà Mã (Telegram)',
 'Skill này làm gì:
Trợ lý AI trên Telegram trả lời thắc mắc khi bạn học và làm, theo SOP của khóa.

Output bạn cầm được:
Một nơi hỏi 24/7 khi bị kẹt — không phải chờ.

Tự động tới đâu:
Khóa 1: hỏi-đáp khi học. Khóa 2: Dũng cài Tiểu Hà Mã riêng, kèm sát theo business của bạn.

Cách sử dụng:
1. Tham gia group Telegram của khóa (link trong email kích hoạt)
2. Tag @lungmatkp3_bot khi cần hỏi
3. Mô tả rõ bạn đang làm gì, đang kẹt ở bước nào
4. Bot trả lời và gợi ý bước tiếp theo
5. Nếu câu hỏi phức tạp, Dũng sẽ trả lời trực tiếp trong 24h

Gợi ý từ Dũng:
Hỏi cụ thể sẽ được trả lời cụ thể. "Bị kẹt" không đủ thông tin. "Tôi đang làm Skill 10, bước 5, AI viết ra [X] nhưng chưa đúng vì [Y]" — đó mới là câu hỏi bot có thể giúp được.',
 25, false, 15);

-- ─── KHÓA 2 (2.768.686đ) — đủ 25 skill ─────────────────────────────────────
-- Copy toàn bộ từ Khóa 1 + thêm Skill 23

insert into lessons (course_id, title, description, sort_order, is_free, duration)
select 'khoa2_2768', title, description, sort_order, is_free, duration
from lessons
where course_id = 'khoa1_686';

-- Thêm Skill 23 (chỉ có ở Khóa 2)
insert into lessons (course_id, title, description, sort_order, is_free, duration) values
('khoa2_2768', 'Skill 23 — Tự Build App Đăng Bài Facebook',
 'Skill này làm gì:
Hướng dẫn tự dựng app React đăng bài Facebook tự động dùng Cursor + Gemini API + Facebook API + Vercel.

Output bạn cầm được:
App đăng bài riêng deploy lên Vercel, kết nối Page của bạn.
Gõ chủ đề → AI viết đúng giọng → bấm 1 nút → lên Page.

Tự động tới đâu:
Sau khi cài xong: quy trình đăng bài gần như tự động (AI viết + 1 click đăng).
Nhưng quá trình cài: nhiều bước kỹ thuật — đây là lý do skill này chỉ có ở Khóa 2 (cần được kèm sát).

SOP từng bước (cần Dũng kèm):
1. Đăng ký Facebook Developer → tạo App → lấy Page Access Token
2. Cài Node.js và VS Code (hoặc Cursor) trên máy
3. Mở Cursor → dùng AI trong Cursor để viết code app React
4. Kết nối Gemini API (miễn phí) để AI viết bài
5. Test local: chạy app trên máy, thử đăng 1 bài
6. Deploy lên Vercel (miễn phí) → app chạy trên cloud
7. Dùng app: nhập chủ đề → AI viết theo BRAND_DNA → bấm "Đăng" → lên Page

Lưu ý:
Skill này yêu cầu Facebook Page hợp lệ, không vi phạm chính sách.
Token Facebook cần gia hạn định kỳ. Dũng hướng dẫn cách tự gia hạn.',
 26, false, 120);

-- ─── CONTENT SYSTEM (368.686đ) — bàn giao Notion workspace ──────────────────
insert into lessons (course_id, title, description, sort_order, is_free, duration) values

('content_368', 'Chào mừng — Cách nhận và setup Notion Workspace',
 'Bạn vừa nhận được link Notion trong email.

Bước đầu tiên:
1. Mở email → click link Notion
2. Bấm "Duplicate" góc phải trên → chọn workspace của bạn
3. Workspace đã về tài khoản bạn — miễn phí, không cần trả tiền thêm

Cấu trúc workspace gồm 8 thành phần:
- Brand DNA + Story Bank
- The Dream (kho chất liệu)
- Hook Library
- Content Calendar + Analytics
- AI Commands (gõ "viết bài", "phân tích", "đẩy vào calendar")
- Visual Brief 7 mục
- Quy trình nhân bản (1 bài → 7+ biến thể)
- Ma trận content 40/30/20/10%

Bắt đầu với Brand DNA ngay — đây là bước quan trọng nhất.',
 1, true, 10),

('content_368', 'Bước 1 — Điền Brand DNA',
 'Brand DNA là "bộ nhớ giọng văn" của bạn.
AI sẽ đọc đây trước khi viết bất kỳ bài nào.

Cách điền:
1. Mở trang Brand DNA trong workspace
2. Điền lần lượt: Tôi là ai, Tôi làm gì, Khách hàng của tôi là ai
3. Giọng văn: bạn hay dùng từ ngữ nào, câu nào KHÔNG bao giờ dùng
4. Câu chuyện thật: 1 lần thất bại + 1 lần thành công liên quan tới sản phẩm
5. Test: paste Brand DNA vào AI, nói "viết 1 đoạn giới thiệu về tôi" → nghe có giống giọng bạn không?
6. Chỉnh đến khi nghe giống

Lưu ý:
Điền thật, không cần hay. AI làm hay từ chất liệu thật của bạn.
Viết kiểu "kể chuyện bạn thân" — không cần văn phong professional.',
 2, false, 20),

('content_368', 'Bước 2 — Thu thập chất liệu vào The Dream',
 'The Dream là nơi tích lũy "kho chất liệu" để không bao giờ cạn ý tưởng.

Cách dùng:
1. Thấy bài hay trên Facebook/TikTok → copy link + text vào The Dream
2. Mỗi ngày thêm 2-3 bài vào (mất 5 phút)
3. Gõ "phân tích" vào AI → AI đọc bài, rút công thức hook, đánh Viral Score
4. AI tự thêm hook hay vào Hook Library

Quy tắc chọn bài để thêm:
- Bài có nhiều tương tác hơn bình thường
- Bài ngành tương tự (không nhất thiết phải cùng ngành)
- Bài bạn đọc xong muốn chia sẻ ngay

Gợi ý từ Dũng:
Mỗi sáng dành 5 phút lướt feed và thêm 2-3 bài vào The Dream.
Sau 30 ngày bạn có kho 60-90 bài để AI học từ đó.',
 3, false, 15),

('content_368', 'Bước 3 — Viết bài đầu tiên bằng AI Commands',
 'Đây là bước bạn sẽ thấy hệ thống hoạt động thật.

Cách dùng AI Commands:
1. Mở AI (Claude hoặc ChatGPT)
2. Paste Brand DNA vào đầu
3. Gõ: "viết bài"
4. AI hỏi 3 câu: loại bài, chủ đề, CTA muốn dùng
5. Trả lời → AI viết xong toàn bài theo đúng giọng bạn
6. Đọc lại, chỉnh 1-2 chỗ nếu cần → đăng

Tổng thời gian: 15-20 phút/bài

Sau khi có bài:
Gõ "đẩy vào calendar" → AI tạo mục trong Content Calendar, tạo Visual Brief 7 mục cho designer.',
 4, false, 20),

('content_368', 'Bước 4 — Nhân bản 1 bài thành 7+ biến thể',
 'Không cần nghĩ ý tưởng mới mỗi ngày.

Cách nhân bản:
1. Có 1 bài viết đã đăng (hoặc bài AI vừa viết)
2. Paste vào AI + gõ: "nhân bản"
3. AI tạo 7-10 phiên bản từ cùng 1 nội dung: kể chuyện / phản biện / số liệu / danh sách / carousel / video script / email
4. Chọn 2-3 biến thể phù hợp nhất với lịch tuần
5. Gõ "đẩy vào calendar" → AI sắp lịch luôn

Tỷ lệ vàng 40/30/20/10:
- 40% bài viral (tips, câu chuyện, tò mò)
- 30% bài chuyên môn (kiến thức, hướng dẫn)
- 20% bài cảm hứng (động lực, góc nhìn)
- 10% bài bán hàng (offer, testimonial)

AI tự kiểm tra tỷ lệ và nhắc khi bạn lệch quá nhiều sang 1 kiểu.',
 5, false, 20),

('content_368', 'Bước 5 — Chủ nhật: Báo cáo tuần và lên kế hoạch',
 'Mỗi chủ nhật dành 15 phút review.

Quy trình review tuần:
1. Mở Content Calendar + Analytics
2. Gõ: "báo cáo tuần"
3. AI tổng hợp: bài nào reach cao nhất, bài nào thấp nhất, tổng số tương tác
4. AI phân tích: kiểu content nào đang hiệu quả nhất với tệp của bạn
5. Gõ: "kế hoạch tuần tới" → AI đề xuất chủ đề + lịch đăng cho 7 ngày
6. Bạn duyệt, chỉnh nếu cần → sang tuần chỉ việc thực hiện

Sau 4 tuần dùng:
Bạn sẽ biết được: kiểu bài nào khách của bạn thích nhất → tập trung nhân bản những kiểu đó.',
 6, false, 15);
