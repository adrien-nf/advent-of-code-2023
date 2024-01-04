import fs from "fs";

const input = fs.readFileSync("./08/input.txt").toString()

const lines = input.split("\n")

const pattern = lines.shift().split("");

lines.shift()

const map = new Map();

class Node {
	constructor(key, left, right) {
		this.key = key;
		this.left = left;
		this.right = right;
	}

	go(direction) {
		if (direction === "L") return this.goLeft();

		return this.goRight();
	}

	goLeft() {
		return map.get(this.left)
	}

	goRight() {
		return map.get(this.right)
	}
}

lines.forEach(node => {
	const [key, left, right] = [...node.matchAll(/([a-zA-Z0-9]{3})/g)].map(e => e[0])
	map.set(key, new Node(key, left, right));
})

class Letters {
	constructor(letters) {
		this.letters = letters;
		this.pointer = 0;
	}

	next() {
		const letter = this.letters[this.pointer];
		this.pointer++;
		if (this.pointer >= this.letters.length) this.pointer = 0;
		return letter;
	}
}

let currentNode = map.get("AAA");
const letters = new Letters(pattern);

let counter = 0;
let nodesToCheck = [...map.keys()].filter(e => e.endsWith("A")).map(e => map.get(e))
console.log(nodesToCheck)

const gcd = (a, b) => a ? gcd(b % a, a) : b;

const lcm = (a, b) => a * b / gcd(a, b);

const lcms = []

nodesToCheck.forEach(nodeToCheck => {
	letters.pointer = 0;
	counter = 0;
	while (!nodeToCheck.key.endsWith("Z")) {
		const nextLetter = letters.next()
		nodeToCheck = nodeToCheck.go(nextLetter);
		counter++;
	}
	lcms.push(counter)
})

console.log(lcms.reduce(lcm))