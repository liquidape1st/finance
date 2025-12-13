package com.example.finance.service;

import com.example.finance.exception.BusinessException;
import com.example.finance.model.Order;
import com.example.finance.model.OrderHistory;
import com.example.finance.model.OrderItem;
import com.example.finance.model.Product;
import com.example.finance.pageable.OrderPageableObjectSearch;
import com.example.finance.pageable.PageableObject;
import com.example.finance.repository.OrderHistoryRepository;
import com.example.finance.repository.OrderRepository;
import com.example.finance.repository.ProductRepository;
import com.example.finance.schemas.request.ChangeOrderStatusRequest;
import com.example.finance.schemas.request.OrderItemRequest;
import com.example.finance.schemas.request.OrderRequest;
import com.example.finance.util.Calculator;
import com.example.finance.util.ObjectUtils;
import com.example.finance.util.RandomUtils;
import com.fasterxml.jackson.core.JsonProcessingException;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class OrderService extends BaseService<Order, String> implements AService<Order, OrderRequest, String> {

    private final OrderRepository orderRepository;
    private final TelegramService telegramService;
    private final ProductRepository productRepository;
    private final OrderHistoryRepository orderHistoryRepository;
    private final Calculator calculator;
    private final ObjectUtils objectUtils;
    private final GhnService ghnService;

    @Override
    public List<Order> findAllEntities() {
        return orderRepository.findAll();
    }

    @Override
    public Page<Order> searchEntities(PageableObject pageableObject) {
        return orderRepository.search(pageableObject.getQuery(), pageableObject.toPageRequest());
    }

    public Page<Order> searchEntities(OrderPageableObjectSearch pageableObject) {
        return orderRepository.search(pageableObject.getQuery(), pageableObject.getStatus(), pageableObject.toPageRequest());
    }

    @Override
    @Transactional
    public Order createEntity(OrderRequest request) {
        Order order = buildNewOrder(request);
        return orderRepository.save(order);
    }

    @Override
    public Order updateEntityById(String s, OrderRequest request) {
        return null;
    }

    @Override
    public Order findEntityById(String code) {
        return findByIdOrThrow(code);
    }

    @Override
    public void removeEntityById(String code) {
        orderRepository.deleteById(code);
    }

    @Override
    public List<Order> removeEntitiesByIds(List<String> strings) {
        return deleteByIds(strings);
    }

    @Override
    @Deprecated
    public void mapRequestToEntity(Order entity, OrderRequest request) {
    }

    @Override
    protected JpaRepository<Order, String> getRepository() {
        return orderRepository;
    }

    @Override
    protected String getEntityName() {
        return "Order";
    }

    /**
     * Hàm này được sử dụng cho việc tạo đơn hàng mới
     *
     * @param request body yêu cầu cơ cho tạo đơn
     * @return Order
     */
    private Order buildNewOrder(OrderRequest request) {

        Order order = new Order();
        // Set code
        order.setCode(RandomUtils.randomUppercaseCode());
        // Set thông tin liên hệ cơ bản
        order.setCustomerName(request.getCustomerName());
        order.setCustomerPhone(request.getCustomerPhone());
        order.setCustomerEmail(request.getCustomerEmail());
        order.setCustomerNote(request.getCustomerNote());
        // Set địa chỉ cụ thể
        order.setCustomerProvinceId(request.getCustomerProvinceId());
        order.setCustomerProvinceName(ghnService.getProvinceNameById(request.getCustomerProvinceId())
                .orElseThrow(() -> new BusinessException("Tỉnh/thành không hợp lệ")));
        order.setCustomerDistrictId(request.getCustomerDistrictId());
        order.setCustomerDistrictName(ghnService.getDistrictNameById(request.getCustomerProvinceId(), request.getCustomerDistrictId())
                .orElseThrow(() -> new BusinessException("Quận/huyện không hợp lệ")));
        order.setCustomerWardCode(request.getCustomerWardCode());
        order.setCustomerWardName(ghnService.getWardNameByCode(request.getCustomerDistrictId(), request.getCustomerWardCode())
                .orElseThrow(() -> new BusinessException("Xã/phường không hợp lệ")));
        order.setCustomerAddress(request.getCustomerAddress());
        // Set phương thức thanh toán
        order.setPaymentMethod(request.getPaymentMethod());
        // Set trạng thái cho đơn hàng mới
        order.setStatus(Order.OrderStatus.PENDING);
        // Set trạng thái thanh toán
        order.setPaymentStatus(Order.PaymentStatus.PENDING);
        // Tính tiên và chi phí cho đơn hàng
        BigDecimal subTotal = BigDecimal.ZERO;
        for (OrderItemRequest orderItemRequest : request.getItems()) {
            Optional<Product> productOptional = productRepository.findByCode(orderItemRequest.getProductCode());
            if (productOptional.isPresent()) {
                Product product = productOptional.get();
                int requiredQuantity = orderItemRequest.getQuantity();

                if (requiredQuantity > product.getStock()) {
                    throw new BusinessException("Insufficient stock for product: " + product.getName());
                } else {
                    BigDecimal price = product.getPrice();
                    BigDecimal quantity = BigDecimal.valueOf(requiredQuantity);
                    subTotal = subTotal.add(price.multiply(quantity));
                    // Tạo order mới
                    OrderItem orderItem = new OrderItem();
                    // Set các dữ liệu liên quan
                    orderItem.setOrder(order);
                    orderItem.setProduct(product);
                    orderItem.setQuantity(requiredQuantity);
                    orderItem.setPrice(product.getPrice());
                    // Thêm order item mới vào item
                    order.getItems().add(orderItem);
                }
            } else {
                throw new BusinessException("Product Not Found");
            }
        }
        // Tính toán phí vận chuyển
        Calculator.CalculatorInput calculatorInput = Calculator.CalculatorInput
                .builder()
                .items(order.getItems().stream().map((s) -> new Calculator.CalculatorItemInput(s.getProduct(), s.getQuantity())).toList())
                .toDistrictId(order.getCustomerDistrictId())
                .toWardCode(order.getCustomerWardCode())
                .build();
        BigDecimal feeShip = BigDecimal.valueOf(calculator.calculatorFee(calculatorInput));
        // Set nốt các giá trị tiền còn lai
        order.setSubTotal(subTotal);
        order.setFeeShip(feeShip);
        order.setTotal(subTotal.add(feeShip));
        String text = """
                📩 *THÔNG BÁO ĐƠN HÀNG MỚI*
                ───────────────────────
                👤 *Đơn hàng:* %s
                📧 *Tên đặt hàng:* %s
                📱 *Số người đặt:* %s
                💬 *Ghi chú:*
                %s
                """.formatted(
                order.getCode(),
                request.getCustomerName(),
                request.getCustomerPhone(),
                request.getCustomerNote()
        );
        telegramService.sendMessage(text);
        return order;
    }

    /**
     *
     * @param oldOrder: thông tin đơn hàng cũ
     * @param newOrder: thông tin đơn hàng mới
     */
    @Transactional
    protected void logOrderHistory(Order oldOrder, Order newOrder) {
        OrderHistory orderHistory = new OrderHistory();
        orderHistory.setOrder(newOrder);
        orderHistory.setNewStatus(newOrder.getStatus());
        orderHistory.setNewPaymentStatus(newOrder.getPaymentStatus());
        orderHistory.setOldStatus(oldOrder.getStatus());
        orderHistory.setOldPaymentStatus(oldOrder.getPaymentStatus());
        orderHistoryRepository.save(orderHistory);
    }

    @Transactional
    public void changeStatusOrder(ChangeOrderStatusRequest request) {
        try {
            Order foundedOrder = findEntityById(request.getCode());
            // Sao chép dữ liệu cũ cái
            Order oldOrder = objectUtils.deepClone(foundedOrder, Order.class);
            // Gán dữ liệu mới vô
            foundedOrder.setStatus(request.getStatus());
            // Lưu lại cái đã
            Order newOrder = orderRepository.save(foundedOrder);
            // Ném vào auto log
            logOrderHistory(oldOrder, newOrder);
        } catch (JsonProcessingException e) {
            throw new BusinessException("Thực hiện sao chép dữ liệu đơn hàng cũ thất bại");
        }

    }
}

