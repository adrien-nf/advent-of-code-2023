import fs from "fs";

const input = fs.readFileSync("./04/input.txt").toString()

const answer = input.split("\n")
	.map(parseToCorrectFormat)
	.filter(validate)
	.map(toNumber)
	.reduce((acc, e) => acc + e, 0)
console.log(answer);

function parseToCorrectFormat(line) {
	const [winning, mine] = getNumbers(line);

	return {
		winning,
		mine
	}
}

function getNumbers(line) {
	const numbers = line.split(":")[1].trim();

	const [before, after] = numbers.split("|");

	return [
		before.split(" ").map(e => +e).filter(e => !!e),
		after.split(" ").map(e => +e).filter(e => !!e),
	]
}

function arrayDiff(arr1, arr2) {
	return arr1.filter(x => arr2.includes(x));
}

function validate(e) {
	return e;
}

function toNumber(e) {
	const diff = arrayDiff(e.winning, e.mine).length;
	console.log(e, diff);
	if (diff === 0) return 0;

	return 2 ** (diff - 1)
}