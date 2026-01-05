FROM n8nio/n8n:latest

USER root

# Cài đặt Python và công cụ build cho Alpine
RUN apk add --no-cache python3 py3-pip make g++

# Cài đặt thư viện Python
RUN python3 -m pip install --no-cache-dir --break-system-packages pandas requests

USER node