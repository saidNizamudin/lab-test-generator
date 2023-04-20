import React from 'react';
import Home from './pages/Home';
import ReactDOM from 'react-dom/client';
import { store } from './redux/store';
import { Provider } from 'react-redux';

ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<Provider store={store}>
			<Home />
		</Provider>
	</React.StrictMode>
);
