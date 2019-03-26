
const changeBtn = document.getElementById("change-btn");
const inputSpan = document.getElementById("input-span");
const saveBtn1 = document.getElementById("save-btn1");
const addEmpBtn = document.getElementById("add-emp-btn");
const addEmp = document.getElementById("add-emp");
const empForm =	document.getElementById("emp-form");
const clockForm = document.getElementById("clock-form");
const saveBtn2 = document.getElementById("save-btn2");
const inBtn = document.getElementById("in-btn");
const outBtn = document.getElementById("out-btn");
const selEmp = document.getElementById("select-emp");
const changeCompanyName = document.getElementById("change-company-name");
const companyName = document.getElementById("companyName");

function updateCompanyName(){
	console.log(companyName.innerText = changeCompanyName.value)
	//save button click save to db (use PUT)
}

changeCompanyName.addEventListener('keyup', function(){
	companyName.innerText = changeCompanyName.innerText.value;
	console.log(changeCompanyName.innerText.value);
});

changeBtn.addEventListener('click', function(){
	changeBtn.classList.add('hidden');
	inputSpan.classList.remove('hidden');
});

saveBtn1.addEventListener('click', function(e){
	changeBtn.classList.remove('hidden');
	inputSpan.classList.add('hidden');
	e.preventDefault();
	//save button click save to db (use PUT)
});

addEmpBtn.addEventListener('click', function(){
	addEmpBtn.classList.add('hidden');
	addEmp.classList.add('hidden');	
	empForm.classList.remove('hidden');
	clockForm.classList.add('hidden');
});

saveBtn2.addEventListener('click', function(e){
	empForm.classList.add('hidden');
	addEmpBtn.classList.remove('hidden');
	clockForm.classList.remove('hidden');
	addEmp.classList.remove('hidden');
});

inBtn.addEventListener('click', function(){
	inBtn.setAttribute('disabled', 'disabled');
	outBtn.removeAttribute('disabled');
	var emp = selEmp.options[selEmp.selectedIndex].text;
	var url = "https://cohort-6d-hdgknsn.c9users.io/api/in/" + emp;
	logTime(url);
});

outBtn.addEventListener('click', function(){
	outBtn.setAttribute('disabled', 'disabled');
	inBtn.removeAttribute('disabled');
	var emp = selEmp.options[selEmp.selectedIndex].text;
	var url = "https://cohort-6d-hdgknsn.c9users.io/api/out/" + emp;
	logTime(url);
});

selEmp.addEventListener('change', function(e){
	outBtn.setAttribute('disabled', 'disabled');
	inBtn.removeAttribute('disabled');
});

function logTime(url){
	var xhr = new XMLHttpRequest();
	xhr.open('PUT', url, true);
	xhr.send();
}

(function getEmpNames(){
	var xhr = new XMLHttpRequest();
	xhr.open('GET','api/employee/names', true);
	xhr.send();

	xhr.onload = function() {
	  if (xhr.status != 200) { // analyze HTTP status of the response
	    alert(`Error ${xhr.status}: ${xhr.statusText}`); // e.g. 404: Not Found
	  } else {
			var names = JSON.parse(xhr.responseText);
		  var options = "<option>select your name</option>";
		  names.forEach(function(name){
		     options += `<option>${name}</option>`;
		  });
		  }
		  selEmp.innerHTML = options;
	};
})();
//on document ready get a list of employees by first and last names

// router.get('/employee/names', function(req, res, next){
//   Employee.find({}).then(function(employees){
//   var result = [];
//   employees.forEach(function(employee){
//       result.push(employee.firstName + ' ' + employee.lastName);
//   });
//     res.send(result);
//   }).catch(next);
// });