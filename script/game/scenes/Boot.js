"use strict";

/*
	* Boot
	* preload components used in Preload.js :) ironic right
*/
export class Boot extends Phaser.Scene {
	constructor () {
		super({
			key: 'Boot',
			loader: { baseURL: '../../../' }
		});
	}

	preload() {
		let music = localStorage.volumeMusic;
		let sfx = localStorage.volumeSFX;
		if (!music || music < 0 || music > 1) {
			music = 0.1;
			localStorage.volumeMusic  = music;
		}
		if (!sfx || sfx < 0 || sfx > 1) {
			sfx = 0.1;
			localStorage.volumeSFX = sfx;
		}
		console.log("Session Volume[Music]: " + music);
		console.log("Session Volume[SFX]: " + sfx);

		this.load.image('logo-small', 'assets/images/logo-compact.svg');
		this.load.image('logo', 'assets/images/logo.svg');
	}

	create() {

		this.scene.start('Preloader');
	}

	update() {
	}
}
