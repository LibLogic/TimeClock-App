const addEmpBtn = document.getElementById("add-emp-btn");
const addEmp = document.getElementById("add-emp");
const empForm =	document.getElementById("emp-form");
const clockForm = document.getElementById("clock-form");
const saveBtn = document.getElementById("save-btn");
const inBtn = document.getElementById("in-btn");
const outBtn = document.getElementById("out-btn");
const selEmp = document.getElementById("selectEmp");

addEmpBtn.addEventListener('click', function(){
	addEmpBtn.classList.add('hidden');
	addEmp.classList.add('hidden');	
	empForm.classList.remove('hidden');
	clockForm.classList.add('hidden');
});

saveBtn.addEventListener('click', function(){
	empForm.classList.add('hidden');
	clockForm.classList.remove('hidden');	
});

inBtn.addEventListener('click', function(){
	inBtn.setAttribute('disabled', 'disabled');
	outBtn.removeAttribute('disabled');
});

outBtn.addEventListener('click', function(){
	outBtn.setAttribute('disabled', 'disabled');
	inBtn.removeAttribute('disabled');
});

selEmp.addEventListener('change', function(){
	outBtn.setAttribute('disabled', 'disabled');
	inBtn.removeAttribute('disabled');
});