"use strict";

export class AreaAdvanced extends Phaser.Scene {
	constructor() {
		super({
			key: 'AreaAdvanced',
			loader: { baseURL: '../../../'}
		});
	}

	init() {
	}

	preload() {
	}

	create() {
		this.createButton(10, 10, 'Areas', 16, 16, 100, 'button', () => { this.scene.start('Game'); });
	}

	update() {
	}

	createButton(x, y, label, fontsize, padding, w, key, callback) {
		let h = fontsize + (padding * 2);

		const BUTTON_SLICE = this.add.nineslice(x, y, 'button', null, w, h, 17, 17, 17, 17);

		const BUTTON_TEXT = this.add.text(x, y, label, {
			fontFamily: 'Arial',
			fontSize: fontsize + "px",
			fontWeight: 'bold',
			color: 'black',
			align: 'center',
			fixedWidth: w
		}).setPadding(padding);

		BUTTON_SLICE.setOrigin(0).setInteractive({useHandCursor:true});
		BUTTON_TEXT.setOrigin(0);
		BUTTON_SLICE.on('pointerover', () => { BUTTON_TEXT.setColor('red'); })
		BUTTON_SLICE.on('pointerout',  () => { BUTTON_TEXT.setColor('grey'); });
		BUTTON_SLICE.on('pointerdown', callback );

		return { button: BUTTON_SLICE, text: BUTTON_TEXT };
	}
}

