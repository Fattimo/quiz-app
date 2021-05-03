var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

const router = require('./server/main/routes')

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'client/build')));

app.use('/', router)

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname+"/client/build/index.html"))
})

module.exports = app;
