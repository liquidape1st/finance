# 📋 Backend Tasks - Spring Boot + RBAC

Danh sách tasks để triển khai backend cho Nhang Thơm Cội Nguồn với Spring Boot và RBAC.

---

## 🏗️ Phase 1: Project Setup & Configuration

### 1.1 Initialize Spring Boot Project
- [ ] Tạo project với Spring Initializr (https://start.spring.io)
  - [ ] Java 17 hoặc 21
  - [ ] Maven hoặc Gradle
  - [ ] Spring Boot 3.2+
  - [ ] Dependencies:
    - [ ] Spring Web
    - [ ] Spring Data JPA
    - [ ] Spring Security
    - [ ] MySQL/PostgreSQL Driver
    - [ ] Lombok
    - [ ] Validation
    - [ ] Spring Boot DevTools

### 1.2 Project Structure
- [ ] Tạo cấu trúc package:
  ```
  src/main/java/com/coinguon/nhangthom/
  ├── config/              # Configuration classes
  ├── controller/          # REST Controllers
  ├── service/             # Business logic
  ├── repository/          # Data access layer
  ├── model/              # Entity models
  ├── dto/                # Data Transfer Objects
  ├── security/           # Security configs
  ├── exception/          # Custom exceptions
  └── util/               # Utility classes
  ```

### 1.3 Configuration Files
- [ ] `application.properties` hoặc `application.yml`
- [ ] Database configuration
- [ ] JPA/Hibernate configuration
- [ ] CORS configuration
- [ ] File upload configuration

---

## 🗄️ Phase 2: Database & Models

### 2.1 Database Setup
- [ ] Cài đặt MySQL/PostgreSQL
- [ ] Tạo database `nhang_thom_db`
- [ ] Configure connection trong `application.properties`

### 2.2 Entity Models
- [ ] **User** entity
  - [ ] id (Long, primary key, auto-increment)
  - [ ] email (unique, not null)
  - [ ] password (hashed)
  - [ ] fullName
  - [ ] phone
  - [ ] address
  - [ ] createdAt, updatedAt (timestamps)
  - [ ] ManyToMany relationship với Role

- [ ] **Role** entity (RBAC)
  - [ ] id (Long, primary key)
  - [ ] name (ADMIN, USER, MANAGER)
  - [ ] description
  - [ ] ManyToMany relationship với User
  - [ ] ManyToMany relationship với Permission

- [ ] **Permission** entity (RBAC)
  - [ ] id (Long, primary key)
  - [ ] name (READ_PRODUCT, WRITE_PRODUCT, etc.)
  - [ ] resource (PRODUCT, ORDER, BLOG, etc.)
  - [ ] action (CREATE, READ, UPDATE, DELETE)

- [ ] **Product** entity
  - [ ] id, name, category, price, image, description
  - [ ] stock, rating, soldCount
  - [ ] createdAt, updatedAt

- [ ] **Order** entity
  - [ ] id, userId, total, status
  - [ ] paymentMethod, paymentStatus
  - [ ] customerInfo (embedded)
  - [ ] OneToMany relationship với OrderItem

- [ ] **OrderItem** entity
  - [ ] id, orderId, productId, quantity, price

- [ ] **BlogPost** entity
  - [ ] id, title, slug, content, excerpt
  - [ ] image, author, category
  - [ ] publishedAt

- [ ] **Newsletter** entity
  - [ ] id, email, subscribedAt

### 2.3 Repositories
- [ ] UserRepository extends JpaRepository
- [ ] RoleRepository
- [ ] PermissionRepository
- [ ] ProductRepository
- [ ] OrderRepository
- [ ] OrderItemRepository
- [ ] BlogPostRepository
- [ ] NewsletterRepository

---

## 🔐 Phase 3: Security & RBAC

### 3.1 Spring Security Configuration
- [ ] SecurityConfig class
  - [ ] Configure HTTP security
  - [ ] Disable CSRF cho API
  - [ ] Configure CORS
  - [ ] Password encoder (BCrypt)
  - [ ] Authentication manager

### 3.2 JWT Implementation
- [ ] JwtTokenProvider class
  - [ ] Generate JWT token
  - [ ] Validate token
  - [ ] Get username from token
  - [ ] Set expiration time

- [ ] JwtAuthenticationFilter
  - [ ] Extract JWT from request
  - [ ] Validate token
  - [ ] Set authentication in SecurityContext

### 3.3 RBAC Implementation
- [ ] Tạo enum cho Roles
  ```java
  public enum RoleName {
      ROLE_USER,      // Khách hàng
      ROLE_ADMIN,     // Admin
      ROLE_MANAGER    // Quản lý
  }
  ```

- [ ] Tạo enum cho Permissions
  ```java
  public enum PermissionName {
      // Products
      PRODUCT_READ,
      PRODUCT_CREATE,
      PRODUCT_UPDATE,
      PRODUCT_DELETE,
      
      // Orders
      ORDER_READ,
      ORDER_CREATE,
      ORDER_UPDATE,
      ORDER_DELETE,
      
      // Blog
      BLOG_READ,
      BLOG_CREATE,
      BLOG_UPDATE,
      BLOG_DELETE,
      
      // Users
      USER_MANAGE
  }
  ```

- [ ] Custom annotations cho permission check
  ```java
  @RequirePermission("PRODUCT_CREATE")
  @RequireRole("ADMIN")
  ```

- [ ] PermissionEvaluator implementation
- [ ] Method security với @PreAuthorize

### 3.4 User Authentication
- [ ] CustomUserDetails implements UserDetails
- [ ] CustomUserDetailsService implements UserDetailsService
- [ ] Load user với roles và permissions

---

## 🎯 Phase 4: Core APIs

### 4.1 Authentication APIs
- [ ] **POST** `/api/auth/register` - Đăng ký
  - [ ] Validate input
  - [ ] Hash password
  - [ ] Assign default role (USER)
  - [ ] Return JWT token

- [ ] **POST** `/api/auth/login` - Đăng nhập
  - [ ] Validate credentials
  - [ ] Generate JWT
  - [ ] Return user info + token

- [ ] **GET** `/api/auth/me` - Get current user
  - [ ] Require authentication
  - [ ] Return user với roles & permissions

- [ ] **POST** `/api/auth/logout` - Đăng xuất
  - [ ] Invalidate token (optional)

### 4.2 Product APIs
- [ ] **GET** `/api/products` - Lấy danh sách
  - [ ] Pagination (page, size)
  - [ ] Sorting (newest, bestseller, rating)
  - [ ] Filtering (category)
  - [ ] Public access

- [ ] **GET** `/api/products/:id` - Chi tiết
  - [ ] Public access
  - [ ] Return 404 if not found

- [ ] **GET** `/api/products/search?q=` - Tìm kiếm
  - [ ] Search by name, description
  - [ ] Public access

- [ ] **POST** `/api/products` - Tạo sản phẩm
  - [ ] Require ADMIN role
  - [ ] Require PRODUCT_CREATE permission
  - [ ] Validate input
  - [ ] Save to database

- [ ] **PUT** `/api/products/:id` - Cập nhật
  - [ ] Require ADMIN/MANAGER role
  - [ ] Require PRODUCT_UPDATE permission
  - [ ] Validate input

- [ ] **DELETE** `/api/products/:id` - Xóa
  - [ ] Require ADMIN role
  - [ ] Require PRODUCT_DELETE permission
  - [ ] Soft delete recommended

### 4.3 Cart APIs
- [ ] **GET** `/api/cart` - Xem giỏ hàng
  - [ ] Require authentication
  - [ ] Return cart items của user hiện tại

- [ ] **POST** `/api/cart` - Thêm vào giỏ
  - [ ] Require authentication
  - [ ] Check product tồn tại
  - [ ] Check stock availability
  - [ ] Update quantity nếu đã có

- [ ] **PUT** `/api/cart/:itemId` - Cập nhật số lượng
  - [ ] Require authentication
  - [ ] Validate ownership
  - [ ] Check stock

- [ ] **DELETE** `/api/cart/:itemId` - Xóa item
  - [ ] Require authentication
  - [ ] Validate ownership

### 4.4 Order APIs
- [ ] **GET** `/api/orders` - Danh sách đơn hàng
  - [ ] USER: Chỉ xem đơn của mình
  - [ ] ADMIN/MANAGER: Xem tất cả
  - [ ] Pagination & filtering

- [ ] **GET** `/api/orders/:id` - Chi tiết đơn hàng
  - [ ] Validate ownership hoặc ADMIN role

- [ ] **POST** `/api/orders` - Tạo đơn hàng
  - [ ] Require authentication
  - [ ] Validate cart items
  - [ ] Check stock availability
  - [ ] Calculate total
  - [ ] Create order items
  - [ ] Update product soldCount
  - [ ] Clear cart sau khi tạo đơn

- [ ] **PUT** `/api/orders/:id/status` - Cập nhật trạng thái
  - [ ] Require ADMIN/MANAGER role
  - [ ] Require ORDER_UPDATE permission
  - [ ] Validate status transition

### 4.5 Blog APIs
- [ ] **GET** `/api/posts` - Danh sách bài viết
  - [ ] Public access
  - [ ] Pagination
  - [ ] Filter by category

- [ ] **GET** `/api/posts/:id` - Chi tiết
  - [ ] Public access

- [ ] **POST** `/api/posts` - Tạo bài viết
  - [ ] Require ADMIN role
  - [ ] Require BLOG_CREATE permission

- [ ] **PUT** `/api/posts/:id` - Cập nhật
  - [ ] Require ADMIN role
  - [ ] Require BLOG_UPDATE permission

- [ ] **DELETE** `/api/posts/:id` - Xóa
  - [ ] Require ADMIN role
  - [ ] Require BLOG_DELETE permission

### 4.6 Contact & Newsletter APIs
- [ ] **POST** `/api/contact` - Gửi form liên hệ
  - [ ] Validate input
  - [ ] Save to database (optional)
  - [ ] Send email notification

- [ ] **POST** `/api/newsletter/subscribe` - Đăng ký
  - [ ] Validate email
  - [ ] Check duplicate
  - [ ] Send welcome email

---

## 💳 Phase 5: Payment Integration

### 5.1 VNPay Integration
- [ ] VNPayService class
  - [ ] createPaymentUrl() - Tạo URL thanh toán
  - [ ] verifyPayment() - Verify callback
  - [ ] Hash security với HMAC SHA-512

- [ ] **POST** `/api/payment/vnpay/create`
  - [ ] Create payment URL
  - [ ] Save payment info

- [ ] **GET** `/api/payment/vnpay/callback`
  - [ ] Verify signature
  - [ ] Update order payment status

### 5.2 MoMo Integration
- [ ] MoMoService class
  - [ ] createPayment()
  - [ ] verifyIPN()
  - [ ] Hash với SHA-256

- [ ] **POST** `/api/payment/momo/create`
- [ ] **POST** `/api/payment/momo/ipn` - IPN callback

### 5.3 COD (Cash on Delivery)
- [ ] CODService
  - [ ] Validate COD availability
  - [ ] Calculate COD fee (if any)

---

## 📧 Phase 6: Email Service

### 6.1 Email Configuration
- [ ] JavaMailSender configuration
- [ ] Email templates với Thymeleaf

### 6.2 Email Services
- [ ] **Order Confirmation Email**
  - [ ] Send khi tạo đơn hàng thành công
  - [ ] Include order details

- [ ] **Payment Confirmation Email**
  - [ ] Send khi thanh toán thành công

- [ ] **Contact Form Email**
  - [ ] Send tới admin khi có contact form

- [ ] **Newsletter Welcome Email**
  - [ ] Send khi subscribe newsletter

- [ ] **Order Status Update Email**
  - [ ] Send khi status thay đổi

---

## 📁 Phase 7: File Upload

### 7.1 File Upload Service
- [ ] Configure file upload
  - [ ] Max file size
  - [ ] Allowed file types (jpg, png, webp)
  - [ ] Upload directory

- [ ] **POST** `/api/upload/image` - Upload ảnh
  - [ ] Require authentication
  - [ ] Validate file type & size
  - [ ] Save to local/cloud storage
  - [ ] Return URL

- [ ] **DELETE** `/api/upload/image/:filename`
  - [ ] Require ADMIN role
  - [ ] Delete file

---

## 🛡️ Phase 8: Security & Validation

### 8.1 Input Validation
- [ ] Validation annotations trên DTOs
  - [ ] @NotNull, @NotBlank
  - [ ] @Email, @Size
  - [ ] @Min, @Max
  - [ ] @Pattern (regex)

- [ ] Custom validators
  - [ ] UniqueEmail validator
  - [ ] PhoneNumber validator
  - [ ] Vietnamese phone format

### 8.2 Exception Handling
- [ ] GlobalExceptionHandler với @ControllerAdvice
  - [ ] handleValidationException
  - [ ] handleResourceNotFoundException
  - [ ] handleAccessDeniedException
  - [ ] handleMethodArgumentNotValid
  - [ ] handleGenericException

### 8.3 Security Best Practices
- [ ] Password encoding với BCrypt
- [ ] SQL injection prevention
- [ ] XSS prevention
- [ ] Rate limiting
- [ ] CORS configuration
- [ ] HTTPS trong production

---

## 📊 Phase 9: Admin Features

### 9.1 Dashboard APIs
- [ ] **GET** `/api/admin/dashboard/stats`
  - [ ] Total products
  - [ ] Total orders
  - [ ] Total revenue
  - [ ] Pending orders
  - [ ] Require ADMIN role

### 9.2 User Management
- [ ] **GET** `/api/admin/users` - Danh sách users
- [ ] **GET** `/api/admin/users/:id` - Chi tiết user
- [ ] **PUT** `/api/admin/users/:id/roles` - Assign roles
- [ ] **DELETE** `/api/admin/users/:id` - Deactivate user

### 9.3 Product Management
- [ ] **GET** `/api/admin/products/low-stock` - Sản phẩm sắp hết
- [ ] **PUT** `/api/admin/products/:id/stock` - Update stock
- [ ] Bulk operations

### 9.4 Order Management
- [ ] **GET** `/api/admin/orders?status=` - Filter by status
- [ ] **PUT** `/api/admin/orders/:id/status` - Update status
- [ ] **GET** `/api/admin/orders/export` - Export Excel

---

## 🧪 Phase 10: Testing

### 10.1 Unit Tests
- [ ] Service layer tests với JUnit 5
- [ ] Repository tests với @DataJpaTest
- [ ] Mock dependencies với Mockito

### 10.2 Integration Tests
- [ ] API endpoints tests với @SpringBootTest
- [ ] Security tests
- [ ] Database integration tests

### 10.3 API Documentation
- [ ] Integrate Swagger/OpenAPI
  - [ ] `springdoc-openapi` dependency
  - [ ] API descriptions
  - [ ] Request/response examples
  - [ ] Swagger UI tại /swagger-ui.html

---

## 📝 Phase 11: DTOs & Mappers

### 11.1 Request DTOs
- [ ] RegisterRequest
- [ ] LoginRequest
- [ ] CreateProductRequest
- [ ] UpdateProductRequest
- [ ] CreateOrderRequest
- [ ] UpdateOrderStatusRequest
- [ ] CreateBlogPostRequest
- [ ] ContactFormRequest

### 11.2 Response DTOs
- [ ] LoginResponse (token, user info)
- [ ] ProductResponse
- [ ] OrderResponse
- [ ] UserResponse (without password)
- [ ] BlogPostResponse
- [ ] ApiResponse<T> (generic response wrapper)

### 11.3 Mappers
- [ ] UserMapper (Entity ↔ DTO)
- [ ] ProductMapper
- [ ] OrderMapper
- [ ] BlogPostMapper
- [ ] Sử dụng MapStruct hoặc manual mapping

---

## 🚀 Phase 12: Deployment

### 12.1 Production Config
- [ ] `application-prod.properties`
- [ ] Environment-specific configs
- [ ] Database migration strategy
- [ ] Logging configuration (SLF4J + Logback)

### 12.2 Build & Package
- [ ] Build JAR file: `mvn clean package`
- [ ] Hoặc WAR file nếu deploy lên Tomcat
- [ ] Docker image (optional)

### 12.3 Deployment Options
- [ ] **Option 1**: Railway
  - [ ] Create Railway project
  - [ ] Add MySQL addon
  - [ ] Deploy

- [ ] **Option 2**: Render
  - [ ] Create web service
  - [ ] Add PostgreSQL database
  - [ ] Environment variables

- [ ] **Option 3**: AWS/Azure
  - [ ] EC2/App Service
  - [ ] RDS database
  - [ ] S3 cho file storage

- [ ] **Option 4**: VPS
  - [ ] Setup Java + MySQL
  - [ ] Systemd service
  - [ ] Nginx reverse proxy

---

## 📚 Phase 13: Documentation

### 13.1 API Documentation
- [ ] Swagger/OpenAPI docs tự động
- [ ] README cho backend
- [ ] Postman collection
- [ ] API examples

### 13.2 Code Documentation
- [ ] JavaDoc cho classes & methods
- [ ] Inline comments cho logic phức tạp
- [ ] Architecture documentation

---

## 🔍 Phase 14: Monitoring & Logging

### 14.1 Logging
- [ ] Configure Logback
- [ ] Request/Response logging
- [ ] Error logging
- [ ] Audit logging cho sensitive operations

### 14.2 Monitoring
- [ ] Spring Boot Actuator
  - [ ] Health check endpoint
  - [ ] Metrics endpoint
  - [ ] Info endpoint

---

## 🎨 Bonus Features (Optional)

### Analytics
- [ ] Track product views
- [ ] Track popular products
- [ ] Sales statistics

### Reviews & Ratings
- [ ] Review entity
- [ ] POST `/api/products/:id/reviews`
- [ ] GET `/api/products/:id/reviews`
- [ ] Calculate average rating

### Wishlist
- [ ] Wishlist entity
- [ ] Add/remove from wishlist APIs

### Notifications
- [ ] Notification system
- [ ] WebSocket cho real-time updates
- [ ] Push notifications

### Advanced Search
- [ ] Elasticsearch integration
- [ ] Full-text search
- [ ] Faceted search

---

## ✅ Summary Checklist

### Must Have (MVP)
- [ ] User authentication & RBAC
- [ ] Products CRUD
- [ ] Cart functionality
- [ ] Orders management
- [ ] Payment integration (VNPay)
- [ ] Email service

### Should Have
- [ ] Blog APIs
- [ ] Contact form
- [ ] Newsletter
- [ ] Admin dashboard APIs
- [ ] File upload
- [ ] API documentation (Swagger)

### Nice to Have
- [ ] Reviews & ratings
- [ ] Wishlist
- [ ] Advanced search
- [ ] Analytics
- [ ] WebSocket notifications

---

## 📦 Dependencies Summary

```xml
<!-- pom.xml -->
<dependencies>
    <!-- Spring Boot -->
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-web</artifactId>
    </dependency>
    
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-data-jpa</artifactId>
    </dependency>
    
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-security</artifactId>
    </dependency>
    
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-validation</artifactId>
    </dependency>
    
    <!-- Database -->
    <dependency>
        <groupId>com.mysql</groupId>
        <artifactId>mysql-connector-j</artifactId>
    </dependency>
    
    <!-- JWT -->
    <dependency>
        <groupId>io.jsonwebtoken</groupId>
        <artifactId>jjwt-api</artifactId>
        <version>0.12.3</version>
    </dependency>
    
    <!-- Lombok -->
    <dependency>
        <groupId>org.projectlombok</groupId>
        <artifactId>lombok</artifactId>
    </dependency>
    
    <!-- Email -->
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-mail</artifactId>
    </dependency>
    
    <!-- Swagger -->
    <dependency>
        <groupId>org.springdoc</groupId>
        <artifactId>springdoc-openapi-starter-webmvc-ui</artifactId>
        <version>2.3.0</version>
    </dependency>
</dependencies>
```

---

## 🎯 Estimated Timeline

| Phase | Estimated Time | Priority |
|-------|---------------|----------|
| 1. Project Setup | 1-2 giờ | 🔴 High |
| 2. Database & Models | 3-4 giờ | 🔴 High |
| 3. Security & RBAC | 4-6 giờ | 🔴 High |
| 4. Core APIs | 6-8 giờ | 🔴 High |
| 5. Payment Integration | 3-4 giờ | 🟡 Medium |
| 6. Email Service | 2-3 giờ | 🟡 Medium |
| 7. File Upload | 2 giờ | 🟢 Low |
| 8. Security & Validation | 2-3 giờ | 🔴 High |
| 9. Admin Features | 3-4 giờ | 🟡 Medium |
| 10. Testing | 4-6 giờ | 🟡 Medium |
| 11. DTOs & Mappers | 2-3 giờ | 🔴 High |
| 12. Deployment | 2-4 giờ | 🟢 Low |
| **Total** | **36-52 giờ** | |

---

## 📖 Resources

- [Spring Boot Docs](https://spring.io/projects/spring-boot)
- [Spring Security](https://spring.io/projects/spring-security)
- [Spring Data JPA](https://spring.io/projects/spring-data-jpa)
- [JWT for Java](https://github.com/jwtk/jjwt)
- [Springdoc OpenAPI](https://springdoc.org/)
- [MapStruct](https://mapstruct.org/)

---

**Chúc bạn triển khai thành công backend Spring Boot!** 🚀

