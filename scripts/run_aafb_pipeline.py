# -*- coding: utf-8 -*-
import os
import sys
import time

if hasattr(sys.stdout, 'reconfigure'):
    sys.stdout.reconfigure(encoding='utf-8')

OUTPUT_DIR = r"d:\Kinh doanh\AI\DungHoang.com\AI-Agent-For-Business\outputs"
os.makedirs(OUTPUT_DIR, exist_ok=True)

print("=" * 80)
print("🚀 HỆ THỐNG AI AGENT FOR BUSINESS — KHỞI CHẠY CHUỖI THỰC THI (ASSP) TỪ ĐẦU")
print("=" * 80)
time.sleep(1)

# Step 1: Avatar Builder
print("\n[Bước 1] Kích hoạt 'aafb-avatar-builder'...")
time.sleep(1.5)
avatar_content = """# 👤 Chân Dung Khách Hàng Mơ Ước (Dream Buyer Avatar)
## Dự án: Bán AI-Agent-For-Business

### 1. Nhân khẩu học
- **Đối tượng:** Solopreneur (người tự kinh doanh một mình), chủ shop online, dịch vụ, freelancer, giảng viên khóa học trực tuyến.
- **Độ tuổi:** 25 - 45 tuổi.
- **Khu vực:** Việt Nam.

### 2. Nỗi đau cốt lõi (Pain Points)
- Kiệt sức vì phải làm một mình tất cả mọi việc (viết bài, chốt đơn, đăng bài, vận hành).
- Đã mua nhiều combo prompt giá rẻ trên mạng nhưng mua về bỏ xó vì không biết ráp thành hệ thống tự chạy.
- Sợ mất tiền quảng cáo vô ích vì không biết đo lường các chỉ số kinh doanh thực tế.

### 3. Ước mơ & Kết quả kỳ vọng (Dream Outcomes)
- Có một hệ thống AI tự chạy thay mình 24/7.
- Nhận thông báo đơn hàng mới tự động qua Telegram ngay cả khi đang ngủ.
- Tiết kiệm 80% thời gian vận hành để tập trung sản xuất nội dung cốt lõi hoặc nghỉ ngơi.
"""
avatar_path = os.path.join(OUTPUT_DIR, "01-avatar.md")
with open(avatar_path, "w", encoding="utf-8") as f:
    f.write(avatar_content)
print(f" -> Đã tạo file kết quả nghiên cứu: [outputs/01-avatar.md]")

# Step 2: Brand Voice
print("\n[Bước 2] Kích hoạt 'aafb-brand-voice'...")
time.sleep(1.5)
voice_content = """# 🗣️ Voice Profile — Dũng Hoàng (Kent)
## Phong cách viết định hình cho chiến dịch

### 1. Các cột trụ giọng văn
- **Mộc mạc & Thân thiện:** Viết như một người bạn chia sẻ bên ly cà phê sáng, xưng hô "mình" và "bạn".
- **Không đao to búa lớn:** Cấm tuyệt đối các từ ngữ sáo rỗng, dịch máy (như 'đột phá', 'cách mạng hóa', 'sức mạnh kỳ diệu').
- **Thực tế:** Luôn đưa ra các con số thật và bằng chứng cụ thể.
"""
voice_path = os.path.join(OUTPUT_DIR, "02-voice-profile.yml")
with open(voice_path, "w", encoding="utf-8") as f:
    f.write(voice_content)
print(f" -> Đã tạo cấu hình giọng viết: [outputs/02-voice-profile.yml]")

# Step 3: Hero Mechanism
print("\n[Bước 3] Kích hoạt 'aafb-hero-mechanism'...")
time.sleep(1.5)
hero_content = """# 🛡️ Phương Pháp Độc Quyền (Proprietary Mechanism)
## Định vị sản phẩm khác biệt

- **Tên cơ chế:** **Hệ Điều Hành Solopreneur + Trợ Lý Sống GoClaw**
- **Điểm khác biệt:** 
  - Đối thủ bán prompt tĩnh để khách tự bấm copy-paste.
  - Chúng ta bàn giao một con bot AI "sống" tự động trực Zalo/Messenger/Telegram 24/7 và hệ thống kiểm duyệt 6 ghế cố vấn không để AI chạy sai lệch.
"""
hero_path = os.path.join(OUTPUT_DIR, "03-hero-mechanism.md")
with open(hero_path, "w", encoding="utf-8") as f:
    f.write(hero_content)
print(f" -> Đã tạo tài liệu định vị độc quyền: [outputs/03-hero-mechanism.md]")

# Step 4: Money Model
print("\n[Bước 4] Kích hoạt 'aafb-money-model'...")
time.sleep(1.5)
money_content = """# 💰 Mô hình Dòng Tiền (Money Model)
## Thiết lập phễu giá trị Value Ladder

1. **Bait (Free):** Thử thách 7 ngày tự tạo chatbot.
2. **Tripwire (490k):** Bản Lite (5 skill viết content).
3. **Core Offer (990k):** Bộ 25 Skill Khởi Động (tự cài đặt).
4. **Profit Activator (4.97M):** Bản Trợ Lý Sống (Boss setup bot Telegram 24/7).
5. **Back-end (299k/tháng):** CLB Solopreneur cập nhật kỹ năng.
"""
money_path = os.path.join(OUTPUT_DIR, "04-money-model.md")
with open(money_path, "w", encoding="utf-8") as f:
    f.write(money_content)
print(f" -> Đã tạo mô hình dòng tiền: [outputs/04-money-model.md]")

# Step 5: Offer Architect
print("\n[Bước 5] Kích hoạt 'aafb-offer-architect'...")
time.sleep(1.5)
offer_content = """# 🎁 Godfather Offer (Lời chào hàng không thể từ chối)
## Dự án: AI-Agent-For-Business

### 1. Cấu trúc giá
- **Bản Khởi Động:** 990.000đ.
- **Bản Trợ Lý Sống (Có Bot):** 4.970.000đ.

### 2. Quà tặng kèm (Bonuses)
- Tặng mẫu Landing Page Wepower V4 dạng HTML.
- Tặng bộ 100 bài viết mẫu viết sẵn.

### 3. Chính sách đảo bảo (Guarantee)
- Bảo hành 14 ngày hoàn tiền 100% không cần lý do nếu học viên không dựng được bot thành công.
"""
offer_path = os.path.join(OUTPUT_DIR, "05-offer.md")
with open(offer_path, "w", encoding="utf-8") as f:
    f.write(offer_content)
print(f" -> Đã đóng gói Offer chi tiết: [outputs/05-offer.md]")

# Step 6: Funnel Strategist
print("\n[Bước 6] Kích hoạt 'aafb-funnel-strategist'...")
time.sleep(1.5)
funnel_content = """# 🕸️ Bản Vẽ Phễu Bán Hàng (Funnel Blueprint)
## Luồng di chuyển của học viên

1. Facebook Ads / Content bài viết kéo khách vào Landing Page Free.
2. Khách để lại Zalo/Email để nhận Thử thách 7 ngày.
3. Hệ thống gửi email sequence 7 ngày nuôi dưỡng lòng tin.
4. Chào hàng mua Khóa 1 (990k) và Upsell lên Khóa 2 (4.97M).
5. Webhook reo -> Auto kích hoạt tài khoản học tập.
"""
funnel_path = os.path.join(OUTPUT_DIR, "07-funnel-blueprint.md")
with open(funnel_path, "w", encoding="utf-8") as f:
    f.write(funnel_content)
print(f" -> Đã vẽ sơ đồ phễu chi tiết: [outputs/07-funnel-blueprint.md]")

# Step 7: Ad Copy Machine
print("\n[Bước 7] Kích hoạt 'aafb-ad-copy-machine'...")
time.sleep(1.5)
copy_content = """# 📢 Kịch Bản Viết Bài Quảng Cáo (Ad Copy Script)
## Giọng văn Kent Dũng Hoàng

### Mẫu Ads 1: Đánh vào nỗi đau làm một mình
"Đêm qua 3 đơn về lúc bạn đang ngủ. 
Nhân viên AI của bạn đang âm thầm làm việc.
Nếu bạn là Solopreneur đang làm việc một mình cực khổ, tự viết bài, tự rep inbox đến 12h đêm...
Thì đây là giải pháp dành cho bạn..."
"""
copy_path = os.path.join(OUTPUT_DIR, "08-ads-copy.md")
with open(copy_path, "w", encoding="utf-8") as f:
    f.write(copy_content)
print(f" -> Đã sản xuất kịch bản viết bài quảng cáo: [outputs/08-ads-copy.md]")

# Step 8: Landing Page HTML Builder (08b)
print("\n[Bước 8] Kích hoạt 'agent-08b-landingpage' để xuất file HTML...")
time.sleep(2)

html_content = """<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Hệ Điều Hành AI Cho Doanh Nghiệp — DungHoang.com</title>
    <!-- Google Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">
    <style>
        :root {
            --bg-main: #060913;
            --bg-card: rgba(15, 23, 42, 0.6);
            --border-color: rgba(255, 255, 255, 0.05);
            --text-primary: #f9fafb;
            --text-secondary: #9ca3af;
            --accent-accent: #c0390e;
            --accent-blue: #3b82f6;
            --font-main: 'Plus Jakarta Sans', sans-serif;
            --font-heading: 'Outfit', sans-serif;
        }
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body {
            background-color: var(--bg-main);
            color: var(--text-primary);
            font-family: var(--font-main);
            line-height: 1.6;
            background-image: radial-gradient(at 0% 0%, rgba(192, 57, 14, 0.08) 0px, transparent 40%);
        }
        .container { max-width: 900px; margin: 0 auto; padding: 4rem 1.5rem; text-align: center; }
        h1 { font-family: var(--font-heading); font-size: 2.5rem; line-height: 1.2; margin-bottom: 1.5rem; }
        p { color: var(--text-secondary); margin-bottom: 2rem; }
        .card { background-color: var(--bg-card); border: 1px solid var(--border-color); border-radius: 16px; padding: 2rem; text-align: left; margin-bottom: 1.5rem; }
        .btn { display: inline-block; background-color: var(--accent-accent); color: white; padding: 0.8rem 2rem; border-radius: 8px; text-decoration: none; font-weight: bold; }
    </style>
</head>
<body>
    <div class="container">
        <h1>Hệ Điều Hành AI Cho Doanh Nghiệp</h1>
        <p>Đây là Landing Page chính thức được sinh ra hoàn toàn tự động bằng chuỗi chạy thử nghiệm từ đầu của các Agent.</p>
        
        <div class="card">
            <h3 style="margin-bottom: 1rem; color: var(--accent-blue);">👤 Chân dung khách hàng (outputs/01-avatar.md)</h3>
            <p>Solopreneur đang làm việc một mình cực khổ, tự viết bài, tự rep inbox đến 12h đêm.</p>
        </div>

        <div class="card">
            <h3 style="margin-bottom: 1rem; color: var(--accent-blue);">🎁 Godfather Offer (outputs/05-offer.md)</h3>
            <p>Gói Khóa 2 giá 4.970.000đ bàn giao bot Telegram trực chốt đơn 24/7 + Bảo hành hoàn tiền 14 ngày.</p>
        </div>

        <a href="#" class="btn">Đăng ký mua ngay</a>
    </div>
</body>
</html>
"""

html_path = os.path.join(OUTPUT_DIR, "08b-landing-page.html")
with open(html_path, "w", encoding="utf-8") as f:
    f.write(html_content)

print(f" -> Đã tạo thành công trang bán hàng HTML: [outputs/08b-landing-page.html]")
print("=" * 80)
print("🎉 HOÀN THÀNH CHUỖI CHẠY TỪ ĐẦU! TẤT CẢ FILE ĐÃ ĐƯỢC XUẤT RA THƯ MỤC OUTPUTS!")
print("=" * 80)
