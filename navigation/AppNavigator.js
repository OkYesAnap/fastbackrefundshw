import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import LoginPage from '../components/LoginPage';
import HomePage from '../components/HomePage';
import { useSelector } from 'react-redux';
import WebViewPage from '../components/WebViewPage';
import CopyrightsPage from '../components/CopyrightsPage';

const Stack = createStackNavigator();

const AppNavigator = () => {
	const loginEmail = useSelector((state) => state.login.login);
	return (
		<NavigationContainer>
			<Stack.Navigator>
				<Stack.Screen name="Login" component={LoginPage}/>
				<Stack.Screen name="Home" component={HomePage} options={{ title: `Hello ${loginEmail}` }}/>
				<Stack.Screen name="WebView" component={WebViewPage}/>
				<Stack.Screen name="Copyrights" component={CopyrightsPage}/>
			</Stack.Navigator>
		</NavigationContainer>
	);
};

export default AppNavigator;