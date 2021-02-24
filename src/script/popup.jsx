import { render, h, Component, Fragment } from 'preact';
import { route, Router } from 'preact-router';
import login, { ERRORS } from './login.js';

const init = () => {
  history.replaceState(
    '',
    {},
    '/'
  );

  render(
    <Main />,
    document.body
  );
};

const Main = () => <Router>
  <Default path="/" />
  <Settings path="/settings" />
</Router>;
class Settings extends Component {
  state = {};

  render = (
    _properties,
    { username, password, ignoring, url, validSaved, errorMsg }
  ) => <div class="margin">
    <div>
      <button
        type="button"
        class="btn"
        onClick={() => {
          route( '/' );
        }}
      >
          Go back
      </button>
      <hr />
    </div>

    <div onKeyDown={this.handleSave}>
      <div class="input-wrapper">
        <div>Username:</div>
        <input
          type="text"
          placeholder="Username"
          onInput={event_ => this.handleInput(
            event_,
            'username'
          )}
          value={username}
        />
      </div>

      <div class="input-wrapper">
        <div>Password:</div>
        <input
          type="password"
          placeholder="Password"
          onInput={event_ => this.handleInput(
            event_,
            'password'
          )}
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
          onInput={event_ => this.handleInput(
            event_,
            'url'
          )}
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
          onInput={event_ => this.handleInput(
            event_,
            'ignoring'
          )}
          value={ignoring}
        />
      </div>
    </div>

    {errorMsg
        && <div>{typeof errorMsg === 'string'
          ? errorMsg
          : errorMsg.message}</div>
    }

    <hr />

    <div class="input-wrapper">
      <button
        onClick={this.handleSave}
        class={`btn${
          typeof validSaved === 'boolean'
            ? validSaved
              ? ' saved'
              : ' failed'
            : ''
        }`}
        onAnimationEnd={() => this.setState( { validSaved: undefined } )}
        type="button"
      >
        {typeof validSaved === 'boolean'
          ? validSaved
            ? '✓'
            : '✗'
          : 'Saved'}
      </button>
    </div>
  </div>
  ;

  handleInput = (
    event_, type
  ) => {
    if ( type === 'password' ) {
      this.setState( { [ type ]: event_.target.value } );
    }
    else {
      this.setState( { [ type ]: event_.target.value.trim() } );
    }

    this.setState( { errorMsg: undefined } );
  };

  handleSave = event => {
    if (
      event.type === 'click'
      || ( event.type === 'keydown' && event.key === 'Enter' )
    ) {
      chrome.storage.local.get(
        [ 'url', 'password', 'username' ],
        ( { password: origPassword, username: origUsername, url: origUrl } ) => {
          const { password } = this.state;
          const url = this.state.url.trim();
          const username = this.state.username.trim();
          const ignoring = this.state.ignoring
            .split( ',' )
            .map( item => item.trim().toLowerCase() )
            .filter( item => item ); // Remove empty strings

          if (
            password === origPassword
            && username === origUsername
            && origUrl === url
          ) {
            chrome.storage.local.set( { ignoring } );
            this.setState( { validSaved: true } );
          }
          else if ( password !== '' && username !== '' && url !== '' ) {
            login( { url, username, password } )
              .then( () => {
                chrome.storage.local.set( {
                  url,
                  password,
                  username,
                  ignoring,
                } );

                this.setState( { validSaved: true } );
              } )
              .catch( error => {
                this.setState( { validSaved: false, errorMsg: error } );
              } );
          }
          else {
            this.setState( {
              validSaved: false,
              errorMsg: 'A required input was empty',
            } );
          }
        }
      );
    }
  };

  componentDidMount = () => {
    chrome.storage.local.get(
      [ 'url', 'password', 'username', 'ignoring' ],
      ( { url, password, username, ignoring = [] } ) => {
        this.setState( {
          url,
          password,
          username,
          ignoring: ignoring.join( ', ' ),
        } );
      }
    );
  };
}

class Default extends Component {
  state = {
    loading: true,
    loggedOut: false,
    noMarks: false,
    newVersion: false,
  };

  render = (
    _properties,
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
      passingOverall,
      errorMsg,
    }
  ) => <div class="margin">
    <div>
      <button
        class="btn"
        onClick={() => {
          route( '/settings' );
        }}
        type="button"
      >
          Open settings
      </button>
      <hr />
    </div>

    {newVersion
        && <div id="new-version">
          <a
            href="https://github.com/melusc/schulNetz-extension/releases/latest"
            rel="noopener noreferrer"
          >
            New version available
          </a>
        </div>
    }
    {loading
        && <>
          <div class="loading-outer">
            <div class="loading-inner" />
          </div>
          <hr />
        </>
    }
    {loggedOut
        && <div>
          <div>You are logged out.</div>
          <div>
            {'Login '}
            <a href="/settings">here</a>.
          </div>
        </div>
    }
    {!loading && !loggedOut && !errorMsg && !noMarks
        && <div>
          <h3 class={passingOverall
            ? 'passing'
            : 'failing'}>
            Summary:
            <div>{passingOverall
              ? 'Passing'
              : 'Failing'}</div>
          </h3>

          <hr />

          <h3 class={averageFailing
            ? 'failing'
            : 'passing'}>
            Average:
            <div>{average}</div>
          </h3>

          <hr />

          <h3 class={compDubFailing
            ? 'failing'
            : 'passing'}>
            Compensate double:
            <div>{compDub}</div>
          </h3>

          <hr />

          <h3 class={failingAmountFailing
            ? 'failing'
            : 'passing'}>
            Failing in {failingAmount} course{amountIsPlural
              ? 's'
              : ''}
          </h3>

          <Table vals={failingVals} />

          {Array.isArray( vals )
            && <>
              <h3>All marks</h3>
              <div>Amount: {vals.length}</div>
              <Table vals={vals} />
            </>
          }
        </div>
    }
    {noMarks
        && <>
          <div>You don&apos;t have any marks</div>
          <hr />
        </>
    }

    {errorMsg
        && <>
          <div>
            {typeof errorMsg === 'string'
              ? errorMsg
              : errorMsg.message}
          </div>
          <hr />
        </>
    }

    <small>{chrome.runtime.getManifest().version}</small>
  </div>
  ;

  componentDidMount = () => {
    chrome.storage.local.get(
      [ 'url', 'password', 'username', 'ignoring' ],
      ( { url, password, username, ignoring = [] } ) => {
        if ( url && password && username ) {
          login( { url, username, password } )
            .then( rows => {
              const vals = rows
                .map( currentRow => ( {
                  courseName: currentRow.firstElementChild.lastChild.textContent.trim(),
                  mark: roundMark( currentRow.children[ 1 ].textContent ),
                  uuid: uuidv4(),
                } ) )
                .filter( ( { courseName } ) => !ignoring.includes( courseName.toLowerCase() ) );

              if ( vals.length <= 0 ) {
                this.setState( { loading: false, noMarks: true } );
                return;
              }

              let avg = 0;
              for ( const { mark } of vals ) {
                avg += mark;
              }

              avg /= vals.length;

              const average = avg.toFixed( 3 );
              const averageFailing = avg < 4;

              let compDub = 0;
              for ( const { mark } of vals ) {
                compDub += ( mark - 4 ) * ( mark < 4
                  ? 2
                  : 1 );
              }

              const compDubFailing = compDub < 0;

              const failingVals = vals.filter( ( { mark } ) => mark < 4 );

              const failingAmount = failingVals.length;
              const failingAmountFailing = failingAmount > 3;
              const amountIsPlural = failingAmount !== 1;

              const passingOverall = !(
                averageFailing
                || compDubFailing
                || failingAmountFailing
              );

              console.log( 'not failed' );

              this.setState( {
                average,
                averageFailing,
                compDub,
                compDubFailing,
                failingAmount,
                failingAmountFailing,
                vals,
                failingVals,
                amountIsPlural,
                passingOverall,
                loading: false,
              } );
            } )
            .catch( error => {
              console.log(
                error,
                '1'
              );

              if ( error.message === ERRORS.INCORRECT_CREDS ) {
                this.setState( { loggedOut: true, loading: false } );
              }
              else {
                this.setState( {
                  loading: false,
                  errorMsg: error,
                } );
              }
            } );

          fetch( 'https://api.github.com/repos/melusc/schulnetz-extension/releases/latest' )
            .then( response => response.json() )
            .then( responseJSON => {
              const newVersion = responseJSON.tag_name;
              const oldVersion = chrome.runtime.getManifest().version;

              if ( newVersion > oldVersion ) {
                this.setState( { newVersion: true } );
              }
            } );
        }
        else {
          this.setState( { loggedOut: true, loading: false } );
        }
      }
    );
  };
}

const Table = ( { vals } ) => Array.isArray( vals )
    && <div class="table">
      <div class="thead">
        <div class="tr">
          <div>Course</div>
          <div>Mark</div>
        </div>
      </div>
      <div>
        {vals.map( ( { mark, courseName, uuid } ) => <div class="tr" key={uuid}>
          <div>{courseName}</div>
          <div>{mark}</div>
        </div> )}
      </div>
    </div>;
const roundMark = ( number = new Error( 'number is required' ) ) => {
  const parsedNumber = Number.parseFloat( number );
  return Math.round( parsedNumber * 2 ) / 2;
};

const uuidv4 = () => ( [ 1e7 ] + -1e3 + -4e3 + -8e3 + -1e11 ).replace(
  /[018]/g,
  c => (
    c
      ^ ( crypto.getRandomValues( new Uint8Array( 1 ) )[ 0 ] & ( 15 >> ( c / 4 ) ) )
  ).toString( 16 )
);

init();
