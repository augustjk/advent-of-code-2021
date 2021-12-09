import fs from 'fs';

const input = fs.readFileSync('day9.txt').toString();

const rows = input.split('\n').map((row) => row.split('').map((str) => Number(str)));

let riskLevels = 0;

for (let i = 0; i < rows.length; i++) {
	for (let j = 0; j < rows[0].length; j++) {
		if (
			[
				[-1, 0],
				[0, -1],
				[1, 0],
				[0, 1],
			].every(([dx, dy]) => (rows[i + dx]?.[j + dy] ?? Infinity) > rows[i][j])
		) {
			riskLevels += rows[i][j] + 1;
		}
	}
}

console.log('part 1', riskLevels);

const visited = new Set<string>();
const basinSizes = [];

for (let i = 0; i < rows.length; i++) {
	for (let j = 0; j < rows[0].length; j++) {
		if (!visited.has(`${i},${j}`) && rows[i][j] !== 9) {
			let count = 1;
			visited.add(`${i},${j}`);
			const stack: [number, number][] = [[i, j]];
			while (stack.length) {
				const [x, y] = stack.pop()!;
				[
					[-1, 0],
					[0, -1],
					[1, 0],
					[0, 1],
				].forEach(([dx, dy]) => {
					if (!visited.has(`${x + dx},${y + dy}`) && (rows[x + dx]?.[y + dy] ?? 9) !== 9) {
						count++;
						visited.add(`${x + dx},${y + dy}`);
						stack.push([x + dx, y + dy]);
					}
				});
			}
			basinSizes.push(count);
			if (basinSizes.length > 3) {
				basinSizes.sort((a, b) => b - a).pop();
			}
		}
	}
}

console.log(
	'part 2',
	basinSizes.reduce((acc, item) => acc * item)
);
