FROM n8nio/n8n:latest

USER root

# Alpine: dùng apk
RUN apk update && \
    apk add --no-cache python3 py3-pip make g++

# Cài đặt thư viện Python
RUN python3 -m pip install --no-cache-dir pandas requests

USER node