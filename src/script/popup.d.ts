type SettingsState = {
  username?: string;
  password?: string;
  ignoring?: string;
  url?: string;
  validSaved?: boolean;
  errorMsg?: Error | string;
};

type TableRow = {
  courseName: string;
  mark: number;
  key: string;
};

type DefaultState = (
  | {
    loading: true;
    average?: undefined;
    averageFailing?: undefined;
    compDub?: undefined;
    compDubFailing?: undefined;
    failingAmount?: undefined;
    failingAmountFailing?: undefined;
    vals?: undefined;
    failingVals?: undefined;
    amountIsPlural?: undefined;
    currentlyFailing?: undefined;
  }
  | {
    loading: false;
    average: string;
    averageFailing: boolean;
    compDub: number;
    compDubFailing: boolean;
    failingAmount: number;
    failingAmountFailing: boolean;
    vals: TableRow[];
    failingVals: TableRow[];
    amountIsPlural: boolean;
    currentlyFailing: boolean;
  }
) & {
  loggedOut: boolean;
  noMarks: boolean;
  newVersion: boolean;
  errorMsg?: Error;
};

export {SettingsState, TableRow, DefaultState};
