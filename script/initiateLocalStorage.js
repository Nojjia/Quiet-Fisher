"use strict";

/*
	* users object and users.guest object must always exist
	* Hence we always check if users and users.guest exist and create them
*/

if (localStorage.users === undefined || JSON.parse(localStorage.users).guest == undefined) {
	localStorage.users = (JSON.stringify({
		'guest' : 0 
	}));
}

/*
	* In NAVBAR, there is GUEST button
	* GUEST button always logs in as guest
	* GUEST user's score is never recorder
*/
const guest = document.getElementById('guest-account');
guest.addEventListener('click', () => {
	sessionStorage.user = "guest";
	console.log('login as guest');
});
