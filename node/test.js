/**
 * Created on 22/03/2017.
 */

var request = require('supertest');
var app = require('./app_scram_server');

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
});

