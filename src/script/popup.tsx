import {render, h, Component, Fragment} from 'preact';
import {route, Router} from 'preact-router';
import login, {ERRORS} from './login';

let counter = 0;
const uniqueId = () => `${counter++}`;

const Main = () => (
  <Router>
    <Default path="/popup.html" />
    <Default path="/" />
    <Settings path="/settings" />
  </Router>
);

type SettingsState = {
  username?: string;
  password?: string;
  ignoring?: string;
  url?: string;
  validSaved?: boolean;
  errorMsg?: Error | string;
};

class Settings extends Component {
  state: SettingsState = {};

  render = (
    _properties: Record<string, unknown>,
    {username, password, ignoring, url, validSaved, errorMsg}: SettingsState
  ) => (
    <div class="margin">
      <div>
        <button
          type="button"
          class="btn"
          onClick={() => {
            route('/');
          }}
        >
          Go back
        </button>
        <hr />
      </div>

      <div onKeyDown={this.handleKeydownSave}>
        <div class="input-wrapper">
          <div>Username:</div>
          <input
            type="text"
            placeholder="Username"
            onInput={this.handleInput('username')}
            value={username}
          />
        </div>

        <div class="input-wrapper">
          <div>Password:</div>
          <input
            type="password"
            placeholder="Password"
            onInput={this.handleInput('password')}
            value={password}
          />
        </div>

        <div class="input-wrapper">
          <div>URL to schulNetz page</div>
          <p>
            <small>ausserschwyz, einsiedeln...</small>
          </p>
          <input
            type="text"
            placeholder="url"
            onInput={this.handleInput('url')}
            value={url}
          />
        </div>

        <div class="input-wrapper">
          <div>Ignore specific courses</div>
          <p>
            <small>seperated by commas</small>
          </p>
          <input
            type="text"
            placeholder="sport"
            onInput={this.handleInput('ignoring')}
            value={ignoring}
          />
        </div>
      </div>

      {errorMsg && (
        <div>{typeof errorMsg === 'string' ? errorMsg : errorMsg.message}</div>
      )}

      <hr />

      <div class="input-wrapper">
        <button
          onClick={this.handleSave}
          class={`btn${
            typeof validSaved === 'boolean' ?
              (validSaved ?
                ' saved' :
                ' failed') :
              ''
          }`}
          onAnimationEnd={() => {
            this.setState({validSaved: undefined} as SettingsState);
          }}
          type="button"
        >
          {typeof validSaved === 'boolean' ? (validSaved ? '✓' : '✗') : 'Save'}
        </button>
      </div>
    </div>
  );

  handleInput =
  (type: keyof SettingsState): h.JSX.GenericEventHandler<HTMLInputElement> =>
    event_ => {
      if (event_.target instanceof HTMLInputElement) {
        if (type === 'password') {
          this.setState({[type]: event_.target.value} as SettingsState);
        } else {
          this.setState({
            [type]: event_.target.value.trim()
          } as SettingsState);
        }

        this.setState({errorMsg: undefined} as SettingsState);
      }
    };

  handleKeydownSave: h.JSX.KeyboardEventHandler<HTMLDivElement> = event_ => {
    if (event_.type === 'keydown' && event_.key === 'Enter') {
      this.handleSave();
    }
  };

  handleSave = () => {
    chrome.storage.local.get(
      ['url', 'password', 'username'],
      ({password: origPassword, username: origUsername, url: origUrl}) => {
        const {state} = this;
        if (
          !state.password ||
          !state.username ||
          !state.url ||
          !state.ignoring
        ) {
          return;
        }

        const {password} = state;
        const url = state.url.trim();
        const username = state.username.trim();
        const ignoring = state.ignoring
          .split(',')
          .map(item => item.trim().toLowerCase())
          .filter(item => item); // Remove empty strings

        if (
          password === origPassword &&
          username === origUsername &&
          origUrl === url
        ) {
          chrome.storage.local.set({ignoring});
          this.setState({validSaved: true} as SettingsState);
        } else if (password !== '' && username !== '' && url !== '') {
          login({url, username, password})
            .then(() => {
              chrome.storage.local.set({
                url,
                password,
                username,
                ignoring
              });

              this.setState({validSaved: true} as SettingsState);
            })
            .catch((error: Error) => {
              this.setState({
                validSaved: false,
                errorMsg: error
              } as SettingsState);
            });
        } else {
          this.setState({
            validSaved: false,
            errorMsg: 'A required input was empty'
          } as SettingsState);
        }
      }
    );
  };

  componentDidMount = () => {
    chrome.storage.local.get(
      ['url', 'password', 'username', 'ignoring'],
      ({url, password, username, ignoring = []}) => {
        if (
          typeof url === 'string' &&
          typeof password === 'string' &&
          typeof username === 'string' &&
          Array.isArray(ignoring)
        ) {
          this.setState({
            url,
            password,
            username,
            ignoring: ignoring.join(', ')
          } as SettingsState);
        }
      }
    );
  };
}

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

class Default extends Component {
  state: DefaultState = {
    loading: true,
    loggedOut: false,
    noMarks: false,
    newVersion: false
  };

  render = (
    _properties: Record<string, unknown>,
    {
      loggedOut,
      loading,
      noMarks,
      newVersion,
      average,
      averageFailing,
      compDub,
      compDubFailing,
      failingAmount,
      failingAmountFailing,
      vals,
      failingVals,
      amountIsPlural,
      currentlyFailing,
      errorMsg
    }: DefaultState
  ) => (
    <div class="margin">
      <div>
        <button
          class="btn"
          onClick={() => {
            route('/settings');
          }}
          type="button"
        >
          Open settings
        </button>
        <hr />
      </div>

      {newVersion && (
        <div id="new-version">
          <a
            href="https://github.com/melusc/schulNetz-extension/releases/latest"
            rel="noopener noreferrer"
          >
            New version available
          </a>
        </div>
      )}
      {loading && (
        <>
          <div class="loading-outer">
            <div class="loading-inner" />
          </div>
          <hr />
        </>
      )}
      {loggedOut && (
        <div>
          <div>You are logged out.</div>
          <div>
            {'Login '}
            <a href="/settings">here</a>.
          </div>
        </div>
      )}
      {!loading && !loggedOut && !errorMsg && !noMarks && (
        <div>
          <h3 class={currentlyFailing ? 'failing' : 'passing'}>
            Summary:
            <div>{currentlyFailing ? 'Failing' : 'Passing'}</div>
          </h3>

          <hr />

          <h3 class={averageFailing ? 'failing' : 'passing'}>
            Average:
            <div>{average}</div>
          </h3>

          <hr />

          <h3 class={compDubFailing ? 'failing' : 'passing'}>
            Compensate double:
            <div>{compDub}</div>
          </h3>

          <hr />

          <h3 class={failingAmountFailing ? 'failing' : 'passing'}>
            Failing in {failingAmount} course{amountIsPlural ? 's' : ''}
          </h3>

          {failingVals && failingVals.length > 0 ? (
            <Table vals={failingVals} />
          ) : (
            <hr />
          )}

          {Array.isArray(vals) && (
            <>
              <h3>All marks</h3>
              <div>Amount: {vals.length}</div>
              <Table vals={vals} />
            </>
          )}
        </div>
      )}
      {noMarks && (
        <>
          <div>You don&apos;t have any marks</div>
          <hr />
        </>
      )}

      {errorMsg && (
        <>
          <div>
            {typeof errorMsg === 'string' ? errorMsg : errorMsg.message}
          </div>
          <hr />
        </>
      )}

      <small>{chrome.runtime.getManifest().version}</small>
    </div>
  );

  componentDidMount = () => {
    chrome.storage.local.get(
      ['url', 'password', 'username', 'ignoring'],
      ({
        url,
        password,
        username,
        ignoring = []
      }: {
        url?: string;
        password?: string;
        username?: string;
        ignoring?: string[];
      }) => {
        if (url && password && username) {
          login({url, username, password})
            .then(rows => {
              const vals: TableRow[] = [];

              for (const row of rows) {
                const courseName =
                  row.firstElementChild?.lastChild?.textContent?.trim();
                const stringMark = row.children[1]?.textContent;

                if (courseName && stringMark) {
                  const mark = roundMark(stringMark);

                  vals.push({
                    courseName,
                    mark,
                    key: uniqueId()
                  });
                }
              }

              const filteredRows = rows
                .map(currentRow => ({
                  courseName:
                    currentRow.firstElementChild?.lastChild?.textContent?.trim(),
                  mark: roundMark(currentRow?.children?.[1]?.textContent ?? ''),
                  key: uniqueId()
                }))
                .filter(
                  ({courseName}) =>
                    typeof courseName === 'string' &&
                    !ignoring.includes(courseName.toLowerCase())
                );

              if (filteredRows.length <= 0) {
                this.setState({
                  loading: false,
                  noMarks: true
                } as DefaultState);
                return;
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

              const failingVals = filteredRows.filter(({mark}) => mark < 4);

              const failingAmount = failingVals.length;
              const failingAmountFailing = failingAmount > 3;
              const amountIsPlural = failingAmount !== 1;

              const currentlyFailing =
                averageFailing || compDubFailing || failingAmountFailing;

              this.setState({
                average,
                averageFailing,
                compDub,
                compDubFailing,
                failingAmount,
                failingAmountFailing,
                vals: filteredRows,
                failingVals,
                amountIsPlural,
                currentlyFailing,
                loading: false
              } as DefaultState);
            })
            .catch((error: Error) => {
              if (error.message === ERRORS.INCORRECT_CREDS) {
                this.setState({
                  loggedOut: true,
                  loading: false
                } as DefaultState);
              } else {
                this.setState({
                  loading: false,
                  errorMsg: error
                } as DefaultState);
              }
            });

          void fetch(
            'https://api.github.com/repos/melusc/schulnetz-extension/releases/latest'
          )
            .then(async response => response.json())
            .then((responseJSON: Record<string, unknown>) => {
              const newVersion = responseJSON.tag_name;
              if (typeof newVersion !== 'string') {
                return;
              }

              const oldVersion = chrome.runtime.getManifest().version;

              if (newVersion > oldVersion) {
                this.setState({newVersion: true} as DefaultState);
              }
            });
        } else {
          this.setState({loggedOut: true, loading: false} as DefaultState);
        }
      }
    );
  };
}

type TableVals = {
  vals: TableRow[] | undefined;
};
const Table = ({vals}: TableVals) =>
  Array.isArray(vals) ? (
    <div class="table">
      <div class="thead">
        <div class="tr">
          <div>Course</div>
          <div>Mark</div>
        </div>
      </div>
      <div>
        {vals.map(({mark, courseName, key}) => (
          <div class="tr" key={key}>
            <div>{courseName}</div>
            <div>{mark}</div>
          </div>
        ))}
      </div>
    </div>
  ) : null;

const roundMark = (number: string) => {
  const parsedNumber = Number.parseFloat(number);
  return Math.round(parsedNumber * 2) / 2;
};

render(<Main />, document.body);
