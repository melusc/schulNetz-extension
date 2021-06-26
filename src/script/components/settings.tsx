import {h} from 'preact';
import {route} from 'preact-router';
import {proxy, useSnapshot} from 'valtio';
import clsx from 'clsx';

import {useEffect} from 'preact/hooks';
import {login} from '../login';

import {SettingsState} from '..';

const state = proxy<SettingsState>({
	username: '',
	password: '',
	url: '',
	ignoring: '',
});

chrome.storage.local.get(
	['username', 'password', 'url', 'ignoring'],
	({username, password, url, ignoring = []}) => {
		if (typeof url === 'string') {
			state.url = url;
		}

		if (typeof password === 'string') {
			state.password = password;
		}

		if (typeof username === 'string') {
			state.username = username;
		}

		if (Array.isArray(ignoring)) {
			state.ignoring = ignoring.join(', ');
		}
	},
);

const handleInput =
	(
		type: 'username' | 'password' | 'url' | 'ignoring',
	): h.JSX.GenericEventHandler<HTMLInputElement> =>
	event_ => {
		if (type === 'password') {
			state[type] = event_.currentTarget.value;
		} else {
			state[type] = event_.currentTarget.value.trim();
		}

		state.errorMsg = undefined;
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

			state.ignoring = ignoring.join(', ');

			if (
				password === origPassword &&
				username === origUsername &&
				origUrl === url
			) {
				chrome.storage.local.set({ignoring});

				state.validSaved = true;
			} else if (password !== '' && username !== '' && url !== '') {
				login({url, username, password})
					.then(() => {
						chrome.storage.local.set({
							url,
							password,
							username,
							ignoring,
						});

						Object.assign<SettingsState, SettingsState>(state, {
							url,
							password,
							username,
							ignoring: ignoring.join(', '),
							validSaved: true,
						});
					})
					.catch((error: Error) => {
						state.validSaved = false;
						state.errorMsg = error;
					});
			} else {
				state.validSaved = false;
				state.errorMsg = 'A required input was empty';
			}
		},
	);
};

const handleKeydownSave: h.JSX.KeyboardEventHandler<HTMLDivElement> =
	event_ => {
		if (event_.type === 'keydown' && event_.key === 'Enter') {
			handleSave();
		}
	};

// For preact-router to allow path=".."
export const Settings = (_props: {path: string}) => {
	useEffect(() => {
		delete state.validSaved;
		delete state.errorMsg;
	}, []);

	const snap = useSnapshot(state);

	const {username, password, ignoring, url, validSaved, errorMsg} = snap;

	return (
		<div class="margin">
			<div>
				<button
					type="button"
					class="btn"
					onClick={() => {
						route('/');
					}}
				>
					Go back
				</button>
				<hr/>
			</div>

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
					<p>
						<small>ausserschwyz, einsiedeln...</small>
					</p>
					<input
						type="text"
						placeholder="url"
						value={url}
						onInput={handleInput('url')}
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
						value={ignoring}
						onInput={handleInput('ignoring')}
					/>
				</div>
			</div>

			{errorMsg && (
				<div>{typeof errorMsg === 'string' ? errorMsg : errorMsg.message}</div>
			)}

			<hr/>

			<div class="input-wrapper">
				<button
					class={clsx('btn', {
						saved: validSaved === true,
						failed: validSaved === false,
					})}
					type="button"
					onClick={handleSave}
					onAnimationEnd={() => {
						delete state.validSaved;
					}}
				>
					{typeof validSaved === 'boolean' ? (validSaved ? '✓' : '✗') : 'Save'}
				</button>
			</div>
		</div>
	);
};
