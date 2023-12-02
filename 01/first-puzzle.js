import fs from "fs";

const input = fs.readFileSync("./01/input.txt").toString()

const numbers = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];

const answer = input.split("\n")
	.map(lineToNumber)
	.reduce((acc, e) => acc + e, 0)

console.log(answer);

function lineToNumber(line) {
	return concat(getFirstNumber(line), getLastNumber(line));
}

function getFirstNumber(line) {
	const positions = numbers.reduce((acc, e) => ({ ...acc, [line.indexOf(e)]: e }), {})

	const min = Math.min(...parseAndRemoveNotFound(positions));

	return positions[min];
}

function getLastNumber(line) {
	const positions = numbers.reduce((acc, e) => ({ ...acc, [line.lastIndexOf(e)]: e }), {})

	const max = Math.max(...parseAndRemoveNotFound(positions));

	return positions[max];
}

function parseAndRemoveNotFound(positions) {
	return [...Object.keys(positions).filter(e => +e >= 0)]
}

function concat(first, last) {
	return +`${first}${last}`;
}
