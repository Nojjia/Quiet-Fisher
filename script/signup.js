"use strict";

function validateSignup(USER_INPUT, message) {
	const USER = {
		"email": USER_INPUT.email.value,
		"age": USER_INPUT.age.value,
		"address": USER_INPUT.address.value,
		"phone": {
			"code": USER_INPUT.phoneCode.value,
			"number": USER_INPUT.phoneNumber.value,
		},
		"password": USER_INPUT.password.value,
		"leaderboard": {
			"level_1": { "score": 0, "message": "" },
			"level_2": { "score": 0, "message": "" },
			"level_3": { "score": 0, "message": "" },
			"level_4": { "score": 0, "message": "" },
			"level_5": { "score": 0, "message": "" },
			"endless": { "score": 0, "message": "" }
		}
	};

	/* REGEX PATTERNS*/
	const EMAIL_PATTERN = /^[\w\.]+@[\w\.]+\.[a-z\d]{1,63}$/;
	const USERNAME_PATTERN = /^\w{1,20}$/;
	const PHONE_NUMBER_PATTERN = /^\d+$/;
	const PASSWORD_PATTERN = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,20}$/;

	/* 
		* isEmpty tells us if an input element is empty
		* msgText holds error message text
		* anyError lets us know if there were any validation errors
	*/
	let isEmpty = false, anyError = false, msgText = "";

	/*If an element is empty, add outline*/
	for (let element in USER_INPUT) {
		if (!USER_INPUT[element].value) {
			USER_INPUT[element].style.outline = "2px solid red";
			isEmpty = true;
		}
	}

	/*if isEmpty true then exit*/
	if (isEmpty) {
		message.textContent = "Please fill out all entries...";
		return;
	}

	/*Check if username input is guest or already in use*/
	if (USER_INPUT.username.value === "guest") { /*check guest*/
		msgText += "Username is invalid\n";
		anyError = true;
	} else if (localStorage[USER_INPUT.username.value]) { /*check exists*/
		msgText += "*Username already in use!!\n";
		anyError = true;
	}

	/*Begin RegEx format validation*/

	/* Validate EMAIL format
		* Email must be in for of {WORDS}@{WORDS}.{WORDS}
	*/
	if (!EMAIL_PATTERN.test(USER_INPUT.email.value)) {
		USER_INPUT.email.style.outline = "2px solid red";
		msgText += "Email address is invalid\n";
		anyError = true;
	}

	/* Validate USERNAME format
		* Username must be between 1 to 20 characters of \w
	*/
	if (!USERNAME_PATTERN.test(USER_INPUT.username.value)) {
		USER_INPUT.username.style.outline = "2px solid red";
		msgText += "Username is invalid.\nUsername must be between 1 to 20 in length\n";
		anyError = true;
	}
	/* Validate AGE format
		* When age is not a number, it is counted as empty and handled above
		* Any age is valid, for purpose of jokes :)
	*/
	if (USER_INPUT.age.value <= 0) {
		USER_INPUT.age.style.outline = "2px solid red";
		msgText += "How are you alive???  Are you a ghost?\n";
	} else if (USER_INPUT.age.value < 5) {
		USER_INPUT.age.style.outline = "2px solid red";
		msgText += "It's a babyyy\n";
	} else if (USER_INPUT.age.value > 120) {
		USER_INPUT.age.style.outline = "2px solid red";
		msgText += "How are you alive???  Are you a legend?\n";
	}

	/* Validate PHONE NUMBER format
		* Phone number must be strig of digit, of length 1 or more
	*/
	if (!PHONE_NUMBER_PATTERN.test(USER_INPUT.phoneNumber.value)) {
		USER_INPUT.phoneNumber.style.outline = "2px solid red";
		msgText += "Phone Number is invalid\n";
		anyError = true;
	}

	/*Validate PASSWORD format
		* Password must have at least 8 characters long
		* Password must have at least 1 UPPERCASE letter
		* Password must have at least 1 lowercase letter
		* Password must have at least 1 digit
		* Password must have at least 1 special character
	*/
	if (!PASSWORD_PATTERN.test(USER_INPUT.password.value)) {
		USER_INPUT.password.style.outline = "2px solid red";
		msgText += "Password is invalid\n";
		anyError = true;
	}

	/*Check if CONFIRM PASSWORD is equal to PASSWORD*/
	if (USER_INPUT.password.value !== USER_INPUT.confirmPassword.value) {
		USER_INPUT.password.style.outline = "2px solid red";
		USER_INPUT.confirmPassword.style.outline = "2px solid red";
		msgText += "Passwords don't match\n";
		anyError = true;
	}

	/*If errors were found during validation, msgText will not be empty
		* Hence display msgText and exit
	*/
	if (anyError) {
		message.textContent = msgText;
		return;
	}

	/*
		* ALL INPUT FIELDS ARE VALID
		* Proceed to game
	*/
	localStorage.setItem(USER_INPUT.username.value, JSON.stringify(USER));
	sessionStorage.user = USER_INPUT.username.value;
	window.location.assign("../../pages/game/menu.html");
}

/* clearError
	* When an input field has an error, it gets a red outline and error message
	* This function clears only the outline of element passed, on user interaction
	* This function clears all error messages in DISPLAY_MESSAGE
*/
function clearError(element, message) {
	element.style.removeProperty("outline");
	message.textContent = "";
}

function init() {
	/*USER_INPUT holds all input fields*/
	const USER_INPUT = {
		email: document.getElementById("email"),
		username: document.getElementById("username"),
		age: document.getElementById("age"),
		address: document.getElementById("address"),
		phoneCode: document.getElementById("phone-country"),
		phoneNumber: document.getElementById("phone-number"),
		password: document.getElementById("password"),
		confirmPassword: document.getElementById("confirm-password")
	};

	/*THE SIGNUP BUTTON to call validateSignup*/
	const SIGNUP_BUTTON   = document.getElementById("signup");

	/*Div that displays errors or miscellaneous messages*/
	const DISPLAY_MESSAGE = document.getElementById("password-issue");
	DISPLAY_MESSAGE.style.whiteSpace = 'pre-line';

	/*On click or keydown event, clearError for field and error message*/
	for (let key in USER_INPUT) {
		let element = USER_INPUT[key];
		element.addEventListener("click",   () => clearError(element, DISPLAY_MESSAGE));
		element.addEventListener("keydown", () => clearError(element, DISPLAY_MESSAGE));
	}

	/*On Keydown Enter key, validateSignup
		* Applied on field password and field confirmPassword
	*/
	function isKeydownEnter(event) {
		if (event.code === "Enter") {
			validateSignup(USER_INPUT, DISPLAY_MESSAGE);
		}
	}
	USER_INPUT.password.addEventListener("keydown", (event) => {isKeydownEnter(event)});
	USER_INPUT.confirmPassword.addEventListener("keydown", (event) => {isKeydownEnter(event)});

	/*On click event, validateSignup*/
	SIGNUP_BUTTON.addEventListener("click", () => {validateSignup(USER_INPUT, DISPLAY_MESSAGE)});
}

if (document.readyState === 'complete') {
	init();
} else {
	window.addEventListener('load', init);
}
