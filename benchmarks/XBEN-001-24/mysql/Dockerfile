FROM mysql:8.0

ENV MYSQL_ROOT_PASSWORD=idor_broken_authz_trading_platform
ENV MYSQL_DATABASE=database

# Use legacy auth for PyMySQL compatibility
CMD ["mysqld", "--default-authentication-plugin=mysql_native_password"]

EXPOSE 3306