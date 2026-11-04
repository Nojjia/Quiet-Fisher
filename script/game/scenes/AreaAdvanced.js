"use strict";

export class AreaAdvanced extends Phaser.Scene {
	constructor() {
		super({ key: 'AreaAdvanced' });
	}
	preload() {
	}

	create() {
		/*Holds input keys for movement with WASD and cursor for arrow keys*/
		this.username = sessionStorage.user;
		this.user = (JSON.parse(localStorage.getItem('users')));
		this.moveKey    = this.input.keyboard.addKeys('W,A,S,D');
		this.moveCursor = this.input.keyboard.createCursorKeys();

		this.walkAudio = this.sound.add('walk-sfx');

		/*
			* CREATE TILEMAP FOR BEGINNER AREA
			* ADD ALL TILESETS TO AN ARRAY TILESETS
			* ADD THE TILESETS TO THE RIGHT LAYER IN TILEMAP
		*/
		this.map = this.make.tilemap({ key: 'map-advanced' });

		/*ADD THE TILESETS FOR BEGINNER AREA TILEMAP TO USE*/
		const TILESETS = [
			this.map.addTilesetImage('tileset_14x34', 'tileset-tree-small'),
			this.map.addTilesetImage('tileset_32x50', 'tileset-tree-big'),
			this.map.addTilesetImage('tileset_32x32', 'tileset-textures'),
			this.map.addTilesetImage('volcano', 'tileset-volcano')
		];

		/*POPULATE LAYERS BY PASSING TILESETS INTO TILEMAPS*/
		this.mapLayer = {
			ground:		this.map.createLayer('ground', TILESETS),
			water:		this.map.createLayer('water', TILESETS),
			forestry:	this.map.createLayer('obstructions', TILESETS),
			volcano:	this.map.createLayer('volcano', TILESETS),
			deco:		this.map.createLayer('deco', TILESETS)
		};

		/*SET COLLISION FOR WATER AND FORESTY BLOCK WHERE TILE IS EMPTY*/
		this.mapLayer.water.setCollisionByExclusion([-1]);
		this.mapLayer.forestry.setCollisionByExclusion([-1]);
		this.mapLayer.volcano.setCollisionByExclusion([-1]);
		this.mapLayer.deco.setCollisionByExclusion([-1]);

		/*CREATE PLAYER*/
		this.player = this.physics.add.sprite(512, 600, 'player');
		/*COLLIDE WITH WORLD BOUNDS*/
		this.player.setCollideWorldBounds(true);
		/*COLLIDE PLAYER WITH WATER AND FORESTRY LATER*/
		this.physics.add.collider(this.player, this.mapLayer.water);
		this.physics.add.collider(this.player, this.mapLayer.forestry);
		this.physics.add.collider(this.player, this.mapLayer.deco);
		this.physics.add.collider(this.player, this.mapLayer.volcano);
		console.log()
		this.anims.create({
			key: 'walk',
			frames: this.anims.generateFrameNumbers('player', { start: 1, end: 2 }),
			frameRate: 4,
			repeat: -1
		});
		this.anims.create({
			key: 'still',
			frames: [ { key: 'player', frame: 0 } ],
			frameRate: 1,
		});

		this.keyThrowStone = this.input.keyboard.addKey('E');
		this.fnThrowReel = this.keyThrowStone.on('down', () => {this.catchFish();});

		/*BACK BUTTON FOR NAVIAGATION*/
		this.createButton(10, 10, 'Areas', 16, 16, 100, 'button', () => { this.scene.start('Game'); });
	}

	update() {
		/*MOVEMENT SPEED*/
		const SPEED = 200;

		/*CONTROL PLAYER ON WASD OR UP, DOWN, LEFT, RIGHT ARROW*/
		if (this.moveCursor.left.isDown || this.moveKey.A.isDown) {
			this.player.setVelocityX(-1 * SPEED);
			this.player.setFlipX(true);
		} else if (this.moveCursor.right.isDown || this.moveKey.D.isDown) {
			this.player.setVelocityX(SPEED);
			this.player.setFlipX(false);
		} else {
			this.player.setVelocityX(0);
		}

		if (this.moveCursor.up.isDown || this.moveKey.W.isDown) {
			this.player.setVelocityY(-1 * SPEED);
		} else if (this.moveCursor.down.isDown || this.moveKey.S.isDown) {
			this.player.setVelocityY(SPEED);
		} else {
			this.player.setVelocityY(0);
		}

		if (this.player.body.velocity.x !== 0 || this.player.body.velocity.y !== 0 ) {
			this.player.anims.play('walk', true);
			if (!this.walkAudio.isPlaying)
				this.walkAudio.play({ volume: localStorage.getItem('volumeSFX'), loop: true })
		} else {
			this.player.anims.play('still', true);
			this.walkAudio.stop()
		}
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

	catchFish() {
		/*Get tiles near user, drawing a square of 32x32*/
		const TILE_NEAR_USER = this.mapLayer.water.getTilesWithinWorldXY(this.player.x - 32, this.player.y - 32, 64, 64);
		/*tile varriable will hold first water tile in TILE_NEAR_USER*/
		let tile;
		for (let tempTile of TILE_NEAR_USER) {
			if (tempTile.index != -1) {
				tile = tempTile;
				break;
			}
		}

		if (!tile) return;

		/*Music to play when matching fish*/
		let fishCaughtSFX = this.sound.add('fish-caught-music');
		fishCaughtSFX.play({ volume: localStorage.getItem('volumeSFX') });

		/*Draw a line(the fishing line) from user to any point on the water map*/
		/*Bug to fix later on - Improve boundaries for rod to land on, right now it lands on soil as well*/
		let rod = this.add.line(
			0, 0,
			this.player.x + 16, this.player.y + 16,
			Phaser.Math.Between(0, 1024), Phaser.Math.Between(0, 768),
			0xff0000
		).setOrigin(0).setLineWidth(3);

		/*Show animation of a fish swimming to show that wee are fishing*/
		let fish = this.add.sprite(512, 512, 'fish-3').setScale(2);
		this.anims.create({
			key: 'fish-3-swim',
			frames: this.anims.generateFrameNumbers('fish-3', { start: 0, end: 2 }),
			frameRate: 6,
			repeat: -1
		});
		fish.anims.play('fish-3-swim', true);

		/*CREATE PROGRESS_BAR TO SHOW PROGRESS*/
		const BAR_HEIGHT = 32;
		const PROGRESS_BAR = {
			bar: this.add.rectangle(
				512 - (300 / 2),
				100,
				300,
				BAR_HEIGHT,
				0x000000
			).setOrigin(0, 0.5),
			highlight: this.add.rectangle(
				512 - (300 / 2) + 5,
				100,
				1,
				BAR_HEIGHT - 4,
				0xdddddd
			).setOrigin(0,0.5)
		};

		/*SETS OF KEYS THAT USER MUST PRESS TO PROGRESS*/
		const FISH_KEY = {
			set: ['Z', 'X', 'C', 'V', 'B', 'N', 'M', 'Q', 'E', 'R', 'T'],
			input: this.input.keyboard.addKeys('Z,X,C,V,B,N,M,Q,E,R,T')
		};
		let keyToPress = Phaser.Math.Between(0, FISH_KEY.set.length - 1); //randomly choose key to press
		let keycode = "Key" + FISH_KEY.set[keyToPress]; // creates the keycode
		let showKeyToPress = this.add.text(10, 100, FISH_KEY.set[keyToPress], { //shows what key to press
			fontSize: 40,
			color: 'white',
			backgroundColor: 'black',
			padding: 10,
			borderRadius: 10
		});

		let showCountdown = this.add.text(10, 200, '0', {
			fontSize: 40,
			color: 'red',
			backgroundColor: 'black'
		});

		let mistakeCount = 0;
		let showMistakes = this.add.text(10, 300, '0', {
			fontSize: 40,
			color: 'red',
			backgroundColor: 'black'
		});

		let timeLeft = 80000;
		const TIME_START = this.time.now;
		const DIFFICULTY_SETTER = 5000; // The time allowed between key press: 5secs rn
		const TIME_REWARD = 5000;
		const TIME_PUNISHMENT_WRONG_KEY = 10000;
		const TIME_PUNISHMENT_NO_KEYPRESS = 15000;
		let elapsed = 0;
		let elapsedFiveSecs = elapsed;
		let keyPressed = false;

		let blinkTween;
		const BLINK_COUNTDOWN_ONCHANGE = () => {
			if (blinkTween) {
				blinkTween.stop();
				blinkTween = null;
			}

			if (showKeyToPress.scene)
				showKeyToPress.setText(FISH_KEY.set[keyToPress]);

			showKeyToPress.setBackgroundColor('black');
			blinkTween = this.tweens.add({
				targets: showKeyToPress,
				alpha: 1,
				duration: 200,
				repeat: 2,
				yoyo: true,
				onStart: () => {
					if (showKeyToPress.scene)
						showKeyToPress.setBackgroundColor('pink');
				},
				onYoyo: () => {
					if (showKeyToPress.scene)
						showKeyToPress.setBackgroundColor('black');
				},
				onComplete: () => {
					if (showKeyToPress.scene)
						showKeyToPress.setBackgroundColor('black');
				}
			});
		}

		const CLICK_TO_CATCH = (event) => {
			timeEvent.paused = true;
			if (event.code === keycode) {
				console.log("DECREASE REMAINING TIME");
				timeLeft -= TIME_REWARD;
			}
			else if (event.code === 'KeyW' || event.code === 'KeyA' ||
				event.code === 'KeyS' || event.code === 'KeyD' ||
				this.moveCursor.left.isDown ||
				this.moveCursor.right.isDown ||
				this.moveCursor.down.isDown ||
				this.moveCursor.up.isDown
			) {
				console.log("STOP FISHING");
				rod.destroy();
				PROGRESS_BAR.bar.destroy();
				PROGRESS_BAR.highlight.destroy();
				timeEvent.remove();
				showKeyToPress.destroy();
				showCountdown.destroy();
				showMistakes.destroy();
				blinkTween = null;
				fish.destroy();
				fishCaughtSFX.stop();
				this.input.keyboard.off('keydown', CLICK_TO_CATCH);
				return;
			}

			else {
				mistakeCount++;
				showMistakes.setText('Mistakes: ' + mistakeCount);
				console.log("INCREASE REMAINING TIME");
				timeLeft += TIME_PUNISHMENT_WRONG_KEY;
			}
			elapsedFiveSecs = this.time.now;
			keyToPress = Phaser.Math.Between(0, FISH_KEY.set.length - 1);
			keycode = "Key" + FISH_KEY.set[keyToPress];
			BLINK_COUNTDOWN_ONCHANGE();
			timeEvent.paused = false;
		};

		this.input.keyboard.on('keydown', CLICK_TO_CATCH);

		let timeEvent = this.time.addEvent({
			delay: 100, // 100ms
			loop: true,
			callback: () => {
				timeEvent.paused = true;
				elapsed = this.time.now - TIME_START;

				showCountdown.setText((DIFFICULTY_SETTER / 1000) + "s: " + (DIFFICULTY_SETTER - Math.floor((this.time.now - elapsedFiveSecs))));

				if (elapsed >= timeLeft) {
					rod.destroy();
					PROGRESS_BAR.bar.destroy();
					PROGRESS_BAR.highlight.destroy();
					timeEvent.remove();
					showKeyToPress.destroy();
					showCountdown.destroy();
					showMistakes.destroy();
					blinkTween = null;
					fish.destroy();
					fishCaughtSFX.stop();
					this.input.keyboard.off('keydown', CLICK_TO_CATCH);

					if (this.username === 'guest') {
						console.log("Guest's score is not recorded");
						return;
					}

					let old_score = this.user[this.username].leaderboard.level_2.score;
					if (old_score > elapsed || old_score === null)
						this.user[this.username].leaderboard.level_2.score = Math.floor(elapsed);

					this.user[this.username].leaderboard.level_2.caught++;

					localStorage.setItem('users', JSON.stringify(this.user));
				} else if (this.time.now - elapsedFiveSecs >= DIFFICULTY_SETTER) {
					elapsedFiveSecs = this.time.now;
					timeLeft += TIME_PUNISHMENT_NO_KEYPRESS;
					keyToPress = Phaser.Math.Between(0, FISH_KEY.set.length - 1);
					keycode = "Key" + FISH_KEY.set[keyToPress];
					BLINK_COUNTDOWN_ONCHANGE();
				}
				PROGRESS_BAR.highlight.width = Phaser.Math.Clamp(
					(elapsed / timeLeft * (300 - 10)),
					0,
					(300 - 10)
				);
			timeEvent.paused = false;
			}
		});

	}
}

