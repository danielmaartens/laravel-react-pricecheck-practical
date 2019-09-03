# laravel-react-pricecheck-practical

### Assumptions
- all assumptions taken were from the spec.
- No additional assumptions were considered as the spec was not ambiguous.

## Requirements
### Without Docker
- Laravel
- Node >=8
- PHP
- composer

Once you have the above installed run the following:
```
composer install
npm install
npm run dev
php artisan --port=3330
```

### Using Docker
#### Windows download Docker
- https://download.docker.com/win/stable/Docker%20for%20Windows%20Installer.exe

Once you have docker desktop installed you can simply run the following:
```
docker build -t pricecheck/practical .
docker run -p 3330:3330 pricecheck/practical
```
