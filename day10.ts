import fs from 'fs';

const input = fs.readFileSync('day10.txt').toString();

const lines = input.split('\n');

let score = 0;

const bracketPairs: Record<string, string> = {
	'(': ')',
	'[': ']',
	'{': '}',
	'<': '>',
};

const bracketScores: Record<string, number> = {
	')': 3,
	']': 57,
	'}': 1197,
	'>': 25137,
};

lineloop: for (const line of lines) {
	const stack: string[] = [];
	for (const char of line) {
		if (bracketPairs[char] !== undefined) {
			stack.push(char);
		} else if (char !== bracketPairs[stack.pop()!]) {
			score += bracketScores[char];
			continue lineloop;
		}
	}
}

console.log('part 1', score);

const scores: number[] = [];

const completionScores: Record<string, number> = {
	')': 1,
	']': 2,
	'}': 3,
	'>': 4,
};

lineloop: for (const line of lines) {
	const stack: string[] = [];
	for (const char of line) {
		if (bracketPairs[char] !== undefined) {
			stack.push(char);
		} else if (char !== bracketPairs[stack.pop()!]) {
			continue lineloop;
		}
	}
	scores.push(stack.reverse().reduce((acc, char) => acc * 5 + completionScores[bracketPairs[char]], 0));
}

console.log('part 2', scores.sort((a, b) => a - b)[Math.floor(scores.length / 2)]);
