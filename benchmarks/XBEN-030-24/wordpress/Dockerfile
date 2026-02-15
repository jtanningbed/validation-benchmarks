FROM wordpress:latest

# Enable allow_url_include for CVE-2023-6553 RFI exploit
RUN echo "allow_url_include=On" >> /usr/local/etc/php/conf.d/allow_url_include.ini

COPY . /var/www/html
ARG FLAG
ENV FLAG=$FLAG
RUN echo "$FLAG" > /opt/flag.txt
RUN chown -R www-data:www-data /var/www/html