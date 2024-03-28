import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { WebView } from 'react-native-webview';
import { fetchParseCopyrights } from '../api';
import { useDispatch } from 'react-redux';
import { setCopyrightsList } from '../storage';

const WebViewPage = ({ route }) => {
	const { url } = route.params;
	const dispatch = useDispatch();
	const [loading, setLoading] = useState(true);
	const [showCopyrightsMessage, setShowCopyrightsMessage] = useState(false);
	const [foundedCopyrights, setFoundedCopyrights] = useState('');

	const fetchAndSetCopyrights = async () => {
		try {
			const fetchCopyrightsData = await fetchParseCopyrights(url);
			dispatch(setCopyrightsList(fetchCopyrightsData));
			setFoundedCopyrights(fetchCopyrightsData.copyrights);
			setShowCopyrightsMessage(true);
			setTimeout(() => {
				setShowCopyrightsMessage(false);
				setFoundedCopyrights('');
			}, 2000);
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		fetchAndSetCopyrights();
	}, []);

	const handleLoadStart = () => {
		setLoading(true);
	};

	const handleLoadEnd = async () => {
		setLoading(false);
	};

	return (
		<View style={styles.container}>
			<WebView
				source={{ uri: url }}
				style={styles.webview}
				onLoadStart={handleLoadStart}
				onLoadEnd={handleLoadEnd}
			/>
			{loading && (
				<View style={styles.overlay}>
					<ActivityIndicator size="large" style={styles.activityIndicator}/>
				</View>
			)}
			{showCopyrightsMessage && (
				<View style={styles.copyrightsMessage}>
					<Text style={styles.copyrightsText}>{foundedCopyrights} was found</Text>
				</View>
			)}
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	webview: {
		flex: 1,
	},
	overlay: {
		...StyleSheet.absoluteFillObject,
		backgroundColor: 'rgba(0, 0, 0, 0.5)',
	},
	activityIndicator: {
		position: 'absolute',
		top: '50%',
		left: '50%',
		marginLeft: -15,
		marginTop: -15,
		color: '#0000ff'
	},
	copyrightsMessage: {
		position: 'absolute',
		backgroundColor: '#ffffff',
		padding: 10,
		borderRadius: 5,
		zIndex: 1,
	},
	copyrightsText: {
		fontSize: 16,
		fontWeight: 'bold',
	},
});

export default WebViewPage;