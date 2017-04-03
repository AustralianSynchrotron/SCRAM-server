/**
 * Created on 21/03/2017.
 */

var express = require('express');
var app = express();

var input = require('./routes/input');
var root = require('./routes/root');

var favicon = require('serve-favicon');

// specify ejs as the template engine
app.set('view engine','ejs');

app.use(express.static(__dirname + '/views'));
app.use(favicon('views/egg-icon.png'));
app.use('/',root);
app.use('/input',input);

module.exports = app;
