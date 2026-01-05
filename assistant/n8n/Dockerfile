FROM n8nio/n8n:latest

USER root
RUN apt-get update && apt-get install -y python3-pip build-essential
# Cài đặt Python và công cụ build cho Alpine

# Cài đặt thư viện Python
RUN python3 -m pip install --no-cache-dir --break-system-packages pandas requests

USER node