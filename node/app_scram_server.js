/**
 * Created on 21/03/2017.
 */

var express = require('express');
var app = express();

var input = require('./routes/input');
var root = require('./routes/root');

app.use(express.static(__dirname + '/public'));
app.use('/',root);
app.use('/input',input);

module.exports = app;
