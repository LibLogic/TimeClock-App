
const deptSection = document.getElementById("department");
const empChkBx = document.getElementById("emp-chkbx");
empChkBx.addEventListener('click', function(){
	if(empChkBx.checked == true){
		deptSection.classList.add('hidden');
		deptChkBx.checked = false;
		empSection.classList.remove('hidden');

	} else {
		empSection.classList.add('hidden');
	}
	
});

const empSection = document.getElementById("employee");
const deptChkBx = document.getElementById("dept-chkbx");
deptChkBx.addEventListener('click', function(){
	if(deptChkBx.checked == true){
		empSection.classList.add('hidden');
		empChkBx.checked =false;
		deptSection.classList.remove('hidden');
	} else {
		deptSection.classList.add('hidden');
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

//////////////////// Company Name --- mostly hiding and showing elements with CSS /////////////////////////////////
const changeCompanyName = document.getElementById("change-company-name");
const companyName = document.getElementById("companyName");
changeCompanyName.addEventListener('keyup', function(){
	companyName.innerText = changeCompanyName.value;
});

const inputSpan = document.getElementById("input-span");
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

// Adding and saving a new employee --- hiding and showing elements with CSS
const addEmp = document.getElementById("add-emp");
const addEmpBtn = document.getElementById("add-emp-btn");
const empDataInput = document.getElementById("emp-data-input");
const clockForm = document.getElementById("clock-form");
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

// Our time in and time out buttons and logic --- hiding and showing elements with CSS
const inBtn = document.getElementById("in-btn");
inBtn.addEventListener('click', function(){
	inBtn.setAttribute('disabled', 'disabled');
	outBtn.removeAttribute('disabled');
	// Generating URL for selected user, then logging them in
	var emp = selEmp.options[selEmp.selectedIndex].value;
	var url = "https://cohort-6d-hdgknsn.c9users.io/api/in/" + emp;
	logTime(url);
});

const outBtn = document.getElementById("out-btn");
outBtn.addEventListener('click', function(){
	outBtn.setAttribute('disabled', 'disabled');
	inBtn.removeAttribute('disabled');
	// Generating URL for selected user, then logging them out
	var emp = selEmp.options[selEmp.selectedIndex].value;
	var url2 = "https://cohort-6d-hdgknsn.c9users.io/api/" + emp;
	var url = "https://cohort-6d-hdgknsn.c9users.io/api/out/" + emp;
	// Note********* logTime () will set employee as logged in, but getEmpData
	// will immediately mark them as logged out right after
	logTime(url);
	getEmpData(url2);
});

// For choosing an employee to work with  --- hiding and showing elements with CSS
const selEmp = document.getElementById("select-emp");
selEmp.addEventListener('change', function(){
	outBtn.setAttribute('disabled', 'disabled');
	inBtn.removeAttribute('disabled');
	if(selEmp.selectedIndex != 0){
		var emp = selEmp.options[selEmp.selectedIndex].value;
		var url = "https://cohort-6d-hdgknsn.c9users.io/api/" + emp;
		getEmpData(url);
	}
});