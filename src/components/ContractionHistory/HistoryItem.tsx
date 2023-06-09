import React, { useState } from 'react';
import {  Text, View } from 'react-native';

import CheckBox from '@react-native-community/checkbox';
import { styles } from './style';
import HistoryItemDetails from './HistoryItemDetails';

type ItemProps = {
  id: any,
	date: string,
	contractionCount: number,
};

const HistoryItem: React.FC<ItemProps> = ({
	contractionCount,
	date,
	id,
}) => {

	const [isChecked, setChecked] = useState<boolean>(false);

	return (
		<View style={ styles.container }>
			<View style={ styles.item }>
				<View style={ styles.itemCheckbox }>
					<CheckBox
						value={ isChecked }
						onValueChange={ value => setChecked(value) }/>
				</View>
				<View>
					<Text style={ styles.dateText }>{ date }</Text>
					<Text style={ styles.contractionCountText }>Total : { contractionCount } Kontraksi</Text>
				</View>
			</View>
			
			{
				id === 0 && <HistoryItemDetails />
			}
		</View>
	);
};

export default HistoryItem;
