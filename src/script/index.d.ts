// https://stackoverflow.com/a/40614350
export const enum Stages {
	Loading = 0,
	Errored = 1,
	NoMarks = 2,
	LoggedOut = 3,
	Loaded = 4,
}

type SettingsState = {
	username: string;
	password: string;
	ignoring: string;
	url: string;
	validSaved?: boolean;
	errorMsg?: Error | string;
};

type TableRow = {
	courseName: string;
	mark: number;
	key: string;
};

type StageErrored = {
	stage: Stages.Errored;
	error: string | Error;
};

type StageLoggedOut = {
	stage: Stages.LoggedOut;
};

type StageLoading = {
	stage: Stages.Loading;
};

type CalculateReturnValueMarks = {
	marks: {
		average: string;
		averageFailing: boolean;
		compDub: string;
		compDubFailing: boolean;
		failingAmount: string;
		failingAmountFailing: boolean;
		failingRows: TableRow[];
		rows: TableRow[];
		amountIsPlural: boolean;
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

type DefaultState = (
	| StageErrored
	| StageLoading
	| StageLoggedOut
	| CalculateReturnValue
) & {newVersion: boolean};

export {
	SettingsState,
	TableRow,
	DefaultState,
	CalculateReturnValue,
	CalculateReturnValueMarks,
	CalculateReturnValueNoMarks,
};
