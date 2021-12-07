import fs from 'fs';

const input = fs.readFileSync('day3.txt').toString();

const bits = input.split('\n');

const gammaArr: string[] = [];

for (let i = 0; i < bits[0].length; i++) {
	let count = 0;
	for (const str of bits) {
		if (str[i] === '1') {
			count += 1;
		}
	}
	if (count >= bits.length / 2) {
		gammaArr.push('1');
	} else {
		gammaArr.push('0');
	}
}

const gamma = parseInt(gammaArr.join(''), 2);
const epsilon = parseInt(gammaArr.map((bit) => (bit === '1' ? '0' : '1')).join(''), 2);

console.log('part 1', gamma * epsilon);

let nums = bits.slice();

for (let i = 0; i < bits[0].length; i++) {
	let count = 0;
	for (const str of nums) {
		if (str[i] === '1') {
			count += 1;
		}
	}
	if (count >= nums.length / 2) {
		nums = nums.filter((str) => str[i] === '1');
	} else {
		nums = nums.filter((str) => str[i] === '0');
	}
	if (nums.length === 1) {
		break;
	}
}

const oxygen = parseInt(nums[0], 2);

nums = bits.slice();

for (let i = 0; i < bits[0].length; i++) {
	let count = 0;
	for (const str of nums) {
		if (str[i] === '1') {
			count += 1;
		}
	}
	if (count >= nums.length / 2) {
		nums = nums.filter((str) => str[i] === '0');
	} else {
		nums = nums.filter((str) => str[i] === '1');
	}
	if (nums.length === 1) {
		break;
	}
}

const co2 = parseInt(nums[0], 2);

console.log('part 2', oxygen * co2);
