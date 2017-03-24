/**
 * Created on 22/03/2017.
 */
var express = require('express');
var router = express.Router();
const path = require('path');

var redis = require('redis');
var client = redis.createClient();
client.select(0);

router.route('/')
    .get(function(req,res){
        res.sendFile('/index.html');
    });

module.exports = router;