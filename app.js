var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require('cors')
const helmet = require('helmet')
const compression = require('compression')

const router = require('./server/main/routes')

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cookieParser());
app.use(helmet())
app.use(compression())

const isProduction = process.env.NODE_ENV === 'production'
const origin = {
  origin: isProduction ? 'https://quiz-thin.herokuapp.com/' : '*',
}
app.use(cors(origin))

app.use(express.static(path.join(__dirname, 'client/build')));

app.use('/', router)

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname+"/client/build/index.html"))
})

module.exports = app;
