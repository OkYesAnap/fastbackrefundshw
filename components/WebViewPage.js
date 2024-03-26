import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import { WebView } from 'react-native-webview';
import { fetchParseCopyrights } from '../api';
import { useDispatch } from 'react-redux';
import { setCopyrightsList } from '../storage';

const WebViewPage = ({ route }) => {
	const { url } = route.params;
	const dispatch = useDispatch();
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchAndSetCopyrights = async () => {
			try {
				const copyrights = await fetchParseCopyrights(url);
				dispatch(setCopyrightsList(copyrights));
			} catch (error) {
				console.log(error);
			}
		};
		fetchAndSetCopyrights();
	}, [dispatch, url]);

	const handleLoadStart = () => {
		setLoading(true);
	};

	const handleLoadEnd = async () => {
		setLoading(false);
	};

	return (<View style={styles.container}>
		<WebView source={{ uri: url }}
				 style={styles.webview}
				 onLoadStart={handleLoadStart}
				 onLoadEnd={handleLoadEnd}
		/>
		{loading && (<View style={styles.overlay}>
			<ActivityIndicator size="large" color="#0000ff" style={styles.activityIndicator}/>
		</View>)}
	</View>);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
	}, webview: {
		flex: 1,
	}, overlay: {
		...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(0, 0, 0, 0.5)',
	}, activityIndicator: {
		position: 'absolute', top: '50%', left: '50%', marginLeft: -15, marginTop: -15,
	},
});

export default WebViewPage;