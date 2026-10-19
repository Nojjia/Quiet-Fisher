"use strict";

import './initiateLocalStorage.js';
import './website-background.js';

/*get location of current page to dynamically load appropriate module*/
const currentPath = window.location.pathname;

switch (currentPath) {
	case '/pages/website/login.html':
		await import('./login.js');
		break;
	case '/pages/website/signup.html':
		await import('./signup.js');
		break;
	case '/pages/game/menu.html':
		await import('./game/main.js');
		break;
	default:
		break;
}
