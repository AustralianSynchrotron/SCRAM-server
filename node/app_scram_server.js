/**
 * Created on 21/03/2017.
 */

var express = require('express');
var app = express();

var input = require('./routes/input');
var root = require('./routes/root');

var favicon = require('serve-favicon');

app.use(express.static(__dirname + '/public'));
app.use(favicon('public/egg-icon.png'));
app.use('/',root);
app.use('/input',input);

module.exports = app;
