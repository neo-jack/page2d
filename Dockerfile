# 构建阶段
FROM node:24-alpine AS build-stage

WORKDIR /app

# 复制 package 文件
COPY package*.json ./
COPY pnpm-lock.yaml ./

# 安装 pnpm 并安装依赖
RUN npm install -g pnpm@10
RUN pnpm install --frozen-lockfile

# 仅复制无密钥的配置模板；个人 .env 不进入镜像。
COPY .env.example ./.env

# 复制源代码（排除 node_modules）
COPY src ./src
COPY public ./public
COPY index.html ./
COPY vite.config.ts ./
COPY tsconfig.json ./
COPY tsconfig.app.json ./
COPY tsconfig.node.json ./

# 构建应用
RUN pnpm run build

# 生产阶段
FROM nginx:stable-alpine AS production-stage

# 复制自定义 nginx 配置
COPY nginx.conf /etc/nginx/conf.d/default.conf

# 复制构建产物
COPY --from=build-stage /app/dist /usr/share/nginx/html

# 暴露端口
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]