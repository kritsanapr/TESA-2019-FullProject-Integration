var express = require('express');
var bodyParser = require('body-parser');
var mongojs = require('./db');


var db = mongojs.connect;
var app = express();
app.use(bodyParser.json());

app.get('/', function (req, res) {
  res.send("Server is Running in Port : 3000");
})

//Add SensorData
app.post('/addSensorData', function (req, res) {
  var json = req.body;
  db.SensorData.insert(json, function (err, docs) {
    console.log(docs);
    res.send(docs);
  });
})

//Get all user
app.get('/getSensorData', function (req, res) {
  db.SensorData.find(function (err, docs) {
    console.log(docs);
    res.send(docs);
  });

})
//
// //Get user by ID
// app.get('/user/:id', function (req, res) {
//   var id = parseInt(req.params.id);
//
//   db.users.findOne({
//     id: id
//   }, function (err, docs) {
//     if (docs != null) {
//       console.log('found', JSON.stringify(docs));
//       res.json(docs);
//     } else {
//       res.send('User not found');
//     }
//   });
// })
//
// //Update user by ID in body
// app.put('/user', function (req, res) {
//   console.log('Get from Api', req.body);
//   db.users.findAndModify({
//     query: {
//       id: req.body['id']
//     },
//     update: {
//       $set: req.body
//     },
//     new: true
//   }, function (err, docs) {
//     console.log('Update Done', docs);
//     res.json(docs);
//   });
// })

// //Delete user by ID
// app.delete('/deleteUser/:id', function (req, res) {
//   var id = parseInt(req.params.id);
//   db.users.remove({
//     id: id
//   }, function (err, docs) {
//     console.log(docs);
//     res.send(docs);
//   });
// })

module.exports = app;