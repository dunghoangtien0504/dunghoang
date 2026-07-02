---
name: sab-ideation
description: "Validate ý tưởng & tìm mô hình kinh doanh phù hợp"
---
# SAB Ideation Command

Activate **Ideation Skill** — cố vấn khởi nghiệp phỏng vấn sâu, research real-time xu hướng thị trường và gợi ý mô hình kinh doanh phù hợp. Có hệ thống cảnh báo nếu thị trường bão hoà hoặc không đạt kỳ vọng tài chính.

## Agent
Load `agents/00-ideation-agent.md` (cố vấn validate ý tưởng & mô hình kinh doanh)

## Skill
Load `skills/ideation/SKILL.md` và tất cả references.

## Usage
```
/sab-ideation
```
Không cần argument — agent sẽ tự phỏng vấn từ đầu.

## Workflow
1. **Phỏng vấn 5 nhóm:** Mong muốn → Thế mạnh → Chuyên môn → Nguồn lực → Giới hạn
2. **Research real-time:** WebSearch xu hướng thị trường liên quan
3. **Phân tích & chấm điểm:** 6 tiêu chí × 10 điểm = /60
4. **Output:**
   - ✅ GỢI Ý nếu ≥ 36 điểm + thị trường còn miếng bánh
   - ⚠️ CẢNH BÁO nếu bão hoà hoặc không đạt kỳ vọng tài chính
5. **Bước tiếp theo:** Chuyển sang `/sab-research` để validate sâu hơn

## Nguyên tắc cốt lõi
- "Họ muốn" + "Thị trường cần" + "Còn miếng bánh" = Gợi ý
- Thiếu 1 trong 3 = Cảnh báo thẳng thắn
- Không nói điều người dùng muốn nghe nếu thực tế không ủng hộ
- Mọi gợi ý phải có data real-time từ WebSearch
