import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import * as serviceWorker from './serviceWorker';
import App from './App';

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
	<BrowserRouter>
		<App />
	</BrowserRouter>
);

serviceWorker.unregister();
