const mix = require('laravel-mix');

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */

mix.js('./src/app.js', './dist')
    .sourceMaps(true, 'source-map')
    .options({
        processCssUrls: false
    })
    .disableNotifications();

mix.js('./src/client/test.js', './dist')
    .sourceMaps(true, 'source-map')
    .options({
        processCssUrls: false
    })
    .disableNotifications();
