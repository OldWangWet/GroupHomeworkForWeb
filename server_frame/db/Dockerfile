FROM mysql:8.0

# 设置 MySQL root 密码
ENV MYSQL_ROOT_PASSWORD=123456

# 设置数据库初始化文件(替换成需要加载的sql文件名)
COPY ad.sql /docker-entrypoint-initdb.d/

# 暴露端口
EXPOSE 3306
