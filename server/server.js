const fs = require('fs');
const readline = require('readline');

const stream = fs.createReadStream('./documents/LOTTOMAX.csv');
const reader = readline.createInterface({ input: stream });

let data = [];

reader.on('line', (row) => {
	data.push(row.split(','));
});

reader.on('close', () => {
	console.log('Thinking, wait a minute!');
	const repeatedNums = checkForRepetition(getSequenceFrequency(data));

	if (repeatedNums.length > 0) {
		console.log(repeatedNums);
	} else {
		console.log('No numbers are repeated! :(');
	}

	console.log(getNumbersFrequency(data));
});

const checkForRepetition = (numFrequency) => {
	let repeatedNumbers = [];

	numFrequency.forEach((sequence) => {
		if (sequence.frequency > 1) {
			repeatedNumbers.push(sequence);
		}
	});

	return repeatedNumbers;
};

const getSequenceFrequency = (dataVar) => {
	let sequenceList = [];

	dataVar.forEach((nums) => {
		let numsArray = [];

		for (let i = 4; i < nums.length - 1; i++) {
			numsArray.push(nums[i]);
		}

		sequenceList.push(numsArray);
	});

	sequenceList.shift();

	let uniqueList = [];

	for (let i = 0; i < sequenceList.length; i++) {
		uniqueList.push(sequenceList[i]);
	}

	for (let i = 0; i < sequenceList.length; i++) {
		let counter = 0;

		for (let j = uniqueList.length - 1; j >= 0; j--) {
			if (compareArrays(uniqueList[j], sequenceList[i])) {
				counter++;
			}

			if (counter > 1) {
				uniqueList.splice(j, 1);
				counter--;
			}
		}
	}

	let frequencyList = [];

	uniqueList.forEach((sequence) => {
		const newSequence = {
			sequenceNumbers: sequence,
			frequency: 0,
		};

		frequencyList.push(newSequence);
	});

	for (let i = 0; i < frequencyList.length; i++) {
		for (let j = 0; j < sequenceList.length; j++) {
			if (compareArrays(frequencyList[i].sequenceNumbers, sequenceList[j])) {
				frequencyList[i].frequency++;
			}
		}
	}

	return frequencyList;
};

const compareArrays = (array1, array2) => {
	if (array1.toString() === array2.toString()) {
		return true;
	} else {
		return false;
	}
};

const getNumbersFrequency = (dataVar) => {
	let numsList = [];

	for (let i = 1; i <= 50; i++) {
		const numObj = {
			number: i,
			frequency: 0,
		};

		numsList.push(numObj);
	}

	dataVar.forEach((nums) => {
		for (let i = 4; i < nums.length - 1; i++) {
			for (let j = 1; j <= 50; j++) {
				if (nums[i] == j) {
					numsList[j - 1].frequency++;
				}
			}
		}
	});

	return numsList;
};

const getNumbersFrequencyWithBonus = (dataVar) => {
	const numsList = [];

	for (let i = 1; i <= 50; i++) {
		const numObj = {
			number: i,
			frequency: 0,
		};

		numsList.push(numObj);
	}

	dataVar.forEach((nums) => {
		for (let i = 4; i < nums.length; i++) {
			for (let j = 1; j <= 50; j++) {
				if (nums[i] == j) {
					numsList[j - 1].frequency++;
				}
			}
		}
	});

	return numsList;
};
