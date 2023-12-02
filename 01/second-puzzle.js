import fs from "fs";

const input = fs.readFileSync("./01/input.txt").toString()

const lettersMapping = ["one", "two", "three", "four", "five", "six", "seven", "eight", "nine"];
const numbers = ["1", "2", "3", "4", "5", "6", "7", "8", "9", ...lettersMapping];

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

	return convertToNumber(positions[min]);
}

function getLastNumber(line) {
	const positions = numbers.reduce((acc, e) => ({ ...acc, [line.lastIndexOf(e)]: e }), {})

	const max = Math.max(...parseAndRemoveNotFound(positions));

	return convertToNumber(positions[max]);
}

function parseAndRemoveNotFound(positions) {
	return [...Object.keys(positions).filter(e => +e >= 0)]
}

function convertToNumber(str) {
	if (lettersMapping.includes(str)) return +lettersMapping.indexOf(str) + 1;

	return +str;
}

function concat(first, last) {
	return +`${first}${last}`;
}
