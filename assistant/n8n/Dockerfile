FROM docker.n8n.io/n8nio/n8n:1.121.0

USER root

RUN apk add --no-cache \
    python3 \
    py3-pip \
    py3-virtualenv && \
    pip install --break-system-packages pipx && \
    pipx ensurepath

ENV PATH="/root/.local/bin:${PATH}"

USER node