import input from './input.js';

const digits = {
	one: "1",
	two: "2",
	three: "3",
	four: "4",
	five: "5",
	six: "6",
	seven: "7",
	eight: "8",
	nine: "9",
};

const result = input
	.split('\n')
	.reduce((acc, curr) => {
		const stringDigits = Object.keys(digits);
		let firstDigit = curr.match(new RegExp(`^.*?(\\d|${stringDigits.join("|")})`))?.[1] ?? 'fail';
		let lastDigit = curr.match(new RegExp(`^.*(\\d|${stringDigits.join("|")})`))?.[1] ?? 'fail';
		[firstDigit, lastDigit] = [firstDigit, lastDigit].map(digit => {
			if (digit.length > 1) {
				// then it's a string
				return digits[digit];
			}
			return digit;
		});
		const num = parseInt(firstDigit + lastDigit, 10);
		return acc + num;
	}, 0);

console.log(result);