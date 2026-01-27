FROM n8nio/runners:1.121.0

USER root

# Đảm bảo các thư mục làm việc tồn tại
RUN mkdir -p /opt/runners/task-runner-javascript \
    && mkdir -p /opt/runners/task-runner-python

# Cài đặt các packages JavaScript
RUN cd /opt/runners/task-runner-javascript \
    && pnpm add moment uuid

# -----------------------------
# Python: tạo venv bằng uv + Python 3.11 (manylinux-compatible)
# -----------------------------
RUN cd /opt/runners/task-runner-python \
    && uv python install 3.11 \
    && uv venv --python 3.11 .venv \
    && . .venv/bin/activate \
    && uv pip install --upgrade pip \
    && uv pip install \
    "playwright==1.57.0" \
    numpy \
    pandas \
    requests \
    newspaper3k \
    "lxml[html_clean]"

# (TÙY CHỌN) Nếu bạn cần chạy Chromium ngay trong container:
# RUN cd /opt/runners/task-runner-python \
#     && . .venv/bin/activate \
#     && python -m playwright install --with-deps chromium

# Ưu tiên dùng python/pip trong venv khi chạy (rất quan trọng)
ENV PATH="/opt/runners/task-runner-python/.venv/bin:${PATH}"

# (TÙY CHỌN) Check nhanh lúc build để chắc chắn playwright cài được:
# RUN python -c "import playwright; print('playwright OK')"

USER runner