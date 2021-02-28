export const ERRORS = {
  INCORRECT_CREDS: 'ERROR_INCORRECT_CREDS',
};

const login = async ( { url, username, password } ) => {
  const loginhashRequest = await fetch( `https://www.schul-netz.com/${ url }/loginto.php?mode=0&lang=` );

  if ( !loginhashRequest.ok ) {
    throw loginhashRequest.statusText;
  }

  const loginHashText = await loginhashRequest.text();

  const loginhash = new DOMParser()
    .parseFromString(
      loginHashText,
      'text/html'
    )
    .querySelector( 'input[name="loginhash"]' );

  if ( !loginhash ) {
    throw new Error( 'Failed to get hash from login page' );
  }

  const loginRequestBody = new URLSearchParams( {
    login: username,
    passwort: password,
    loginhash: loginhash.value,
  } ).toString();

  const marksPageRequest = await fetch(
    `https://www.schul-netz.com/${ url }/index.php?pageid=21311`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: loginRequestBody,
    }
  );

  if ( !marksPageRequest.ok ) {
    throw marksPageRequest.statusText;
  }

  const marksPageURL = new URL( marksPageRequest.url );

  if ( marksPageURL.pathname !== `/${ url }/index.php` ) {
    throw new Error( ERRORS.INCORRECT_CREDS );
  }

  const marksPageText = await marksPageRequest.text();
  const parsedMarksPage = new DOMParser().parseFromString(
    marksPageText,
    'text/html'
  );
  const marksTable = [ ...parsedMarksPage.querySelectorAll( 'h3' ) ]
    .find( element => ( /aktuelle noten/i ).test( element.textContent ) )
    .nextElementSibling.querySelector( 'table' );

  const logoutURL = parsedMarksPage.querySelector( 'a[href^="index.php?pageid=9999"]' )?.getAttribute?.( 'href' );

  if ( logoutURL ) {
    const fullLogoutURL = `https://www.schul-netz.com/${ url }/${ logoutURL }`;
    await fetch(
      fullLogoutURL,
      {
        method: 'HEAD',
      }
    );
  }

  return [ ...marksTable.rows ]
    .slice( 1 )
    .filter( element => element.style.display !== 'none'
        && Number.isFinite( Number.parseFloat( element.children[ 1 ].textContent.trim() ) ) );
};

export default login;
