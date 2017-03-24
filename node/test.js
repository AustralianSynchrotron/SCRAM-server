/**
 * Created on 22/03/2017.
 */

var request = require('supertest');
var app = require('./app_scram_server');
var assert = require('assert');

var rScan = require('redisscan');

var redis = require('redis');
var client = redis.createClient();

client.select('test'.length);

describe('Requests to the root path',function(){
    it('Returns a 200 status code',function(done){
        request(app)
            .get('/')
            .expect(200,done);
    });
    it('Require html format',function(done){
        request(app)
            .get('/')
            .expect('Content-Type',/html/,done);
    });
    it('Index page contains SCRAM',function(done){
        request(app)
            .get('/')
            .expect(/SCRAM/,done);
    });
});

describe('Requests to the /input path',function(){
    // before(function(){
    //     console.log(rScan({redis:client}));
    // });

    after(function(){
        client.flushdb();
    });

    it('Returns a 201 status code with alh_string',function(done){
        request(app)
            .post('/input/ALH/')
            .send('alh_string=22-Mar-2017 16:14:01 : SR14FPS01:BOX_STATUS_MONITOR NO_ALARM     NO_ALARM         Ok')
            .expect(201,done);
    });
    it('Returns a 404 status code without alh_string',function(done){
        request(app)
            .post('/input/ALH/')
            .send('alh_string=')
            .expect(404,done);
    });
    it('Data written to the redis database',function(done){
        request(app)
            .post('/input/ALH/')
            .send('alh_string=29-Mar-2017 09:14:01 : SR14FPS01:BOX_STATUS_MONITOR NO_ALARM     NO_ALARM         Ok')
            .expect(201)
            .then(function(){
                assert(rScan({redis:client,
                        each_callback:function(){
                            console.log()
                        }
                    }).length,1);
                done();
            });
    });
});