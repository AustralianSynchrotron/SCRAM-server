/**
 * Created on 21/03/2017.
 */

var express = require('express');
var app = express();

var server = require('http').Server(app);
var io = require('socket.io')(server);

module.exports = {server: server, io: io};

var input = require('./routes/input');
var root = require('./routes/root');

var favicon = require('serve-favicon');

// specify ejs as the template engine
app.set('view engine','ejs');

app.use(express.static(__dirname + '/views'));
app.use(favicon('views/egg-icon.png'));
app.use('/js',express.static(__dirname + '/node_modules/moment/min'));
app.use('/js',express.static(__dirname + '/node_modules/jquery/dist'));
app.use('/js',express.static(__dirname + '/node_modules/bootstrap/dist/js'));
app.use('/js',express.static(__dirname + '/node_modules/tether/dist/js'));
app.use('/js',express.static(__dirname + '/node_modules/web-audio-daw/build'));
app.use('/css',express.static(__dirname + '/node_modules/bootstrap/dist/css'));
app.use('/css',express.static(__dirname + '/node_modules/tether/dist/css'));
app.use('/css',express.static(__dirname + '/node_modules/font-awesome/css'));
app.use('/fonts',express.static(__dirname + '/node_modules/font-awesome/fonts'));
app.use('/',root);
app.use('/input',input);

io.on('connection', function (client) {
    console.log('socket connected: ');
    client.on('disconnect', function(){
        console.log('socket disconnected: ');
    });
});


