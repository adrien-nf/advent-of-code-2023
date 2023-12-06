import fs from "fs";

const input = fs.readFileSync("./03/input.txt").toString()

const lines = input.split("\n");

let sum = 0;

lines.forEach((line, index) => {
	const numbers = getNumbers(line, index);
	let result = numbers.filter(hasSymbol).reduce((acc, e) => acc + e.number, 0);
	sum += result;
})

console.log(sum);

function getNumbers(line, index) {
	return [...line.matchAll(/[0-9]+/g)].map(e => ({
		number: +e[0],
		x: e["index"],
		y: index
	}));
}

function hasSymbol(number) {
	const adjacents = getAdjacentsOfNumber(number);

	const cells = adjacents.map(readCell).filter(e => {
		if (typeof e === "undefined") return false;

		if (e === ".") return false;

		if (Number.isInteger(+e)) return false;

		return true;
	});

	return cells.length > 0;
}

function readCell({ x, y }) {
	if (x < 0 || y < 0) return undefined;

	if (y >= lines.length) return undefined;

	if (x > lines[y].length) return undefined;


	return lines[y][x];
}

function getAdjacentsOfNumber(number) {
	let offset = 0;
	const adjacents = [];

	while (offset < ("" + number.number).length) {
		adjacents.push(...getAdjacents({ x: number.x + offset, y: number.y }))
		offset++;
	}

	return adjacents;
}

function getAdjacents({ x, y }) {
	return [
		createPos(x - 1, y - 1),
		createPos(x, y - 1),
		createPos(x + 1, y - 1),
		createPos(x - 1, y),
		createPos(x + 1, y),
		createPos(x - 1, y + 1),
		createPos(x, y + 1),
		createPos(x + 1, y + 1),
	]
}

function createPos(x, y) {
	return { x, y }
}
