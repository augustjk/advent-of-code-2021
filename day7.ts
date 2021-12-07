import fs from 'fs';

const input = fs.readFileSync('day7.txt').toString();

const positions = input.split(',').map((str) => Number(str));

let minFuel = Infinity;
let current = 0;
while (true) {
	const fuel = positions.reduce((acc, pos) => acc + Math.abs(pos - current), 0);
	if (fuel > minFuel) {
		break;
	} else {
		minFuel = fuel;
		current += 1;
	}
}

console.log('part 1', minFuel);

minFuel = Infinity;
current = 0;
while (true) {
	const fuel = positions.reduce((acc, pos) => {
		const distance = Math.abs(pos - current);
		const cost = (distance * (distance + 1)) / 2;
		return acc + cost;
	}, 0);
	if (fuel > minFuel) {
		break;
	} else {
		minFuel = fuel;
		current += 1;
	}
}

console.log('part 2', minFuel);
