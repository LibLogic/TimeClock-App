const express = require("express");
const router = express.Router();
const Employee = require("../models/Employee");

router.get('/', function(req, res, next){
  Employee.find({}).then(function(employee){
    res.send(employee);
  }).catch(next);
});

router.get('/:id', function(req, res, next){
  Employee.findOne({_id: req.params.id}).then(function(employee){
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
  //   return;
  // }
    var timeIn = new Date().getTime();
    
    if(employee.lastLogOut != 0){
      var nowDate = new Date().toLocaleString("en-US", {timeZone: "America/New_York"}).slice(0, 9);
      var lastLoggedOutDate = new Date(employee.sessions[employee.sessions.length -1].timeOut).toLocaleString("en-US", {timeZone: "America/New_York"}).slice(0, 9);
      var totalTime = employee.sessions[employee.sessions.length -1].accumulatedTime;
        if (nowDate !== lastLoggedOutDate){
          Employee.findOneAndUpdate({_id: req.params.id}, { $push: { "dailyArchive": { "date":  lastLoggedOutDate, "totalTime": totalTime  } } } )
          .then(function(employee){
            Employee.updateOne({_id: req.params.id}, { $set: { "sessions": [] } } )
            .then(function(employee){
            });
          }).catch(next);
        }
      }
     Employee.findOneAndUpdate({_id: req.params.id}, { $set: { "lastLogIn": timeIn, "isClockedIn": true  } } )
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
  //   return
  // }
    var timeOut = new Date().getTime();
    Employee.findOneAndUpdate({_id: req.params.id}, { $set: { "lastLogOut": timeOut, "isClockedIn": false } } )
      .then(function(employee){
      Employee.findOne({_id: req.params.id})
      .then(function(employee){
        var sessionTime = calculateSession(employee.lastLogIn, timeOut);
        var dateString = new Date().toLocaleString("en-US", {timeZone: "America/New_York"}).slice(0, 9);
        var totalTimeForDay = employee.sessions.reduce(function(acc, elem){
          return acc += elem.sessionTime; 
        }, sessionTime);      
        Employee.findOneAndUpdate({_id: req.params.id}, { $push: { "sessions": { "date": dateString, "timeIn": employee.lastLogIn, "timeOut": timeOut, "sessionTime": sessionTime, "accumulatedTime": totalTimeForDay } } } )       
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

function calculateSession(timeIn = 0, timeOut = 0){
	var elapsedSecs = 0;
	if(timeIn && timeOut) {
  	elapsedSecs = (timeOut - timeIn) / 1000;
	}
	return Math.floor(elapsedSecs);
}

module.exports = router;

