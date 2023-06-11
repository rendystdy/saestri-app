import React, { useState } from 'react';
import { View } from 'react-native';

import CheckBox from '@react-native-community/checkbox';
import { styles } from './style';
import HistoryItemDetails from './HistoryItemDetails';
import { Text } from '@components';

type ItemProps = {
	id: any,
	date: string,
	contractionCount: number,
	isDelete: boolean,
};

const HistoryItem: React.FC<ItemProps> = ({
	contractionCount,
	date,
	id,
	isDelete,
}) => {

	const [isChecked, setChecked] = useState<boolean>(false);

	return (
		<View style={ styles.container }>
			<View style={ styles.item }>
				<View style={ [styles.itemCheckbox, { opacity: isDelete ? 1 : 0 }] }>
					<CheckBox
						disabled={ !isDelete }
						value={ isChecked }
						onValueChange={ value => setChecked(value) } />
				</View>
				<View>
					<Text style={ styles.dateText }>{ date }</Text>
					<Text style={ styles.contractionCountText }>Total : { contractionCount } Kontraksi</Text>
				</View>
			</View>

			{ /* {
				id === 0 && <HistoryItemDetails />
			} */ }
		</View>
	);
};

export default HistoryItem;
