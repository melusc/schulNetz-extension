import {h} from 'preact';
import {useSnapshot} from 'valtio';
import {CalculateReturnValueMarks, TableRow} from '..';

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
				{rows.map(({mark, courseName, key}) => (
					<div key={key} class="tr">
						<div>{courseName}</div>
						<div>{mark}</div>
					</div>
				))}
			</div>
		</div>
	) : null;

export const TableFromState = ({state}: {state: CalculateReturnValueMarks}) => {
	const snap = useSnapshot(state);

	const {
		average,
		averageFailing,
		compDub,
		compDubFailing,
		failingAmount,
		failingAmountFailing,
		rows,
		failingRows,
		amountIsPlural,
		currentlyFailing,
	} = snap.marks;

	return (
		<div>
			<h3 class={currentlyFailing ? 'failing' : 'passing'}>
				Summary:
				<div>{currentlyFailing ? 'Failing' : 'Passing'}</div>
			</h3>

			<hr/>

			<h3 class={averageFailing ? 'failing' : 'passing'}>
				Average:
				<div>{average}</div>
			</h3>

			<hr/>

			<h3 class={compDubFailing ? 'failing' : 'passing'}>
				Compensate double:
				<div>{compDub}</div>
			</h3>

			<hr/>

			<h3 class={failingAmountFailing ? 'failing' : 'passing'}>
				Failing in {failingAmount} course{amountIsPlural ? 's' : ''}
			</h3>

			{failingRows && failingRows.length > 0 ? (
				<Table rows={failingRows}/>
			) : (
				<hr/>
			)}

			{Array.isArray(rows) && (
				<>
					<h3>All marks</h3>
					<div>Amount: {rows.length}</div>
					<Table rows={rows}/>
				</>
			)}
		</div>
	);
};
