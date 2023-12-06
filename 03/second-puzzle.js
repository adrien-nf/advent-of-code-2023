import fs from "fs";

const input = fs.readFileSync("./03/input.txt").toString()

const lines = input.split("\n");

const gears = {};

let sum = 0;

lines.forEach((line, index) => {
	const numbers = getNumbers(line, index);
	numbers.filter(hasSymbol);

})

console.log(Object.values(gears).filter(e => e.numbers.size === 2).map(e => [...e.numbers].reduce((acc, ele) => acc *= ele.number, 1)).reduce((acc, e) => acc + e, 0))

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

		if (e.symbol === ".") return false;

		if (Number.isInteger(+e.symbol)) return false;

		return true;
	});

	cells.forEach(e => {
		const key = `${e.y}-${e.x}`
		if (typeof gears[key] === "undefined") gears[key] = { key, numbers: new Set() }

		gears[key].numbers.add(number);
	})

	return cells.length > 0;
}

function readCell({ x, y }) {
	if (x < 0 || y < 0) return undefined;

	if (y >= lines.length) return undefined;

	if (x > lines[y].length) return undefined;

	return {
		x,
		y,
		symbol: lines[y][x]
	};
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
