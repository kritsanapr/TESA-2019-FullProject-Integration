var mongojs = require('mongojs');

var databaseUrl = 'mongodb://localhost/TESA_obv_UBU';
var collections = ['SensorData'];
var collections = ['BeaconData'];
//var option = {"auth":{"user":"admin","password":"123456"}}
var connect = mongojs(databaseUrl, collections);

module.exports = {
    connect: connect
};
