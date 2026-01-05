FROM n8nio/n8n:latest

USER root

# 1. Cài đặt Python và các công cụ cần thiết cho Alpine
# Thêm python3-dev và build-base nếu sau này bạn cần cài các thư viện nặng
RUN apk add --update --no-cache \
    python3 \
    py3-pip \
    make \
    g++

# 2. Tạo môi trường ảo hoặc cấu hình pip để cài đặt thư viện
# Trên Alpine mới, cài trực tiếp bằng pip có thể yêu cầu --break-system-packages
RUN python3 -m pip install --upgrade pip --break-system-packages && \
    pip3 install --no-cache-dir --break-system-packages pandas requests

# Trả lại quyền cho user node (mặc định của n8n)
USER node