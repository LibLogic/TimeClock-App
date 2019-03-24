const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// const subSchema = new Schema({
//   Day: {
//     type: String,
//     default: ""
//   },
//   session: {
//     type: [Number],
//     default: 0
//   }
// });

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
		default: ""
	},
	deptName: {
		type: String,
		default: ""
	},
	
	timeIn: {
		type: Array,
		default: []
	},
	
	timeOut: {
		type: Array,
		default: []
	},
	
	sessions: {
		type: [{}],
	},

	isClockedIn: {
		type: Boolean,
		default: false
	}
});

const Employee = mongoose.model("employee", EmployeeSchema);

module.exports = Employee;