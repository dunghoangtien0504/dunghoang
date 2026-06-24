-- ══════════════════════════════════════════════════════════════════
-- Nâng cấp content_html cho 6 bài content_368
-- Chạy trên Supabase SQL Editor
-- ══════════════════════════════════════════════════════════════════

-- ─── BÀI 1: Chào mừng — Nhận Notion Workspace ───────────────────
UPDATE lessons SET content_html = $html$
<div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;background:#F6F0E4;min-height:100vh;padding:0 0 48px;">

  <!-- Header -->
  <div style="background:#0D2B1A;padding:28px 24px 24px;">
    <span style="display:inline-block;background:#1D9E75;color:#fff;font-size:11px;font-weight:700;letter-spacing:1.5px;padding:4px 10px;border-radius:4px;margin-bottom:12px;">BÀI MỞ ĐẦU · CONTENT SYSTEM</span>
    <h1 style="margin:0 0 6px;color:#F6F0E4;font-size:22px;font-weight:900;line-height:1.3;">Chào mừng bạn vào Content System</h1>
    <p style="margin:0;color:#F6F0E4;opacity:.7;font-size:14px;">Mình sẽ hướng dẫn bạn từng bước nhận Workspace Notion và bắt đầu đúng cách.</p>
  </div>

  <div style="max-width:680px;margin:0 auto;padding:24px 16px;">

    <!-- Output box -->
    <div style="background:#EAF5EF;border-left:4px solid #1D9E75;border-radius:0 12px 12px 0;padding:16px 20px;margin-bottom:20px;">
      <p style="margin:0 0 6px;font-size:12px;font-weight:700;letter-spacing:1px;color:#1D9E75;">KẾT QUẢ BÀI NÀY</p>
      <p style="margin:0;font-size:14px;color:#0D2B1A;">Bạn có Workspace Notion đang chạy trong tài khoản của mình. Brand DNA điền xong. Sẵn sàng viết bài đầu tiên.</p>
    </div>

    <!-- Notion access - nổi bật -->
    <div style="background:#fff;border:2px solid #1D9E75;border-radius:16px;padding:24px;margin-bottom:20px;">
      <p style="margin:0 0 4px;font-size:13px;font-weight:700;color:#1D9E75;letter-spacing:.5px;">BƯỚC 1 — NHẬN QUYỀN TRUY CẬP</p>
      <h2 style="margin:0 0 12px;font-size:18px;color:#0D2B1A;font-weight:800;">Gửi Gmail để được cấp quyền</h2>
      <p style="margin:0 0 12px;font-size:14px;color:#555;line-height:1.6;">Workspace Notion của bạn đang chờ. Mình cần email Gmail của bạn để cấp quyền truy cập. Chưa có Gmail thì tạo miễn phí trên Google.</p>
      <div style="background:#FFF8E6;border-left:3px solid #E8A020;border-radius:0 8px 8px 0;padding:12px 16px;margin-bottom:16px;">
        <p style="margin:0;font-size:13px;color:#7A5A00;"><strong>Gửi Gmail của bạn qua:</strong><br>
        Telegram: <a href="https://t.me/KentHoang" style="color:#0D2B1A;font-weight:700;">@KentHoang</a> &nbsp;·&nbsp; Zalo: <strong>0938725413</strong></p>
      </div>
      <p style="margin:0 0 10px;font-size:13px;color:#555;">Sau khi mình cấp quyền, bạn sẽ nhận được thông báo từ Notion. Click vào link này để mở Workspace:</p>
      <a href="https://app.notion.com/p/H-Th-ng-Content-System-9541c4caec0b833bb9e4017560b7512c?source=copy_link"
         target="_blank"
         style="display:inline-block;background:#0D2B1A;color:#F6F0E4;font-weight:700;font-size:14px;padding:12px 24px;border-radius:10px;text-decoration:none;">
        Mở Notion Workspace →
      </a>
    </div>

    <!-- AI transparency -->
    <div style="background:#FFF8E6;border-left:4px solid #E8A020;border-radius:0 12px 12px 0;padding:16px 20px;margin-bottom:20px;">
      <p style="margin:0 0 6px;font-size:12px;font-weight:700;letter-spacing:1px;color:#E8A020;">HỆ THỐNG NÀY LÀM GÌ</p>
      <p style="margin:0;font-size:14px;color:#3D2800;line-height:1.7;">
        <strong>AI làm:</strong> Viết bài theo đúng giọng bạn · Phân tích bài hay và rút công thức · Nhân 1 bài thành 7 dạng · Lên lịch content cả tuần · Báo cáo hiệu suất chủ nhật.<br><br>
        <strong>Bạn làm:</strong> Điền Brand DNA (1 lần) · Chọn chủ đề mỗi tuần · Đọc lại bài AI viết và duyệt · Đăng đúng giờ.
      </p>
    </div>

    <!-- Cấu trúc workspace -->
    <div style="background:#0D2B1A;border-radius:16px;padding:20px 24px;margin-bottom:20px;">
      <p style="margin:0 0 14px;font-size:13px;font-weight:700;color:#1D9E75;letter-spacing:1px;">WORKSPACE CÓ 8 PHẦN</p>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;">
        <div style="background:#ffffff12;border-radius:8px;padding:10px 12px;">
          <p style="margin:0;font-size:13px;color:#F6F0E4;font-weight:600;">01 Brand DNA</p>
          <p style="margin:4px 0 0;font-size:11px;color:#F6F0E4;opacity:.6;">Bộ nhớ giọng văn của bạn</p>
        </div>
        <div style="background:#ffffff12;border-radius:8px;padding:10px 12px;">
          <p style="margin:0;font-size:13px;color:#F6F0E4;font-weight:600;">02 Story Bank</p>
          <p style="margin:4px 0 0;font-size:11px;color:#F6F0E4;opacity:.6;">Kho chuyện thật của bạn</p>
        </div>
        <div style="background:#ffffff12;border-radius:8px;padding:10px 12px;">
          <p style="margin:0;font-size:13px;color:#F6F0E4;font-weight:600;">03 The Dream</p>
          <p style="margin:4px 0 0;font-size:11px;color:#F6F0E4;opacity:.6;">Tích lũy bài hay để AI học</p>
        </div>
        <div style="background:#ffffff12;border-radius:8px;padding:10px 12px;">
          <p style="margin:0;font-size:13px;color:#F6F0E4;font-weight:600;">04 Hook Library</p>
          <p style="margin:4px 0 0;font-size:11px;color:#F6F0E4;opacity:.6;">600+ mẫu tiêu đề đã phân tích</p>
        </div>
        <div style="background:#ffffff12;border-radius:8px;padding:10px 12px;">
          <p style="margin:0;font-size:13px;color:#F6F0E4;font-weight:600;">05 Content Calendar</p>
          <p style="margin:4px 0 0;font-size:11px;color:#F6F0E4;opacity:.6;">Lịch đăng + theo dõi reach</p>
        </div>
        <div style="background:#ffffff12;border-radius:8px;padding:10px 12px;">
          <p style="margin:0;font-size:13px;color:#F6F0E4;font-weight:600;">06 AI Commands</p>
          <p style="margin:4px 0 0;font-size:11px;color:#F6F0E4;opacity:.6;">3 lệnh chính: viết · nhân bản · báo cáo</p>
        </div>
        <div style="background:#ffffff12;border-radius:8px;padding:10px 12px;">
          <p style="margin:0;font-size:13px;color:#F6F0E4;font-weight:600;">07 Visual Brief</p>
          <p style="margin:4px 0 0;font-size:11px;color:#F6F0E4;opacity:.6;">7 mục cho designer/Canva</p>
        </div>
        <div style="background:#ffffff12;border-radius:8px;padding:10px 12px;">
          <p style="margin:0;font-size:13px;color:#F6F0E4;font-weight:600;">08 Ma Trận 40/30/20/10</p>
          <p style="margin:4px 0 0;font-size:11px;color:#F6F0E4;opacity:.6;">Tỷ lệ content cân bằng</p>
        </div>
      </div>
    </div>

    <!-- Mục tiêu checkpoints -->
    <div style="background:#fff;border:1px solid #E8E2D6;border-radius:16px;padding:20px 24px;margin-bottom:20px;">
      <p style="margin:0 0 14px;font-size:13px;font-weight:700;color:#0D2B1A;letter-spacing:.5px;">HOÀN THÀNH BÀI NÀY KHI</p>
      <div style="display:flex;flex-direction:column;gap:10px;">
        <div style="display:flex;align-items:flex-start;gap:10px;">
          <div style="width:20px;height:20px;background:#EAF5EF;border:2px solid #1D9E75;border-radius:50%;flex-shrink:0;margin-top:1px;"></div>
          <p style="margin:0;font-size:14px;color:#333;">Đã gửi Gmail cho Dũng qua Telegram hoặc Zalo</p>
        </div>
        <div style="display:flex;align-items:flex-start;gap:10px;">
          <div style="width:20px;height:20px;background:#EAF5EF;border:2px solid #1D9E75;border-radius:50%;flex-shrink:0;margin-top:1px;"></div>
          <p style="margin:0;font-size:14px;color:#333;">Đã mở được Workspace Notion trong tài khoản của bạn</p>
        </div>
        <div style="display:flex;align-items:flex-start;gap:10px;">
          <div style="width:20px;height:20px;background:#EAF5EF;border:2px solid #1D9E75;border-radius:50%;flex-shrink:0;margin-top:1px;"></div>
          <p style="margin:0;font-size:14px;color:#333;">Đã click qua 8 phần và biết từng phần làm gì</p>
        </div>
        <div style="display:flex;align-items:flex-start;gap:10px;">
          <div style="width:20px;height:20px;background:#EAF5EF;border:2px solid #1D9E75;border-radius:50%;flex-shrink:0;margin-top:1px;"></div>
          <p style="margin:0;font-size:14px;color:#333;">Đã mở trang Brand DNA và sẵn sàng điền (Bước 1 tiếp theo)</p>
        </div>
      </div>
    </div>

    <!-- Tip cuối -->
    <div style="background:#0D2B1A;border-radius:12px;padding:16px 20px;">
      <p style="margin:0 0 4px;font-size:12px;font-weight:700;color:#1D9E75;letter-spacing:1px;">GỢI Ý TỪ DŨNG</p>
      <p style="margin:0;font-size:14px;color:#F6F0E4;line-height:1.6;">Đừng cố đọc hết Workspace trong ngày đầu. Vào Brand DNA, điền xong, rồi thử viết 1 bài đầu tiên. Thấy AI viết đúng giọng mình là bạn sẽ hiểu hệ thống này hoạt động như thế nào.</p>
    </div>

  </div>
</div>
$html$ WHERE course_id = 'content_368' AND sort_order = 1;


-- ─── BÀI 2: Bước 1 — Điền Brand DNA ─────────────────────────────
UPDATE lessons SET content_html = $html$
<div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;background:#F6F0E4;min-height:100vh;padding:0 0 48px;">

  <div style="background:#0D2B1A;padding:28px 24px 24px;">
    <span style="display:inline-block;background:#1D9E75;color:#fff;font-size:11px;font-weight:700;letter-spacing:1.5px;padding:4px 10px;border-radius:4px;margin-bottom:12px;">BƯỚC 1 · CONTENT SYSTEM</span>
    <h1 style="margin:0 0 6px;color:#F6F0E4;font-size:22px;font-weight:900;line-height:1.3;">Điền Brand DNA — Bộ Nhớ Giọng Văn</h1>
    <p style="margin:0;color:#F6F0E4;opacity:.7;font-size:14px;">Làm 1 lần, dùng mãi. Đây là thứ khiến AI viết giống giọng bạn thay vì giống robot.</p>
  </div>

  <div style="max-width:680px;margin:0 auto;padding:24px 16px;">

    <div style="background:#EAF5EF;border-left:4px solid #1D9E75;border-radius:0 12px 12px 0;padding:16px 20px;margin-bottom:20px;">
      <p style="margin:0 0 6px;font-size:12px;font-weight:700;letter-spacing:1px;color:#1D9E75;">BẠN CẦM ĐƯỢC GÌ</p>
      <p style="margin:0;font-size:14px;color:#0D2B1A;">File Brand DNA điền đầy đủ trong Notion. Từ bài này trở đi, AI viết đúng giọng bạn mà không cần giải thích lại từ đầu.</p>
    </div>

    <div style="background:#FFF8E6;border-left:4px solid #E8A020;border-radius:0 12px 12px 0;padding:16px 20px;margin-bottom:20px;">
      <p style="margin:0 0 6px;font-size:12px;font-weight:700;letter-spacing:1px;color:#E8A020;">AI LÀM GÌ · BẠN LÀM GÌ</p>
      <p style="margin:0;font-size:14px;color:#3D2800;line-height:1.7;"><strong>Bạn điền:</strong> Câu trả lời thật về bản thân — giọng văn, câu chuyện, điều không bao giờ nói.<br><strong>AI dùng:</strong> Brand DNA như "bộ lọc" để mọi bài viết ra đều đúng chất bạn.</p>
    </div>

    <!-- Steps -->
    <div style="display:flex;flex-direction:column;gap:12px;margin-bottom:20px;">

      <div style="background:#fff;border:1px solid #E8E2D6;border-radius:14px;overflow:hidden;">
        <div style="background:#0D2B1A;padding:10px 16px;">
          <p style="margin:0;font-size:12px;font-weight:700;color:#F6F0E4;letter-spacing:.5px;">BƯỚC 1</p>
          <p style="margin:2px 0 0;font-size:14px;color:#F6F0E4;font-weight:600;">Mở trang Brand DNA trong Workspace</p>
        </div>
        <div style="padding:14px 16px;">
          <p style="margin:0;font-size:13px;color:#444;line-height:1.6;">Vào Notion Workspace → click vào mục "01 Brand DNA". Trang này có sẵn các ô để điền, không cần tạo mới.</p>
        </div>
      </div>

      <div style="background:#fff;border:1px solid #E8E2D6;border-radius:14px;overflow:hidden;">
        <div style="background:#0D2B1A;padding:10px 16px;">
          <p style="margin:0;font-size:12px;font-weight:700;color:#F6F0E4;letter-spacing:.5px;">BƯỚC 2</p>
          <p style="margin:2px 0 0;font-size:14px;color:#F6F0E4;font-weight:600;">Điền 4 phần chính</p>
        </div>
        <div style="padding:14px 16px;">
          <p style="margin:0 0 10px;font-size:13px;color:#444;line-height:1.6;">Điền theo thứ tự này:</p>
          <div style="display:flex;flex-direction:column;gap:8px;">
            <div style="background:#F6F0E4;border-radius:8px;padding:10px 12px;">
              <p style="margin:0 0 2px;font-size:12px;font-weight:700;color:#0D2B1A;">TÔI LÀ AI</p>
              <p style="margin:0;font-size:12px;color:#666;">Tên · Nghề nghiệp thật · Đang làm gì · Đã từng làm gì</p>
            </div>
            <div style="background:#F6F0E4;border-radius:8px;padding:10px 12px;">
              <p style="margin:0 0 2px;font-size:12px;font-weight:700;color:#0D2B1A;">GIỌNG VĂN</p>
              <p style="margin:0;font-size:12px;color:#666;">Từ hay dùng · Từ không bao giờ dùng · Câu bạn hay bắt đầu · Cảm giác muốn người đọc có</p>
            </div>
            <div style="background:#F6F0E4;border-radius:8px;padding:10px 12px;">
              <p style="margin:0 0 2px;font-size:12px;font-weight:700;color:#0D2B1A;">KHÁCH HÀNG</p>
              <p style="margin:0;font-size:12px;color:#666;">Họ là ai · Hay nói câu gì · Đang đau điều gì · Muốn gì nhất</p>
            </div>
            <div style="background:#F6F0E4;border-radius:8px;padding:10px 12px;">
              <p style="margin:0 0 2px;font-size:12px;font-weight:700;color:#0D2B1A;">CÂU CHUYỆN THẬT</p>
              <p style="margin:0;font-size:12px;color:#666;">1 lần thất bại liên quan tới ngành · 1 lần thành công cụ thể</p>
            </div>
          </div>
        </div>
      </div>

      <div style="background:#fff;border:1px solid #E8E2D6;border-radius:14px;overflow:hidden;">
        <div style="background:#0D2B1A;padding:10px 16px;">
          <p style="margin:0;font-size:12px;font-weight:700;color:#F6F0E4;letter-spacing:.5px;">BƯỚC 3</p>
          <p style="margin:2px 0 0;font-size:14px;color:#F6F0E4;font-weight:600;">Test ngay sau khi điền xong</p>
        </div>
        <div style="padding:14px 16px;">
          <p style="margin:0 0 8px;font-size:13px;color:#444;">Copy toàn bộ nội dung Brand DNA, paste vào Claude hoặc ChatGPT, rồi nói:</p>
          <div style="background:#1a1a2e;border-radius:8px;padding:14px 16px;">
            <p style="margin:0 0 4px;font-size:10px;font-weight:700;color:#1D9E75;letter-spacing:1px;">LỆNH TEST</p>
            <p style="margin:0;font-size:13px;color:#e8e8e8;font-family:monospace;line-height:1.6;">[paste Brand DNA]<br><br>Bây giờ viết 1 đoạn giới thiệu về tôi cho khách hàng mới. Khoảng 80 chữ. Giữ đúng giọng Brand DNA.</p>
          </div>
          <p style="margin:10px 0 0;font-size:13px;color:#666;font-style:italic;">Đọc lại đoạn AI viết. Nghe giống giọng bạn không? Nếu chưa — chỉnh phần nào "chưa đúng mình" trong Brand DNA rồi test lại.</p>
        </div>
      </div>

    </div>

    <!-- Pass/fail grid -->
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-bottom:20px;">
      <div style="background:#EAF5EF;border:1px solid #B8DFC9;border-radius:12px;padding:14px 16px;">
        <p style="margin:0 0 6px;font-size:12px;font-weight:700;color:#1D9E75;">HOÀN THÀNH KHI</p>
        <ul style="margin:0;padding-left:16px;font-size:13px;color:#2A5C3A;line-height:1.8;">
          <li>4 phần đều có chữ, không để trống</li>
          <li>Có câu chuyện thật (không phải ví dụ giả)</li>
          <li>Test xong, AI viết nghe giống giọng bạn</li>
        </ul>
      </div>
      <div style="background:#FEF0F0;border:1px solid #F5C6C6;border-radius:12px;padding:14px 16px;">
        <p style="margin:0 0 6px;font-size:12px;font-weight:700;color:#C0392B;">CHƯA XONG NẾU</p>
        <ul style="margin:0;padding-left:16px;font-size:13px;color:#7A2020;line-height:1.8;">
          <li>Viết chung chung, không cụ thể</li>
          <li>Chưa test với AI lần nào</li>
          <li>AI viết ra nghe như quảng cáo, không phải bạn</li>
        </ul>
      </div>
    </div>

    <div style="background:#0D2B1A;border-radius:12px;padding:16px 20px;">
      <p style="margin:0 0 4px;font-size:12px;font-weight:700;color:#1D9E75;letter-spacing:1px;">GỢI Ý TỪ DŨNG</p>
      <p style="margin:0;font-size:14px;color:#F6F0E4;line-height:1.6;">Điền thật, không cần hay. AI làm hay từ chất liệu thật của bạn. Câu chuyện bạn từng vấp ngã thật còn giá trị hơn câu chuyện đẹp bạn bịa ra gấp mười lần.</p>
    </div>

  </div>
</div>
$html$ WHERE course_id = 'content_368' AND sort_order = 2;


-- ─── BÀI 3: Bước 2 — Thu thập chất liệu vào The Dream ───────────
UPDATE lessons SET content_html = $html$
<div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;background:#F6F0E4;min-height:100vh;padding:0 0 48px;">

  <div style="background:#0D2B1A;padding:28px 24px 24px;">
    <span style="display:inline-block;background:#1D9E75;color:#fff;font-size:11px;font-weight:700;letter-spacing:1.5px;padding:4px 10px;border-radius:4px;margin-bottom:12px;">BƯỚC 2 · CONTENT SYSTEM</span>
    <h1 style="margin:0 0 6px;color:#F6F0E4;font-size:22px;font-weight:900;line-height:1.3;">Thu thập chất liệu vào The Dream</h1>
    <p style="margin:0;color:#F6F0E4;opacity:.7;font-size:14px;">5 phút/ngày để không bao giờ cạn ý tưởng. The Dream là nơi AI học từ những bài hay nhất ngành bạn.</p>
  </div>

  <div style="max-width:680px;margin:0 auto;padding:24px 16px;">

    <div style="background:#EAF5EF;border-left:4px solid #1D9E75;border-radius:0 12px 12px 0;padding:16px 20px;margin-bottom:20px;">
      <p style="margin:0 0 6px;font-size:12px;font-weight:700;letter-spacing:1px;color:#1D9E75;">BẠN CẦM ĐƯỢC GÌ</p>
      <p style="margin:0;font-size:14px;color:#0D2B1A;">Kho 60-90 bài hay đã được AI phân tích sau 30 ngày. Hook Library tự động cập nhật. Không bao giờ ngồi nhìn màn hình trắng không biết viết gì.</p>
    </div>

    <div style="background:#FFF8E6;border-left:4px solid #E8A020;border-radius:0 12px 12px 0;padding:16px 20px;margin-bottom:20px;">
      <p style="margin:0 0 6px;font-size:12px;font-weight:700;letter-spacing:1px;color:#E8A020;">AI LÀM GÌ · BẠN LÀM GÌ</p>
      <p style="margin:0;font-size:14px;color:#3D2800;line-height:1.7;"><strong>Bạn làm:</strong> Thêm bài hay (copy link hoặc text) vào The Dream · Gõ "phân tích" trong AI Commands.<br><strong>AI làm:</strong> Đọc bài, cho điểm Viral Score, rút công thức hook, thêm vào Hook Library.</p>
    </div>

    <div style="display:flex;flex-direction:column;gap:12px;margin-bottom:20px;">

      <div style="background:#fff;border:1px solid #E8E2D6;border-radius:14px;overflow:hidden;">
        <div style="background:#0D2B1A;padding:10px 16px;">
          <p style="margin:0;font-size:12px;font-weight:700;color:#F6F0E4;">BƯỚC 1</p>
          <p style="margin:2px 0 0;font-size:14px;color:#F6F0E4;font-weight:600;">Chọn bài để thêm</p>
        </div>
        <div style="padding:14px 16px;">
          <p style="margin:0 0 10px;font-size:13px;color:#444;">Mỗi ngày, khi lướt Facebook/TikTok, để ý những bài này:</p>
          <div style="display:flex;flex-direction:column;gap:6px;">
            <div style="display:flex;align-items:center;gap:8px;">
              <div style="width:6px;height:6px;background:#1D9E75;border-radius:50%;flex-shrink:0;"></div>
              <p style="margin:0;font-size:13px;color:#444;">Bài có nhiều tương tác hơn bình thường</p>
            </div>
            <div style="display:flex;align-items:center;gap:8px;">
              <div style="width:6px;height:6px;background:#1D9E75;border-radius:50%;flex-shrink:0;"></div>
              <p style="margin:0;font-size:13px;color:#444;">Bài ngành tương tự (không cần cùng ngành)</p>
            </div>
            <div style="display:flex;align-items:center;gap:8px;">
              <div style="width:6px;height:6px;background:#1D9E75;border-radius:50%;flex-shrink:0;"></div>
              <p style="margin:0;font-size:13px;color:#444;">Bài bạn đọc xong muốn chia sẻ ngay</p>
            </div>
          </div>
        </div>
      </div>

      <div style="background:#fff;border:1px solid #E8E2D6;border-radius:14px;overflow:hidden;">
        <div style="background:#0D2B1A;padding:10px 16px;">
          <p style="margin:0;font-size:12px;font-weight:700;color:#F6F0E4;">BƯỚC 2</p>
          <p style="margin:2px 0 0;font-size:14px;color:#F6F0E4;font-weight:600;">Paste vào The Dream + gõ "phân tích"</p>
        </div>
        <div style="padding:14px 16px;">
          <p style="margin:0 0 8px;font-size:13px;color:#444;">Mở trang The Dream trong Notion. Tạo entry mới với nội dung bài đó. Sau đó mở AI và gõ lệnh:</p>
          <div style="background:#1a1a2e;border-radius:8px;padding:14px 16px;">
            <p style="margin:0 0 4px;font-size:10px;font-weight:700;color:#1D9E75;letter-spacing:1px;">LỆNH PHÂN TÍCH</p>
            <p style="margin:0;font-size:13px;color:#e8e8e8;font-family:monospace;line-height:1.6;">phân tích<br><br>[paste nội dung bài vào đây]</p>
          </div>
          <p style="margin:10px 0 0;font-size:13px;color:#666;font-style:italic;">AI trả về: Viral Score (1-10) · Loại hook đã dùng · Lý do bài này lan truyền · Công thức có thể áp dụng lại.</p>
        </div>
      </div>

      <div style="background:#fff;border:1px solid #E8E2D6;border-radius:14px;overflow:hidden;">
        <div style="background:#0D2B1A;padding:10px 16px;">
          <p style="margin:0;font-size:12px;font-weight:700;color:#F6F0E4;">BƯỚC 3</p>
          <p style="margin:2px 0 0;font-size:14px;color:#F6F0E4;font-weight:600;">Thói quen 5 phút mỗi sáng</p>
        </div>
        <div style="padding:14px 16px;">
          <p style="margin:0;font-size:13px;color:#444;line-height:1.6;">Mỗi sáng dành 5 phút lướt feed và thêm 2-3 bài vào The Dream. Sau 30 ngày bạn có kho 60-90 bài. AI học từ kho đó và Hook Library của bạn ngày càng giàu hơn.</p>
        </div>
      </div>

    </div>

    <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-bottom:20px;">
      <div style="background:#EAF5EF;border:1px solid #B8DFC9;border-radius:12px;padding:14px 16px;">
        <p style="margin:0 0 6px;font-size:12px;font-weight:700;color:#1D9E75;">HOÀN THÀNH KHI</p>
        <ul style="margin:0;padding-left:16px;font-size:13px;color:#2A5C3A;line-height:1.8;">
          <li>Đã thêm được 5 bài đầu tiên vào The Dream</li>
          <li>Đã gõ "phân tích" cho ít nhất 1 bài</li>
          <li>Thấy Hook Library có thêm ít nhất 1 công thức mới</li>
        </ul>
      </div>
      <div style="background:#FEF0F0;border:1px solid #F5C6C6;border-radius:12px;padding:14px 16px;">
        <p style="margin:0 0 6px;font-size:12px;font-weight:700;color:#C0392B;">CHƯA XONG NẾU</p>
        <ul style="margin:0;padding-left:16px;font-size:13px;color:#7A2020;line-height:1.8;">
          <li>The Dream vẫn trống sau 3 ngày</li>
          <li>Chỉ lưu link mà không paste text vào</li>
          <li>Chưa thử lệnh "phân tích" lần nào</li>
        </ul>
      </div>
    </div>

    <div style="background:#0D2B1A;border-radius:12px;padding:16px 20px;">
      <p style="margin:0 0 4px;font-size:12px;font-weight:700;color:#1D9E75;letter-spacing:1px;">GỢI Ý TỪ DŨNG</p>
      <p style="margin:0;font-size:14px;color:#F6F0E4;line-height:1.6;">Không cần bài hay cùng ngành. Bài bán trà sữa viral cũng dạy được công thức hook mà bạn áp vào bán khóa học. Cái AI học là kỹ thuật viết, không phải chủ đề.</p>
    </div>

  </div>
</div>
$html$ WHERE course_id = 'content_368' AND sort_order = 3;


-- ─── BÀI 4: Bước 3 — Viết bài đầu tiên bằng AI Commands ─────────
UPDATE lessons SET content_html = $html$
<div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;background:#F6F0E4;min-height:100vh;padding:0 0 48px;">

  <div style="background:#0D2B1A;padding:28px 24px 24px;">
    <span style="display:inline-block;background:#1D9E75;color:#fff;font-size:11px;font-weight:700;letter-spacing:1.5px;padding:4px 10px;border-radius:4px;margin-bottom:12px;">BƯỚC 3 · CONTENT SYSTEM</span>
    <h1 style="margin:0 0 6px;color:#F6F0E4;font-size:22px;font-weight:900;line-height:1.3;">Viết Bài Đầu Tiên Bằng AI Commands</h1>
    <p style="margin:0;color:#F6F0E4;opacity:.7;font-size:14px;">Đây là lúc bạn thấy hệ thống chạy thật. Từ Brand DNA + 1 lệnh "viết bài" ra bài hoàn chỉnh trong 15 phút.</p>
  </div>

  <div style="max-width:680px;margin:0 auto;padding:24px 16px;">

    <div style="background:#EAF5EF;border-left:4px solid #1D9E75;border-radius:0 12px 12px 0;padding:16px 20px;margin-bottom:20px;">
      <p style="margin:0 0 6px;font-size:12px;font-weight:700;letter-spacing:1px;color:#1D9E75;">BẠN CẦM ĐƯỢC GÌ</p>
      <p style="margin:0;font-size:14px;color:#0D2B1A;">1 bài viết hoàn chỉnh đúng giọng bạn, đã có CTA, sẵn sàng đăng. Tổng thời gian 15-20 phút.</p>
    </div>

    <div style="background:#FFF8E6;border-left:4px solid #E8A020;border-radius:0 12px 12px 0;padding:16px 20px;margin-bottom:20px;">
      <p style="margin:0 0 6px;font-size:12px;font-weight:700;letter-spacing:1px;color:#E8A020;">AI LÀM GÌ · BẠN LÀM GÌ</p>
      <p style="margin:0;font-size:14px;color:#3D2800;line-height:1.7;"><strong>Bạn làm:</strong> Gõ "viết bài" · Trả lời 3 câu AI hỏi · Đọc lại và chỉnh 1-2 chỗ · Đăng.<br><strong>AI làm:</strong> Viết toàn bộ bài theo Brand DNA của bạn · Chọn hook từ Hook Library · Thêm CTA phù hợp.</p>
    </div>

    <div style="display:flex;flex-direction:column;gap:12px;margin-bottom:20px;">

      <div style="background:#fff;border:1px solid #E8E2D6;border-radius:14px;overflow:hidden;">
        <div style="background:#0D2B1A;padding:10px 16px;">
          <p style="margin:0;font-size:12px;font-weight:700;color:#F6F0E4;">BƯỚC 1</p>
          <p style="margin:2px 0 0;font-size:14px;color:#F6F0E4;font-weight:600;">Mở AI Commands trong Workspace</p>
        </div>
        <div style="padding:14px 16px;">
          <p style="margin:0 0 8px;font-size:13px;color:#444;">Vào Notion → mục "06 AI Commands". Ở đó có đầy đủ lệnh và hướng dẫn copy-paste. Hoặc dùng nhanh lệnh bên dưới:</p>
          <div style="background:#1a1a2e;border-radius:8px;padding:14px 16px;">
            <p style="margin:0 0 4px;font-size:10px;font-weight:700;color:#1D9E75;letter-spacing:1px;">LỆNH VIẾT BÀI</p>
            <p style="margin:0;font-size:13px;color:#e8e8e8;font-family:monospace;line-height:1.6;">viết bài</p>
          </div>
          <p style="margin:8px 0 0;font-size:12px;color:#888;font-style:italic;">Nhớ paste Brand DNA vào đầu cuộc trò chuyện trước khi gõ lệnh này.</p>
        </div>
      </div>

      <div style="background:#fff;border:1px solid #E8E2D6;border-radius:14px;overflow:hidden;">
        <div style="background:#0D2B1A;padding:10px 16px;">
          <p style="margin:0;font-size:12px;font-weight:700;color:#F6F0E4;">BƯỚC 2</p>
          <p style="margin:2px 0 0;font-size:14px;color:#F6F0E4;font-weight:600;">Trả lời 3 câu AI hỏi</p>
        </div>
        <div style="padding:14px 16px;">
          <p style="margin:0 0 8px;font-size:13px;color:#444;">AI sẽ hỏi đúng 3 câu:</p>
          <div style="display:flex;flex-direction:column;gap:8px;">
            <div style="background:#F6F0E4;border-radius:8px;padding:10px 12px;display:flex;gap:10px;align-items:flex-start;">
              <span style="background:#0D2B1A;color:#F6F0E4;font-size:11px;font-weight:700;padding:2px 7px;border-radius:4px;flex-shrink:0;">1</span>
              <div>
                <p style="margin:0 0 2px;font-size:12px;font-weight:700;color:#0D2B1A;">Loại bài:</p>
                <p style="margin:0;font-size:12px;color:#666;">Kể chuyện / tips ngắn / kiến thức / so sánh / bán hàng</p>
              </div>
            </div>
            <div style="background:#F6F0E4;border-radius:8px;padding:10px 12px;display:flex;gap:10px;align-items:flex-start;">
              <span style="background:#0D2B1A;color:#F6F0E4;font-size:11px;font-weight:700;padding:2px 7px;border-radius:4px;flex-shrink:0;">2</span>
              <div>
                <p style="margin:0 0 2px;font-size:12px;font-weight:700;color:#0D2B1A;">Chủ đề:</p>
                <p style="margin:0;font-size:12px;color:#666;">Bạn muốn nói về điều gì cụ thể hôm nay</p>
              </div>
            </div>
            <div style="background:#F6F0E4;border-radius:8px;padding:10px 12px;display:flex;gap:10px;align-items:flex-start;">
              <span style="background:#0D2B1A;color:#F6F0E4;font-size:11px;font-weight:700;padding:2px 7px;border-radius:4px;flex-shrink:0;">3</span>
              <div>
                <p style="margin:0 0 2px;font-size:12px;font-weight:700;color:#0D2B1A;">CTA muốn dùng:</p>
                <p style="margin:0;font-size:12px;color:#666;">Comment · Inbox · Link · Không có CTA (tùy bài)</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div style="background:#fff;border:1px solid #E8E2D6;border-radius:14px;overflow:hidden;">
        <div style="background:#0D2B1A;padding:10px 16px;">
          <p style="margin:0;font-size:12px;font-weight:700;color:#F6F0E4;">BƯỚC 3</p>
          <p style="margin:2px 0 0;font-size:14px;color:#F6F0E4;font-weight:600;">Đọc lại, chỉnh và đưa vào lịch</p>
        </div>
        <div style="padding:14px 16px;">
          <p style="margin:0 0 8px;font-size:13px;color:#444;">AI viết xong → đọc lại toàn bài. Chỉnh 1-2 chỗ nếu cần. Sau đó gõ lệnh để đưa vào Content Calendar:</p>
          <div style="background:#1a1a2e;border-radius:8px;padding:14px 16px;">
            <p style="margin:0 0 4px;font-size:10px;font-weight:700;color:#1D9E75;letter-spacing:1px;">LỆNH ĐƯA VÀO LỊCH</p>
            <p style="margin:0;font-size:13px;color:#e8e8e8;font-family:monospace;line-height:1.6;">đẩy vào calendar</p>
          </div>
          <p style="margin:8px 0 0;font-size:12px;color:#888;font-style:italic;">AI tự tạo mục trong Content Calendar, thêm ngày đăng, tạo Visual Brief 7 mục cho thiết kế.</p>
        </div>
      </div>

    </div>

    <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-bottom:20px;">
      <div style="background:#EAF5EF;border:1px solid #B8DFC9;border-radius:12px;padding:14px 16px;">
        <p style="margin:0 0 6px;font-size:12px;font-weight:700;color:#1D9E75;">HOÀN THÀNH KHI</p>
        <ul style="margin:0;padding-left:16px;font-size:13px;color:#2A5C3A;line-height:1.8;">
          <li>Đã gõ "viết bài" và có bài hoàn chỉnh</li>
          <li>Đọc bài — nghe đúng giọng bạn</li>
          <li>Đã đưa vào Calendar hoặc đã đăng thật</li>
        </ul>
      </div>
      <div style="background:#FEF0F0;border:1px solid #F5C6C6;border-radius:12px;padding:14px 16px;">
        <p style="margin:0 0 6px;font-size:12px;font-weight:700;color:#C0392B;">CHƯA XONG NẾU</p>
        <ul style="margin:0;padding-left:16px;font-size:13px;color:#7A2020;line-height:1.8;">
          <li>Chưa thử lệnh "viết bài" lần nào</li>
          <li>Bài AI viết nghe như quảng cáo, không phải bạn (cần chỉnh Brand DNA)</li>
          <li>Viết xong nhưng vẫn chưa đăng hoặc lên lịch</li>
        </ul>
      </div>
    </div>

    <div style="background:#0D2B1A;border-radius:12px;padding:16px 20px;">
      <p style="margin:0 0 4px;font-size:12px;font-weight:700;color:#1D9E75;letter-spacing:1px;">GỢI Ý TỪ DŨNG</p>
      <p style="margin:0;font-size:14px;color:#F6F0E4;line-height:1.6;">Bài đầu tiên không cần hoàn hảo. Mục tiêu là thấy quy trình chạy được. Đăng luôn, xem phản hồi thật, từ đó biết cần chỉnh gì ở Brand DNA hay cách trả lời câu hỏi của AI.</p>
    </div>

  </div>
</div>
$html$ WHERE course_id = 'content_368' AND sort_order = 4;


-- ─── BÀI 5: Bước 4 — Nhân bản 1 bài thành 7+ biến thể ───────────
UPDATE lessons SET content_html = $html$
<div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;background:#F6F0E4;min-height:100vh;padding:0 0 48px;">

  <div style="background:#0D2B1A;padding:28px 24px 24px;">
    <span style="display:inline-block;background:#1D9E75;color:#fff;font-size:11px;font-weight:700;letter-spacing:1.5px;padding:4px 10px;border-radius:4px;margin-bottom:12px;">BƯỚC 4 · CONTENT SYSTEM</span>
    <h1 style="margin:0 0 6px;color:#F6F0E4;font-size:22px;font-weight:900;line-height:1.3;">Nhân Bản 1 Bài Thành 7+ Biến Thể</h1>
    <p style="margin:0;color:#F6F0E4;opacity:.7;font-size:14px;">Không cần nghĩ ý tưởng mới mỗi ngày. 1 bài hay nhân ra 7 dạng khác nhau tiết kiệm thời gian gấp 7 lần.</p>
  </div>

  <div style="max-width:680px;margin:0 auto;padding:24px 16px;">

    <div style="background:#EAF5EF;border-left:4px solid #1D9E75;border-radius:0 12px 12px 0;padding:16px 20px;margin-bottom:20px;">
      <p style="margin:0 0 6px;font-size:12px;font-weight:700;letter-spacing:1px;color:#1D9E75;">BẠN CẦM ĐƯỢC GÌ</p>
      <p style="margin:0;font-size:14px;color:#0D2B1A;">7-10 biến thể từ 1 bài. Lịch content 1 tuần chỉ cần 1 buổi ngồi. AI tự kiểm tra tỷ lệ 40/30/20/10 và nhắc khi bạn lệch.</p>
    </div>

    <div style="background:#FFF8E6;border-left:4px solid #E8A020;border-radius:0 12px 12px 0;padding:16px 20px;margin-bottom:20px;">
      <p style="margin:0 0 6px;font-size:12px;font-weight:700;letter-spacing:1px;color:#E8A020;">AI LÀM GÌ · BẠN LÀM GÌ</p>
      <p style="margin:0;font-size:14px;color:#3D2800;line-height:1.7;"><strong>Bạn làm:</strong> Paste bài gốc · Gõ "nhân bản" · Chọn 2-3 biến thể muốn dùng tuần này.<br><strong>AI làm:</strong> Tạo 7-10 phiên bản từ cùng 1 nội dung · Giữ đúng thông điệp gốc nhưng thay dạng · Sắp lịch theo tỷ lệ 40/30/20/10.</p>
    </div>

    <!-- Ma trận 40/30/20/10 -->
    <div style="background:#0D2B1A;border-radius:16px;padding:20px 24px;margin-bottom:20px;">
      <p style="margin:0 0 14px;font-size:13px;font-weight:700;color:#1D9E75;letter-spacing:1px;">TỶ LỆ VÀNG 40/30/20/10</p>
      <div style="display:flex;flex-direction:column;gap:8px;">
        <div style="display:flex;align-items:center;gap:12px;">
          <div style="width:44px;height:28px;background:#1D9E75;border-radius:6px;display:flex;align-items:center;justify-content:center;flex-shrink:0;">
            <span style="font-size:12px;font-weight:800;color:#fff;">40%</span>
          </div>
          <div>
            <p style="margin:0;font-size:13px;color:#F6F0E4;font-weight:600;">Bài Viral</p>
            <p style="margin:2px 0 0;font-size:12px;color:#F6F0E4;opacity:.6;">Tips · câu chuyện · tò mò · tranh luận nhẹ</p>
          </div>
        </div>
        <div style="display:flex;align-items:center;gap:12px;">
          <div style="width:44px;height:28px;background:#3B7DD8;border-radius:6px;display:flex;align-items:center;justify-content:center;flex-shrink:0;">
            <span style="font-size:12px;font-weight:800;color:#fff;">30%</span>
          </div>
          <div>
            <p style="margin:0;font-size:13px;color:#F6F0E4;font-weight:600;">Bài Chuyên Môn</p>
            <p style="margin:2px 0 0;font-size:12px;color:#F6F0E4;opacity:.6;">Kiến thức · hướng dẫn · giải thích sâu</p>
          </div>
        </div>
        <div style="display:flex;align-items:center;gap:12px;">
          <div style="width:44px;height:28px;background:#8B5CF6;border-radius:6px;display:flex;align-items:center;justify-content:center;flex-shrink:0;">
            <span style="font-size:12px;font-weight:800;color:#fff;">20%</span>
          </div>
          <div>
            <p style="margin:0;font-size:13px;color:#F6F0E4;font-weight:600;">Bài Cảm Hứng</p>
            <p style="margin:2px 0 0;font-size:12px;color:#F6F0E4;opacity:.6;">Động lực · góc nhìn khác · suy nghĩ bên lề</p>
          </div>
        </div>
        <div style="display:flex;align-items:center;gap:12px;">
          <div style="width:44px;height:28px;background:#E8A020;border-radius:6px;display:flex;align-items:center;justify-content:center;flex-shrink:0;">
            <span style="font-size:12px;font-weight:800;color:#fff;">10%</span>
          </div>
          <div>
            <p style="margin:0;font-size:13px;color:#F6F0E4;font-weight:600;">Bài Bán Hàng</p>
            <p style="margin:2px 0 0;font-size:12px;color:#F6F0E4;opacity:.6;">Offer · testimonial · giới thiệu sản phẩm</p>
          </div>
        </div>
      </div>
    </div>

    <div style="display:flex;flex-direction:column;gap:12px;margin-bottom:20px;">

      <div style="background:#fff;border:1px solid #E8E2D6;border-radius:14px;overflow:hidden;">
        <div style="background:#0D2B1A;padding:10px 16px;">
          <p style="margin:0;font-size:12px;font-weight:700;color:#F6F0E4;">CÁCH NHÂN BẢN</p>
          <p style="margin:2px 0 0;font-size:14px;color:#F6F0E4;font-weight:600;">Lệnh "nhân bản" + paste bài gốc</p>
        </div>
        <div style="padding:14px 16px;">
          <div style="background:#1a1a2e;border-radius:8px;padding:14px 16px;margin-bottom:10px;">
            <p style="margin:0 0 4px;font-size:10px;font-weight:700;color:#1D9E75;letter-spacing:1px;">LỆNH NHÂN BẢN</p>
            <p style="margin:0;font-size:13px;color:#e8e8e8;font-family:monospace;line-height:1.6;">nhân bản<br><br>[paste bài gốc vào đây]</p>
          </div>
          <p style="margin:0 0 10px;font-size:13px;color:#444;">AI tạo 7-10 biến thể gồm:</p>
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:6px;">
            <div style="background:#F6F0E4;border-radius:6px;padding:8px 10px;font-size:12px;color:#444;">Kể chuyện (story-form)</div>
            <div style="background:#F6F0E4;border-radius:6px;padding:8px 10px;font-size:12px;color:#444;">Phản biện (góc ngược)</div>
            <div style="background:#F6F0E4;border-radius:6px;padding:8px 10px;font-size:12px;color:#444;">Số liệu + dữ liệu</div>
            <div style="background:#F6F0E4;border-radius:6px;padding:8px 10px;font-size:12px;color:#444;">Danh sách có thể lưu</div>
            <div style="background:#F6F0E4;border-radius:6px;padding:8px 10px;font-size:12px;color:#444;">Nội dung slide carousel</div>
            <div style="background:#F6F0E4;border-radius:6px;padding:8px 10px;font-size:12px;color:#444;">Script video ngắn</div>
            <div style="background:#F6F0E4;border-radius:6px;padding:8px 10px;font-size:12px;color:#444;grid-column:1/-1;">Email gửi list</div>
          </div>
        </div>
      </div>

    </div>

    <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-bottom:20px;">
      <div style="background:#EAF5EF;border:1px solid #B8DFC9;border-radius:12px;padding:14px 16px;">
        <p style="margin:0 0 6px;font-size:12px;font-weight:700;color:#1D9E75;">HOÀN THÀNH KHI</p>
        <ul style="margin:0;padding-left:16px;font-size:13px;color:#2A5C3A;line-height:1.8;">
          <li>Đã thử lệnh "nhân bản" 1 lần</li>
          <li>Chọn được 2-3 biến thể để dùng</li>
          <li>Lịch tuần này có ít nhất 5 bài được lên kế hoạch</li>
        </ul>
      </div>
      <div style="background:#FEF0F0;border:1px solid #F5C6C6;border-radius:12px;padding:14px 16px;">
        <p style="margin:0 0 6px;font-size:12px;font-weight:700;color:#C0392B;">CHƯA XONG NẾU</p>
        <ul style="margin:0;padding-left:16px;font-size:13px;color:#7A2020;line-height:1.8;">
          <li>Vẫn nghĩ ý tưởng mới từ đầu mỗi ngày</li>
          <li>Chỉ đăng bài bán hàng, không có bài viral</li>
          <li>Chưa biết tỷ lệ 40/30/20/10 của mình đang ở đâu</li>
        </ul>
      </div>
    </div>

    <div style="background:#0D2B1A;border-radius:12px;padding:16px 20px;">
      <p style="margin:0 0 4px;font-size:12px;font-weight:700;color:#1D9E75;letter-spacing:1px;">GỢI Ý TỪ DŨNG</p>
      <p style="margin:0;font-size:14px;color:#F6F0E4;line-height:1.6;">Mình hay thấy người ta đăng 100% bài bán hàng rồi than "sao không ai tương tác". Tỷ lệ 10% bán hàng không phải ít — nó là đủ. Còn 90% kia xây trust để khi bạn đăng 10% đó người ta mới tin mua.</p>
    </div>

  </div>
</div>
$html$ WHERE course_id = 'content_368' AND sort_order = 5;


-- ─── BÀI 6: Bước 5 — Báo cáo tuần và lên kế hoạch ──────────────
UPDATE lessons SET content_html = $html$
<div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;background:#F6F0E4;min-height:100vh;padding:0 0 48px;">

  <div style="background:#0D2B1A;padding:28px 24px 24px;">
    <span style="display:inline-block;background:#1D9E75;color:#fff;font-size:11px;font-weight:700;letter-spacing:1.5px;padding:4px 10px;border-radius:4px;margin-bottom:12px;">BƯỚC 5 · CONTENT SYSTEM</span>
    <h1 style="margin:0 0 6px;color:#F6F0E4;font-size:22px;font-weight:900;line-height:1.3;">Chủ Nhật: Báo Cáo Tuần và Lên Kế Hoạch</h1>
    <p style="margin:0;color:#F6F0E4;opacity:.7;font-size:14px;">15 phút mỗi chủ nhật. Biết bài nào đang hiệu quả, bài nào không, và tuần sau làm gì.</p>
  </div>

  <div style="max-width:680px;margin:0 auto;padding:24px 16px;">

    <div style="background:#EAF5EF;border-left:4px solid #1D9E75;border-radius:0 12px 12px 0;padding:16px 20px;margin-bottom:20px;">
      <p style="margin:0 0 6px;font-size:12px;font-weight:700;letter-spacing:1px;color:#1D9E75;">BẠN CẦM ĐƯỢC GÌ</p>
      <p style="margin:0;font-size:14px;color:#0D2B1A;">Báo cáo tuần tự động: kiểu content nào hiệu quả nhất với tệp của bạn. Kế hoạch tuần sau gồm chủ đề + lịch đăng sẵn sàng.</p>
    </div>

    <div style="background:#FFF8E6;border-left:4px solid #E8A020;border-radius:0 12px 12px 0;padding:16px 20px;margin-bottom:20px;">
      <p style="margin:0 0 6px;font-size:12px;font-weight:700;letter-spacing:1px;color:#E8A020;">AI LÀM GÌ · BẠN LÀM GÌ</p>
      <p style="margin:0;font-size:14px;color:#3D2800;line-height:1.7;"><strong>Bạn làm:</strong> Nhập số liệu tuần (reach, tương tác của từng bài) · Duyệt kế hoạch tuần sau.<br><strong>AI làm:</strong> Tổng hợp báo cáo · Phân tích kiểu bài nào hiệu quả · Đề xuất chủ đề tuần tới · Lên lịch tự động.</p>
    </div>

    <div style="display:flex;flex-direction:column;gap:12px;margin-bottom:20px;">

      <div style="background:#fff;border:1px solid #E8E2D6;border-radius:14px;overflow:hidden;">
        <div style="background:#0D2B1A;padding:10px 16px;">
          <p style="margin:0;font-size:12px;font-weight:700;color:#F6F0E4;">QUYTRÌNH CHỦNHẬT — 15 PHÚT</p>
        </div>
        <div style="padding:14px 16px;display:flex;flex-direction:column;gap:12px;">

          <div style="display:flex;gap:12px;align-items:flex-start;">
            <div style="width:28px;height:28px;background:#0D2B1A;border-radius:50%;display:flex;align-items:center;justify-content:center;flex-shrink:0;">
              <span style="font-size:12px;font-weight:700;color:#F6F0E4;">1</span>
            </div>
            <div>
              <p style="margin:0 0 4px;font-size:13px;font-weight:600;color:#0D2B1A;">Mở Content Calendar + Analytics (3 phút)</p>
              <p style="margin:0;font-size:12px;color:#666;">Xem lại 7 bài đã đăng. Điền reach và tương tác thật vào từng ô.</p>
            </div>
          </div>

          <div style="display:flex;gap:12px;align-items:flex-start;">
            <div style="width:28px;height:28px;background:#0D2B1A;border-radius:50%;display:flex;align-items:center;justify-content:center;flex-shrink:0;">
              <span style="font-size:12px;font-weight:700;color:#F6F0E4;">2</span>
            </div>
            <div>
              <p style="margin:0 0 4px;font-size:13px;font-weight:600;color:#0D2B1A;">Gõ "báo cáo tuần" (2 phút)</p>
              <div style="background:#1a1a2e;border-radius:6px;padding:10px 12px;margin-top:6px;">
                <p style="margin:0;font-size:12px;color:#e8e8e8;font-family:monospace;">báo cáo tuần</p>
              </div>
              <p style="margin:6px 0 0;font-size:12px;color:#666;font-style:italic;">AI tổng hợp: bài nào reach cao nhất · kiểu bài nào đang tốt · bài nào thấp hơn mức bình quân.</p>
            </div>
          </div>

          <div style="display:flex;gap:12px;align-items:flex-start;">
            <div style="width:28px;height:28px;background:#0D2B1A;border-radius:50%;display:flex;align-items:center;justify-content:center;flex-shrink:0;">
              <span style="font-size:12px;font-weight:700;color:#F6F0E4;">3</span>
            </div>
            <div>
              <p style="margin:0 0 4px;font-size:13px;font-weight:600;color:#0D2B1A;">Gõ "kế hoạch tuần tới" (5 phút)</p>
              <div style="background:#1a1a2e;border-radius:6px;padding:10px 12px;margin-top:6px;">
                <p style="margin:0;font-size:12px;color:#e8e8e8;font-family:monospace;">kế hoạch tuần tới</p>
              </div>
              <p style="margin:6px 0 0;font-size:12px;color:#666;font-style:italic;">AI đề xuất 7 chủ đề + lịch đăng theo tỷ lệ 40/30/20/10 dựa trên insight tuần này.</p>
            </div>
          </div>

          <div style="display:flex;gap:12px;align-items:flex-start;">
            <div style="width:28px;height:28px;background:#0D2B1A;border-radius:50%;display:flex;align-items:center;justify-content:center;flex-shrink:0;">
              <span style="font-size:12px;font-weight:700;color:#F6F0E4;">4</span>
            </div>
            <div>
              <p style="margin:0 0 4px;font-size:13px;font-weight:600;color:#0D2B1A;">Duyệt và chỉnh nếu cần (5 phút)</p>
              <p style="margin:0;font-size:12px;color:#666;">Đọc qua 7 chủ đề AI đề xuất. Đổi cái nào chưa phù hợp. Sang tuần chỉ việc mở lịch và viết theo.</p>
            </div>
          </div>

        </div>
      </div>

    </div>

    <!-- Insight sau 4 tuần -->
    <div style="background:#fff;border:1px solid #E8E2D6;border-radius:14px;padding:16px 20px;margin-bottom:20px;">
      <p style="margin:0 0 10px;font-size:13px;font-weight:700;color:#0D2B1A;">SAU 4 TUẦN SỬ DỤNG</p>
      <div style="display:flex;flex-direction:column;gap:8px;">
        <div style="display:flex;align-items:center;gap:10px;">
          <div style="width:8px;height:8px;background:#1D9E75;border-radius:50%;flex-shrink:0;"></div>
          <p style="margin:0;font-size:13px;color:#444;">Biết được kiểu bài nào khách của bạn thích nhất</p>
        </div>
        <div style="display:flex;align-items:center;gap:10px;">
          <div style="width:8px;height:8px;background:#1D9E75;border-radius:50%;flex-shrink:0;"></div>
          <p style="margin:0;font-size:13px;color:#444;">Tỷ lệ reach trung bình mỗi bài tăng dần vì AI ngày càng hiểu tệp của bạn</p>
        </div>
        <div style="display:flex;align-items:center;gap:10px;">
          <div style="width:8px;height:8px;background:#1D9E75;border-radius:50%;flex-shrink:0;"></div>
          <p style="margin:0;font-size:13px;color:#444;">Không còn ngồi suy nghĩ "hôm nay đăng gì" vì lịch đã có sẵn từ chủ nhật</p>
        </div>
        <div style="display:flex;align-items:center;gap:10px;">
          <div style="width:8px;height:8px;background:#1D9E75;border-radius:50%;flex-shrink:0;"></div>
          <p style="margin:0;font-size:13px;color:#444;">Hook Library của bạn ngày càng chuẩn hơn với từng nhóm khách</p>
        </div>
      </div>
    </div>

    <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-bottom:20px;">
      <div style="background:#EAF5EF;border:1px solid #B8DFC9;border-radius:12px;padding:14px 16px;">
        <p style="margin:0 0 6px;font-size:12px;font-weight:700;color:#1D9E75;">HOÀN THÀNH KHI</p>
        <ul style="margin:0;padding-left:16px;font-size:13px;color:#2A5C3A;line-height:1.8;">
          <li>Đã làm báo cáo tuần đầu tiên</li>
          <li>Biết bài nào đang hiệu quả nhất</li>
          <li>Có kế hoạch chủ đề cho tuần sau</li>
        </ul>
      </div>
      <div style="background:#FEF0F0;border:1px solid #F5C6C6;border-radius:12px;padding:14px 16px;">
        <p style="margin:0 0 6px;font-size:12px;font-weight:700;color:#C0392B;">CHƯA XONG NẾU</p>
        <ul style="margin:0;padding-left:16px;font-size:13px;color:#7A2020;line-height:1.8;">
          <li>Không theo dõi số liệu nào cả</li>
          <li>Vẫn đang quyết định chủ đề trong buổi sáng hôm đó</li>
          <li>Chưa biết bài nào của bạn đang tốt nhất</li>
        </ul>
      </div>
    </div>

    <div style="background:#0D2B1A;border-radius:12px;padding:16px 20px;margin-bottom:20px;">
      <p style="margin:0 0 4px;font-size:12px;font-weight:700;color:#1D9E75;letter-spacing:1px;">GỢI Ý TỪ DŨNG</p>
      <p style="margin:0;font-size:14px;color:#F6F0E4;line-height:1.6;">15 phút chủ nhật nghe nhỏ nhưng nó là bước khiến Content System thật sự cải thiện mỗi tuần. Không review thì cứ lặp lại những gì không hiệu quả. Review xong thì biết nhân bản đúng chỗ.</p>
    </div>

    <!-- CTA hỗ trợ -->
    <div style="background:#fff;border:1px solid #E8E2D6;border-radius:14px;padding:16px 20px;text-align:center;">
      <p style="margin:0 0 6px;font-size:13px;font-weight:700;color:#0D2B1A;">BỊ KẸT Ở ĐÂU?</p>
      <p style="margin:0 0 12px;font-size:13px;color:#666;">Nhắn mình qua Telegram hoặc Zalo. Tiểu Hà Mã hỗ trợ 24/7.</p>
      <div style="display:flex;gap:10px;justify-content:center;flex-wrap:wrap;">
        <a href="https://t.me/KentHoang" target="_blank"
           style="display:inline-block;background:#229ED9;color:#fff;font-weight:700;font-size:13px;padding:10px 20px;border-radius:8px;text-decoration:none;">Telegram @KentHoang</a>
        <a href="https://zalo.me/0938725413" target="_blank"
           style="display:inline-block;background:#0068FF;color:#fff;font-weight:700;font-size:13px;padding:10px 20px;border-radius:8px;text-decoration:none;">Zalo 0938725413</a>
      </div>
    </div>

  </div>
</div>
$html$ WHERE course_id = 'content_368' AND sort_order = 6;
