"use strict";

/*
	* Why main.js exists?
		* I can load main.js only in all my html files and the appropriate module will be loaded
		* This allows my main.js to be cleaner
*/


import './initiateLocalStorage.js';
import './website-background.js';

/*get location of current page to dynamically load appropriate module*/
let currentPath = window.location.pathname;
const HOSTNAME = window.location.hostname;

if (HOSTNAME === "nojjia.github.io" || HOSTNAME === "nojjia.codeberg.page")
	currentPath = currentPath.replace(/^\/Quiet-Fisher/, '');

console.log(currentPath);
/*Load module for each page, as needed*/
switch (currentPath) {
	case '/pages/website/login.html':
		console.log('Loading login.js...');
		await import('./login.js');
		break;
	case '/pages/website/signup.html':
		console.log('Loading signup...');
		await import('./signup.js');
		break;
	case '/pages/game/menu.html':
		console.log('Loading game/main.js...');
		await import('./game/main.js');
		break;
	case '/pages/leaderboard.html':
		console.log('Loading leaderboard.js...');
		await import('./leaderboard.js');
		break;
	default:
		console.log('No personalized module to load');
		break;
}
