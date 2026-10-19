"use strict";

/*User guest must always exist*/
if (localStorage.guest === undefined) {
	localStorage.guest = JSON.stringify({"password" : "0", "score": 0});
}

/*Navbar guest button must login as guest*/
const guest = document.getElementById('guest-account');
guest.addEventListener('click', () => {
	sessionStorage.user = "guest";
	console.log('login as guest');
});
