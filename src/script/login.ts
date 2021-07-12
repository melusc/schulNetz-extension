export const enum Errors {
	INCORRECT_CREDS = 'Incorrect credentials',
}

export const login = async ({
	url,
	username,
	password,
}: {
	url: string;
	username: string;
	password: string;
}): Promise<HTMLTableRowElement[]> => {
	const loginhashRequest = await fetch(
		`https://www.schul-netz.com/${url}/loginto.php?mode=0&lang=`,
	);

	if (!loginhashRequest.ok) {
		throw new Error(loginhashRequest.statusText);
	}

	const loginHashText = await loginhashRequest.text();

	const loginhash = new DOMParser()
		.parseFromString(loginHashText, 'text/html')
		.querySelector<HTMLInputElement>('input[name="loginhash"]');

	if (!loginhash) {
		throw new Error('Failed to get loginhash input');
	}

	const loginRequestBody = new URLSearchParams({
		login: username,
		passwort: password,
		loginhash: loginhash.value,
	}).toString();

	const marksPageRequest = await fetch(
		`https://www.schul-netz.com/${url}/index.php?pageid=21311`,
		{
			method: 'POST',
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded',
			},
			body: loginRequestBody,
		},
	);

	if (!marksPageRequest.ok) {
		throw new Error(marksPageRequest.statusText);
	}

	const marksPageURL = new URL(marksPageRequest.url);

	if (marksPageURL.pathname !== `/${url}/index.php`) {
		throw new Error(Errors.INCORRECT_CREDS);
	}

	const parsedMarksPage = new DOMParser().parseFromString(
		await marksPageRequest.text(),
		'text/html',
	);
	const marksTable = parsedMarksPage.evaluate(
		'//h3' // All h3
			+ '[contains(text(), "Aktuelle Noten")]' // That have text "Aktuelle Noten"
			+ '/following-sibling::div' // Get all following sibling that are divs
			+ '/table', // Get tables that are direct descendants
		parsedMarksPage.body,
		null,
		XPathResult.FIRST_ORDERED_NODE_TYPE,
		null,
	).singleNodeValue as HTMLTableElement | null;

	if (!marksTable) {
		throw new Error('Could not find table of marks.');
	}

	const logoutURL = parsedMarksPage
		.querySelector('a[href^="index.php?pageid=9999"]')
		?.getAttribute?.('href');

	if (logoutURL) {
		const fullLogoutURL = `https://www.schul-netz.com/${url}/${logoutURL}`;

		void fetch(fullLogoutURL, {
			method: 'HEAD',
		});
	}

	const result = [];

	for (let i = 1; i < marksTable.rows.length; ++i) {
		const item = marksTable.rows[i];

		if (item.style.display === 'none') {
			continue;
		}

		// Number(undefined) is NaN...
		const mark = Number(
			item.children?.[1]?.textContent?.trim().replace(/\*$/, ''),
		);

		// ... and NaN is not finite
		if (Number.isFinite(mark)) {
			result.push(item);
		}
	}

	return result;
};
