/**
 * Created on 22/03/2017.
 */

var express = require('express');
var router = express.Router();

var bodyParser = require('body-parser');
var parseUrlEncoded = bodyParser.urlencoded({extended: false});

var pvDb = require(__dirname + '/models/pv');

var redis = require('redis');
var client = redis.createClient();
client.select(0);

router.route('/:source')
    .post(parseUrlEncoded,function(req,res){
        if (req.body.alh_string){
            // console.log(req.body.alh_string);
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

            // console.log(alh_list);
            // for(var i=0,len=alh_list.length; i<len; i++ ){
            //     client.hset(t,key_list[i],alh_list[i],function(error){
            //         if(error) throw error;
            //     });
            // }
            res.sendStatus(201);
        }
        else {
            // console.log('Not Found');
            res.sendStatus(404);
        }

    });

module.exports = router;