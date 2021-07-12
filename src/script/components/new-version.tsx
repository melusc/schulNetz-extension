import {h} from 'preact';
import {useState, useEffect} from 'preact/hooks';

const getUnixInSeconds = () => Math.floor(Date.now() / 1000);

const checkIsNewVersionAvailable = async (): Promise<boolean> => {
	const lastCheckedForUpdate = await new Promise<number | undefined>(
		resolve => {
			chrome.storage.local.get(
				['lastCheckedForUpdate'],
				({lastCheckedForUpdate}: {lastCheckedForUpdate?: number}) => {
					resolve(lastCheckedForUpdate);
				},
			);
		},
	);

	/* If last checked was less than 5 minutes
		 ago, return false.
		 5 minutes was chosen arbitrarily */
	if (
		typeof lastCheckedForUpdate === 'number'
		&& getUnixInSeconds() - lastCheckedForUpdate < 60 * 60 * 5
	) {
		return false;
	}

	/* No await
  	 If it gets written to from multiple locations
		 it will be roughly the same time anyway */
	chrome.storage.local.set({
		lastCheckedForUpdate: getUnixInSeconds(),
	});

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
	const [isNewVersionAvailable, setNewVersionAvailability] = useState(false);

	useEffect(() => {
		void checkIsNewVersionAvailable().then(isNewVersionAvailable => {
			setNewVersionAvailability(isNewVersionAvailable);
		});
	}, []);

	return isNewVersionAvailable ? (
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
