const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const DepartmentSchema = new Schema({
	departmentName: {
		type: Array
	}
});

const Department = mongoose.model("department", DepartmentSchema);

module.exports = Department;