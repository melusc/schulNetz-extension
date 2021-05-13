import type {TableRow} from './popup.d';

let counter = 0;
const uniqueId = () => `${counter++}`;

const roundMark = (number: string) => {
  const parsedNumber = Number.parseFloat(number);
  return Math.round(parsedNumber * 2) / 2;
};

type CalculateReturnVals =
  | {
    average: string;
    averageFailing: boolean;
    compDub: number;
    compDubFailing: boolean;
    failingAmount: number;
    failingAmountFailing: boolean;
    failingVals: TableRow[];
    vals: TableRow[];
    amountIsPlural: boolean;
    currentlyFailing: boolean;
  }
  | {
    noMarks: true;
  };

export const calculate = (
  tableRows: HTMLTableRowElement[],
  ignoring: string[]
): CalculateReturnVals => {
  const filteredRows: TableRow[] = [];
  const failingRows: TableRow[] = [];

  for (const row of tableRows) {
    const courseName = row.firstElementChild?.lastChild?.textContent?.trim();
    const stringMark = row.children[1]?.textContent;

    if (
      courseName &&
      stringMark &&
      !ignoring.includes(courseName.toLowerCase())
    ) {
      const mark = roundMark(stringMark);

      const row = {
        courseName,
        mark,
        key: uniqueId()
      };

      filteredRows.push(row);

      if (mark < 4) {
        failingRows.push(row);
      }
    }
  }

  if (filteredRows.length <= 0) {
    return {
      noMarks: true
    };
  }

  let avg = 0;
  for (const {mark} of filteredRows) {
    avg += mark;
  }

  avg /= filteredRows.length;

  const average = avg.toFixed(3);
  const averageFailing = avg < 4;

  let compDub = 0;
  for (const {mark} of filteredRows) {
    compDub += (mark - 4) * (mark < 4 ? 2 : 1);
  }

  const compDubFailing = compDub < 0;

  const failingAmount = failingRows.length;
  const failingAmountFailing = failingAmount > 3;
  const amountIsPlural = failingAmount !== 1;

  const currentlyFailing =
    averageFailing || compDubFailing || failingAmountFailing;

  return {
    average,
    averageFailing,
    compDub,
    compDubFailing,
    failingAmount,
    failingAmountFailing,
    vals: filteredRows,
    failingVals: failingRows,
    amountIsPlural,
    currentlyFailing
  };
};
