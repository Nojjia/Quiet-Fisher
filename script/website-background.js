"use strict";

/*
	* Create and return a row, that is a div of class row
	* Row is a container of items, rendered horizontally with flexbox row
*/
function createRow(){
	const row = document.createElement("div");
	row.className = "row";
	return row;
}

/*
	* Create and return an item, that is a div of class item
	* Item is a div that has a background image that is interactive
	* Item's width, height and padding is set here, instead of in a .css file, so that these values can be changed whenever
*/
function createItem(itemSize, itemMargin) {
	const item = document.createElement("div");

	item.className = "item";
	item.style.backgroundSize = itemSize + "px " + itemSize + "px";
	item.style.width = itemSize + "px";
	item.style.height = itemSize +"px";
	item.style.padding = itemMargin + "px";

	return item;
}

/*
	* Add event listener to window on even load
	* This populates the window with ROWs of ITEMs
*/
function init() {
	const BACKGROUND = document.getElementById("background");
	/*Screen size:
		* index 0: width ~ Use scrollWidth to get entire loaded document width
		* index 1: height ~ Use scrollWidth to get entire loaded document height
	*/
	const SCREEN_SIZE = [
		document.documentElement.scrollWidth,
		document.documentElement.scrollHeight
	];

	const X_Y_DIMENSION = 50, PADDING = 10;

	/*
		* Number of items needed to fit page horizontally
		* Number of rows needed to fit page vertically
	*/
	let NUMBER_OF_ITEMS = Math.floor(SCREEN_SIZE[0] / (X_Y_DIMENSION + PADDING));
	let NUMBER_OF_ROWS = Math.floor(SCREEN_SIZE[1] / (X_Y_DIMENSION + (PADDING * 2)));

	/*
		* For the number of rows needed to fill vertically,
		* 	create the row, and append to background
		* then
		* 	For the number of items needed to fill horizontally,
		* 		create items and append to row
	*/
	for (let height = 0; height < NUMBER_OF_ROWS; height++) {
		const row = createRow();
		BACKGROUND.append(row);
	
		for (let width = 0; width < NUMBER_OF_ITEMS; width++) {
			row.append(createItem(X_Y_DIMENSION, PADDING));
		}
	}
}

/* INITIALIZE BACKGROUND ON LOAD*/
if (document.readyState === 'complete') {
	init();
} else {
	window.addEventListener('load', init);
}
