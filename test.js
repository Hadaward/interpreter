import interpreter from "./interpreter/index.js";

const expression = document.querySelector('#expression');
const result = document.querySelector('#result');

expression.addEventListener('input', function() {
	if (expression.value.length === 0) {
		result.innerText = "";
		return;
	}
	
	try {
		result.innerText = interpreter.run(expression.value);
		result.className = "success";
	} catch(error) {
		result.innerText = error;
		result.className = "error";
	}
})