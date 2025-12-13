-- Tạo người dùng nếu chưa tồn tại, cho phép kết nối từ bất kỳ host nào (%)
CREATE USER IF NOT EXISTS 'liquidape'@'%' IDENTIFIED BY 'ComplexPa$$w0rd123@';

-- Cấp tất cả các quyền trên database 'finance' cho người dùng 'liquidape' từ bất kỳ host nào
GRANT ALL PRIVILEGES ON finance.* TO 'liquidape'@'%';

-- Áp dụng thay đổi quyền
FLUSH PRIVILEGES;

-- Bạn vẫn nên giữ user root cho mục đích quản trị