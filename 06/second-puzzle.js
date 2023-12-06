import fs from "fs";

const input = fs.readFileSync("./06/input.txt").toString()

const lines = input.split("\n");

console.log()

const times = [+lines.shift().split(":")[1].replaceAll(" ", "")]
const distances = [+lines.shift().split(":")[1].replaceAll(" ", "")]

console.log(times, distances);

class Race {
	constructor(time, distance) {
		this.time = time;
		this.distance = distance;
		this.numberOfWaysToWin = 0;

		console.log(this);
		this.calculate()
	}

	calculate() {
		const [lower, higher] = [this.getLower(), this.getHigher()];
		console.log({ lower, higher });
		this.numberOfWaysToWin = higher - lower + 1;
	}

	getLower() {
		for (let i = 0; i < this.time; i++) {
			const timeHeld = i;
			const speed = i;

			const distance = (this.time - timeHeld) * speed;

			if (distance > this.distance) {
				return i;
			}
		}

		return previousLower;
	}

	getHigher() {
		for (let i = this.time; i > 0; i--) {
			const timeHeld = i;
			const speed = i;

			const distance = (this.time - timeHeld) * speed;
			if (distance > this.distance) {
				return i;
			}
		}

		return previousHigher;
	}
}

const races = [];

for (let i = 0; i < times.length; i++) {
	races.push(new Race(times[i], distances[i]))
}

const answer = races.map(parseToNumber).reduce((acc, e) => acc * e, 1);

function parseToNumber(race) {
	return race.numberOfWaysToWin;
}

console.log(answer);