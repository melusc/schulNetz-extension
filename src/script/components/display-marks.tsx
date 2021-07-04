import {h} from 'preact';
import clsx from 'clsx';

import type {CalculateReturnValueMarks, TableRow} from '..';

const Table = ({rows}: {rows: TableRow[] | undefined}) =>
	Array.isArray(rows) ? (
		<div class="table">
			<div class="thead">
				<div class="tr">
					<div>Course</div>
					<div>Mark</div>
				</div>
			</div>
			<div>
				{rows.map(({mark, courseName, key, failing}) => (
					<div key={key} class={clsx('tr', {failing})}>
						<div>{courseName}</div>
						<div>{mark}</div>
					</div>
				))}
			</div>
		</div>
	) : null;

export const DisplayMarks = ({
	marks,
}: Pick<CalculateReturnValueMarks, 'marks'>) => {
	const {
		average,
		compDub,
		amountFailing: failingAmount,
		rows,
		isFailingAmountPlural: amountIsPlural,
		currentlyFailing,
	} = marks;

	return (
		<>
			<div
				class={clsx(
					{
						passing: !currentlyFailing,
						failing: currentlyFailing,
					},
					'summaries',
				)}
			>
				Summary:
				<div>{currentlyFailing ? 'Failing' : 'Passing'}</div>
			</div>

			<hr />

			<div
				class={clsx(
					{
						failing: average < 4,
						warn: average >= 4 && average < 4.2,
						passing: average >= 4.2,
					},
					'summaries',
				)}
			>
				Average:
				<div>{average.toFixed(3)}</div>
			</div>

			<hr />

			<div
				class={clsx(
					{
						failing: compDub < 0,
						warn: compDub >= 0 && compDub < 2,
						passing: compDub >= 2,
					},
					'summaries',
				)}
			>
				Compensate double:
				<div>{compDub}</div>
			</div>

			<hr />

			<div
				class={clsx(
					{
						failing: failingAmount > 3,
						passing: failingAmount <= 2,
						warn: failingAmount === 3,
					},
					'summaries',
				)}
			>
				Failing in {String(failingAmount)} course{amountIsPlural ? 's' : ''}
			</div>

			<Table rows={rows} />

			<hr />
		</>
	);
};
