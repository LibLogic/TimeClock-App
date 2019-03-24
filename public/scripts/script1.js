
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

changeBtn.addEventListener('click', function(){
		changeBtn.classList.add('hidden');
		inputSpan.classList.remove('hidden');
});

saveBtn1.addEventListener('click', function(e){
		changeBtn.classList.remove('hidden');
		inputSpan.classList.add('hidden');
		e.preventDefault();
		
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
	e.preventDefault();
});

inBtn.addEventListener('click', function(){
	inBtn.setAttribute('disabled', 'disabled');
	outBtn.removeAttribute('disabled');
	var emp = selEmp.options[selEmp.selectedIndex].text;
	var url = "https://cohort-6d-hdgknsn.c9users.io/api/in/" + emp;
	clockIn(url);
});

outBtn.addEventListener('click', function(){
	outBtn.setAttribute('disabled', 'disabled');
	inBtn.removeAttribute('disabled');
	var emp = selEmp.options[selEmp.selectedIndex].text;
	var url = "https://cohort-6d-hdgknsn.c9users.io/api/out/" + emp;
	clockOut(url);
});

selEmp.addEventListener('change', function(e){
	outBtn.setAttribute('disabled', 'disabled');
	inBtn.removeAttribute('disabled');
});


function clockIn(emp){
	console.log(emp);
}

function clockOut(emp){
	console.log(emp);
}




