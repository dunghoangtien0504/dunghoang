-- Đổi course_id từ 'khoa1_686' → 'khoa-1'
-- Chạy từng câu theo thứ tự

-- 1. Tạo bản ghi mới trong course_products
INSERT INTO course_products (id, name, description, price)
SELECT 'khoa-1', name, description, price
FROM course_products WHERE id = 'khoa1_686';

-- 2. Chuyển lessons sang course_id mới
UPDATE lessons SET course_id = 'khoa-1' WHERE course_id = 'khoa1_686';

-- 3. Chuyển enrollments sang course_id mới
UPDATE enrollments SET course_id = 'khoa-1' WHERE course_id = 'khoa1_686';

-- 4. Chuyển orders (nếu có cột course_id)
UPDATE orders SET course_id = 'khoa-1' WHERE course_id = 'khoa1_686';

-- 5. Xóa bản ghi cũ
DELETE FROM course_products WHERE id = 'khoa1_686';
