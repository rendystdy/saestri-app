import { FlatList, Text, View } from 'react-native';
import React from 'react';
import { ContractionHistoryList } from '@components';
import styles from './style';

const ContractionHistoryScreen = () => {

	return (
		<View style={ styles.container }>
			<View style={ { marginTop: 10 } } >
				<ContractionHistoryList />
			</View>
		</View>
	);
};

export default ContractionHistoryScreen;
