import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';

const CopyrightsPage = () => {
	const copyrightsList = useSelector(state => state.copyrightsList.copyrightsList);

	return (
		<View style={styles.container}>
			{!copyrightsList.length && <Text>Nothing scanned yet...</Text>}
			<FlatList
				data={copyrightsList}
				keyExtractor={(item, index) => index.toString()}
				renderItem={({ item }) => <Text style={styles.item}>{item}</Text>}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 20,
		backgroundColor: '#ffffff',
	},
	item: {
		marginTop: 10,
		fontSize: 16,
		color: '#333333',
		borderBottomWidth: 1,
		borderBottomColor: '#cccccc',
	},
});

export default CopyrightsPage;