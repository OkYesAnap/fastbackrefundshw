import React from 'react';
import { Provider } from 'react-redux';
import store from './storage';
import AppNavigator from './navigation/AppNavigator';

export default function App () {
	return (
		<Provider store={store}>
			<AppNavigator/>
		</Provider>
	);
}
