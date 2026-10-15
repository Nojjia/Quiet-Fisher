import "./initiateLocalStorage.js";

window.onload = () => {
	if (sessionStorage.user) {
		window.location.assign("../../pages/game/menu.html");
	}
}
function validateLogin() {
	const user = localStorage[usernameInput.value];
	const passwordSaved = JSON.parse(user).password;
	/*If input fields are empty, return error*/
	if (!usernameInput.value || !passwordInput.value) {
		passwordIssue.textContent = "Please fill out all entries...";
		usernameInput.style.outline = "2px solid red";
		passwordInput.style.outline = "2px solid red";
		return;
	}
	/*If user does not exist in localstorage, return error*/
	if (!user) {
		passwordIssue.textContent = "*Username not recognized!!";
		return;
	}
	/*If user attempts to login using guest account, return error*/
	if (usernameInput.value === "guest") {
		passwordIssue.textContent = "Use the navigation bar button to continue as guest!!";
		return;
	}

	/*Username validation passed, password validation ongoing here*/
	/*If password input does not match, return error*/
	if (passwordSaved !== passwordInput.value) {
		usernameInput.style.removeProperty("outline");
		passwordInput.style.outline = "2px solid red";
		passwordIssue.textContent = "*Password Not Correct!!*";
	}

	/*If password input matches password in localstorage, goto game*/
	passwordIssue.textContent = "Logged In";
	sessionStorage.user = usernameInput.value;
	window.location.assign("../../pages/game/menu.html");
}

/*Given an inputObj, remove the outline, and clear textContent*/
function clearError(inputObj) {
	inputObj.style.removeProperty("outline");
	passwordIssue.textContent = "";
}

const usernameInput = document.getElementById("username");
const passwordInput = document.getElementById("password");

const loginButton   = document.getElementById("login");
const passwordIssue = document.getElementById("password-issue");

/*Clear Red Outline OnClick*/
usernameInput.addEventListener("click", () => clearError(usernameInput));
passwordInput.addEventListener("click", () => clearError(passwordInput));

/*Clear Red Outline OnKeyDown*/
usernameInput.addEventListener("keydown", () => clearError(usernameInput));
passwordInput.addEventListener("keydown", () => clearError(passwordInput));

/*Validate Login OnKeyDown Enter for password input field*/
passwordInput.addEventListener("keydown", (event) => {if (event.code === "Enter") validateLogin();});
/*Validate Login OnClick button*/
loginButton.addEventListener("click", validateLogin);
