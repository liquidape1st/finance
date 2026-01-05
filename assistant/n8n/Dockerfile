FROM n8nio/n8n:latest

USER root

# Cài đặt Python 3 và PIP (cho Alpine Linux)
RUN apt-get update && \
    apt-get install -y python3 python3-pip && \
    rm -rf /var/lib/apt/lists/*

# (Tùy chọn) Cài thêm các thư viện Python nếu cần, ví dụ: pandas, requests
RUN pip3 install pandas requests

USER node