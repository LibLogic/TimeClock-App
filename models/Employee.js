const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const EmployeeSchema = new Schema({
	firstName: {
		type: String,
		default: ""
	},
	lastName: {
		type: String,
		default: ""
	},
	empId:{
		type: Number,
		required: [true, 'empId field is required'],
		default: 0
	},
	companyName: {
		type: String,
		default: "Starbucks, Inc."
	},
	deptName: {
		type: String,
		default: ""
	},
	
	timeIn: Number,
	
	timeOut: Number,
	
	sessions: {
		type: [{date: String, seconds: Number}]
	},
	
	isClockedIn: {
		type: Boolean,
		default: false
	}
});

const Employee = mongoose.model("employee", EmployeeSchema);

module.exports = Employee;