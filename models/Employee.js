const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// const TimeSchema = new Schema({
// 		type: Date,
// 		default: Date.now
// 	});

const EmployeeSchema = new Schema({
	firstName: {
		type: String
	},
	lastName: {
		type: String
	},
	empId:{
		type: Number
	},
	companyName: {
		type: String
	},
	deptName: {
		type: String
	}, 
	timeIn: [{
		type: Date,
		default: Date.now
	}],
	timeOut: [{
		type: Date,
		default: Date.now
	}],
	isClockedIn: {
		type: Boolean
	}
});

const Employee = mongoose.model("employee", EmployeeSchema);

module.exports = Employee;