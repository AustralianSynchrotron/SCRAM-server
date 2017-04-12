/**
 * Created on 23/03/2017.
 */
var mongoose = require('mongoose');
mongoose.connect('mongodb://10.6.100.198:27017/SCRAMtest');
var db = mongoose.connection;
db.on('error', console.error.bind(console,'MongoDB connection error: '));
var ScramSchema = mongoose.Schema;

var pvSchema = new ScramSchema({
    pv_name: {type: String, required: true},
    pv_value: {type: String, required: true},
    pv_date: {type: Date, required: true},
    pv_status: {type: String, required: true},
    pv_severity: {type: String, required: true},
    source: {type: String, default: 'ALH'},
    active_state: {type: Number, default: 0},   /* 0: null, 1: active, 2: complete */
    created_at: {type: Date, required: true},
    updated_at: Date,
    comments: String
});

var SCRAM_pv = mongoose.model('SCRAM_pv',pvSchema);

module.exports = SCRAM_pv;