FROM mysql:8.0

ENV MYSQL_ROOT_PASSWORD=toctou_admin_router
ENV MYSQL_DATABASE=database

CMD ["mysqld", "--default-authentication-plugin=mysql_native_password"]
EXPOSE 3306