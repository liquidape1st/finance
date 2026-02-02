# Stage 1: Build Python 3.11 environment
FROM python:3.11-alpine3.20 AS python311

# Stage 2: Main image
FROM n8nio/runners:1.121.0

USER root

# Đảm bảo các thư mục làm việc tồn tại
RUN mkdir -p /opt/runners/task-runner-javascript \
    && mkdir -p /opt/runners/task-runner-python

# Copy toàn bộ /usr/local từ Python 3.11 image (bao gồm tất cả libs)
COPY --from=python311 /usr/local /usr/local

# Install runtime dependencies
RUN apk add --no-cache libstdc++ gcompat \
    && ldconfig /usr/local/lib || true

# Backup requirements của task runner gốc (nếu có)
RUN if [ -f /opt/runners/task-runner-python/requirements.txt ]; then \
        cp /opt/runners/task-runner-python/requirements.txt /tmp/runner-requirements.txt; \
    fi

# Recreate venv của task-runner-python với Python 3.11
RUN rm -rf /opt/runners/task-runner-python/.venv \
    && /usr/local/bin/python3.11 -m venv /opt/runners/task-runner-python/.venv \
    && /opt/runners/task-runner-python/.venv/bin/pip install --upgrade pip

# Cài dependencies của task runner trước (websockets, etc.)
RUN /opt/runners/task-runner-python/.venv/bin/pip install \
    websockets \
    pyzmq \
    msgpack \
    || true

# Nếu có requirements.txt gốc thì install
RUN if [ -f /tmp/runner-requirements.txt ]; then \
        /opt/runners/task-runner-python/.venv/bin/pip install -r /tmp/runner-requirements.txt; \
    fi

# Cài đặt các packages JavaScript
RUN cd /opt/runners/task-runner-javascript \
    && pnpm add moment uuid

# Cài đặt thư viện Python bổ sung của bạn
RUN /opt/runners/task-runner-python/.venv/bin/pip install \
    numpy \
    pandas \
    requests \
    newspaper3k \
    "lxml[html_clean]"

USER runner
