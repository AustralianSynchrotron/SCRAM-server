/**
 * Created on 22/03/2017.
 */
var express = require('express');
var router = express.Router();

var ejs = require('ejs');

var moment = require('moment');

var pvDb = require(__dirname + '/../models/pv');

router.route('/')
    .get(function(req,res){
        var count_result = 0;
        pvDb.find().count(function(err,count){
            if (err) return console.log(err);
            console.log('Number of Documents: ',count);
            count_result = count;
        });

        // get the last 10 results from the database to display on initial load
        q = pvDb.find().sort({pv_date:-1}).limit(10);
        q.exec(function(err,result){
            if (err) return console.log(err);
            console.log(result);
            res.render('index.ejs',{result: result, count: count_result, moment: moment});
        });
    });

module.exports = router;