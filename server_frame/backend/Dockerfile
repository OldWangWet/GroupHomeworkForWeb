FROM openjdk:8

# 设置工作目录
WORKDIR /app
RUN mkdir images

# 将 JAR 文件复制到容器内的 /app 目录
COPY ad.jar /app/ad.jar
COPY images /app/images

# 容器启动时执行 java -jar ad.jar
CMD ["java", "-jar", "ad.jar"]

# 可选：暴露端口
EXPOSE 8803
