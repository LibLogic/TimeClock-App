var isClockedIn;
const inputSpan = document.getElementById("input-span");
const empDataInput =	document.getElementById("emp-data-input");
const clockForm = document.getElementById("clock-form");

const changeCompanyName = document.getElementById("change-company-name");
const companyName = document.getElementById("companyName");
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

const saveUserBtn = document.getElementById("save-user-btn");
saveUserBtn.addEventListener('click', function(){
	empDataInput.classList.add('hidden');
	addEmpBtn.classList.remove('hidden');
	clockForm.classList.remove('hidden');
	addEmp.classList.remove('hidden');
	saveUser();
});

const inBtn = document.getElementById("in-btn");
inBtn.addEventListener('click', function(){
	// if(isClockedIn == true){
		inBtn.setAttribute('disabled', 'disabled');
		outBtn.removeAttribute('disabled');
	// }
	var emp = selEmp.options[selEmp.selectedIndex].value;
	var url = "https://cohort-6d-hdgknsn.c9users.io/api/in/" + emp;
	logTime(url);
});

const outBtn = document.getElementById("out-btn");
outBtn.addEventListener('click', function(){
	// if(isClockedIn == false){
		outBtn.setAttribute('disabled', 'disabled');
		inBtn.removeAttribute('disabled');
	// }
	var emp = selEmp.options[selEmp.selectedIndex].value;
	var url2 = "https://cohort-6d-hdgknsn.c9users.io/api/" + emp;
	var url = "https://cohort-6d-hdgknsn.c9users.io/api/out/" + emp;
	logTime(url);
	getEmpData(url2);
});

const selEmp = document.getElementById("select-emp");
selEmp.addEventListener('change', function(){
	outBtn.setAttribute('disabled', 'disabled');
	inBtn.removeAttribute('disabled');
	if(selEmp.selectedIndex != 0){
		var emp = selEmp.options[selEmp.selectedIndex].value;
		var url = "https://cohort-6d-hdgknsn.c9users.io/api/" + emp;
		getEmpData(url);
	}// else {
	// 	inBtn.setAttribute('disabled', 'disabled');
	// 	outBtn.setAttribute('disabled', 'disabled');
	// }
});

function logTime(url){
	isClockedIn = true;
	console.log(isClockedIn);
	var xhr = new XMLHttpRequest();
	xhr.open('PUT', url, false);
	xhr.send();
}

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
			getEmpNames();
		}
	};
	xhr.send(JSON.stringify(data));	
}

function getEmpData(url){
	isClockedIn = false;
	console.log(isClockedIn);
	var xhr = new XMLHttpRequest();
	xhr.open('GET', url, true);
	xhr.setRequestHeader("Content-Type", "application/json");
	xhr.send();
		xhr.onload = function() {
	  if (xhr.status != 200) {
	    alert(`Error ${xhr.status}: ${xhr.statusText}`);
	  } else {
			var employee = JSON.parse(xhr.responseText);
			var table = document.getElementById('hoursTable');
			var rowCount = table.getElementsByTagName("tr").length;
			while(rowCount > 6){
				table.deleteRow(-1);
				rowCount--;
			} 
			var totalHours = 0;
employee.sessions.forEach(function(elem){
			// employee.dailyArchive.forEach(function(elem){
				var row = table.insertRow(-1);
				var cell1 = row.insertCell(0);
				var cell2 = row.insertCell(1);
				cell1.innerHTML = elem.date;
				cell2.innerHTML = elem.sessionTime; //totalTime;
				totalHours += elem.sessionTime; //totalTime;
			});
			var row = table.insertRow(-1);
			var cell1 = row.insertCell(0);
			var cell2 = row.insertCell(1);
			cell1.innerHTML = 'Total Hours';
			cell2.innerHTML = totalHours;
	  }
	};
}

function getEmpNames(){
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
		
		// generate names for each employee
		// then create dynamic dropdown of names
		var names = [];
		employees.forEach(function(employee){
		  names.push({ id: employee._id, name: employee.firstName + ' ' + employee.lastName });
		});	
		  
		names.forEach(function(name){
		 options += `<option value="${name.id}">${name.name}</option>`;
		});
	  }
	  selEmp.innerHTML = options;
	};
}

getEmpNames();