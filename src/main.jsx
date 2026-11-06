import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './index.css';
import Home from './pages/Home';
import Mapping from './pages/Mapping';
import NavBar from './pages/NavBar';
import { store } from './redux/store';

ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<Provider store={store}>
			<BrowserRouter>
				<NavBar />
				<main className="page">
					<Routes>
						<Route path="/" element={<Home />} />
						<Route path="/mapping" element={<Mapping />} />
					</Routes>
				</main>
				<footer className="siteCredit">
					<span>&copy; All rights reserved | Designed with love by DungDung</span>
				</footer>
			</BrowserRouter>
		</Provider>
	</React.StrictMode>
);
