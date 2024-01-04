import fs from "fs";

const input = fs.readFileSync("./10/input.txt").toString()
const loop = [];

class Tile {
	constructor(char, pos) {
		this.char = char;
		this.pos = pos;
	}

	generateConnections() {
		this.connections = [];

		const possibleConnections = this.getPossibleConnections();

		this.connections = possibleConnections.filter(connection => {
			if (!connection.tile) return false;

			return this.connectsTo(connection.tile, connection.direction)
		})
	}

	getPossibleConnections() {
		return this.connectDirections.map(dir => this.getConnection(dir));
	}

	connectsTo(tile, direction) {
		const oppositeDirection = getOppositeDirection(direction);

		return tile.connectDirections.includes(oppositeDirection)
	}

	getConnection(direction) {
		switch (direction) {
			case "left": return createConnection("left", { x: this.pos.x - 1, y: this.pos.y })
			case "right": return createConnection("right", { x: this.pos.x + 1, y: this.pos.y })
			case "up": return createConnection("up", { x: this.pos.x, y: this.pos.y - 1 })
			case "down": return createConnection("down", { x: this.pos.x, y: this.pos.y + 1 })
		}
	}

	explore(distance) {
		loop.push(this);
		this.distance = distance;

		const toExplore = this.connections.filter(connection => {
			if (typeof connection.tile.distance === "undefined") return true;

			if (connection.tile.distance > distance) return true;

			return false;
		})

		CageExplorer.toExplore.push(...toExplore.map(e => ({
			cell: e.tile,
			distance: distance + 1
		})));
	}
}

class Pipe extends Tile {
	connectDirections = ["up", "down"]
}

class Dash extends Tile {
	connectDirections = ["left", "right"]
}

class L extends Tile {
	connectDirections = ["up", "right"]
}

class J extends Tile {
	connectDirections = ["up", "left"]
}

class Seven extends Tile {
	connectDirections = ["left", "down"]
}

class F extends Tile {
	connectDirections = ["right", "down"]
}

class Dot extends Tile {
	connectDirections = []
}

class S extends Tile {
	connectDirections = ["left", "right", "up", "down"]
}

function createConnection(direction, pos) {
	return {
		direction,
		tile: CageFinder.getTile(pos)
	}
}

function getOppositeDirection(direction) {
	switch (direction) {
		case "left": return "right";
		case "right": return "left";
		case "up": return "down";
		case "down": return "up";
	}
}

class TileFactory {
	static create(character, pos) {
		switch (character) {
			case "|": return new Pipe(character, pos)
			case "-": return new Dash(character, pos)
			case "L": return new L(character, pos)
			case "J": return new J(character, pos)
			case "7": return new Seven(character, pos)
			case "F": return new F(character, pos)
			case ".": return new Dot(character, pos)
			case "S": return new S(character, pos)
		}
	}
}

class CageFinder {
	static grid;

	constructor(input) {
		CageFinder.grid = input.map((e, y) => e.split("").map((char, x) => TileFactory.create(char, { x, y })));
		CageFinder.grid.forEach(line => line.forEach((tile) => tile.generateConnections()))
		let hasChanges = true;
		while (hasChanges) {
			hasChanges = false
			CageFinder.grid = CageFinder.grid.map(line => line.map((tile) => {
				if (tile.connections.length !== 2 && tile.char !== ".") {
					hasChanges = true;
					return new Dot(".", tile.pos)
				}

				return tile;
			}))
			CageFinder.grid.forEach(line => line.forEach((tile) => tile.generateConnections()))
		}

		const explorer = new CageExplorer(CageFinder.grid)
		explorer.getSolution()
		console.log()
	}

	static getTile(pos) {
		if (pos.x < 0 || pos.x >= CageFinder.grid.length) return undefined;
		if (pos.y < 0 || pos.y >= CageFinder.grid.length) return undefined;

		return CageFinder.grid[pos.y][pos.x]
	}
}

class CageExplorer {
	constructor(grid) {
		this.grid = grid;
	}

	static toExplore = []

	getSolution() {
		const startingCell = this.getStartingCell();

		CageExplorer.toExplore = [{ cell: startingCell, distance: 0 }];

		let maxDistance = 0;

		while (CageExplorer.toExplore.length > 0) {
			const { cell, distance } = CageExplorer.toExplore.shift()
			cell.explore(distance);
			if (maxDistance < distance) maxDistance = distance;
		}

		console.log(maxDistance)
	}

	getStartingCell() {
		return this.grid.flat().find(tile => tile.char === "S")
	}
}

const cageFinder = new CageFinder(input.split("\n"));

function printGrid() {
	let buffer = "";
	CageFinder.grid.forEach(line => {
		line.forEach(tile => {
			buffer += tile.char
		})
		buffer += "\n";
		// console.log(...line.map(e => e.char === "." ? "." : e.char))
	})
	fs.writeFileSync("./test.txt", buffer)
}

let count = 0;
let n = 0;
console.log(CageFinder.grid[0][0], CageFinder.getTile({ x: 0, y: 0 }))

input.split("\n").forEach((line, y) => {
	let current = 0;
	line.split("").forEach((char, x) => {
		const tile = CageFinder.getTile({ x, y })

		if (loop.includes(tile) && ["|", "F", "7"].includes(char)) {
			current++;
		} else {
			console.log("ici", char)
			if (char === "." && (current % 2) === 1) {
				console.log("et là")
				tile.char = "I"
				count++;
			}
		}
	})
})

console.log(count);

printGrid()