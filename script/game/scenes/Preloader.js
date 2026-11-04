"use strict";

export class Preloader extends Phaser.Scene {
	constructor() {
		super({ key: 'Preloader' });
	}

	init() {
		/*ADD PROGRESS BAR*/
		const CENTER = { x: this.scale.width / 2, y: this.scale.height / 2 };
		const BAR = { w: 468, h: 32, s: 1 }; //w is width, h is height, s is stroke
		const LOADING_BAR = {
			bar: this.add.rectangle(CENTER.x, CENTER.y, BAR.w, BAR.h, 0x000000),
			highlight: this.add.rectangle((CENTER.x - ((BAR.w / 2) - (BAR.s * 2))), CENTER.y, 1, 28, 0xffffff),
			progress: this.add.text(CENTER.x, CENTER.y, '0%', {
				fontFamily: 'Arial',
				fontSize: '16px',
				fontWeight: 'bold',
				color: 'red',
				align: 'center',
			}),
			asset: this.add.text(CENTER.x, (CENTER.y + BAR.h + (2 * BAR.s)), "", {
				fontFamily: 'Arial',
				fontSize: '16px',
				fontWeight: 'bold',
				color: 'red',
				align: 'center',
			}),
		}

		LOADING_BAR.bar.setOrigin(0.5, 0.5).setStrokeStyle(BAR.s, 0xff0000);
		LOADING_BAR.highlight.setOrigin(0, 0.5);
		LOADING_BAR.progress.setOrigin(0.5, 0.5);
		LOADING_BAR.asset.setOrigin(0.5, 0);


		this.load.on('progress', (progress) => {
			LOADING_BAR.highlight.width = 1 + ((BAR.w - (5 * BAR.s)) * progress);
			LOADING_BAR.progress.setText((progress * 100) + "%");
		});

		this.load.on('fileprogress', (file) => {
			LOADING_BAR.asset.setText(file.key);
		});

		this.load.on('complete', (file) => {
			LOADING_BAR.progress.setText('!!COMPLETE!!');
			LOADING_BAR.asset.setText('Click to continue to game...');
		});

		/*ADD LOGOS*/
		this.add.image(512, 50, 'logo').setOrigin(0.5, 0);
		this.add.image(512, 768 - 50, 'logo-small').setOrigin(0.5, 1);
	}

	preload() {
		this.load.audio('background-music', 'assets/music/game-bg.mp3');
		this.load.audio('fish-caught-music', 'assets/music/fish-caught.mp3');
		this.load.audio('walk-sfx', 'assets/music/walk.mp3');
		this.load.audio('victory-sfx', 'assets/music/victory.mp3');

		this.load.image('menu-background', 'assets/images/page.png');
		this.load.image('button', 'assets/textures/nine-slice/button-menu.png');
		this.load.image('panel', 'assets/textures/nine-slice/panel.png');
		this.load.image('level-icon-big', 'assets/textures/paper-boat-big.png');
		this.load.image('level-icon-small', 'assets/textures/paper-boat-small.png');
		this.load.image('level-icon-big-background', 'assets/textures/paper-boat-background.png');

		this.load.tilemapTiledJSON('map-beginner', 'assets/textures/AreaBeginner.tmj');
		this.load.tilemapTiledJSON('map-intermediate', 'assets/textures/AreaIntermediate.tmj');
		this.load.tilemapTiledJSON('map-advanced', 'assets/textures/AreaAdvanced.tmj');

		this.load.image('tileset-tree-small', 'assets/textures/tileset_14x34.png');
		this.load.image('tileset-tree-big', 'assets/textures/tileset_32x50.png');
		this.load.image('tileset-textures', 'assets/textures/tileset_32x32.png');
		this.load.image('tileset-mountain', 'assets/textures/mountain.png');
		this.load.image('tileset-volcano', 'assets/textures/volcano.png');

		this.load.spritesheet('player', 'assets/sprites/player.png',
			{ frameWidth: 32, frameHeight: 32}
		);

		this.load.spritesheet('fish-1', 'assets/sprites/fish-1.png',
			{ frameWidth: 150, frameHeight: 74}
		);

		this.load.spritesheet('fish-2', 'assets/sprites/fish-2.png',
			{ frameWidth: 256, frameHeight: 97}
		);

		this.load.spritesheet('fish-3', 'assets/sprites/fish-3.png',
			{ frameWidth: 300, frameHeight: 200}
		);
	}

	create() {
		this.sound.pauseOnBlur = false;
		this.music = this.sound.add('background-music', { loop: true, volume: localStorage.volumeMusic });

		this.registry.set('backgroundMusic', this.music);

		this.input.once('pointerdown', () => {
			this.music.play();
			this.scene.start('MainMenu');
		});

	}

	update() {
	}
}

