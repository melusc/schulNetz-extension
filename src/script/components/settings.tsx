import {h} from 'preact';
import {route} from 'preact-router';
import clsx from 'clsx';

import {useEffect, useState, useReducer} from 'preact/hooks';
import {login} from '../login';

import type {SettingsState} from '../index.d';

// For preact-router to allow path=".."
export const Settings = (_props: {path: string}) => {
	const [state, setState] = useReducer<
		Readonly<SettingsState>,
		Readonly<Partial<SettingsState>>
	>((previousState, nextState) => ({...previousState, ...nextState}), {
		username: '',
		password: '',
		url: '',
		ignoring: '',
	});

	const [validSaved, setValidSaved] = useState<undefined | boolean>(undefined);
	const [hasErrored, setError] = useState<string | undefined>(undefined);

	useEffect(() => {
		chrome.storage.local.get(
			['username', 'password', 'url', 'ignoring'],
			({username, password, url, ignoring = []}) => {
				const newState: Partial<SettingsState> = {};

				if (typeof url === 'string') {
					newState.url = url;
				}

				if (typeof password === 'string') {
					newState.password = password;
				}

				if (typeof username === 'string') {
					newState.username = username;
				}

				if (Array.isArray(ignoring)) {
					newState.ignoring = ignoring.join(', ');
				}

				setState(newState);
			},
		);
	}, []);

	const handleInput =
		(
			type: 'username' | 'password' | 'url' | 'ignoring',
		): h.JSX.GenericEventHandler<HTMLInputElement> =>
		event_ => {
			const unTrimmed = event_.currentTarget.value;

			setState({
				[type]: type === 'password' ? unTrimmed : unTrimmed.trim(),
			});

			setError(undefined);
		};

	const handleSave = () => {
		chrome.storage.local.get(
			['url', 'password', 'username'],
			({password: origPassword, username: origUsername, url: origUrl}) => {
				if (!state.password || !state.username || !state.url) {
					return;
				}

				const {password} = state;
				const url = state.url.trim().toLowerCase();
				const username = state.username.trim();
				const ignoring = state.ignoring
					.toLowerCase()
					.split(',')
					.map(item => item.trim())
					.filter(item => item !== '');

				if (
					password === origPassword &&
					username === origUsername &&
					url === origUrl
				) {
					chrome.storage.local.set({ignoring});

					setState({
						ignoring: ignoring.join(', '),
						url,
						username,
					});

					setValidSaved(true);
				} else if (password !== '' && username !== '' && url !== '') {
					login({url, username, password})
						.then(() => {
							chrome.storage.local.set({
								url,
								password,
								username,
								ignoring,
							});

							setState({
								url,
								// Password doesn't get trimmed
								username,
								ignoring: ignoring.join(', '),
							});

							setValidSaved(true);
						})
						.catch((error: Error) => {
							setError(error.message);
							setValidSaved(false);
						});
				} else {
					setValidSaved(true);
					setError('A required input was empty');
				}
			},
		);
	};

	const handleKeydownSave: h.JSX.KeyboardEventHandler<HTMLDivElement> =
		event_ => {
			if (event_.key === 'Enter') {
				handleSave();
			}
		};

	const {username, password, ignoring, url} = state;

	return (
		<>
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

			<div onKeyDown={handleKeydownSave}>
				<div class="input-wrapper">
					<div>Username:</div>
					<input
						type="text"
						placeholder="Username"
						value={username}
						onInput={handleInput('username')}
					/>
				</div>

				<div class="input-wrapper">
					<div>Password:</div>
					<input
						type="password"
						placeholder="Password"
						value={password}
						onInput={handleInput('password')}
					/>
				</div>

				<div class="input-wrapper">
					<div>URL to schulNetz page</div>
					<small>ausserschwyz, einsiedeln...</small>
					<input
						type="text"
						placeholder="url"
						value={url}
						onInput={handleInput('url')}
					/>
				</div>

				<div class="input-wrapper">
					<div>Ignore specific courses</div>
					<small>seperated by commas</small>
					<input
						type="text"
						placeholder="sport"
						value={ignoring}
						onInput={handleInput('ignoring')}
					/>
				</div>
			</div>

			{typeof hasErrored === 'string' && <div>{hasErrored}</div>}

			<hr />

			<div class="input-wrapper">
				<button
					class={clsx('btn', {
						saved: validSaved === true,
						failed: validSaved === false,
					})}
					type="button"
					onClick={handleSave}
					onAnimationEnd={() => {
						setValidSaved(undefined);
					}}
				>
					{typeof validSaved === 'boolean' ? (validSaved ? '✓' : '✗') : 'Save'}
				</button>
			</div>
		</>
	);
};
