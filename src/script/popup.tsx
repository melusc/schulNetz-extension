import {render, h} from 'preact';
import {Router} from 'preact-router';

import {Settings} from './components/settings';
import {Default} from './components/default';

const Main = () => (
	<Router>
		<Default path="/popup.html" />
		<Default path="/" />
		<Settings path="/settings" />
	</Router>
);

render(<Main />, document.body);
