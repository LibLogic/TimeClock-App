const IP = process.env.IP;
const PORT = process.env.PORT;
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const url = "mongodb://" + IP + "/timeclock";
mongoose.connect(url, { useFindAndModify: false, useCreateIndex: true, useNewUrlParser: true });

mongoose.Promise = global.Promise;

const app = express();

app.use(express.static("./public"));

app.use(bodyParser.json());

app.use("/api", require("./routes/api"));

app.use(function(err, req, res, next){
  console.log(err); 
  res.status(422).send({error: err.message});
});

app.listen(PORT, IP, function(){
	console.log("listening for requests at :" + IP + " on port " + PORT);
});