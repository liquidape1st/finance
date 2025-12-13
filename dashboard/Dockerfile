FROM node:18-alpine AS build

FROM node:18-alpine

WORKDIR /incense/frontend/incense_dashboard

# Cài đặt tzdata để hỗ trợ timezone
RUN apk add --no-cache tzdata

# Cấu hình timezone
ENV TZ=Asia/Ho_Chi_Minh

RUN npm install -g serve

# Copy the build files
COPY ./incense/frontend/incense_dashboard/build ./build

EXPOSE 8268

CMD ["serve", "-s", "build", "-l", "8268"]