requirejs.config({
    baseUrl: 'src',
    paths: {
        'angular': '../vendor/angular/angular',
        'angular-route': '../vendor/angular-route/angular-route',
        'angular-resource': '../vendor/angular-resource/angular-resource',
        'angular-satellizer': '../vendor/satellizer/satellizer',
        'angular-bootstrap': '../vendor/angular-bootstrap/ui-bootstrap-tpls',
        'text': '../vendor/requirejs-text/text',
        'moment': '../vendor/moment/moment'
    },
    shim: {
        'angular': {
            exports: 'angular'
        },
        'angular-route': ['angular'],
        'angular-resource': ['angular'],
        'angular-satellizer': ['angular'],
        'angular-bootstrap': ['angular'],
        'moment': {
            exports: 'moment'
        }
    },
    packages: [
        'screen',
        'module/user',
        'module/event'
    ],
    deps: ['bootstrap']
});
