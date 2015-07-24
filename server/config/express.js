var express = require('express');
var swig = require('swig');
var stylus = require('stylus');
var logger = require('morgan');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var passport = require('passport');
var bodyParser = require('body-parser');
var multer = require('multer');

module.exports = function (app, config) {

    function compile(str, path) {
        return stylus(str).set('filename', path);
    }

//     This is where all the magic happens!
    app.engine('html', swig.renderFile);

    app.set('views', config.views);
    app.set('view engine', 'html');

    app.use(logger('dev'));
    app.use(cookieParser());
    app.use(bodyParser.urlencoded({
        extended: true
    }));
    app.use(bodyParser.json());
    app.use(session({
        secret: 'multi vision unicorns',
        saveUninitialized: true,
        resave: true
    }));
    app.use(passport.initialize());
    app.use(passport.session());
    app.use(stylus.middleware({
        src: config.rootPath + '/public',
        compile: compile
    }));
    
    //TODO: This is not a very elegant way of accepting file names with %, this is an interim fix to preventage breakage.

    app.use(multer({
        dest: '.././uploads/',
        rename: function (fieldname, filename, req) {
            var dvNo = req.body.dvNo;
            return dvNo + ' - ' + filename.replace('%', '');
        }
    }));
    

    app.use(express.static(config.staticFiles));
    app.use(express.static('./'));



};