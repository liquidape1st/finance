FROM n8nio/runners:1.121.0

USER root

# Đảm bảo các thư mục làm việc tồn tại
RUN mkdir -p /opt/runners/task-runner-javascript \
    && mkdir -p /opt/runners/task-runner-python

# Cài Python 3.11 trên Alpine (base của n8nio/runners)
RUN apk add --no-cache python3.11 py3.11-pip py3.11-venv

# Recreate venv của task-runner-python với Python 3.11
RUN rm -rf /opt/runners/task-runner-python/.venv \
    && python3.11 -m venv /opt/runners/task-runner-python/.venv \
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
