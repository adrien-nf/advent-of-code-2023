import { Console } from "console";
import fs from "fs";

const input = fs.readFileSync("./09/input.txt").toString()

class Solver {
	constructor(numbers) {
		this.numbers = numbers;
		this.initializeForNextNumber()
		this.solve();
	}

	initializeForNextNumber() {
		for (let i = 0; i < this.numbers.length - 1; i++) {
			this.numbers[i].push("X");
		}

		this.numbers[this.numbers.length - 1].push(0)
	}

	solve() {
		while (this.shouldContinueSolving()) {
			this.solveNextLine()
		}
	}

	shouldContinueSolving() {
		return !this.isLineSolved(this.numbers[0]);
	}

	isLineSolved(line) {
		return line.every(e => e !== "X")
	}

	solveNextLine() {
		const { lineToSolve, nextLine } = this.getNextLinesToSolve()

		const [upperLineLastElement, lowerLineLastElement] = [lineToSolve[lineToSolve.length - 2], nextLine[nextLine.length - 1]]

		const nextElement = upperLineLastElement + lowerLineLastElement;

		lineToSolve.splice(lineToSolve.length - 1, 1, nextElement)
	}

	getNextLinesToSolve() {
		const linesNotSolved = this.numbers.filter(e => !this.isLineSolved(e));
		const indexOfLastLineNotSolved = this.numbers.indexOf(linesNotSolved[linesNotSolved.length - 1])

		return {
			lineToSolve: this.numbers[indexOfLastLineNotSolved],
			nextLine: this.numbers[indexOfLastLineNotSolved + 1]
		}
	}

	getNextNumber() {
		return this.numbers[0][this.numbers[0].length - 1]
	}
}

class Extrapolator {
	constructor(numbers) {
		this.numbers = [numbers];
		this.findUntilLineIsZero();
	}

	findUntilLineIsZero() {
		while (this.shouldContinueFinding()) {
			this.next();
		}
	}

	shouldContinueFinding() {
		return !this.getLastLine().every(e => e === 0)
	}

	next() {
		const next = [];
		const nextLine = this.getLastLine();
		for (let i = 0; i < nextLine.length - 1; i++) {
			const first = nextLine[i];
			const second = nextLine[i + 1];
			next.push(second - first)
		}
		this.numbers.push(next);
	}

	getLastLine() {
		return this.numbers[this.numbers.length - 1]
	}

	toNumber() {
		return (new Solver(this.numbers)).getNextNumber()
	}
}

const answer = input.split("\n")
	.map((line) => {
		return (new Extrapolator(line.split(" ").map(e => +e))).toNumber()
	})
	.reduce((acc, e) => acc + e, 0)

console.log(answer);
