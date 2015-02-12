requirejs.config({
    baseUrl: 'src',
    paths: {
        'angular': '../vendor/angular/angular',
        'angular-route': '../vendor/angular-route/angular-route',
        'angular-resource': '../vendor/angular-resource/angular-resource',
        'angular-satellizer': '../vendor/satellizer/satellizer',
        'text': '../vendor/requirejs-text/text'
    },
    shim: {
        'angular': {
            exports: 'angular'
        },
        'angular-route': ['angular'],
        'angular-resource': ['angular'],
        'angular-satellizer': ['angular']
    },
    packages: [
        'app',
        'module/user',
        'screen/root'
    ],
    deps: ['bootstrap']
});
