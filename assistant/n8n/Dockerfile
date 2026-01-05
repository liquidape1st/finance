FROM n8nio/n8n:latest

USER root

# Cài đặt Python 3 và PIP (cho Alpine Linux)
RUN apk add --update --no-cache python3 py3-pip

# (Tùy chọn) Cài thêm các thư viện Python nếu cần, ví dụ: pandas, requests
RUN pip3 install pandas requests

USER node