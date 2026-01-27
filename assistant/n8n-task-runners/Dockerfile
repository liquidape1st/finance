FROM n8nio/runners:1.121.0

USER root

# Đảm bảo các thư mục làm việc tồn tại
RUN mkdir -p /opt/runners/task-runner-javascript && \
    mkdir -p /opt/runners/task-runner-python

# Cài đặt các packages JavaScript
RUN cd /opt/runners/task-runner-javascript && pnpm add moment uuid

# Cài đặt thư viện Python
RUN cd /opt/runners/task-runner-python && uv pip install numpy pandas requests newspaper3k lxml[html_clean] playwright

USER runner