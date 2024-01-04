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
	const [key, left, right] = [...node.matchAll(/([A-Z]{3})/g)].map(e => e[0])

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

while (currentNode.key !== "ZZZ") {
	currentNode = currentNode.go(letters.next());
	counter++;
}

console.log(counter)