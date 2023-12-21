import input from './input.js';

const result = input
	.split('\n')
	.reduce((acc, line) => {
		const firstDigit = line.match(/^.*?(\d)/)?.[1] ?? 'fail';
		const lastDigit = line.match(/^.*(\d)/)?.[1] ?? 'fail';
		const number = +(firstDigit + lastDigit);
		return acc + number;
	}, 0);

console.log(result);