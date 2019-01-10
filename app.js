var express = require('express');
var bodyParser = require('body-parser');
var mongojs = require('./db');
var beacon = require('./schema')
var app = express();

var db = mongojs.connect;
var app = express();
app.use(bodyParser.json());

app.get('/', function (req, res) {
  res.send("Server is Running in Port : 3000");
})

//Add SensorData เพิ่มข้อมูลลงในดาต้าเบส
app.post('/addSensorData', function (req, res) {
  var json = req.body;
  db.SensorData.insert(json, function (err, docs) {
    console.log(docs);
    res.send(docs);
  });
})

//Get all user  แสดงข้อมูลจากดาต้าเบส
app.get('/getSensorData', function (req, res) {
  db.SensorData.find(function (err, docs) {
    console.log(docs);
    res.send(docs);
  });

})


//receiveDa
app.post("/receiveData", function (req, res) {
  // var json = req.body;
  // db.SensorData.find(json, function (err, docs) {
  //   console.log(docs);
  //   res.send(docs);
  // });
  let temperature = new Temperature();
  let humidity = new Hudimity();
  let sensorData = new SensorData();

  AlldevEUI = JSON.stringify(req.body.DevEUI_uplink);
  devEUI = JSON.stringify(req.body.DevEUI_uplink.DevEUI);
  teamID = devEUI[devEUI.length - 3 ] + devEUI[devEUI.length - 2];
  payload = JSON.stringify(req.body.DevEUI_uplink.payload_hex);
  timestamp =JSON.stringify(req.body.DevEUI_uplink.Time);
  console.log('payload : ${payload}');
  console.log('body : ${devEUI}');
  console.log('teamID : ${teamID}');
  tempvalue = parseInt(payload.slice(5, 9), 16);
  temnum = payload.slice(5, 9);
  if (tempvalue >= 32768) {
    tempvalue = ((65536 - tempvalue) * -0.1).toFixed(2);
  } else {
    tempvalue = (tempvalue * 0.1).toFixed(2);
  }
  sensorData.timestamp = timestamp;
  sensorData.teamID = teamID;
  sensorData.temp = tempvalue;

  console.log('s_timestam : ${timestamp}');
  console.log('s_temp : ${tempvalue}');
  humidvalue = (parseInt(payload.slice(13, 15), 16) * 0.5).toFixed(2);
  sensorData.Hudirity = humidvalue;
  console.log('Humanity : ${humidvalue}');
})


app.post('/putSanam', function (req, res) {
  var json = new BeaconSchema(req.body);
  db.BeaconData.insert(json, function (err, docs) {
    console.log(docs);
    res.send(docs);
  });
})

app.get('/getSanam', function (req, res) {
  db.BeaconData.find(function (err, docs) {
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

//Delete user by ID
app.delete('/deleteUser/:id', function (req, res) {
  var id = parseInt(req.params.id);
  db.SensorData.remove({
    id: id
  }, function (err, docs) {
    console.log(docs);
    res.send(docs);
  });
})

module.exports = app;