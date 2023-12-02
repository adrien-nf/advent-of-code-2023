import fs from "fs";

const input = fs.readFileSync("./02/input.txt").toString()

const answer = input.split("\n")
	.map(parseToCorrectFormat)
	.map(parseToValues)
	.map(toPower)
	.reduce((acc, e) => acc + e, 0)

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

function parseToValues(correctFormatObject) {
	return {
		...correctFormatObject,
		red: Math.max(...correctFormatObject["red"]),
		green: Math.max(...correctFormatObject["green"]),
		blue: Math.max(...correctFormatObject["blue"]),
	}
}

function toPower(correctFormatObject) {
	return correctFormatObject["red"] * correctFormatObject["green"] * correctFormatObject["blue"]
}