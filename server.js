// server.js
const bodyParser = require('body-parser')
var express = require('express');
var app = express();
app.use(bodyParser.urlencoded({ extended: false }))

var cors = require('cors');
app.use(cors({optionSuccessStatus: 200}));  // some legacy browsers choke on 204
app.use(express.static('public'));

var date = new Date()


app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});


app.get("/api/timestamp/:date_string?", (req, res) => {
  const reqDate = req.params.date_string
  const utc = new Date(reqDate).toUTCString()
  const unixDate = new Date(reqDate).getTime()

  if (reqDate === undefined) {
    res.json({"unix": date.toUTCString(), "utc":date.getTime()})
  } 

  else if ((utc === 'Invalid Date') && (isNaN(reqDate) === false) ){
    console.log(reqDate)
    res.json({"unix": reqDate, "utc": new Date(reqDate*1000)})
  }
   res.json({"unix": unixDate, "utc": utc})
 
})


// listen for requests :)
var listener = app.listen(3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});