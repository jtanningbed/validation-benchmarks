FROM mysql:8.4

ENV MYSQL_ROOT_PASSWORD=ssti_secret_art_gallery
ENV MYSQL_DATABASE=art_db

CMD ["mysqld", "--default-authentication-plugin=mysql_native_password"]
EXPOSE 3306