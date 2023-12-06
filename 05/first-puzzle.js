import fs, { read } from "fs";

const input = fs.readFileSync("./05/input.txt").toString();

const lines = input.split("\n");

const seeds = lines.shift().split(" ").map(e => +e);
seeds.shift();

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

	contains(sourceIndex) {
		return this.sourceRange.contains(sourceIndex);
	}

	get(sourceIndex) {
		const relativePosition = this.sourceRange.getRelativePosition(sourceIndex);

		return this.destinationRange.get(relativePosition);
	}
}


class Mapper {
	mapped = [];

	add(line) {
		const [destinationRangeStart, sourceRangeStart, size] = line.split(" ").map(e => +e)
		this.mapped.push(new Mapped({ destinationRangeStart, sourceRangeStart, size }))
	}

	get(sourceIndex) {
		const mapped = this.mapped.find(mapped => mapped.contains(sourceIndex));

		if (mapped) {
			return mapped.get(sourceIndex);
		}

		return sourceIndex;
	}
}

const seedsToSoil = new Mapper();
const soilToFertilizer = new Mapper();
const fertilizerToWater = new Mapper();
const waterToLight = new Mapper();
const lightToTemperature = new Mapper();
const temperatureToHumidity = new Mapper();
const humidityToLocation = new Mapper();

readTo(seedsToSoil)
readTo(soilToFertilizer)
readTo(fertilizerToWater)
readTo(waterToLight)
readTo(lightToTemperature)
readTo(temperatureToHumidity)
readTo(humidityToLocation)

function readTo(target) {
	lines.shift();
	lines.shift();
	while (lines[0] !== "") {
		target.add(lines[0]);
		lines.shift();
	}
}

const answer = Math.min(...seeds
	.map(parseToCorrectFormat))

console.log(answer);

function parseToCorrectFormat(seed) {
	const soil = seedsToSoil.get(seed);
	const fertilizer = soilToFertilizer.get(soil);
	const water = fertilizerToWater.get(fertilizer);
	const light = waterToLight.get(water);
	const temperature = lightToTemperature.get(light);
	const humidity = temperatureToHumidity.get(temperature);
	return humidityToLocation.get(humidity);
}
