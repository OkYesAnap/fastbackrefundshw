import React, { useEffect, useState } from 'react';
import { View, Button, ActivityIndicator } from 'react-native';
import { getListOfSites } from '../api';

const HomePage = ({ navigation }) => {
	const [listOfSites, setListOfSites] = useState([]);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		const fetchData = async () => {
			setLoading(true);
			const list = await getListOfSites();
			setListOfSites(list);
			setLoading(false);
		};
		fetchData();
	}, [setLoading, setListOfSites]);

	const openWebView = (url) => {
		navigation.navigate('WebView', { url });
	};

	const RenderList = () => {
		return listOfSites.map((site) => (
			<Button
				key={site.url}
				title={site.name}
				onPress={() => openWebView(site.url)}/>));
	};

	return (
		<View>
			{loading ?
				<ActivityIndicator size="large" color="#0000ff"/> :
				<RenderList/>
			}
			<Button
				title="Go to Copyright information scan"
				onPress={() => navigation.navigate('Copyrights')}
			/>
		</View>
	);
};

export default HomePage;