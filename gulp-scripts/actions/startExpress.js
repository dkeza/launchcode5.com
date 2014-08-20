var connectLr = null;
var NODE_ENV = NODE_ENV || 'dev';

if(NODE_ENV === 'dev') { connectLr = require('connect-livereload'); }

var express           = require('express'),
    app               = express(),
    path              = require('path');

var enableCORS = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');

    // intercept OPTIONS method
    if ('OPTIONS' == req.method) {
        res.send(200);
    }
    else {
        next();
    }
};

module.exports = function(buildProperties) {
    app.use(enableCORS);
    if(connectLr) app.use(connectLr());
    app.use(express.static(buildProperties.expressRoot));
    app.listen(buildProperties.expressPort);

    //If we turn on html5mode, you also need to handle serving up index.html for any request that hasn't found a file after express.static.
//    app.use(function(req, res) {
//        res.sendfile(path.join(__dirname, '..', '..', 'build', 'express-tmp', 'index.html'));
//    });

    console.log('Server running at http://localhost:'+buildProperties.expressPort);
};