import fs from 'fs';

const input = fs.readFileSync('day2.txt').toString();

const commands = input.split('\n').map((item) => item.split(' '));

let horizontal = 0;
let depth = 0;

for (const [direction, amount] of commands) {
	const numAmount = Number(amount);
	switch (direction) {
		case 'forward': {
			horizontal += numAmount;
			break;
		}
		case 'down': {
			depth += numAmount;
			break;
		}
		case 'up': {
			depth -= numAmount;
			break;
		}
	}
}

console.log('part 1', horizontal * depth);

horizontal = 0;
depth = 0;
let aim = 0;

for (const [direction, amount] of commands) {
	const numAmount = Number(amount);
	switch (direction) {
		case 'forward': {
			horizontal += numAmount;
			depth += aim * numAmount;
			break;
		}
		case 'down': {
			aim += numAmount;
			break;
		}
		case 'up': {
			aim -= numAmount;
			break;
		}
	}
}

console.log('part 2', horizontal * depth);
