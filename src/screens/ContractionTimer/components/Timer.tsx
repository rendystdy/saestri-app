import { StyleSheet, View } from 'react-native';
import React, { useEffect } from 'react';
import dayjs from 'dayjs';

import { Text } from '@components';
import { Colors } from '@constant';
import { useAppSelector, useTimer } from '@helpers';
import { IDataContraction, ITimerStatus } from '..';

interface ITimer {
  item: IDataContraction,
  timerStatus: ITimerStatus
}

const Timer: React.FC<ITimer> = ({ item,  timerStatus }) => {

	const { currentTimer } = useAppSelector(state => state.timerReducers);

	useEffect(() => {
		const timer = getTimer();
		if (timer && timer.status === 'contraction') {
			stopIntervalTimer();
			startContractionTimer();
		}
		if (timer && timer.status === 'interval') {
			stopContractionTimer();
			startIntervalTimer();
		}
		if (timer && !timer.isActive) {
			stopContractionTimer();
			stopIntervalTimer();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [item, timerStatus, currentTimer]);

	const getTimer = () => {
		return currentTimer.find(search => search.uid === item.uid);
	};

	const parseTimestamp = () => {
		const timer = getTimer();
		return {
			date: dayjs(timer?.startAt).format('DD MMM YYYY'),
			time: dayjs(timer?.startAt).format('hh:mm'),
		};
	};

	const { getSeconds, stopTimer: stopContractionTimer, startTimer: startContractionTimer, resetTime, getHours, getMinutes } = useTimer();
	const { getSeconds: secondInterval, stopTimer: stopIntervalTimer, startTimer: startIntervalTimer, getHours: hourInterval, getMinutes: minuteInterval } = useTimer();

	return (
		<View style={ styles.container }>
			<View style={ [styles.contractionRow] }>
				<View style={ styles.wrapperDate }>
					<Text style={ styles.textDateAndTime }> { parseTimestamp().date } </Text>
					<Text style={ styles.textDateAndTime }> { parseTimestamp().time } </Text>
				</View>
				<Text style={ styles.textTimer }>{ `${ getHours() }:${ getMinutes() }:${ getSeconds() }` }</Text>
			</View>
			<View style={ [styles.intervalRow] }>
				<Text style={ [styles.textTimer, { color: Colors.blue.blueTimer }] }>{ `${ hourInterval() }:${ minuteInterval() }:${ secondInterval() }` }</Text>
				<View style={ [styles.wrapperDate, { marginLeft: 4, marginRight: 0 }] }>
					<Text style={ styles.textDateAndTime }> { parseTimestamp().date } </Text>
					<Text style={ styles.textDateAndTime }> { parseTimestamp().time } </Text>
				</View>
			</View>
		</View>
	);
};

export default Timer;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'space-between',
	},
	contractionRow: {
		flex: 1,
		flexDirection: 'row',
		alignItems: 'center',
	},
	intervalRow: {
		flex: 1,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'flex-end',
	},

	textDateAndTime: {
		fontSize: 8,
		fontWeight: '500',
		letterSpacing: 1,
		color: Colors.gray.darkGray,
	},
	wrapperDate: {
		marginRight: 4,
	},
	textTimer: {
		fontSize: 22,
		letterSpacing: 1,
		color: Colors.pink.default,
		fontWeight: '700',
		textAlign: 'center',
	},
});
