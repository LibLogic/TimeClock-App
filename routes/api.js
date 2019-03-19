const express = require("express")
const router = express.Router();
const Employee = require("../models/Employee");

router.get('/employees', 
function(req, res, next){
  Employee.find({}).then(function(employee){
    res.send(employee);
  }).catch(next);
});

router.post('/employees', function(req, res, next){
  Employee.create(req.body).then(function(employee){
    res.send(employee);
  }).catch(next);
});


// {
// 	"$currentDate": {"timeOut": true}
// }
router.put('/employees/:id', function(req, res, next){
  Employee.findByIdAndUpdate({_id: req.params.id}, req.body).then(function(employee){
     Employee.findOne({_id: req.params.id}).then(function(employee){
      res.send(employee);
    });
  }).catch(next);
});

router.delete('/employees/:id', function(req, res, next){
  Employee.findByIdAndDelete({_id: req.params.id}).then(function(employee){
    res.send(employee);
  }).catch(next);
});

module.exports = router;
