FROM n8nio/runners:1.121.0
USER root
RUN cd /opt/runners/task-runner-javascript && pnpm add moment uuid
# Cài đặt thư viện Python
RUN cd /opt/runners/task-runner-python && uv pip install numpy pandas
USER runner