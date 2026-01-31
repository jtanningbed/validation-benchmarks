FROM php:7.4-apache

RUN apt-get update && apt-get install -y curl && rm -rf /var/lib/apt/lists/*

RUN docker-php-ext-install mysqli

WORKDIR /var/www/html/

COPY . /var/www/html/

ARG FLAG
ENV FLAG=$FLAG

RUN chown -R www-data:www-data /var/www/html

CMD ["apache2-foreground"]