import "./initiateLocalStorage.js";

function validateSignup() {
	const user = {
		"email": emailInput.value,
		"age": ageInput.value,
		"address": addressInput.value,
		"phone": {
			"code": phoneCodeInput.value,
			"number": phoneNumberInput.value,
		},
		"password": passwordInput.value,
		"leaderboard": {
			"level_1": {
				"score": 0,
				"message": ""
			},
			"level_2": {
				"score": 0,
				"message": ""
			},
			"level_3": {
				"score": 0,
				"message": ""
			},
			"level_4": {
				"score": 0,
				"message": ""
			},
			"level_5": {
				"score": 0,
				"message": ""
			},
			"endless": {
				"score": 0,
				"message": ""
			}
		}
	};
	const emailPattern = /^[\w\.]+@[\w\.]+\.[a-z\d]{1,63}$/;
	const usernamepattern = /^\w{1,20}$/;
	/*AGE: Test with number limit: age > 1*/
	const phoneNumberPattern = /^\d+$/;
	/*ADDRESS: Accept any, because I can't think of any contraints for address styles*/
	const passwordPattern = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,20}$/;
	/*CONFIRM PASSWORD: Test if === password*/

	/*Check if inputs are empty, and add outline and error message if so*/
	if (!emailInput.value) emailInput.style.outline = "2px solid red";
	if (!usernameInput.value) usernameInput.style.outline = "2px solid red";
	if (!ageInput.value) ageInput.style.outline = "2px solid red";
	if (!addressInput.value) addressInput.style.outline = "2px solid red";
	if (!phoneCodeInput.value) phoneCodeInput.style.outline = "2px solid red";
	if (!phoneNumberInput.value) phoneNumberInput.style.outline = "2px solid red";
	if (!passwordInput.value) passwordInput.style.outline = "2px solid red";
	if (!confirmPasswordInput.value) confirmPasswordInput.style.outline = "2px solid red";
	/*Check if any field is empty and return an error*/
	if (!emailInput.value || !usernameInput.value ||
		!ageInput.value || !addressInput.value ||
		!phoneCodeInput.value || !phoneNumberInput.value ||
		!passwordInput.value || !confirmPasswordInput.value) {
		passwordIssue.textContent = "Please fill out all entries...";
		return;
	}
	/*If username is already in use, return error*/
	if (localStorage[usernameInput.value]) {
		passwordIssue.textContent = "*Username already in use!!";
		return;
	}
	/*If user attempts to signup using guest account, return error*/
	if (usernameInput.value === "guest") {
		passwordIssue.textContent = "Username is invalid";
		return;
	}
	/*Input field format validations if format wrong, return error*/
	/*Format Validation: EMAIL*/
	if (!emailPattern.test(emailInput.value)) {
		emailInput.style.outline = "2px solid red";
		passwordIssue.textContent = "Email address is invalid";
		return;
	}
	/*Format Validation: USERNAME*/
	if (!usernamepattern.test(usernameInput.value)) {
		usernameInput.style.outline = "2px solid red";
		passwordIssue.textContent = "Username is invalid";
		return;
	}
	/*Format Validation: AGE*/
	if (ageInput.value <= 0) {
		ageInput.style.outline = "2px solid red";
		passwordIssue.textContent = "How are you alive???  Are you a ghost?";
	} else if (ageInput.value < 5) {
		ageInput.style.outline = "2px solid red";
		passwordIssue.textContent = "It's a babyyy";
	} else if (ageInput.value > 120) {
		ageInput.style.outline = "2px solid red";
		passwordIssue.textContent = "How are you alive???  Are you a legend?";
	}
	/*Format Validation: PHONE NUMBER*/
	if (!phoneNumberPattern.test(phoneNumberInput.value)) {
		phoneNumberInput.style.outline = "2px solid red";
		passwordIssue.textContent = "Phone Number is invalid";
		return;
	}
	/*Format Validation: PASSWORD*/
	if (!passwordPattern.test(passwordInput.value)) {
		passwordInput.style.outline = "2px solid red";
		passwordIssue.textContent = "Password is invalid";
		return;
	}
	/*Format Validation: CONFIRM PASSWORD*/
	if (passwordInput.value !== confirmPasswordInput.value) {
		passwordInput.style.outline = "2px solid red";
		confirmPasswordInput.style.outline = "2px solid red";
		passwordIssue.textContent = "Passwords don't match";
		return;
	}

	localStorage.setItem(usernameInput.value, JSON.stringify(user));
	sessionStorage.user = usernameInput.value;
	window.location.assign("../../pages/game/menu.html");
}

function clearError(inputObj) {
	inputObj.style.removeProperty("outline");
	passwordIssue.textContent = "";
}

const emailInput           = document.getElementById("email");
const usernameInput        = document.getElementById("username");
const ageInput             = document.getElementById("age");
const addressInput         = document.getElementById("address");
const phoneCodeInput       = document.getElementById("phone-country");
const phoneNumberInput     = document.getElementById("phone-number");
const passwordInput        = document.getElementById("password");
const confirmPasswordInput = document.getElementById("confirm-password");

const signupButton         = document.getElementById("signup");
const passwordIssue        = document.getElementById("password-issue");

/*Clear Red Outline OnClick*/
emailInput.addEventListener("click",           () => clearError(emailInput));
usernameInput.addEventListener("click",        () => clearError(usernameInput));
ageInput.addEventListener("click",             () => clearError(ageInput));
addressInput.addEventListener("click",         () => clearError(addressInput));
phoneCodeInput.addEventListener("mousedown",   () => clearError(phoneCodeInput));
phoneNumberInput.addEventListener("click",     () => clearError(phoneNumberInput));
passwordInput.addEventListener("click",        () => clearError(passwordInput));
confirmPasswordInput.addEventListener("click", () => clearError(confirmPasswordInput));


/*Clear Red Outline OnKeyDown*/
emailInput.addEventListener("keydown",           () => clearError(emailInput));
usernameInput.addEventListener("keydown",        () => clearError(usernameInput));
ageInput.addEventListener("keydown",             () => clearError(ageInput));
addressInput.addEventListener("keydown",         () => clearError(addressInput));
phoneCodeInput.addEventListener("keydown",       () => clearError(phoneCodeInput));
phoneNumberInput.addEventListener("keydown",     () => clearError(phoneNumberInput));
passwordInput.addEventListener("keydown",        () => clearError(passwordInput));
confirmPasswordInput.addEventListener("keydown", () => clearError(confirmPasswordInput));

/*Validate Signup OnKeyDown Enter for password input field*/
passwordInput.addEventListener("keydown", (event) => {if (event.code === "Enter") validateSignup();});
/*Validate Signup OnClick button*/
signupButton.addEventListener("click", validateSignup);
