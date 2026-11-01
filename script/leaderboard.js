"use strict";

function init(level) {
	console.log("leaderboard.js loaded");
	/*
		* CLEAR PREVIOUSLY APPLIED(IF ANY) INLINE STYLES OF LEVEL BUTTONS
	*/
	document.getElementById('level_1').removeAttribute('style');
	document.getElementById('level_2').removeAttribute('style');
	document.getElementById('level_3').removeAttribute('style');
	/*
		* Get the button for the current level
		* We will use this constant to style the background and animation of this particular button
	*/
	const LEVEL_BUTTON = document.getElementById(level);
	LEVEL_BUTTON.style.backgroundImage = 'linear-gradient(to bottom right, violet, black, violet)';
	LEVEL_BUTTON.style.animation = 'gradientMoveBackground 2s ease infinite'; //gradientMoveBackground is created in main-website.css

	/*
		* get the leaderboard body element
		* This is what we will append all user rows into
	*/
	const TABLE_BODY = document.getElementById('leaderboard_table_body');
	TABLE_BODY.innerHTML = ''; // clear TABLE_BODY's innser html, so that switch level displayed refreshes leaderboard as should

	/*Get ALL USERS*/
	const USERS = JSON.parse(localStorage.getItem('users'));

	let index = 0; // position and rank of users in the leaderboard
	let previousTime = null; // used to put users with name score in same index

	/*
		* users will hold an array of objects of usernames and time
		* users will be sorted by criteria of ascending score of time, and null anchored to bottom
	*/
	let users = [];	//empty array, to be filled with objects, containing username and time of a user
	/*Fill users array with the object*/
	for (let user in USERS) {
		if (user === 'guest') continue; // guest user's score is never saved, so we ignore it

		users.push({ 'username': user, 'time': USERS[user].leaderboard[level].score });
	}

	users.sort((a, b) => { // a is first user in array, b is second user in array
		if (a.time === null && b.time === null) return 0; // keep order as is, if both are null
		if (a.time === null) return 1; // if a has no time, put after b
		if (b.time === null) return -1; // if b has no time, put after a.  this runs only if a is not null

		if (a.time !== b.time) return a.time - b.time; // if result is negative, a comes bfore b
		return 0; // keep order if a and b equal
	});

	for (let user of users) {
		if (user === 'guest') continue; //skip guest since score is never saved

		if (index === 0 || user.time !== previousTime) index++; // only incremement index if index is 0 or time and previous time don't match
		previousTime = user.time;

		/*
			* Create row and data item containers
		*/
		let row = document.createElement('div'); // contains indexDiv, usernameDiv, and timeDiv
		let indexDiv = document.createElement('div');
		let usernameDiv = document.createElement('div');
		let timeDiv = document.createElement('div');

		/*
			* Set class names for main.website.css style to apply
		*/
		row.className = 'leaderboard_row';
		indexDiv.className = 'leaderboard_index';
		usernameDiv.className = 'leaderboard_username';
		timeDiv.className = 'leaderboard_time';

		/*
			* For the ranked 1st user, given that their score isn't null
			* give it a green background, a crown index instead of number 1, and gold text color
		*/
		if (index === 1 && user.time !== null) {
			indexDiv.className = 'leaderboard_index nf nf-fa-crown';
			indexDiv.style.color = 'gold';
			usernameDiv.style.color = 'gold';
			timeDiv.style.color = 'gold';

			row.style.backgroundColor = '#228B2244';
			row.addEventListener('mouseover', () => {
				row.style.backgroundColor = '#228B22AA';
			});
			row.addEventListener('mouseout', () => {
				row.style.backgroundColor = '#228B2244';
			});
		} else {
			/*give numerical index to all other rows*/
			indexDiv.textContent = index;
		}

		usernameDiv.textContent = user.username;

		/*
			* If time is null, write user friendly message and set different color and background color
			* else just set text to be time
		*/
		if (user.time === null) {
			timeDiv.textContent = 'No Score Yet!';
			timeDiv.style.color = 'wheat';
			row.style.backgroundColor = '#B2222244';
			row.addEventListener('mouseover', () => {
				row.style.backgroundColor = '#B22222AA';
			});
			row.addEventListener('mouseout', () => {
				row.style.backgroundColor = '#B2222244';
			});
		} else {
			timeDiv.textContent = user.time;
		}

		/*
			* Fill row with the index, username and time
			* append row to table body
		*/
		row.append(indexDiv);
		row.append(usernameDiv);
		row.append(timeDiv);
		TABLE_BODY.append(row);
	}
}

/* INITIALIZE BACKGROUND ON LOAD*/
if (document.readyState === 'complete') {
	init('level_1');
	document.getElementById('level_1').addEventListener('click', () => init('level_1'));
	document.getElementById('level_2').addEventListener('click', () => init('level_2'));
	document.getElementById('level_3').addEventListener('click', () => init('level_3'));
} else {
	window.addEventListener('load', () => init('level_1'));
	document.getElementById('level_1').addEventListener('click', () => init('level_1'));
	document.getElementById('level_2').addEventListener('click', () => init('level_2'));
	document.getElementById('level_3').addEventListener('click', () => init('level_3'));
}
