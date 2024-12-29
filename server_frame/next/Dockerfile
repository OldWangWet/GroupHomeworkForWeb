FROM node

# 切换到 root 用户
USER root

# 设置 npm 镜像源为淘宝镜像（加速）
RUN npm config set registry https://registry.npmmirror.com

# 设置工作目录
WORKDIR /app

# 给工作目录中的文件夹添加可执行权限
RUN chmod -R 755 /app

# 将当前目录的内容复制到容器的工作目录
COPY . .

# 安装项目的依赖
RUN npm install

# 安装 pm2，用于管理 Node.js 应用
RUN npm install pm2@latest -g

# 构建项目（适用于 Next.js 等需要构建的框架）
RUN npm run build

# 暴露容器的 3000 端口
EXPOSE 3000

# 使用 pm2-runtime 启动应用
CMD ["pm2-runtime", "start", "npm", "--", "run", "start"]

