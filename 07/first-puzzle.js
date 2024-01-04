import fs from "fs";

const input = fs.readFileSync("./07/input.txt").toString()

const order = ["A", "K", "Q", "J", "T", "9", "8", "7", "6", "5", "4", "3", "2"]

class Hand {
	constructor(hand) {
		this.hand = hand.split("");
		this.power = this.calculatePower()
	}

	calculatePower() {
		if (this.isOfAKind(5)) return 9;
		if (this.isOfAKind(4)) return 8;
		if (this.isFullHouse()) return 7;
		if (this.isOfAKind(3)) return 6;
		if (this.isTwoPairs()) return 5;
		if (this.isOnePair()) return 3;
		return 2;
	}

	isOfAKind(number) {
		return this.hand.some(card => this.hand.filter(e => e === card).length === number)
	}

	isFullHouse() {
		const pairs = this.hand.filter(card => this.hand.filter(e => e === card).length === 2)

		if (pairs.length !== 2) return false;

		const newHand = this.hand.filter(e => e !== pairs[0]);

		return newHand.filter(card => this.hand.filter(e => e === card).length === 3).length === 3
	}

	isTwoPairs() {
		return this.hand.filter(card => this.hand.filter(e => e === card).length === 2).length === 4
	}

	isOnePair() {
		return this.hand.filter(card => this.hand.filter(e => e === card).length === 2).length === 2
	}

	compareTo(b) {
		if (this.power > b.power) return 1;

		if (this.power < b.power) return -1;

		return this.compareCards(b)
	}

	compareCards(b) {
		for (let i = 0; i < this.hand.length; i++) {
			const [orderA, orderB] = [order.indexOf(this.hand[i]), order.indexOf(b.hand[i])]

			if (orderA < orderB) {
				return 1;
			}
			if (orderA > orderB) return -1;
		}
	}
}

class Player {
	constructor({ hand, bid }) {
		this.handString = hand
		this.hand = new Hand(hand);
		this.bid = +bid;
	}

	compareTo(b) {
		return this.hand.compareTo(b.hand);
	}
}

const answer = input.split("\n")
	.map(parseToCorrectFormat)
answer.sort((a, b) => {
	return a.compareTo(b);
});
console.log(answer);

console.log(answer.map(toNumber)
	.reduce((acc, e) => acc + e, 0))

function parseToCorrectFormat(line) {
	const [hand, bid] = line.split(" ");
	return new Player({ hand, bid });
}

function toNumber(player, index) {
	let rank = index + 1;

	return rank * player.bid;
}