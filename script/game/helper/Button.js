export createButton(position, text, fontsize, padding, width, key, callback) {
	let height = fontsize + (padding * 2);
	const BUTTON_SLICE = this.add.nineslice(position.x, position.y, key, null, width, height, 17, 17, 17, 17);
	const BUTTON_TEXT = this.add.text(position.x, position.y, text, {
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
