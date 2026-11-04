"use strict";

export class Game extends Phaser.Scene {
	constructor() {
		super({ key: 'Game' });
	}

	create() {
		/*General background image*/
		this.add.image(512, 384, 'menu-background');

		/*CREATE BACK BUTTON*/
		this.createButton(10, 10, 'BACK', 16, 16, 100, 'button', () => { this.scene.start('MainMenu'); });

		/*CREATE NAVIGATION BUTTON FOR EACH LEVEL*/
		this.createLevel(1024 * 1/6, 384, 'BEGINNER', 'AreaBeginner'),
		this.createLevel(1024 * 3/6, 384, 'INTERMEDIATE', 'AreaIntermediate'),
		this.createLevel(1024 * 5/6, 384, 'ADVANCED', 'AreaAdvanced')
	}

	/*
		* createButton(x, y, label, fontsize, padding, w, key, callback)
		* This function allows us to create buttons easily, and keep our create() function clean
		* This should be moved in a module for helper functions only, but this can be implemented in the future
		* button created, consists of a nineslice, some text to label the button, and some event listener
	*/
	createButton(x, y, label, fontsize, padding, w, key, callback) {
		let h = fontsize + (padding * 2); //calculate height, so that button scales easily for different font sizes

		const BUTTON_SLICE = this.add.nineslice(x, y, key, null, w, h, 17, 17, 17, 17).setOrigin(0); // the nineslice image

		const BUTTON_TEXT = this.add.text(x, y, label, { //the label/text of the button
			fontFamily: 'Arial',
			fontSize: fontsize + "px",
			fontWeight: 'bold',
			color: 'black',
			align: 'center',
			fixedWidth: w
		}).setPadding(padding).setOrigin(0);

		BUTTON_SLICE.setInteractive({useHandCursor:true}); // UX, let user see that this can be clicked with pointer cursor

		/*Event listener for color change on hover*/
		BUTTON_SLICE.on('pointerover', () => { BUTTON_TEXT.setColor('red'); })
		BUTTON_SLICE.on('pointerout',  () => { BUTTON_TEXT.setColor('grey'); });

		BUTTON_SLICE.on('pointerdown', callback ); // generally is a scene.start call, but we use callback so that we can add different functionality in future

		return { button: BUTTON_SLICE, text: BUTTON_TEXT };
	}

	/*
		* createLevel(x, y, text, start)
		* This is a helper function for creating level selection buttons
		* If user is guest, all levels are always available
		* If user isnt guest, check level difficulty and fish caught in previous level
			* grant access to level, if previouss level clear threshold reached
	*/
	createLevel(x, y, text, start) {
		/*Get users and username from storage, for username and fish caught validation*/
		const USER = JSON.parse(localStorage.getItem('users'));
		const USERNAME = sessionStorage.getItem('user');

		/*Create level selector buttons*/
		let newBackground = this.add.image(x, y, 'level-icon-big-background');
		let newLabel = this.add.text(x, y-84, text).setOrigin(0.5);
		let newImage = this.add.image(x, y, 'level-icon-big').setOrigin(0.5);

		/*
			* lets us know if access to a level is denied
			* If access is denied, do animation is played, and a lock is put on top of button
		*/
		let denyAccess = false;

		if (USERNAME !== 'guest') { // guest has access to all levels
			/*
				* To play intermediate, at least 10 fish must be caught in beginner
				* To play advanced, at least 20 fish must be caught in intermediate
			*/
			if (
				(text === 'INTERMEDIATE' && USER[USERNAME].leaderboard.level_1.caught < 10) ||
				(text === 'ADVANCED' && USER[USERNAME].leaderboard.level_2.caught < 20)
			) {
				denyAccess = true;
				this.add.text(x, y, '🔒', { fontSize: 64 }).setOrigin(0.5); // create the lock to show access is denied
			}
		}

		if (denyAccess) // if access is denied, skip applying animation on pointer event
			return { label: newLabel, image: newImage };

		newImage.setInteractive({ useHandCursor: true }); // let user see that this element is interactive

		/*Play animation on hover*/
		newImage.on('pointerover', () => {
			newLabel.setColor('red');
			const CLOCKWISE = () => {
				this.tweens.add({
					targets: newImage,
					angle: Phaser.Math.Between(10, 40),
					duration: 200,
					yoyo: true,
					onComplete: ANTICLOCKWISE,
				});
			};
			const ANTICLOCKWISE = () => {
				this.tweens.add({
					targets: newImage,
					angle: Phaser.Math.Between(-10, -40),
					duration: 200,
					yoyo: true,
					onComplete: CLOCKWISE,
				});
			};
			CLOCKWISE();
		});

		/*Reset transforms on pointer out*/
		newImage.on('pointerout', () => {
			newLabel.setColor('white');
			this.tweens.killTweensOf(newImage);
			this.tweens.add({
				targets: newImage,
				angle: 0,
				duration: 200
			});
		});

		/*Start new scene on click*/
		newImage.on('pointerdown', () => {
			this.tweens.add({
				targets: newImage,
				scale: 1.3,
				duration: 200
			});
			this.scene.start(start);
		});

		return { label: newLabel, image: newImage };
	}
}
