import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity } from 'react-native';
import { useDispatch } from 'react-redux';
import { setLoginEmail } from '../storage';
import { sendLoginRequest } from '../api';
import { isValidEmail } from '../utils';

export default function LoginPage ({ navigation }) {
	const dispatch = useDispatch();
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [securePassword, setSecurePassword] = useState(true);
	const [loginError, setLoginError] = useState('');

	const handleEmailSubmit = async () => {
		setLoginError('');
		if (isValidEmail(email)) {
			const authResponse = await sendLoginRequest({ email, password });
			if (authResponse.email) {
				dispatch(setLoginEmail(authResponse.email));
				navigation.navigate('Home');
			} else if (authResponse.error) {
				setLoginError(authResponse.error);
			}
		} else {
			setLoginError('Please enter a valid email');
		}
	};

	return (
		<View style={styles.container}>
			{loginError && <Text style={styles.error}>{loginError}</Text>}
			<Text style={styles.title}>Authentication</Text>
			<TextInput
				style={styles.input}
				onChangeText={email => setEmail(email)}
				value={email}
				placeholder="Enter your email"
			/>
			<View style={styles.passInputContainer}>
				<TextInput
					onChangeText={password => setPassword(password)}
					value={password}
					placeholder="Enter your password"
					secureTextEntry={securePassword}
				/>
				<TouchableOpacity style={styles.eyeButtonContainer} onPress={() => setSecurePassword(!securePassword)}>
					<Text style={styles.eyeButton}>{securePassword ? '🕶️' : '👓️'}</Text>
				</TouchableOpacity>
			</View>
			<Button
				title="Submit"
				onPress={handleEmailSubmit}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
	},
	title: {
		fontSize: 24,
		marginBottom: 20,
	},
	error: {
		fontSize: 14,
		marginBottom: 20,
		color: '#ff0000',
	},
	input: {
		borderWidth: 1,
		borderColor: '#ccc',
		borderRadius: 5,
		padding: 10,
		marginBottom: 20,
		width: '80%',
	},
	passInputContainer: {
		borderWidth: 1,
		borderColor: '#ccc',
		borderRadius: 5,
		padding: 10,
		flexDirection: 'row',
		justifyContent: 'space-between',
		width: '80%',
		marginBottom: 10
	},
	eyeButtonContainer: {
		alignItems: 'center',
	},
	eyeButton: {
		fontSize: 20,
	}
});