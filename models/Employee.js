const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const EmployeeSchema = new Schema({
	companyName: {
		type: String,
		default: "Raytheon, Inc."
	},
	deptName: {
		type: String,
		default: "Production"
	},
	firstName: {
		type: String,
		default: ""
	},
	lastName: {
		type: String,
		default: ""
	},
	lastLogIn: {
		type: Number,
		default: 0
	},
	lastLogOut: {
		type: Number,
		default: 0
	},
	sessions: {
		type: [{date: String, timeIn: Number, timeOut: Number, sessionTime: Number, accumulatedTime: Number }]
	},
	isClockedIn: {
		type: Boolean, 
		default: false
	},
	dailyArchive: {
		type: [{}]
	}
	
});

const Employee = mongoose.model("employee", EmployeeSchema);

module.exports = Employee;