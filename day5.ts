import fs from 'fs';

const input = fs.readFileSync('day5.txt').toString();

const lines = input.split('\n');

let points: Record<number, Record<number, number>> = {};

for (const line of lines) {
	const [start, end] = line.split(' -> ');
	const [x1, y1] = start.split(',').map((str) => Number(str));
	const [x2, y2] = end.split(',').map((str) => Number(str));

	if (x1 === x2) {
		const low = y1 < y2 ? y1 : y2;
		const high = y1 > y2 ? y1 : y2;

		for (let y = low; y <= high; y++) {
			if (points[x1] === undefined) {
				points[x1] = {};
			}
			if (points[x1][y] === undefined) {
				points[x1][y] = 1;
			} else {
				points[x1][y] += 1;
			}
		}
	} else if (y1 === y2) {
		const low = x1 < x2 ? x1 : x2;
		const high = x1 > x2 ? x1 : x2;
		for (let x = low; x <= high; x++) {
			if (points[x] === undefined) {
				points[x] = {};
			}
			if (points[x][y1] === undefined) {
				points[x][y1] = 1;
			} else {
				points[x][y1] += 1;
			}
		}
	}
}

let count = 0;
for (const x in points) {
	for (const y in points[x]) {
		if (points[x][y] > 1) {
			count += 1;
		}
	}
}

console.log('part 1', count);

points = {};
count = 0;

for (const line of lines) {
	const [start, end] = line.split(' -> ');
	let [x1, y1] = start.split(',').map((str) => Number(str));
	let [x2, y2] = end.split(',').map((str) => Number(str));

	if (points[x1] === undefined) {
		points[x1] = {};
	}
	if (points[x1][y1] === undefined) {
		points[x1][y1] = 1;
	} else {
		points[x1][y1] += 1;
	}

	while (x1 !== x2 || y1 !== y2) {
		if (x1 !== x2) {
			if (x1 < x2) {
				x1 += 1;
			} else {
				x1 -= 1;
			}
		}

		if (y1 !== y2) {
			if (y1 < y2) {
				y1 += 1;
			} else {
				y1 -= 1;
			}
		}

		if (points[x1] === undefined) {
			points[x1] = {};
		}
		if (points[x1][y1] === undefined) {
			points[x1][y1] = 1;
		} else {
			points[x1][y1] += 1;
		}
	}
}

for (const x in points) {
	for (const y in points[x]) {
		if (points[x][y] > 1) {
			count += 1;
		}
	}
}

console.log('part 2', count);
