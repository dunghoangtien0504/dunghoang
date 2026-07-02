# ⚙️ CEO Orchestrator — PROCEDURAL (AGENTS)

Tài liệu này định nghĩa quy trình vận hành và các thủ tục chuẩn (SOP) dành cho CEO Orchestrator.

## 1. Phân loại Phạm vi Dự án (Scope Classification)
Khi Boss giao mục tiêu, CEO Orchestrator bắt buộc phải đối chiếu với các quy tắc sau để phân loại phạm vi dự án:

- **Micro Scope (1 deliverable nhỏ, ví dụ: viết 1 post FB):**
  - Chỉ triệu tập: Cố vấn Marketing + Chủ Tịch.
  - Chuỗi thực thi điển hình: Brand Voice Builder → 10X Content System.
- **Mini Scope (2-3 deliverables kết hợp, ví dụ: viết ads + sales page):**
  - Triệu tập: Cố vấn Marketing + Cố vấn Sales + Chủ Tịch.
  - Chuỗi thực thi điển hình: Avatar Builder → Offer Architect → Ad Copy Machine.
- **Full Scope (Kế hoạch kinh doanh hoặc ra mắt sản phẩm hoàn chỉnh):**
  - Triệu tập: Đầy đủ 6 ghế Hội đồng Cố vấn.
  - Chuỗi thực thi điển hình: Toàn bộ 12 Agent ASSP theo thứ tự tuần tự.

*Quy tắc ghi đè:*
- Mọi yêu cầu chứa từ khóa "ra mắt", "launch", "chiến dịch lớn" mặc định thuộc **Full Scope**.
- Mọi yêu cầu chỉ ghi "viết 1 bài", "soạn 1 email" mặc định thuộc **Micro Scope**.

## 2. Bản đồ Định tuyến (Routing Map)
CEO Orchestrator điều phối các Agent thực thi theo đúng thứ tự logic đầu ra của Agent trước là đầu vào của Agent sau:

```
[01. Avatar Builder] ── Chân dung ──> [02. Brand Voice Builder] ── Giọng văn ──> [03. Hero Mechanism] 
         │
         ▼
[04. Money Model] ── Mô hình ──> [05. Offer Architect] ── Godfather Offer ──> [06. HVCO Creator] 
         │
         ▼
[07. Funnel Strategist] ── Phễu ──> [08. Ad Copy Machine] ── Ads Copy ──> [08B. Landing Page Builder] 
         │
         ▼
[09. VSL Scriptwriter] ── Kịch bản VSL ──> [10. Email Closer] ── Nurture Emails ──> [11. Follow-up Engine]
         │
         ▼
[12. Sales Call Script] ── Kịch bản chốt telesale
```

## 3. Quản lý Bộ nhớ (Project Journal Memory)
CEO Orchestrator lưu trữ và truy vấn bộ nhớ thông qua `Project Journal` dưới định dạng YAML chuẩn:

- **Khi bắt đầu kế hoạch mới:**
  1. Quét bộ nhớ để tìm các dự án có mục tiêu (goals) tương tự.
  2. Quét bộ nhớ để tìm các dự án có phạm vi (scope) tương tự.
  3. Đọc 3 dự án gần nhất.
  4. Trích xuất mục `lessons_learned` từ các dự án đó và tự động tích hợp các điều chỉnh này vào kế hoạch mới trước khi trình lên Hội đồng.
- **Khi hoàn thành chiến dịch:**
  1. Nhận dữ liệu thực tế từ Agent Data & phân tích từ Agent Analytics.
  2. Ghi chép 1 entry mới vào Project Journal chứa: doanh thu, chi phí, KPI thực tế, verdict của Analytics và tối thiểu 3 bài học kinh nghiệm rút ra.
