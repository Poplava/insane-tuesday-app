'use strict';

var express = require('express'),
    app = express(),

    bodyParser = require('body-parser'),
    ejs = require('ejs'),

    config = require('./config'),
    routes = require('./routes'),

    mongoose = require('mongoose'),

    clientDir = __dirname + '/../client';

mongoose.connect(config.mongo.uri, config.mongo.options);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.engine('.html', ejs.__express);
app.set('views', clientDir);
app.set('view engine', 'html');

app.all('/', function(req, res) {
    if (process.env.NODE_ENV === 'development') {
        res.render('index-dev');
    } else if (process.env.NODE_ENV === 'production') {
        res.render('index');
    } else {
        throw new Error('Unknown NODE_ENV');
    }
});

app.use(express.static(clientDir));

routes(app);

app.listen(config.port, config.ip, function () {
    console.log(
        'App listening at http://%s:%s, mode %s',
        this.address().address,
        this.address().port,
        process.env.NODE_ENV
    );
});
