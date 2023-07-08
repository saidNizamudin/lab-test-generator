import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Mapping from './pages/Mapping';
import NavBar from './pages/NavBar';
import { store } from './redux/store';

ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<Provider store={store}>
			<BrowserRouter>
				<NavBar />
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/mapping" element={<Mapping />} />
				</Routes>
			</BrowserRouter>
		</Provider>
	</React.StrictMode>
);
