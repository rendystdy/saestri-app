import React, { useState } from 'react';
import { Text, View } from 'react-native';

import DashedLine from 'react-native-dashed-line';
import { styles } from './style';
import { Colors } from '@constant';

const HistoryItemDetails: React.FC = () => {

	const [isChecked, setChecked] = useState<boolean>(false);

	return (
		<View style={ styles.itemDetail }>
			<DashedLine
				dashLength={ 3 }
				dashThickness={ 3 }
				dashGap={ 5 }
				dashColor={ Colors.gray.darkGray }
				axis='vertical'
			/>
			<View>
				<View>
					<View style={ styles.wrpperCircleNumber } >
						<Text style={ styles.texNumber }>1</Text>
					</View>
				</View>
				<View style={ styles.wrapperContent }>
					<View style={ styles.row }>
						<Text style={ styles.textTitle }>Kontraksi    :</Text>
						<Text style={ styles.textTitle }>	00:03:30</Text>
					</View>
					<View style={ styles.row }>
						<Text style={ [styles.textTitle, { color: Colors.pink.default }] }>rest													:</Text>
						<Text style={ [styles.textTitle, { color: Colors.pink.default }] }>	00:03:30</Text>
					</View>
					<View style={ styles.row }>
						<Text style={ [styles.textTitle, { color: Colors.black.default }] }>interval							:</Text>
						<Text style={ [styles.textTitle, { color: Colors.black.default }] }>	00:03:30</Text>
					</View>
				</View>
			</View>
		</View >
	);
};

export default HistoryItemDetails;
