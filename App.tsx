import React from 'react';
import Navigation from './src/router/Navigation';
import OflineIndicator from './src/compoents/OflineIndicator';
import { Provider } from 'react-redux';
import { store, persistor } from './src/redux/store';
import { PersistGate } from 'redux-persist/integration/react';
export default function App() {
	return (
		<>
			<Provider store={store}>
				<PersistGate loading={null} persistor={persistor}>
					<Navigation />
					<OflineIndicator />
				</PersistGate>
			</Provider>
		</>
	);
}
