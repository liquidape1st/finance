# Stage 1: Build Python 3.11 environment
FROM python:3.11-alpine3.20 AS python311

# Stage 2: Main image
FROM n8nio/runners:1.121.0

USER root

# Đảm bảo các thư mục làm việc tồn tại
RUN mkdir -p /opt/runners/task-runner-javascript \
    && mkdir -p /opt/runners/task-runner-python

# Copy toàn bộ Python 3.11 runtime từ stage 1
COPY --from=python311 /usr/local/bin/python3.11 /usr/local/bin/python3.11
COPY --from=python311 /usr/local/lib/python3.11 /usr/local/lib/python3.11
COPY --from=python311 /usr/local/lib/libpython3.11.so.1.0 /usr/local/lib/libpython3.11.so.1.0
COPY --from=python311 /usr/local/include/python3.11 /usr/local/include/python3.11

# Tạo symlinks cho shared library
RUN ln -sf /usr/local/lib/libpython3.11.so.1.0 /usr/local/lib/libpython3.11.so \
    && ln -sf /usr/local/bin/python3.11 /usr/local/bin/python311 \
    && apk add --no-cache libstdc++ gcompat \
    && ldconfig /usr/local/lib || true

# Recreate venv của task-runner-python với Python 3.11
RUN rm -rf /opt/runners/task-runner-python/.venv \
    && /usr/local/bin/python3.11 -m venv /opt/runners/task-runner-python/.venv \
    && /opt/runners/task-runner-python/.venv/bin/pip install --upgrade pip

# Cài đặt các packages JavaScript
RUN cd /opt/runners/task-runner-javascript \
    && pnpm add moment uuid

# Cài đặt thư viện Python (dùng venv 3.11)
RUN cd /opt/runners/task-runner-python \
    && /opt/runners/task-runner-python/.venv/bin/pip install \
        numpy \
        pandas \
        requests \
        newspaper3k \
        "lxml[html_clean]"

USER runner
