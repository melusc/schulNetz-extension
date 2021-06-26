import {h} from 'preact';
import {useEffect} from 'preact/hooks';
import {route} from 'preact-router';

import {proxy, useSnapshot} from 'valtio';
import {login, Errors} from '../login';
import {calculate} from '../calculate';
import {emptyObject} from '../utils';

import type {DefaultState} from '..';
import {Stages} from '..';
import {TableFromState} from './table';

const state = proxy<DefaultState>({
	stage: Stages.Loading,
	newVersion: false,
});

const newVersionAvailable = async (): Promise<boolean> => {
	return fetch(
		'https://api.github.com/repos/melusc/schulnetz-extension/releases/latest',
	)
		.then(async response => response.json())
		.then((responseJSON: Record<string, unknown>) => {
			const newVersion = responseJSON.tag_name;
			if (typeof newVersion !== 'string') {
				return false;
			}

			const oldVersion = chrome.runtime.getManifest().version;

			return newVersion > oldVersion;
		});
};

const loginAndGetMarks = () => {
	chrome.storage.local.get(
		['url', 'password', 'username', 'ignoring'],
		({
			url,
			password,
			username,
			ignoring = [],
		}: {
			url?: string;
			password?: string;
			username?: string;
			ignoring?: string[];
		}) => {
			if (url && password && username) {
				login({url, username, password})
					.then(rows => {
						emptyObject(state);

						Object.assign(state, calculate(rows, ignoring));
					})
					.catch((error: Error) => {
						emptyObject(state);

						if (error.message === Errors.INCORRECT_CREDS) {
							state.stage = Stages.LoggedOut;
						} else {
							Object.assign(state, {
								stage: Stages.Errored,
								error,
							} as DefaultState);
						}
					});
			} else {
				state.stage = Stages.LoggedOut;
			}
		},
	);
};

// For preact-router to allow path=".."
export const Default = (_props: {path: string}) => {
	useEffect(() => {
		emptyObject(state);

		Object.assign<DefaultState, DefaultState>(state, {
			stage: Stages.Loading,
			newVersion: false,
		});

		loginAndGetMarks();

		void newVersionAvailable().then(newVersion => {
			state.newVersion = newVersion;
		});
	}, []);

	const snap = useSnapshot(state);
	const {stage, newVersion} = snap;

	return (
		<div class="margin">
			<div>
				<button
					class="btn"
					type="button"
					onClick={() => {
						route('/settings');
					}}
				>
					Open settings
				</button>
				<hr/>
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
			{stage === Stages.Loading && (
				<>
					<div class="loading-outer">
						<div class="loading-inner"/>
					</div>
					<hr/>
				</>
			)}
			{stage === Stages.LoggedOut && (
				<div>
					<div>You are logged out.</div>
					<div>
						{'Login '}
						<a href="/settings">here</a>.
					</div>
				</div>
			)}
			{state.stage === Stages.Loaded && <TableFromState state={state}/>}

			{state.stage === Stages.NoMarks && (
				<>
					<div>You don&apos;t have any marks</div>
					<hr/>
				</>
			)}

			{snap.stage === Stages.Errored && (
				<>
					<div>
						{typeof snap.error === 'string' ? snap.error : snap.error.message}
					</div>
					<hr/>
				</>
			)}

			<small>{chrome.runtime.getManifest().version}</small>
		</div>
	);
};
