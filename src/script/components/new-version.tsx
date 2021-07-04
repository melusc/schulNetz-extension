import {h} from 'preact';
import {useState, useEffect} from 'preact/hooks';

const newVersionAvailable = async (): Promise<boolean> => {
	const response = await fetch(
		'https://api.github.com/repos/melusc/schulnetz-extension/releases/latest',
	);

	if (!response.ok || response.status >= 400) {
		return false;
	}

	let responseJSON: Record<string, unknown>;
	try {
		const responseJSONAny: unknown = await response.json();

		if (typeof responseJSONAny !== 'object' || responseJSONAny === null) {
			return false;
		}

		responseJSON = responseJSONAny as Record<string, unknown>;
	} catch {
		return false;
	}

	const newVersion = responseJSON.tag_name;
	if (typeof newVersion !== 'string') {
		return false;
	}

	const oldVersion = chrome.runtime.getManifest().version;

	return newVersion > oldVersion;
};

export const NewVersion = () => {
	const [newVersion, setNewVersion] = useState(false);

	useEffect(() => {
		void newVersionAvailable().then(newVersion => {
			setNewVersion(newVersion);
		});
	});

	return newVersion ? (
		<div id="new-version">
			<a
				href="https://github.com/melusc/schulNetz-extension/releases/latest"
				rel="noopener noreferrer"
			>
				New version available
			</a>
			<hr />
		</div>
	) : null;
};
