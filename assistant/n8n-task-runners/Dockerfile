FROM n8nio/runners:1.121.0

USER root

# Cài đặt Python 3.11
RUN apt-get update && apt-get install -y \
    python3.11 \
    python3.11-venv \
    python3.11-dev \
    && rm -rf /var/lib/apt/lists/*

# Đặt Python 3.11 làm default
RUN update-alternatives --install /usr/bin/python3 python3 /usr/bin/python3.11 1
RUN update-alternatives --install /usr/bin/python python /usr/bin/python3.11 1

# Đảm bảo các thư mục làm việc tồn tại
RUN mkdir -p /opt/runners/task-runner-javascript && \
    mkdir -p /opt/runners/task-runner-python

# Cài đặt các packages JavaScript
RUN cd /opt/runners/task-runner-javascript && pnpm add moment uuid

# Cài đặt thư viện Python với Python 3.11
RUN cd /opt/runners/task-runner-python && python3.11 -m pip install --upgrade pip && \
    python3.11 -m pip install numpy pandas requests newspaper3k lxml[html_clean]

USER runner