var mongojs = require('mongojs');

var databaseUrl = 'mongodb://localhost/hwData';
var collections = ['termperature'];
var option = {"auth":{"user":"admin","password":"123456"}}
var connect = mongojs(databaseUrl, collections,option);

module.exports = {
    connect: connect
};
