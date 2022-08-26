import type {Stages} from './stages';

type SettingsState = {
	username: string;
	password: string;
	ignoring: string;
	url: string;
};

type TableRow = {
	courseName: string;
	mark: number;
	key: string;
	failing: boolean;
};

type StageErrored = {
	stage: Stages.Errored;
	error: string;
};

type StageLoggedOut = {
	stage: Stages.LoggedOut;
};

type StageLoading = {
	stage: Stages.Loading;
};

type CalculateReturnValueMarks = {
	marks: {
		average: number;
		compDub: number;
		amountFailing: number;

		rows: TableRow[];

		isFailingAmountPlural: boolean;
		currentlyFailing: boolean;
	};

	stage: Stages.Loaded;
};

type CalculateReturnValueNoMarks = {
	stage: Stages.NoMarks;
};

type CalculateReturnValue =
	| CalculateReturnValueMarks
	| CalculateReturnValueNoMarks;

type DefaultState =
	| StageErrored
	| StageLoading
	| StageLoggedOut
	| CalculateReturnValue;

export type {
	SettingsState,
	TableRow,
	DefaultState,
	CalculateReturnValue,
	CalculateReturnValueMarks,
	CalculateReturnValueNoMarks,
};
