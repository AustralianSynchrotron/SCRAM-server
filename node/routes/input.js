/**
 * Created on 22/03/2017.
 */

var express = require('express');
var router = express.Router();

var bodyParser = require('body-parser');
var parseUrlEncoded = bodyParser.urlencoded({extended: false});

var pvDb = require(__dirname + '/../models/pv');


router.route('/:source')
    .post(parseUrlEncoded,function(req,res){
        if (req.body.alh_string){
            console.log(req.body.alh_string);
            var t = Date.now();
            // var key_list = ['Date','Time','PV','Status','Severity','Value'];
            var alh_list = req.body.alh_string.replace(' : ', ' ').match(/\S+/g) || [];

            var new_pv = new pvDb({
                pv_name: alh_list[2],
                pv_value: alh_list[5],
                pv_date: alh_list[0] + ' ' + alh_list[1],
                pv_status: alh_list[3],
                pv_severity: alh_list[4],
                created_at: t
            });

            new_pv.save(function(err,pv){
                if (err) return console.error(err);
                console.log(pv);
            });

            res.sendStatus(201);
        }
        else {
            // console.log('Not Found');
            res.sendStatus(404);
        }

    });

module.exports = router;