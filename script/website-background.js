console.clear();

function row(){
	const row = document.createElement("div");

	row.className = "row";

	return row;
}
function item() {
	const item = document.createElement("div");

	item.className = "item";
	item.style.backgroundSize = itemSize + "px " + itemSize + "px";
	item.style.width = itemSize + "px";
	item.style.height = itemSize +"px";
	item.style.padding = itemMargin + "px";

	return item;
}

const screenSize = [window.innerWidth, window.innerHeight];
const background = document.getElementById("true-background");
const itemSize = 50;
const itemMargin = 10;

let columnCount = parseInt(screenSize[0] / (itemSize + itemMargin));
let rowCount = parseInt(screenSize[1] / (itemSize + itemMargin));

for (let height = 0; height < rowCount; height++) {
	const currentRow = row();
	background.append(currentRow);

	for (let width = 0; width < columnCount; width++) {
		currentRow.append(item());
	}
}
console.log(screenSize);
console.log(screenSize[0]);
console.log(item());
console.log(columnCount);
console.log(rowCount);
