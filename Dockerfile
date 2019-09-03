FROM php:7-fpm-alpine

RUN mkdir -p app
WORKDIR /app

RUN apk --update add wget \
  curl \
  git \
  grep \
  build-base \
  libmemcached-dev \
  libmcrypt-dev \
  libxml2-dev \
  imagemagick-dev \
  pcre-dev \
  libtool \
  make \
  autoconf \
  g++ \
  cyrus-sasl-dev \
  libgsasl-dev \
  supervisor \
  nodejs \
  npm \
  openssl \
  zip \
  unzip \
  git

RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer
RUN echo "Installing dependencies and setting up app... Get some coffee, this may take a while..."
RUN echo "Installing PHP extensions..."
RUN docker-php-ext-install mbstring pdo >/dev/null 2>&1
RUN rm /var/cache/apk/*

COPY . /app
COPY .env /app/.env

RUN echo "Running composer install"
RUN composer install
RUN echo "Running npm install"
RUN npm install >/dev/null 2>&1

RUN npm run dev >/dev/null 2>&1

EXPOSE 3330

CMD php artisan serve --host=0.0.0.0 --port=3330
