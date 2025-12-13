# 🔧 Backend - Nhang Thơm Cội Nguồn

Backend REST API với **Spring Boot** và **RBAC** (Role-Based Access Control) cho dự án Nhang Thơm Cội Nguồn.

> ✅ **Backend đã được triển khai với PostgreSQL!** Xem [`BACKEND_SUMMARY.md`](./BACKEND_SUMMARY.md) để biết chi tiết.

## 🚀 Quick Start (Đã setup sẵn)

```bash
# 1. Đảm bảo PostgreSQL đang chạy
docker ps | grep my-postgres

# 2. Chạy backend
cd backend
.\mvnw.cmd spring-boot:run

# 3. Test API
curl http://localhost:8080/api/products
```

**Default Admin**: `admin@coinguon.vn` / `admin123`

**Swagger UI**: http://localhost:8080/swagger-ui/index.html

## 📋 Overview

Backend cung cấp REST APIs cho:
- ✅ Quản lý sản phẩm (Products)
- ✅ Giỏ hàng (Cart)
- ✅ Đơn hàng (Orders)
- ✅ Blog posts
- ✅ User authentication & authorization (RBAC)
- ✅ Thanh toán (VNPay, MoMo)
- ✅ Email service
- ✅ File upload

## 🛠️ Tech Stack

- **Java**: 17 hoặc 21
- **Spring Boot**: 3.2+
- **Spring Security**: Authentication & RBAC
- **Spring Data JPA**: Database ORM
- **MySQL/PostgreSQL**: Database
- **JWT**: Token-based authentication
- **Lombok**: Reduce boilerplate
- **Swagger/OpenAPI**: API documentation
- **JavaMailSender**: Email service

## 🚀 Quick Start

### 1. Tạo Project với Spring Initializr

Truy cập https://start.spring.io và chọn:

```
Project: Maven
Language: Java
Spring Boot: 3.2.x (latest stable)
Java: 17 hoặc 21

Dependencies:
✓ Spring Web
✓ Spring Data JPA
✓ Spring Security
✓ MySQL Driver (hoặc PostgreSQL)
✓ Validation
✓ Lombok
✓ Spring Boot DevTools
✓ Java Mail Sender
```

Generate và extract vào thư mục `backend/`

### 2. Cấu trúc Project

```
backend/
├── src/
│   ├── main/
│   │   ├── java/com/coinguon/nhangthom/
│   │   │   ├── config/              # Configurations
│   │   │   │   ├── SecurityConfig.java
│   │   │   │   ├── CorsConfig.java
│   │   │   │   └── SwaggerConfig.java
│   │   │   ├── controller/          # REST Controllers
│   │   │   │   ├── AuthController.java
│   │   │   │   ├── ProductController.java
│   │   │   │   ├── OrderController.java
│   │   │   │   ├── CartController.java
│   │   │   │   └── BlogController.java
│   │   │   ├── service/             # Business Logic
│   │   │   │   ├── UserService.java
│   │   │   │   ├── ProductService.java
│   │   │   │   ├── OrderService.java
│   │   │   │   └── EmailService.java
│   │   │   ├── repository/          # Data Access
│   │   │   │   ├── UserRepository.java
│   │   │   │   ├── ProductRepository.java
│   │   │   │   ├── OrderRepository.java
│   │   │   │   └── RoleRepository.java
│   │   │   ├── model/              # Entities
│   │   │   │   ├── User.java
│   │   │   │   ├── Role.java
│   │   │   │   ├── Permission.java
│   │   │   │   ├── Product.java
│   │   │   │   ├── Order.java
│   │   │   │   └── OrderItem.java
│   │   │   ├── dto/                # DTOs
│   │   │   │   ├── request/
│   │   │   │   └── response/
│   │   │   ├── security/           # Security
│   │   │   │   ├── JwtTokenProvider.java
│   │   │   │   ├── JwtAuthenticationFilter.java
│   │   │   │   └── CustomUserDetailsService.java
│   │   │   ├── exception/          # Exceptions
│   │   │   │   └── GlobalExceptionHandler.java
│   │   │   └── util/               # Utilities
│   │   └── resources/
│   │       ├── application.properties
│   │       └── templates/          # Email templates
│   └── test/
├── pom.xml
└── README.md
```

### 3. Configuration (application.properties)

```properties
# Server Configuration
server.port=3000
spring.application.name=nhang-thom-api

# Database Configuration
spring.datasource.url=jdbc:mysql://localhost:3306/nhang_thom_db
spring.datasource.username=root
spring.datasource.password=your_password
spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver

# JPA/Hibernate
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.MySQLDialect
spring.jpa.properties.hibernate.format_sql=true

# JWT Configuration
app.jwt.secret=your_secret_key_min_256_bits_for_HS256
app.jwt.expiration=604800000

# CORS
app.cors.allowed-origins=http://localhost:5173

# File Upload
spring.servlet.multipart.max-file-size=5MB
spring.servlet.multipart.max-request-size=5MB
app.upload.dir=uploads

# Email Configuration (Gmail)
spring.mail.host=smtp.gmail.com
spring.mail.port=587
spring.mail.username=your-email@gmail.com
spring.mail.password=your-app-password
spring.mail.properties.mail.smtp.auth=true
spring.mail.properties.mail.smtp.starttls.enable=true

# VNPay
vnpay.tmn-code=your_tmn_code
vnpay.hash-secret=your_hash_secret
vnpay.url=https://sandbox.vnpayment.vn/paymentv2/vpcpay.html
vnpay.return-url=http://localhost:5173/payment/callback

# Swagger
springdoc.api-docs.path=/api-docs
springdoc.swagger-ui.path=/swagger-ui.html
```

## 📡 API Endpoints

Xem chi tiết trong `TASKS.md` - Đây là tóm tắt:

### Authentication
- `POST /api/auth/register` - Đăng ký
- `POST /api/auth/login` - Đăng nhập
- `GET /api/auth/me` - Get current user

### Products
- `GET /api/products` - Danh sách (public)
- `GET /api/products/:id` - Chi tiết (public)
- `POST /api/products` - Tạo (ADMIN)
- `PUT /api/products/:id` - Cập nhật (ADMIN/MANAGER)
- `DELETE /api/products/:id` - Xóa (ADMIN)

### Cart
- `GET /api/cart` - Xem giỏ (authenticated)
- `POST /api/cart` - Thêm vào giỏ (authenticated)
- `PUT /api/cart/:id` - Cập nhật (authenticated)
- `DELETE /api/cart/:id` - Xóa (authenticated)

### Orders
- `GET /api/orders` - Danh sách (role-based)
- `POST /api/orders` - Tạo đơn (authenticated)
- `PUT /api/orders/:id/status` - Cập nhật (ADMIN/MANAGER)

### Blog
- `GET /api/posts` - Danh sách (public)
- `POST /api/posts` - Tạo (ADMIN)
- `PUT /api/posts/:id` - Cập nhật (ADMIN)

## 🔐 RBAC Implementation

### Roles
```java
public enum RoleName {
    ROLE_USER,      // Khách hàng - Mua hàng, xem đơn của mình
    ROLE_MANAGER,   // Quản lý - Quản lý sản phẩm, đơn hàng
    ROLE_ADMIN      // Admin - Full access
}
```

### Permissions
```java
public enum PermissionName {
    // Products
    PRODUCT_READ,    // Ai cũng có
    PRODUCT_CREATE,  // ADMIN, MANAGER
    PRODUCT_UPDATE,  // ADMIN, MANAGER
    PRODUCT_DELETE,  // ADMIN only
    
    // Orders
    ORDER_READ,      // USER (own orders), ADMIN (all)
    ORDER_CREATE,    // USER
    ORDER_UPDATE,    // ADMIN, MANAGER
    
    // Blog
    BLOG_READ,       // Public
    BLOG_WRITE,      // ADMIN
    
    // Users
    USER_MANAGE      // ADMIN only
}
```

