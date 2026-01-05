FROM n8nio/n8n:latest

USER root

# Detect và cài đặt Python dựa trên base image
RUN if command -v apk > /dev/null; then \
        apk update && \
        apk add --no-cache python3 py3-pip make g++; \
    elif command -v apt-get > /dev/null; then \
        apt-get update && \
        apt-get install -y python3 python3-pip build-essential && \
        rm -rf /var/lib/apt/lists/*; \
    else \
        echo "Unknown package manager"; \
        exit 1; \
    fi

# Cài đặt thư viện Python
RUN python3 -m pip install --no-cache-dir pandas requests

USER node