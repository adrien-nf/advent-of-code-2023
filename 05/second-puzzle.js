import fs from "fs";

const input = fs.readFileSync("./05/input.txt").toString();

const lines = input.split("\n");

class Range {
	constructor({
		start,
		end
	}) {
		this.start = start;
		this.end = end;
	}

	contains(index) {
		return index >= this.start && index < this.end;
	}

	getRelativePosition(index) {
		return index - this.start;
	}

	get(relativePosition) {
		return this.start + relativePosition;
	}
}

class Mapped {
	constructor({ destinationRangeStart, sourceRangeStart, size }) {
		this.sourceRange = new Range({ start: sourceRangeStart, end: sourceRangeStart + size });
		this.destinationRange = new Range({ start: destinationRangeStart, end: destinationRangeStart + size });
	}

	contains(sourceIndex, type) {
		if (type === "source") return this.sourceRange.contains(sourceIndex);

		return this.destinationRange.contains(sourceIndex);
	}

	get(index, type) {
		const [from, to] = type === "source" ? [this.sourceRange, this.destinationRange] : [this.destinationRange, this.sourceRange];

		const relativePosition = from.getRelativePosition(index);

		return to.get(relativePosition);
	}
}


class Mapper {
	mapped = [];

	add(line) {
		const [destinationRangeStart, sourceRangeStart, size] = line.split(" ").map(e => +e)
		this.mapped.push(new Mapped({ destinationRangeStart, sourceRangeStart, size }))
	}

	next(sourceIndex) {
		return this.get(sourceIndex, "source");
	}

	previous(destinationIndex) {
		return this.get(destinationIndex, "destination")
	}

	get(index, type) {
		const mapped = this.mapped.find(mapped => mapped.contains(index, type));

		if (mapped) {
			return mapped.get(index, type);
		}

		return index;
	}
}

const ranges = lines.shift().split(" ").map(e => +e);
ranges.shift();

const seedsToSoil = readMap();
const soilToFertilizer = readMap();
const fertilizerToWater = readMap();
const waterToLight = readMap();
const lightToTemperature = readMap();
const temperatureToHumidity = readMap();
const humidityToLocation = readMap();

const seedRanges = getRanges(ranges)

let answer = null;
let i = 1;

while (!answer) {
	const seed = reverseParse(i);

	if (seedRanges.find(e => e.contains(seed))) answer = i;

	i++;
}

console.log(answer);

function readMap() {
	const target = new Mapper();
	lines.shift();
	lines.shift();
	while (lines[0] !== "") {
		target.add(lines[0]);
		lines.shift();
	}

	return target;
}

function getRanges(seedRanges) {
	const ranges = [];

	while (seedRanges.length > 0) {
		const start = seedRanges.shift();
		const size = seedRanges.shift();

		ranges.push(new Range({ start, end: start + size }));
	}

	return ranges;
}

function reverseParse(location) {
	const humidity = humidityToLocation.previous(location);
	const temperature = temperatureToHumidity.previous(humidity);
	const light = lightToTemperature.previous(temperature);
	const water = waterToLight.previous(light);
	const fertilizer = fertilizerToWater.previous(water);
	const soil = soilToFertilizer.previous(fertilizer);
	const seed = seedsToSoil.previous(soil);

	return seed;
}
