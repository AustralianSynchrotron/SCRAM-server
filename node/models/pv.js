/**
 * Created on 23/03/2017.
 */
var mongoose = require('mongoose');
// mongoose.connect('mongodb://10.6.100.198:27017/SCRAMtest');
var scramSchema = mongoose.Schema;

var pvSchema = new scramSchema({
    pv_name: {type: String, required: true},
    pv_value: {type: String, required: true},
    pv_date: {type: Date, required: true},
    pv_status: {type: String, required: true},
    pv_severity: {type: String, required: true},
    created_at: {type: Date, required: true},
    updated_at: Date,
    comments: String
});

var SCRAMtest = mongoose.model('SCRAMtest',pvSchema);

modeule.exports = SCRAMtest;