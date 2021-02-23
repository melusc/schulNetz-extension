import { html, Component, render } from './lib/standalone.module.js';

const init = () => {
  render(
    html`<${ Main } />`,
    document.body
  );
};

class Main extends Component {
  constructor() {
    super();
    this.state = {
      page: PAGES.DEFAULT,
    };
    this.setPage = this.setPage.bind( this );
  }

  setPage( page ) {
    this.setState( { page } );
  }

  render(
    _properties, { page }
  ) {
    return html`<${ PAGE_SOURCES[ page ] } setPage=${ this.setPage } />`;
  }
}

class Settings extends Component {
  constructor() {
    super();
    this.state = {};
    this.handleInput = this.handleInput.bind( this );
    this.checkValidity = this.checkValidity.bind( this );
  }

  render(
    { setPage }, { username, password, ignoring, url, validSaved }
  ) {
    return html`<div class="margin">
      <div>
        <button class="btn" onClick=${ () => setPage( PAGES.DEFAULT ) }>
          Go back
        </button>
        <hr />
      </div>

      <div onInput=${ this.handleInput }>
        <div class="input-wrapper">
          <div>Username:</div>
          <input
            type="text"
            placeholder="Username"
            data-type="username"
            value=${ username }
          />
        </div>

        <div class="input-wrapper">
          <div>Password:</div>
          <input
            type="password"
            placeholder="Password"
            data-type="password"
            value=${ password }
          />
        </div>

        <div class="input-wrapper">
          <div>URL to schulNetz page</div>
          <p><small>ausserschwyz, einsiedeln...</small></p>
          <input type="text" placeholder="url" data-type="url" value=${ url } />
        </div>

        <div class="input-wrapper">
          <div>Ignore specific courses</div>
          <p><small>seperated by commas</small></p>
          <input
            type="text"
            placeholder="sport"
            data-type="ignoring"
            value=${ ignoring }
          />
        </div>
      </div>

      <hr />

      <div class="input-wrapper">
        <button
          onClick=${ this.checkValidity }
          class=${ `btn${
    typeof validSaved === 'boolean'
      ? validSaved
        ? ' saved'
        : ' failed'
      : ''
  }` }
          onAnimationEnd=${ () => this.setState( { validSaved: undefined } ) }
        >
          ${ typeof validSaved === 'boolean'
    ? validSaved
      ? '✓'
      : '✗'
    : 'Saved' }
        </button>
      </div>
    </div>`;
  }

  handleInput( event ) {
    const { type } = event.target.dataset;
    if ( type ) {
      this.setState( { [ type ]: event.target.value.trim() } );
    }
  }

  checkValidity() {
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
          const loginhash = fetch( `https://www.schul-netz.com/${ url }/loginto.php?mode=0&lang=` )
            .then( response => response.text() )
            .then( responseText => {
              const parsed = new DOMParser().parseFromString(
                responseText,
                'text/html'
              );
              return parsed.querySelector( 'input[name="loginhash"]' );
            } );
          loginhash.then( hash => {
            if ( hash === null ) {
              this.setState( { validSaved: false } );
            }
            else {
              const body = new URLSearchParams( {
                login: username,
                passwort: password,
                loginhash: hash.value,
              } ).toString();

              fetch(
                `https://www.schul-netz.com/${ url }/index.php?pageid=`,
                {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                  },
                  body,
                }
              )
                .then( response => response.text() )
                .then( responseText => {
                  const parsed = new DOMParser().parseFromString(
                    responseText,
                    'text/html'
                  );
                  const anchor = parsed.querySelector( '#menu21311' );
                  if ( anchor === null ) {
                    this.setState( { validSaved: false } );
                  }
                  else {
                    chrome.storage.local.set( {
                      url,
                      password,
                      username,
                      ignoring,
                    } );

                    this.setState( { validSaved: true } );
                  }
                } );
            }
          } );
        }
        else {
          this.setState( { validSaved: false } );
        }
      }
    );
  }

  componentDidMount() {
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
  }
}

class Default extends Component {
  constructor() {
    super();
    this.state = {
      loading: true,
      loggedOut: false,
      noMarks: false,
      newVersion: false,
    };
  }

  render(
    { setPage },
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
    }
  ) {
    return html`<div class="margin">
      <div>
        <button
          class="btn"
          onClick=${ () => {
    setPage( PAGES.SETTINGS );
  } }
        >
          Open settings
        </button>
        <hr />
      </div>

      ${ newVersion
      && html`<div id="new-version">
        <a
          href="https://github.com/melusc/schulNetz-extension/releases/latest"
          rel="noopener noreferrer"
        >
          New version available
        </a>
      </div>` }
      ${ loading
      && html`<div class="loading-outer">
        <div class="loading-inner"></div>
      </div>` }
      ${ loggedOut
      && html`<div>
        <div>You are logged out.</div>
        <div>
          ${ 'Login ' }
          <a
            href="#"
            onClick=${ () => {
    setPage( PAGES.SETTINGS );
  } }
            >here</a
          >.
        </div>
      </div>` }
      ${ !loading
      && !loggedOut
      && html`<div>
        <h3 class=${ passingOverall
    ? 'passing'
    : 'failing' }>
          Summary:
          <div>${ passingOverall
    ? 'Passing'
    : 'Failing' }</div>
        </h3>

        <hr />

        <h3 class=${ averageFailing
    ? 'failing'
    : 'passing' }>
          Average:
          <div>${ average }</div>
        </h3>

        <hr />

        <h3 class=${ compDubFailing
    ? 'failing'
    : 'passing' }>
          Compensate double:
          <div>${ compDub }</div>
        </h3>

        <hr />

        <h3 class=${ failingAmountFailing
    ? 'failing'
    : 'passing' }>
          Failing in ${ failingAmount } course${ amountIsPlural
  ? 's'
  : '' }
        </h3>

        <${ Table } vals=${ failingVals } />

        ${ Array.isArray( vals )
        && html`<h3>All marks</h3>
          <div>Amount: ${ vals.length }</div>
          <${ Table } vals=${ vals } />` }
      </div>` }
      ${ noMarks && html`<div>You don't have any marks</div>` }

      <small>${ chrome.runtime.getManifest().version }</small>
    </div>`;
  }

  componentDidMount() {
    chrome.storage.local.get(
      [ 'url', 'password', 'username', 'ignoring' ],
      ( { url, password, username, ignoring = [] } ) => {
        if ( url && password && username ) {
          const loginhash = fetch( `https://www.schul-netz.com/${ url }/loginto.php?mode=0&lang=` )
            .then( response => response.text() )
            .then( responseText => {
              const parsed = new DOMParser().parseFromString(
                responseText,
                'text/html'
              );
              return parsed.querySelector( 'input[name="loginhash"]' );
            } );

          loginhash
            .then( hash => {
              if ( hash !== null ) {
                const body = new URLSearchParams( {
                  login: username,
                  passwort: password,
                  loginhash: hash.value,
                } ).toString();

                return fetch(
                  `https://www.schul-netz.com/${ url }/index.php?pageid=21311`,
                  {
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/x-www-form-urlencoded',
                    },
                    body,
                  }
                ).then( response => response.text() );
              }

              this.setState( { loggedOut: true, loading: false } );
            } )
            .then( responseText => {
              if ( typeof responseText === 'string' ) {
                const parsed = new DOMParser().parseFromString(
                  responseText,
                  'text/html'
                );
                const table = [ ...parsed.querySelectorAll( 'h3' ) ]
                  .find( element => ( /aktuelle noten/i ).test( element.textContent ) )
                  .nextElementSibling.querySelectorAll( 'table' )[ 0 ];

                const rows = [ ...table.rows ]
                  .slice( 1 )
                  .filter( element => element.style.display !== 'none'
                      && Number.isFinite( Number.parseFloat( element.children[ 1 ].textContent.trim() ) ) );
                /*
                  Number.parseFloat because if a mark hasn't been published yet
                  it will have a * ( 5.500* )
                */

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
              }
              else {
                this.setState( { loggedOut: true, loading: false } );
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
  }
}

const Table = ( { vals } ) => Array.isArray( vals )
  && html`<div class="table">
    <div class="thead">
      <div class="tr">
        <div>Course</div>
        <div>Mark</div>
      </div>
    </div>
    <div>
      ${ vals.map( ( { mark, courseName, uuid } ) => html`
          <div class="tr" key=${ uuid }>
            <div>${ courseName }</div>
            <div>${ mark }</div>
          </div>
        ` ) }
    </div>
  </div>`;

// Keep track of page, sort of like a router
const PAGES = {
  SETTINGS: 'PAGE.SETTINGS',
  DEFAULT: 'PAGE.DEFAULT',
};
// Component to use depending on the page
const PAGE_SOURCES = {
  [ PAGES.SETTINGS ]: Settings,
  [ PAGES.DEFAULT ]: Default,
};

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
