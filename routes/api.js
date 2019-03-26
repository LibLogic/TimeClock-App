const express = require("express");
const router = express.Router();
const Employee = require("../models/Employee");

router.get('/', function(req, res, next){
  Employee.find({}).then(function(employee){
    res.send(employee);
  }).catch(next);
});

router.post('/', function(req, res, next){
  Employee.create(req.body).then(function(employee){
    res.send(employee);
  }).catch(next);
});

router.put('/:id', function(req, res, next){
  Employee.findOneAndUpdate({_id: req.params.id}, req.body).then(function(employee){
     Employee.findOne({_id: req.params.id}).then(function(employee){
      res.send(employee);
    });
  }).catch(next);
});

router.delete('/:id', function(req, res, next){
  Employee.findOneAndDelete({_id: req.params.id}).then(function(employee){
    res.send(employee);
  }).catch(next);
});

router.put('/in/:id', function(req, res, next){
  Employee.findOne({_id: req.params.id})
  .then(function(employee){
  if( employee.isClockedIn == false ){
    var timeIn = new Date().getTime();
    Employee.findOneAndUpdate({_id: req.params.id}, { $set: { "timeIn": timeIn, "isClockedIn": true } } )
    .then(function(employee){
      Employee.findOne({_id: req.params.id})
      .then(function(employee){
        res.send(employee);
      });  
    });
  } else {
    res.end();
  }}).catch(next);
});

router.put('/out/:id', function(req, res, next){
  Employee.findOne({_id: req.params.id})
  .then(function(employee){
  if( employee.isClockedIn == true ){
    var timeOut = new Date().getTime();
    Employee.findOneAndUpdate({_id: req.params.id}, { $set: { "timeOut": timeOut, "isClockedIn": false } } )
      .then(function(employee){
      Employee.findOne({_id: req.params.id})
      .then(function(employee){
        var session = calculateMinutes(employee.timeIn, employee.timeOut);
        var dateString = new Date().toLocaleString("en-US", {timeZone: "America/New_York"}).slice(0, 9);
        Employee.findOneAndUpdate({_id: req.params.id}, { $push: { "sessions": { "date": dateString, "seconds": session } } })
        .then(function(employee){
          Employee.findOne({_id: req.params.id})
          .then(function(employee){
            res.send(employee);
          });
        });
      });
    });
  } else {
    res.end();
  }}).catch(next);
});

router.get('/employee/names', function(req, res, next){
  Employee.find({})
  .then(function(employees){
  var result = [];
  employees.forEach(function(employee){
    result.push(employee._id);
  });
    res.send(result);
  }).catch(next);
});

// if todays date == date from sessions field then accumulate our session value
// using the $inc: function from mongoose
// otherwise it's a new day, so push the sessions date (which will now be yesterdays date)
// date & total into a dailyHours field, reinitialize the sessions field with 
// todays new date and a value of 0

// function archiveByDay (){
  
// }

function calculateMinutes(timeIn = 0, timeOut = 0){
		// if(isUserLoggedIn()){
		// 	var runningTime = calculateRunningTime(timeIn);
		// }
	// 	// calculate total hours for given time frame
	// // timeIn to timeOut + runningTime
	var elapsedSecs = 0;
	if(timeIn && timeOut) {
  	elapsedSecs = (timeOut - timeIn) / 1000;
	}
	return Math.floor(elapsedSecs);
}

// function calculateRunningTime(timeIn){
// 	var runningTime = 0;
// // 	var currentTime = 9;
// // 	runningTime =  currentTime - timeIn;
// 	return runningTime;
// }

module.exports = router;

