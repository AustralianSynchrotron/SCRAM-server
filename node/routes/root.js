/**
 * Created on 22/03/2017.
 */
var express = require('express');
var router = express.Router();
const path = require('path');

router.route('/')
    .get(function(req,res){
        res.sendFile('/index.html');
    });

module.exports = router;