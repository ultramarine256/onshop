FROM php:7.2-apache

RUN apt-get update

RUN apt-get install libzip-dev -y && docker-php-ext-install zip
RUN docker-php-ext-install bcmath
RUN apt-get install libxslt-dev -y && docker-php-ext-install xsl
RUN docker-php-ext-install soap
RUN apt-get install libpng-dev -y && docker-php-ext-install gd

EXPOSE 80