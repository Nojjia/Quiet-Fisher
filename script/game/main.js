"use strict";

/*
	* Import all scenes
*/
import { Boot } from './scenes/Boot.js';
import { Preloader } from './scenes/Preloader.js';
import { MainMenu } from './scenes/MainMenu.js';
import { Game } from './scenes/Game.js';
import { Settings } from './scenes/Settings.js';

import { AreaAdvanced } from './scenes/AreaAdvanced.js';
import { AreaIntermediate } from './scenes/AreaIntermediate.js';
import { AreaBeginner } from './scenes/AreaBeginner.js';


function init() {
	if (!sessionStorage.getItem('user')) {
		window.location.replace('/pages/website/login.html');
	}
	/*PHASER GAME CONFIG*/
	const config = {
		type: Phaser.AUTO,
		parent: 'main',
		autoFocus: true,
		disableContextMenu: true,
		roundPixel: true,
		physics: {
			default: 'arcade',
			arcade: {gravity: {y: 0}}
		},
		scale: {
			width: 1024,
			height: 768,
		},
		backgroundColor: "#222",
		scene: [Boot, Preloader, MainMenu, Game, Settings, AreaBeginner, AreaIntermediate, AreaAdvanced]
	};
	const game = new Phaser.Game(config);
}

if (document.readyState === 'complete') {
	init();
} else {
	window.addEventListener('load', init);
}
