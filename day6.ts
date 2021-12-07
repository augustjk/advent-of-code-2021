import fs from 'fs';

const input = fs.readFileSync('day6.txt').toString();

const fishes = input.split(',').map((str) => Number(str));

const fishesCopy = fishes.slice();

for (let i = 0; i < 80; i++) {
	let newFishCount = 0;
	for (let j = 0; j < fishesCopy.length; j++) {
		if (fishesCopy[j] === 0) {
			fishesCopy[j] = 6;
			newFishCount += 1;
		} else {
			fishesCopy[j] -= 1;
		}
	}
	for (let k = 0; k < newFishCount; k++) {
		fishesCopy.push(8);
	}
}

console.log('part 1', fishesCopy.length);

const fishMap: Record<number, number> = {
	0: 0,
	1: 0,
	2: 0,
	3: 0,
	4: 0,
	5: 0,
	6: 0,
	7: 0,
	8: 0,
};

fishes.forEach((fish) => {
	fishMap[fish] += 1;
});

for (let i = 0; i < 256; i++) {
	const zeroes = fishMap[0];
	for (let j = 1; j <= 8; j++) {
		fishMap[j - 1] = fishMap[j];
	}
	fishMap[6] += zeroes;
	fishMap[8] = zeroes;
}

console.log(
	'part 2',
	Object.values(fishMap).reduce((acc, count) => acc + count, 0)
);
