import {TableRow, CalculateReturnValue} from './index.d';
import {Stages} from './stages';

let counter = 0;
const uniqueId = () => `${counter++}`;

const roundMark = (number: string) => {
	const parsedNumber = Number.parseFloat(number);
	return Math.round(parsedNumber * 2) / 2;
};

export const calculate = (
	tableRows: HTMLTableRowElement[],
	ignoring: string[],
): CalculateReturnValue => {
	const filteredRows: TableRow[] = [];
	let amountFailing = 0;

	for (const row of tableRows) {
		const courseName = row.firstElementChild?.lastChild?.textContent?.trim();
		const stringMark = row.children[1]?.textContent;

		if (
			courseName
			&& stringMark
			&& !ignoring.includes(courseName.toLowerCase())
		) {
			const mark = roundMark(stringMark);

			const row = {
				courseName,
				mark,
				key: uniqueId(),
				failing: mark < 4,
			};

			if (row.failing) {
				++amountFailing;
			}

			filteredRows.push(row);
		}
	}

	if (filteredRows.length === 0) {
		return {
			stage: Stages.NoMarks,
		};
	}

	let average = 0;
	let compDub = 0;
	for (const {mark} of filteredRows) {
		average += mark;

		compDub += (mark - 4) * (mark < 4 ? 2 : 1);
	}

	average /= filteredRows.length;
	average = Math.round(average * 1000) / 1000; // Only want three decimal points

	const currentlyFailing = average < 4 || compDub < 0 || amountFailing > 3;

	return {
		marks: {
			average,
			compDub,
			amountFailing,

			rows: filteredRows,

			isFailingAmountPlural: amountFailing !== 1,

			currentlyFailing,
		},

		stage: Stages.Loaded,
	};
};
