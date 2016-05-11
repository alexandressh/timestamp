var express = require('express');
var app = express();
var moment = require('moment');

app.get('/:time', function (req, res) {
  var time = req.params.time,
      unixTime,
      humanTime,
      timeObj,
      momentDate;
  
  if (time.indexOf(" ") >= 0) {
    console.log(time);
    //time = time.replace(",", "").split(" ");
    humanTime = req.params.time;
    //momentDate = moment().year(time[2]).month(time[0]).date(time[1]);
    momentDate = moment(time, "MMMM DD, YYYY");
    unixTime = momentDate.unix();
  } else {
    unixTime = time;
    momentDate = moment.unix(time);
    humanTime = momentDate.format("MMMM DD, YYYY");
  }
  
  if (!momentDate.isValid()) {
    unixTime = humanTime = null;
  }
      
  timeObj = {
    "unix": unixTime,
    "natural": humanTime
  }
  
  res.send(timeObj);
});

app.get('/', function (req, res) {
  res.send('API Basejump: Timestamp microservice');
});

app.listen(8080, function () {
  console.log('Example app listening on port 8080!');
});