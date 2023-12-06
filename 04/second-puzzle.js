import fs from "fs";

const input = fs.readFileSync("./04/input.txt").toString()

let hash = new Map();
let hash2 = new Map();

let number = 202;
input.split("\n")
	.map(parseToCorrectFormat)
	.filter(validate)
	.forEach(card => {
		updateCardsWon(card);
	})

hash2.set(202, 0);
console.log(hash);
for (let i = 202; i > 0; --i) {
	hash2.set(i, getTotalSize(hash.get(i)));
	if (i > 195) {
		console.log(i, hash2.get(i))
	}
}


for (let i = 202; i > 0; --i) {
	number += hash2.get(i);
}

console.log(number)

function getTotalSize(arr) {
	return arr.map(e => getTotalSize(hash.get(e))).reduce((acc, e) => acc + e, 0) + arr.length
}

function updateCardsWon(card) {
	const diff = arrayDiff(card.winning, card.mine).length;

	const cardsWon = getCardsWon(card.cardNumber, diff)

	hash.set(card.cardNumber, cardsWon);
}


function getCardsWon(start, number) {
	return [...(new Array(number)).keys()].map(e => e + start + 1);
}

function parseToCorrectFormat(line) {
	const cardNumber = getCardNumber(line);
	const [winning, mine] = getNumbers(line);

	return {
		cardNumber,
		winning,
		mine
	}
}

function getCardNumber(line) {
	return +line.match(/Card *([0-9]+)/)[1]
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
