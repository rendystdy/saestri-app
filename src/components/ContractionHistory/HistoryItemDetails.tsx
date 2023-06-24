import React from 'react';
import { Text, View } from 'react-native';

import DashedLine from 'react-native-dashed-line';
import { styles } from './style';
import { Colors } from '@constant';
import { parseDuration, parseTime } from '@helpers';
import { IDataContraction } from 'src/screens/ContractionTimer';
import dayjs from 'dayjs';

interface IHistoryProps {
	detail: IDataContraction;
	index: number;
}

const HistoryItemDetails: React.FC<IHistoryProps> = ({ detail, index }) => {

	const totalInterval = () => {
		return parseTime(parseDuration(detail.contractionTime.start, detail.contractionTime.end) + parseDuration(detail.intervalTime.start, detail.intervalTime.end));
	};
	
	const getDurations = () => {
		return {
			contraction: parseTime(parseDuration(detail.contractionTime.start, detail.contractionTime.end)),
			interval: parseTime(parseDuration(detail.intervalTime.start, detail.intervalTime.end) ?? 0),
		};
	};

	const getTimeStamp = () => {
		return {
			contraction: dayjs(detail.contractionTime.start).format('HH:mm DD MMM YYYY'),
			interval: dayjs(detail.intervalTime.start).format('HH:mm DD MMM YYYY'),
		};
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
				<View style={ styles.wrpperCircleNumber } >
					<Text style={ styles.texNumber }>{ index + 1 }</Text>
				</View>
			</View>
			<View style={ styles.wrapperContent }>
				<View style={ styles.col }>
					<Text style={ styles.textTitle }>Contraction</Text>
					<Text style={ [styles.textTitle, { color: Colors.pink.default }] }>Rest</Text>
					<Text style={ [styles.textTitle, { color: Colors.black.default }] }>Interval</Text>
				</View>
				<View style={ styles.col }>
					<Text style={ styles.textTitle }>{ getDurations().contraction } | { getTimeStamp().contraction }</Text>
					<Text style={ [styles.textTitle, { color: Colors.pink.default }] }>{ getDurations().interval } | { getTimeStamp().interval }</Text>
					<Text style={ [styles.textTitle, { color: Colors.black.default }] }>{ totalInterval() }</Text>
				</View>
			</View>
		</View >
	);
};

export default HistoryItemDetails;
