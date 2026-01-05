FROM n8nio/n8n:latest

USER root

RUN apt-get update && apt-get install -y --no-install-recommends \
    python3 \
    python3-pip \
    python3-dev \
    build-essential \
    && rm -rf /var/lib/apt/lists/*

# (Tùy chọn) Cài thêm các thư viện Python nếu cần, ví dụ: pandas, requests
RUN pip3 install pandas requests

USER node