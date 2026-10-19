"use strict";

function validateLogin(USER_INPUT, message) {
	const USER = localStorage[USER_INPUT.username.value];
	let passwordSaved;

	/*isEmpty tells us if an input element is empty*/
	let isEmpty = false;

	/*If an element is empty, add outline*/
	for (let element in USER_INPUT) {
		if (!USER_INPUT[element].value) {
			USER_INPUT[element].style.outline = "2px solid red";
			isEmpty = true;
		}
	}

	/*if isEmpty true, then exit*/
	if (isEmpty) {
		message.textContent = "Please fill out all entries...";
		return;
	}

	/*If user does not exist in localstorage
		* write error and exit
		* else get value of stored password
	*/
	if (!USER) {
		USER_INPUT.username.style.outline = "2px solid red";
		message.textContent = "*Username not recognized!!\nMake sure you have an account!!";
		return;
	} else {
		passwordSaved = JSON.parse(USER).password;
	}

	/*If user attempts to login using guest account, write error and exit*/
	if (USER_INPUT.username.value === "guest") {
		USER_INPUT.username.style.outline = "2px solid red";
		message.textContent = "Use the navigation bar button to continue as guest!!";
		return;
	}

	/*
		* Username VALID
		* Now validate password
	*/

	/*If input password and saved password don't match, write error and exit*/
	if (passwordSaved !== USER_INPUT.password.value) {
		USER_INPUT.password.style.outline = "2px solid red";
		message.textContent = "*Password Not Correct!!*";
		return;
	}

	/*
		* ALL INPUT FIELDS ARE VALID
		* PROCEED TO LOGIN AS USER AND GO TO GAME
	*/
	message.textContent = "Logged In";
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
	/*Input Field object*/
	const USER_INPUT = {
		username: document.getElementById("username"),
		password: document.getElementById("password")
	}

	/*Button to call validateLogin*/
	const LOGIN_BUTTON    = document.getElementById("login");

	/*Div to show error or miscellaneous messages*/
	const DISPLAY_MESSAGE =document.getElementById("password-issue");
	DISPLAY_MESSAGE.style.whiteSpace = 'pre-line';

	/*On click or keydown event, clearError for field and error message*/
	for (let key in USER_INPUT) {
		let element = USER_INPUT[key];
		element.addEventListener("click",   () => clearError(element, DISPLAY_MESSAGE));
		element.addEventListener("keydown", () => clearError(element, DISPLAY_MESSAGE));
	}

	/*On Keydown Enter key, validateLogin
		* Applied on field username and password
	*/
	function isKeydownEnter(event) {
		if (event.code === "Enter") {
			validateLogin(USER_INPUT, DISPLAY_MESSAGE);
		}
	}
	USER_INPUT.username.addEventListener("keydown", (event) => {isKeydownEnter(event)});
	USER_INPUT.password.addEventListener("keydown", (event) => {isKeydownEnter(event)});

	/*On click event, validateLogin*/
	LOGIN_BUTTON.addEventListener("click", () => {validateLogin(USER_INPUT, DISPLAY_MESSAGE)});
}

/*
if (sessionStorage.user)
	window.location.assign("../../pages/game/menu.html");
else
*/

if (document.readyState === 'complete') {
		init();
} else {
		window.addEventListener('load', init);
}
