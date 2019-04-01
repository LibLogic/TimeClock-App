/*global fetch*/

const deptSection = document.getElementById("dept-section");
const empChkBx = document.getElementById("emp-chkbx");
empChkBx.addEventListener('click', function(){
	if(empChkBx.checked == true){
		deptSection.classList.add('hidden');
		deptChkBx.checked = false;
		empSection.classList.remove('hidden');
	}
});

const empSection = document.getElementById("emp-section");
const deptChkBx = document.getElementById("dept-chkbx");
deptChkBx.addEventListener('click', function(){
	if(deptChkBx.checked == true){
		empSection.classList.add('hidden');
		empChkBx.checked =false;
		deptSection.classList.remove('hidden');
	}
});

const addDeptBtn = document.getElementById("add-dept-btn");
addDeptBtn.addEventListener('click', function(){
	deptDataInput.classList.remove('hidden');
	deptSection.classList.add('hidden');
	addDeptBtn.classList.add('hidden');
});

const saveDeptBtn = document.getElementById("save-dept-btn");
const deptDataInput = document.getElementById("dept-data-input");
saveDeptBtn.addEventListener('click', function(){
	deptDataInput.classList.add('hidden');
	deptSection.classList.remove('hidden');
	addDeptBtn.classList.remove('hidden');
});

const inputSpan = document.getElementById("input-span");
const empDataInput =	document.getElementById("emp-data-input");
const clockForm = document.getElementById("clock-form");

const changeCompanyName = document.getElementById("change-company-name");
const companyName = document.getElementById("company-name");
changeCompanyName.addEventListener('keyup', function(){
	companyName.innerText = changeCompanyName.value;
});

const changeBtn = document.getElementById("change-btn");
changeBtn.addEventListener('click', function(){
	changeBtn.classList.add('hidden');
	inputSpan.classList.remove('hidden');
});

const saveCompanyBtn = document.getElementById("save-company-btn");
saveCompanyBtn.addEventListener('click', function(e){
	changeBtn.classList.remove('hidden');
	inputSpan.classList.add('hidden');
	e.preventDefault();
});

const addEmp = document.getElementById("add-emp");
const addEmpBtn = document.getElementById("add-emp-btn");
addEmpBtn.addEventListener('click', function(){
	addEmpBtn.classList.add('hidden');
	addEmp.classList.add('hidden');	
	empDataInput.classList.remove('hidden');
	clockForm.classList.add('hidden');
});

const saveEmpBtn = document.getElementById("save-emp-btn");
saveEmpBtn.addEventListener('click', function(){
	empDataInput.classList.add('hidden');
	addEmpBtn.classList.remove('hidden');
	clockForm.classList.remove('hidden');
	addEmp.classList.remove('hidden');
	saveUser();
});

const inBtn = document.getElementById("in-btn");
inBtn.addEventListener('click', function(){
		inBtn.setAttribute('disabled', 'disabled');
		outBtn.removeAttribute('disabled');
	var emp = selEmp.options[selEmp.selectedIndex].value;
	logTime(emp, 'in/');
});

const outBtn = document.getElementById("out-btn");
outBtn.addEventListener('click', function(){
		outBtn.setAttribute('disabled', 'disabled');
		inBtn.removeAttribute('disabled');
	var emp = selEmp.options[selEmp.selectedIndex].value;
	logTime(emp, 'out/');
	getEmpData(emp);
});

const selEmp = document.getElementById("select-emp");
selEmp.addEventListener('change', function(){
	if(selEmp.selectedIndex != 0){
		var emp = selEmp.options[selEmp.selectedIndex].value;
		setButtonStatus(emp);
		getEmpData(emp);
	} else {
		outBtn.setAttribute('disabled', 'disabled');
	  inBtn.setAttribute('disabled', 'disabled');
		// reinitialize our table
		updateTable();
	}
});

function logTime(emp, logType){
	var url = "https://cohort-6d-hdgknsn.c9users.io/api/" + logType + emp;
	
	fetch(url, { method: 'PUT', }).then(function(){
		setButtonStatus(emp);
	});
}
// 	var xhr = new XMLHttpRequest();
// 	xhr.open('PUT', url, true);
// 	xhr.send();
// 	setButtonStatus(emp);
// }

function saveUser(){
	//construct data here
	var	firstName = document.getElementById("firstName").value;
	var	lastName = document.getElementById("lastName").value;
	var	deptName = document.getElementById("deptName").value;
	if(firstName == "" || lastName == "" || deptName == ""){
		alert('Please fill in all fields!');
		return;
	}
	
document.getElementById("firstName").value = "";
document.getElementById("lastName").value = "";
document.getElementById("deptName").value = "";
	var data = {
		firstName: firstName,
		lastName: lastName,
		deptName: deptName
	};
	var xhr = new XMLHttpRequest();
	xhr.open('POST', '/api', true);
	xhr.setRequestHeader("Content-Type", "application/json");

	xhr.onload = function(){
		if(xhr.status !== 200){
	    	alert(`Error ${xhr.status}: ${xhr.statusText}`);			
		} else {
			displayEmpForm();
		}
	};
	xhr.send(JSON.stringify(data));	
}

function getEmpData(emp){
	var url = "https://cohort-6d-hdgknsn.c9users.io/api/" + emp;
	setButtonStatus(emp);
	var xhr = new XMLHttpRequest();
	xhr.open('GET', url, true);
	xhr.setRequestHeader("Content-Type", "application/json");
	xhr.send();
		xhr.onload = function() {
	  if (xhr.status != 200) {
	    alert(`Error ${xhr.status}: ${xhr.statusText}`);
	  } else {
			var employee = JSON.parse(xhr.responseText);
			// Update table with new employee data
			updateTable(employee);
	  }
	};
}

function updateTable(employee){
	// Resetting our table to its default size of 6 rows
	var table = document.getElementById('hoursTable');
	var rowCount = table.getElementsByTagName("tr").length;
	while(rowCount > 6){
		table.deleteRow(-1);
		rowCount--;
	}
// We've got a new employee, so we're		
// appending one row for each employee
	if(employee){
		var totalHours = 0;
		employee.sessions.forEach(function(elem){
			// employee.dailyArchive.forEach(function(elem){
			var row = table.insertRow(-1);
			var cell1 = row.insertCell(0);
			var cell2 = row.insertCell(1);
			cell1.innerHTML = elem.date;
			cell2.innerHTML = elem.sessionTime; //totalTime;
			totalHours += elem.sessionTime; //totalTime;
		}); // finally adding the bottom row here
		var row = table.insertRow(-1);
		var cell1 = row.insertCell(0);
		var cell2 = row.insertCell(1);
		cell1.innerHTML = 'Total Hours';
		cell2.innerHTML = totalHours;
	}
}

function displayEmpForm(){
	// disable time in and timout buttons on start up
	inBtn.setAttribute('disabled', 'disabled');
	outBtn.setAttribute('disabled', 'disabled');

	var xhr = new XMLHttpRequest();
	xhr.open('GET','api/', true);
	xhr.setRequestHeader("Content-Type", "application/json");
	xhr.send();
	xhr.onload = function() {
	  if (xhr.status != 200) {
	    alert(`Error ${xhr.status}: ${xhr.statusText}`);
	  } else {
		var employees = JSON.parse(xhr.responseText);
		var options = "<option>select your name</option>";
		
		// generate first and last names for each employee
		var names = [];
		employees.forEach(function(employee){
		  names.push({ id: employee._id, name: employee.firstName + ' ' + employee.lastName });
		});	
		// then create dynamic dropdown of names		  
		names.forEach(function(name){
		 options += `<option value="${name.id}">${name.name}</option>`;
		});
	  }
	  selEmp.innerHTML = options;
	};
}

function setButtonStatus(emp){
	var url = "https://cohort-6d-hdgknsn.c9users.io/api/" + emp;
	var xhr = new XMLHttpRequest();
	xhr.open('GET', url, true);
	xhr.setRequestHeader("Content-Type", "application/json");
	xhr.send();
	xhr.onload = function() {
		if (xhr.status != 200) {
			alert(`Error ${xhr.status}: ${xhr.statusText}`);
		} else {
			var employee = JSON.parse(xhr.responseText);		
			if(employee.isClockedIn === true){
				inBtn.setAttribute('disabled', 'disabled');
				outBtn.removeAttribute('disabled');
			} else {
					outBtn.setAttribute('disabled', 'disabled');
					inBtn.removeAttribute('disabled');
			}
		}
	};
}

displayEmpForm();