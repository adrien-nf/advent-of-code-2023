import fs from "fs";

const input = fs.readFileSync("./02/input.txt").toString()

const limits = {
	"red": 12,
	"green": 13,
	"blue": 14
}

const answer = input.split("\n")
	.map(parseToCorrectFormat)
	.filter(validate)
	.reduce((acc, e) => acc + e["gameNumber"], 0)

console.log(answer);

function parseToCorrectFormat(line) {
	const gameNumber = +line.match(/Game ([0-9]*)/)[1]
	const red = getNumbers(line, "red");
	const green = getNumbers(line, "green");
	const blue = getNumbers(line, "blue");

	return {
		gameNumber,
		red,
		green,
		blue
	}
}

function getNumbers(line, color) {
	const regex = new RegExp(`([0-9]*) ${color}`, "g");
	return [...line.matchAll(regex)].map(e => +e[1])
}

function validate(e) {
	return validateColor(e, "red") && validateColor(e, "green") && validateColor(e, "blue")
}

function validateColor(e, color) {
	return e[color].every((e) => e <= limits[color]);
}