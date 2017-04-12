/**
 * Created on 22/03/2017.
 */

var express = require('express');
var router = express.Router();

var bodyParser = require('body-parser');
var parseUrlEncoded = bodyParser.urlencoded({extended: false});

var pvDb = require('../models/pv');

var socks = require('../app_scram_server');

router.route('/:source')
    .post(parseUrlEncoded,function(req,res){
        if (req.body.alh_string){
            console.log(req.body.alh_string);
            var t = Date.now();
            var alh_list = req.body.alh_string.replace(' : ', ' ').match(/\S+/g) || [];

            var active_state = 0;
            if (alh_list[4] === 'NO_ALARM'){
                active_state = 2; // 2 = Complete
            }
            else if ((alh_list[4] === 'MAJOR') || (alh_list[4] === 'MINOR')){
                active_state = 1; // 1 = active
            }
            else {
                active_state = 0; // 0 = null; place holder for other alarm types handling
            }

            console.log('active_state: ',active_state);

            var new_pv = new pvDb({
                pv_name: alh_list[2],
                pv_value: alh_list[5],
                pv_date: alh_list[0] + ' ' + alh_list[1],
                pv_status: alh_list[3],
                pv_severity: alh_list[4],
                created_at: t,
                active_state: active_state
            });

            new_pv.save(function(err,pv){
                if (err) return console.error(err);
                console.log(pv);
            });

            console.log('About to emit db_updated: ');
            socks.io.emit('db_updated',JSON.stringify(new_pv));

            res.sendStatus(201);
        }
        else {
            res.sendStatus(404);
        }

    });

module.exports = router;