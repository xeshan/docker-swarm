FROM ubuntu/apache2

RUN apt-get update -y \
    && apt-get install php -y && apt-get -y install php-mbstring \
    && apt-get install -y php-intl \
    && apt-get install -y php-simplexml \
    && apt install composer -y \
    && composer create-project --prefer-dist cakephp/app javatpoint  \
    && cp -rf javatpoint /var/www/html/
COPY apache2.conf /etc/apache2/apache2.conf
#COPY apache2.conf /etc/apache2/apache2.conf
CMD ["source","/etc/apache2/envvars"]
ENTRYPOINT ["apache2"]
#RUN cp -rf javatpoint /usr/local/apache2/htdocs/javatpoint
CMD ["-k","start"]
EXPOSE 80



