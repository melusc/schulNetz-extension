import {h, Fragment} from 'preact';
import {StateUpdater, useEffect, useState} from 'preact/hooks';
import {route} from 'preact-router';

import {login, Errors} from '../login';
import {calculate} from '../calculate';

import type {DefaultState} from '../index.d';
import {Stages} from '../stages';
import {DisplayMarks} from './display-marks';
import {NewVersion} from './new-version';

const loginAndGetMarks = (setState: StateUpdater<DefaultState>) => {
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
						setState(calculate(rows, ignoring));
					})
					.catch((error: Error) => {
						if (error.message === Errors.INCORRECT_CREDS) {
							setState({
								stage: Stages.LoggedOut,
							});
						} else {
							setState({
								stage: Stages.Errored,
								error: error.message,
							});
						}
					});
			} else {
				setState({
					stage: Stages.LoggedOut,
				});
			}
		},
	);
};

// For preact-router to allow path=".."
const Default = (_props: {path: string}) => {
	const [state, setState] = useState<Readonly<DefaultState>>({
		stage: Stages.Loading,
	});

	useEffect(() => {
		loginAndGetMarks(setState);
	}, []);

	const {stage} = state;

	return (
		<>
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
				<hr />
			</div>

			<NewVersion />
			{stage === Stages.Loading && (
				<>
					<div class="loading-outer">
						<div class="loading-inner" />
					</div>
					<hr />
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
			{stage === Stages.Loaded && <DisplayMarks marks={state.marks} />}

			{stage === Stages.NoMarks && (
				<>
					<div>You don&apos;t have any marks</div>
					<hr />
				</>
			)}

			{stage === Stages.Errored && (
				<>
					<div>{state.error}</div>
					<hr />
				</>
			)}

			<small>{chrome.runtime.getManifest().version}</small>
		</>
	);
};

export default Default;
