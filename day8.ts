import fs from 'fs';

const input = fs.readFileSync('day8.txt').toString();

const digits = input
	.split('\n')
	.map((row) => row.split(' | ')[1].split(' '))
	.flat();

let count = 0;

const uniqueCounts = new Set([2, 3, 4, 7]);

digits.forEach((digit) => {
	if (uniqueCounts.has(digit.length)) {
		count += 1;
	}
});

console.log('part 1', count);

const rows = input.split('\n').map((row) => row.split(' | '));

let total = 0;

rows.forEach((row) => {
	let a: string, b: string, c: string, d: string, e: string, f: string, g: string;
	const digits = row[0].split(' ').map((item) => item.split('').sort().join(''));
	const outputs = row[1].split(' ').map((item) => item.split('').sort().join(''));

	const charCount = digits.reduce((acc, digit) => {
		for (const char of digit) {
			if (acc[char] === undefined) {
				acc[char] = 1;
			} else {
				acc[char] += 1;
			}
		}
		return acc;
	}, {} as Record<string, number>);

	const one = digits.find((item) => item.length === 2) || '';
	const seven = digits.find((item) => item.length === 3) || '';
	const four = digits.find((item) => item.length === 4) || '';

	a = seven.replace(new RegExp(one.split('').join('|'), 'g'), '');

	for (const key in charCount) {
		switch (charCount[key]) {
			case 6: {
				b = key;
				break;
			}
			case 4: {
				e = key;
				break;
			}
			case 9: {
				f = key;
				break;
			}
			case 8: {
				if (key !== a) {
					c = key;
				}
				break;
			}
			case 7: {
				if (four.includes(key)) {
					d = key;
				} else {
					g = key;
				}
				break;
			}
		}
	}

	const value = outputs
		.map((output) => {
			switch (output) {
				case `${a}${b}${c}${e}${f}${g}`.split('').sort().join(''): {
					return '0';
				}
				case `${c}${f}`.split('').sort().join(''): {
					return '1';
				}
				case `${a}${c}${d}${e}${g}`.split('').sort().join(''): {
					return '2';
				}
				case `${a}${c}${d}${f}${g}`.split('').sort().join(''): {
					return '3';
				}
				case `${b}${c}${d}${f}`.split('').sort().join(''): {
					return '4';
				}
				case `${a}${b}${d}${f}${g}`.split('').sort().join(''): {
					return '5';
				}
				case `${a}${b}${d}${e}${f}${g}`.split('').sort().join(''): {
					return '6';
				}
				case `${a}${c}${f}`.split('').sort().join(''): {
					return '7';
				}
				case `${a}${b}${c}${d}${e}${f}${g}`.split('').sort().join(''): {
					return '8';
				}
				case `${a}${b}${c}${d}${f}${g}`.split('').sort().join(''): {
					return '9';
				}
			}
		})
		.join('');

	total += Number(value);
});

console.log('part 2', total);
