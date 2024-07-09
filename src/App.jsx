import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import routes from './constants/route';

function App() {
	return (
		<div className='App'>
			<Routes>
				{routes.map((route, index) => (
					<Route
						key={index}
						path={route.path}
						element={route.element}
						exact={route.exact}
					/>
				))}
			</Routes>
		</div>
	);
}

export default App;
