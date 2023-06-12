import React, { useState } from 'react';
import {  Text, View } from 'react-native';

import { styles } from './style';

const HistoryItemDetails: React.FC = () => {

	const [isChecked, setChecked] = useState<boolean>(false);

	return (
		<View style={ styles.itemDetail }>
			<Text style={ { fontSize: 12 } }>Ini detailsnya bruh</Text>
		</View>
	);
};

export default HistoryItemDetails;
