import fs from 'fs';

const input = fs.readFileSync('day1.txt').toString();

const nums = input.split('\n').map((num) => Number(num));

let count = 0;

for (let i = 1; i < nums.length; i++) {
	if (nums[i - 1] < nums[i]) {
		count++;
	}
}

console.log('part 1', count);

count = 0;
for (let i = 3; i < nums.length; i++) {
	if (nums[i - 3] + nums[i - 2] + nums[i - 1] < nums[i - 2] + nums[i - 1] + nums[i]) {
		count++;
	}
}

console.log('part 2', count);
