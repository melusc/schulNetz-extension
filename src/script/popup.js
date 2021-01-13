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
    _props, { page }
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
    return html`
    <div class=margin>
      <div>
        <button class=btn onClick=${ () => setPage( PAGES.DEFAULT ) }>Go back</button>
        <hr />
      </div>

      <div onInput=${ this.handleInput }>
        <div class=input-wrapper>
          <div>Username:</div>
          <input type=text placeholder=Username data-type=username value=${ username }/>
        </div>

        <div class=input-wrapper>
          <div>Password:</div>
          <input type=password placeholder=Password data-type=password value=${ password }/>
        </div>

        <div class=input-wrapper>
          <div>URL to schulNetz page</div>
          <p><small>ausserschwyz, einsiedeln...</small></p>
          <input type=text placeholder=url data-type=url value=${ url }/>
        </div>

        <div class=input-wrapper>
          <div>Ignore specific courses</div>
          <p><small>seperated by commas</small></p>
          <input type=text placeholder=sport data-type=ignoring value=${ ignoring } />
        </div>
      </div>

      <hr />

      <div class=input-wrapper>
        <button onClick=${ this.checkValidity } class=${
  `btn${
    typeof validSaved === 'boolean'
      ? validSaved
        ? ' saved'
        : ' failed'
      : ''
  }` }
    onAnimationEnd=${ () => this.setState( { validSaved: null } ) }
        >
          ${
  typeof validSaved === 'boolean'
    ? validSaved
      ? '✓'
      : '✗'
    : 'Saved' }
        </button>
      </div>
    </div>`;
  }

  handleInput( e ) {
    const { type } = e.target.dataset;
    if ( type ) {
      this.setState( { [ type ]: e.target.value.trim() } );
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
          .map( e => e.trim().toLowerCase() )
          .filter( e => e );
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
            .then( e => e.text() )
            .then( e => {
              const parsed = new DOMParser().parseFromString(
                e,
                'text/html'
              );
              return parsed.querySelector( 'input[name="loginhash"]' );
            } );
          loginhash.then( hash => {
            if ( hash === null ) {
              this.setState( { validSaved: false } );
            }
            else {
              fetch(
                `https://www.schul-netz.com/${ url }/index.php?pageid=`,
                {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                  },
                  body: `login=${ username }&passwort=${ encodeURIComponent( password ) }&loginhash=${ hash.value }`,
                }
              )
                .then( e => e.text() )
                .then( e => {
                  const parsed = new DOMParser().parseFromString(
                    e,
                    'text/html'
                  );
                  const anchor = parsed.getElementById( 'menu21311' );
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
    { setPage }, { loggedOut,
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
      summaryBool,
    }
  ) {
    return html`
    <div class=margin>
      <div>
        <button class=btn onClick=${ () => { setPage( PAGES.SETTINGS ); } }>Open settings</button>
        <hr />
      </div>

      ${ newVersion
          && html`
          <div id=new-version>
            <a
              href=https://github.com/melusc/schulNetz-extension/releases/latest
              rel="noopener noreferrer"
            >
              New version available
            </a>
          </div>` }

      ${ loading
        && html`
        <div class=loading-outer>
          <div class=loading-inner></div>
        </div>` }

      ${ loggedOut
        && html`
        <div>
          <div>You are logged out.</div>
          <div>Login <a href=# onClick=${ () => { setPage( PAGES.SETTINGS ); } }>here</a>.</div>
        </div>` }

      ${ !loading
        && !loggedOut
        && html`
        <div>
          <h3 class=${
  summaryBool
    ? 'passing'
    : 'failing'
}
          >
            Summary:
            <div>${ summaryBool
    ? 'Passing'
    : 'Failing' }</div>
          </h3>

           <hr />

           <h3 class=${
  averageFailing
    ? 'failing'
    : 'passing'
}
          >
            Average:
            <div>${ average }</div>
          </h3>

           <hr />

           <h3 class=${
  compDubFailing
    ? 'failing'
    : 'passing'
}
          >
            Compensate double:
            <div>${ compDub }</div>
          </h3>

           <hr />

           <h3 class=${
  failingAmountFailing
    ? 'failing'
    : 'passing'
}
          >
            Failing in ${ failingAmount } course${
  amountIsPlural
    ? 's'
    : '' }
          </h3>

          <${ Table } vals=${ failingVals }/>

          ${ Array.isArray( vals )
            && html`
            <h3>All marks</h3>
            <div>Amount: ${ vals.length }</div>
            <${ Table } vals=${ vals } />` }

        </div>` }

      ${ noMarks
        && html`
          <div>You don't have any marks</div>` }
    </div>`;
  }

  componentDidMount() {
    chrome.storage.local.get(
      [ 'url', 'password', 'username', 'ignoring' ],
      ( { url, password, username, ignoring = [] } ) => {
        if ( url && password && username ) {
          const loginhash = fetch( `https://www.schul-netz.com/${ url }/loginto.php?mode=0&lang=` )
            .then( e => e.text() )
            .then( e => {
              const parsed = new DOMParser().parseFromString(
                e,
                'text/html'
              );
              return parsed.querySelector( 'input[name="loginhash"]' );
            } );

          const marksLink = loginhash.then( hash => {
            if ( hash !== null ) {
              return fetch(
                `https://www.schul-netz.com/${ url }/index.php?pageid=`,
                {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                  },
                  body: `login=${ username }&passwort=${ encodeURIComponent( password ) }&loginhash=${ hash.value }`,
                }
              )
                .then( e => e.text() )
                .then( e => {
                  const parsed = new DOMParser().parseFromString(
                    e,
                    'text/html'
                  );
                  const anchor = parsed.getElementById( 'menu21311' );
                  return anchor === null
                    ? null
                    : `https://www.schul-netz.com/${ url }/${ anchor.getAttribute( 'href' ) }`;
                } );
            }

            this.setState( { loggedOut: true, loading: false } );
            return null;
          } );

          marksLink.then( link => {
            if ( link === null ) {
              this.setState( { loggedOut: true, loading: false } );
            }
            else {
              fetch( link )
                .then( e => e.text() )
                .then( e => {
                  const parsed = new DOMParser().parseFromString(
                    e,
                    'text/html'
                  );
                  const table = [ ...parsed.getElementsByTagName( 'h3' ) ]
                    .filter( e => ( /aktuelle noten/iu ).test( e.textContent ) )[ 0 ]
                    .nextElementSibling.getElementsByTagName( 'table' )[ 0 ];

                  const rows = [ ...table.rows ]
                    .slice( 1 )
                    .filter( e => e.style.display !== 'none' )
                    .filter( e => isFinite( parseFloat( e.children[ 1 ].textContent ) ) );
                  // parseFloat because if a mark hasn't been published yet
                  // it will have a *
                  // example: 5.500*

                  const vals = rows
                    .map( curRow => [
                      curRow.firstElementChild.lastChild.textContent.trim(),
                      calcMark( curRow.children[ 1 ].textContent ),
                    ] )
                    .filter( curRow => ignoring.every( curIgnore => curIgnore !== curRow[ 0 ].toLowerCase() ) );

                  if ( vals.length <= 0 ) {
                    this.setState( { loading: false, noMarks: true } );
                    return;
                  }

                  const avg = vals.reduce(
                    (
                      acc, cur, index
                    ) => index === vals.length - 1
                      ? ( acc + cur[ 1 ] ) / vals.length
                      : acc + cur[ 1 ],
                    0
                  );
                  const average = avg.toFixed( 3 );
                  const averageFailing = avg < 4;

                  const compDub = vals.reduce(
                    (
                      acc, cur
                    ) => acc + ( ( cur[ 1 ] - 4 ) * ( cur[ 1 ] < 4
                      ? 2
                      : 1 ) ),
                    0
                  );

                  const compDubFailing = compDub < 0;

                  const failingVals = vals.filter( e => e[ 1 ] < 4 );

                  const failingAmount = failingVals.length;
                  const failingAmountFailing = failingAmount > 3;
                  const amountIsPlural = failingAmount !== 1;

                  const summaryBool = !( averageFailing || compDubFailing || failingAmountFailing );
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
                    summaryBool,
                    loading: false,
                  } );
                } );
            }
          } );

          fetch( 'https://api.github.com/repos/melusc/schulnetz-extension/releases/latest' )
            .then( e => e.json() )
            .then( json => {
              const newVersion = json.tag_name;
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
  ? html`
  <div class=table>
    <div class=thead>
      <div class=tr>
        <div>Course</div>
        <div>Mark</div>
      </div>
    </div>
    <div>${ vals.map( (
    e, i
  ) => html`
      <div class=tr key=${ i }>
        <div>${ e[ 0 ] }</div>
        <div>${ e[ 1 ] }</div>
      </div>
    ` ) }</div>
  </div>`
  : null;

// keep track of page, sort of like router
const PAGES = {
  SETTINGS: 'PAGE.SETTINGS',
  DEFAULT: 'PAGE.DEFAULT',
};
// Component to use depending on the page
const PAGE_SOURCES = {
  [ PAGES.SETTINGS ]: Settings,
  [ PAGES.DEFAULT ]: Default,
};

const calcMark = ( num = new Error( 'num is required' ) ) => {
  const parsedNum = parseFloat( num );
  return Math.round( parsedNum * 2 ) / 2;
};

init();
