import fs from 'fs';

const input = fs.readFileSync('day4.txt').toString();

const inputs = input.split('\n\n');

const nums = inputs[0].split(',');

const boards = inputs.slice(1).map((board) => board.split('\n').map((row) => row.trim().split(/\D+/)));

function checkBoardWin(board: string[][], calledNums: Set<string>) {
	for (let i = 0; i < 5; i++) {
		for (let j = 0; j < 5; j++) {
			if (!calledNums.has(board[i][j])) {
				break;
			}
			if (j === 4) {
				return true;
			}
		}
	}
	for (let i = 0; i < 5; i++) {
		for (let j = 0; j < 5; j++) {
			if (!calledNums.has(board[j][i])) {
				break;
			}
			if (j === 4) {
				return true;
			}
		}
	}
	return false;
}

function calculateScore(board: string[][], calledNums: Set<string>, lastCalledNum: string) {
	const sum = board
		.flat()
		.filter((num) => !calledNums.has(num))
		.reduce((acc, num) => acc + Number(num), 0);
	return sum * Number(lastCalledNum);
}

let calledNums = new Set(nums.slice(0, 4));

outerloop: for (let i = 4; i < nums.length; i++) {
	calledNums.add(nums[i]);

	for (const board of boards) {
		if (checkBoardWin(board, calledNums)) {
			console.log('part 1', calculateScore(board, calledNums, nums[i]));
			break outerloop;
		}
	}
}

let lastScore = 0;

calledNums = new Set(nums.slice(0, 4));

const boardsCopy = boards.slice();

for (let i = 4; i < nums.length; i++) {
	calledNums.add(nums[i]);

	for (let j = 0; j < boardsCopy.length; j++) {
		if (checkBoardWin(boardsCopy[j], calledNums)) {
			lastScore = calculateScore(boardsCopy[j], calledNums, nums[i]);
			boardsCopy.splice(j, 1);
		}
	}
}

console.log('part 2', lastScore);
