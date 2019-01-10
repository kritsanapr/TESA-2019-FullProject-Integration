//receiveData
app.post("/receiveData", function (req, res)  {
    let temperature = new temperature();
    let humidity = new Hudirity();
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