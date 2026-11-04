"use strict";

export class Settings extends Phaser.Scene {
	constructor() {
		super({ key: 'Settings' });
	}

	create() {
		/*CREATE BACK BUTTON*/
		const CENTER = {
			x : this.scale.width / 2,
			y : this.scale.height / 2
		};

		this.add.image(CENTER.x, CENTER.y, 'menu-background');
		/*CREATE SETTINGS PANEL*/
		const PANEL_MARGIN = 300;
		const PANEL_WIDTH  = (CENTER.x * 2 - PANEL_MARGIN);
		const PANEL_HEIGHT = (PANEL_WIDTH * CENTER.y / CENTER.x);
		const PANEL_START  = (CENTER.y * 2 - PANEL_HEIGHT) / 2;
		const PANEL_END    = CENTER.y * 2 - PANEL_START;

		const PANEL = this.add.nineslice(512, 384, 'panel', null, PANEL_WIDTH, PANEL_HEIGHT, 17, 17, 17, 17);
		let itemPanel = { x: PANEL_MARGIN / 2, y: PANEL_START };



		this.createButton(10, 10, 'BACK', 16, 16, 100, 'button', () => { this.scene.start('MainMenu'); });


		itemPanel.y += 10;
		this.add.text(CENTER.x, itemPanel.y, 'Settings', {
			fontFamily: 'Arial',
			fontSize: '64px',
			color: 'black',
			align: 'center',
			backgroundColor: ''
		}).setOrigin(0.5, 0);
		itemPanel.y += 64;

		itemPanel.x += 10;

		itemPanel.y += 10;

		this.volMusic = this.createSlider(itemPanel, CENTER, PANEL_MARGIN, "[MUSIC]: ", 32, 'orange', 570, 32, 'volumeMusic');
		itemPanel.y += 32;
		itemPanel.y += 10;

		this.volSFX = this.createSlider(itemPanel, CENTER, PANEL_MARGIN, "[SFX]: ", 32, 'orange', 570, 32, 'volumeSFX');
		itemPanel.y += 32;
		itemPanel.y += 20;

		this.clearButton = this.createButton(CENTER.x, itemPanel.y, 'Clear Saved Files', 16, 16, 150, 'button', () => {
			localStorage.removeItem(sessionStorage.user);
			sessionStorage.removeItem('user');
			window.location.assign("index.html");
		});

		this.clearButton.button.setOrigin(0.5, 0);
		this.clearButton.text.setOrigin(0.5, 0);
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
	createSlider (itemPanel, CENTER, PANEL_MARGIN, label, fontsize, color, width, height, element) {
		/*CREATE SETTINGS PANEL*/
		let value = Phaser.Math.Clamp(localStorage[element], 0, 1);
		let valueHuman = Math.round(value * 100) + '%';
		let BAR_ORIGIN = {
			x: CENTER.x * 2 - PANEL_MARGIN / 2 - 10,
			y: itemPanel.y + 5,
		};
		let INNER_ORIGIN = {
			x: BAR_ORIGIN.x - (width / 2),
			y: BAR_ORIGIN.y + (height / 2)
		}

		const LABEL = this.add.text(itemPanel.x, itemPanel.y, label, {
			fontFamily: 'Arial',
			fontSize: fontsize + 'px',
			fontWeight: "bold",
			color: color,
		}).setOrigin(0);

		const BAR = this.add.rectangle(
			BAR_ORIGIN.x,
			BAR_ORIGIN.y,
			width,
			height,
			0x000000
		).setOrigin(1, 0);

		const limitHeight = 0;
		const HIGHLIGHT = this.add.rectangle(
			BAR_ORIGIN.x - width + 1,
			BAR_ORIGIN.y + 1,
			(width * value) - 2,
			height - 2,
			0xffffff
		).setOrigin(0);

		const KNOB = this.add.ellipse(
			BAR_ORIGIN.x - width + 2 + (width * value),
			BAR_ORIGIN.y + 2 + 10,
			height - 4 - 20,
			height - 4 - 20,
			0x00ff00
		).setOrigin(0.5, 0).setInteractive({ useHandCursor: true, draggable: true } );

		const VALUE_LABEL = this.add.text(INNER_ORIGIN.x, INNER_ORIGIN.y, valueHuman, {
			fontFamily: 'Arial',
			fontSize: fontsize / 2 + 'px',
			fontWeight: "bold",
			color: 'red'
		}).setOrigin(0.5);

		this.input.setDraggable(KNOB)
		this.input.on('drag', (pointer, gameObject, dragX) => {
			if (gameObject !== KNOB) return;

			const newWidth = Math.max(0, dragX - HIGHLIGHT.x);

			if (newWidth > width) return;

			HIGHLIGHT.width = newWidth;
			KNOB.x = HIGHLIGHT.x + newWidth;
			value = Phaser.Math.Clamp(HIGHLIGHT.width / width, 0, 1);
			localStorage[element] = Number(value.toFixed(2));
			let valueHuman = Math.round(localStorage[element] * 100) + '%';
			VALUE_LABEL.setText(valueHuman);
			this.registry.get('backgroundMusic').setVolume(value);
		});

		return { bar: BAR, highlight: HIGHLIGHT, label: LABEL, value: VALUE_LABEL };
	}
}
