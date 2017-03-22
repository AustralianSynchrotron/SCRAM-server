/**
 * Created on 22/03/2017.
 */

var express = require('express');
var router = express.Router();

var bodyParser = require('body-parser');
var parseUrlEncoded = bodyParser.urlencoded({extended: false});

router.route('/:source')
    .post(parseUrlEncoded,function(req,res){
        console.log(req.body.alh_string);
        console.log(req.params.source);
        if (req.body.alh_string){
            console.log(req.body.alh_string);
        }
        else {
            console.log('Not Found');
        }
        res.sendStatus(200);
    });

module.exports = router;