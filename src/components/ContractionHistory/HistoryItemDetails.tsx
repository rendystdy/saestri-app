import React from 'react';
import { Text, View } from 'react-native';

import DashedLine from 'react-native-dashed-line';
import { styles } from './style';
import { Colors } from '@constant';
import { parseDuration, parseTime } from '@helpers';

interface IHistoryProps {
	detail: any;
	index: number;
}

const HistoryItemDetails: React.FC<IHistoryProps> = ({ detail, index }) => {

	const totalInterval = () => {
		return parseTime(parseDuration(detail.contractionTime.start, detail.contractionTime.end) + parseDuration(detail.intervalTime.start, detail.intervalTime.end));
	};

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
						<Text style={ styles.texNumber }>{ index + 1 }</Text>
					</View>
				</View>
				<View style={ styles.wrapperContent }>
					<View style={ styles.row }>
						<Text style={ styles.textTitle }>Kontraksi    :</Text>
						<Text style={ styles.textTitle }>	{ parseTime(parseDuration(detail.contractionTime.start, detail.contractionTime.end)) }</Text>
					</View>
					<View style={ styles.row }>
						<Text style={ [styles.textTitle, { color: Colors.pink.default }] }>rest													:</Text>
						<Text style={ [styles.textTitle, { color: Colors.pink.default }] }>	{ detail.intervalTime.start ? parseTime(parseDuration(detail.intervalTime.start, detail.contractionTime.end)) : 0 }</Text>
					</View>
					<View style={ styles.row }>
						<Text style={ [styles.textTitle, { color: Colors.black.default }] }>interval							:</Text>
						<Text style={ [styles.textTitle, { color: Colors.black.default }] }>	{ totalInterval() }</Text>
					</View>
				</View>
			</View>
		</View >
	);
};

export default HistoryItemDetails;
