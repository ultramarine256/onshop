FROM phpstorm/php-72-apache-xdebug-27

RUN apt-get update

RUN apt-get install libzip-dev -y && docker-php-ext-install zip
RUN docker-php-ext-install bcmath
RUN apt-get install libxslt-dev -y && docker-php-ext-install xsl
RUN docker-php-ext-install soap
RUN apt-get install libpng-dev -y && docker-php-ext-install gd
RUN docker-php-ext-install mysqli && docker-php-ext-enable mysqli
RUN a2enmod rewrite

EXPOSE 80