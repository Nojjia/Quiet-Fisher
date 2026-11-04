"use strict";

export class MainMenu extends Phaser.Scene {
	player;
	boundary;
	constructor() {
		super({ key: 'MainMenu' });
	}

	create() {
		const BUTTON_DATA = [
			{ name: 'logout', text: 'Log Out', start: null },
			{ name: 'settings', text: 'Settings', start: 'Settings' },
			{ name: 'play', text: 'Play', start: 'Game' },
		];
		this.menuButton = {};

		this.add.image(512, 384, 'menu-background');
		this.add.image(512, 100, 'logo').setScale(2).setOrigin(0.5, 0);

		for (let index = 0; index < BUTTON_DATA.length; index++) {
			const BTN_X = 20, BTN_Y = 768, BTN_PAD = 16, BTN_FONT_SIZE = 32;
			let btnY = BTN_Y - (BTN_X * (index * 2.5)) - BTN_FONT_SIZE - (BTN_PAD * (index * 2));

			const KEY = BUTTON_DATA[index].name;
			const TEXT = BUTTON_DATA[index].text;
			const START = BUTTON_DATA[index].start;

			this.add.nineslice(BTN_X, btnY, 'button', null, 256, 64, 17, 17, 17, 17).setOrigin(0, 1);
			this.menuButton[KEY] = this.add.text(
				BTN_X, btnY, TEXT,
				{
					fontFamily: 'Arial',
					fontSize: BTN_FONT_SIZE + 'px',
					color: 'white',
					align: 'center',
					fixedWidth: 260
				}
			).setInteractive({ useHandCursor: true } )
			.setOrigin(0, 1)
			.setPadding(BTN_PAD)
			.on('pointerover', () => { this.menuButton[KEY].setColor('red'); })
			.on('pointerout', () => { this.menuButton[KEY].setColor('white'); })

			if (START) {
				this.menuButton[KEY].on('pointerdown', () => { this.scene.start(START); });
			} else {
				this.menuButton[KEY].on('pointerdown', () => {
					sessionStorage.removeItem('user');
					window.location.assign('pages/website/login.html');
				});
			}
		}
	}

	update() {
	}
}
