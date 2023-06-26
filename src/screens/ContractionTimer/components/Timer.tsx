import { AppState, DeviceEventEmitter, StyleSheet, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import dayjs, { Dayjs } from 'dayjs';

import { Text } from '@components';
import { Colors } from '@constant';
import { Actions } from '@store';
import {
	Ratio, parseDuration, parseTime, useAppDispatch, useAppSelector, useTimer,
} from '@helpers';

import { IDataContraction } from '..';

interface ITimer {
	item: IDataContraction,
}

const Timer: React.FC<ITimer> = ({ item }) => {

	const { currentTimer, isSuspended, counter  } = useAppSelector(state => state.timerReducers);
	const resumeTimerDispatch = useAppDispatch(Actions.timerAction.resumeTimer);
	const incrementDuration = useAppDispatch(Actions.timerAction.incrementDuration);

	const { setTimer: setContractionTime, getSeconds, stopTimer: stopContractionTimer, startTimer: startContractionTimer, getHours, getMinutes, duration: contractionDuration } = useTimer();
	const { setTimer: setIntervalTime, getSeconds: secondInterval, stopTimer: stopIntervalTimer, startTimer: startIntervalTimer, getHours: hourInterval, getMinutes: minuteInterval, duration: intervalDuration } = useTimer();

	useEffect(() => {
		restoreSavedTimer();
		resumeTimerDispatch();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
	useEffect(() => {
		const timer = getTimer();
		if (timer && counter % 2 !== 0 && timer.isActive) {
			incrementDuration({ timerId: item.uid, value: contractionDuration, status: 'contraction' });
		}
		if (timer && counter % 2 === 0  && timer.isActive) {
			incrementDuration({ timerId: item.uid, value: contractionDuration, status: 'interval' });
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [contractionDuration, incrementDuration, item.uid, intervalDuration, counter]);

	useEffect(() => {
		const timer = getTimer();
		if (timer && counter % 2 !== 0) {
			stopIntervalTimer();
			startContractionTimer();
		}
		if (timer && counter % 2 === 0) {
			stopContractionTimer();
			startIntervalTimer();
		}
		if (timer && !timer.isActive) {
			stopContractionTimer();
			stopIntervalTimer();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [item, counter, currentTimer]);

	const getTimer = () => {
		return currentTimer.find((search:any) => search.uid === item.uid);
	};

	const parseTimestamp = () => {
		const timer = getTimer();
		return {
			date: dayjs(timer?.startAt).format('DD MMM YYYY'),
			time: dayjs(timer?.startAt).format('HH:mm'),
		};
	};

	const restoreSavedTimer = () => {
		const timer = getTimer();
		if (timer) {
			setContractionTime(parseDuration(timer.contractionTime.start, !timer.contractionTime.end && timer.status === 'contraction' ? dayjs() : timer.contractionTime.end));
			setIntervalTime(parseDuration(timer.intervalTime.start,  !timer.intervalTime.end && timer.status === 'interval' ? dayjs() : timer.intervalTime.end));
		}
	};

	const getSumDuration = () => {
		const timer = getTimer();
		if (timer && timer.contractionTime.end && timer.intervalTime.end) {
			const contractionDur = parseDuration(timer.contractionTime.start, timer.contractionTime.end);
			const intervalDur = parseDuration(timer.intervalTime.start, timer.intervalTime.end);
			return parseTime(contractionDur + intervalDur);
		}
		return '--:--:--';
	};

	return (
		<View style={ styles.container }>
			<View style={ [styles.contractionRow] }>
				<View style={ styles.col }>
					<View style={ styles.wrapperDate }>
						<Text style={ styles.textDateAndTime }> { parseTimestamp().date } </Text>
						<Text style={ styles.textDateAndTime }> { parseTimestamp().time } </Text>
					</View>
					<Text style={ styles.textTimer }>{ `${ getHours() }:${ getMinutes() }:${ getSeconds() }` }</Text>
				</View>
				<View style={ [styles.col, { justifyContent: 'flex-end' }] }>
					<View style={ styles.wrapperDate }>
						<Text style={ styles.textDateAndTime }> Rest </Text>
					</View>
					<Text style={ [styles.textTimer, { color: Colors.blue.blueTimer }] }>{ `${ hourInterval() }:${ minuteInterval() }:${ secondInterval() }` }</Text>
	
				</View>
			</View>
			<View style={ [styles.intervalRow] }>
				<View style={ styles.wrapperDate }>
					<Text style={ styles.textDateAndTime }> Interval </Text>
				</View>
				<Text style={ [styles.textTimer, { color: Colors.gray.veryDark }] }>{ getSumDuration() }</Text>
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
	col: {
		flex: 1,
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'flex-start',
	},
	intervalRow: {
		flex: 1,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'flex-end',
	},
	textDateAndTime: {
		fontSize: Ratio.isTablet ? 12 : 8,
		fontWeight: '500',
		letterSpacing: 1,
		color: Colors.gray.darkGray,
	},
	wrapperDate: {
		marginRight: 4,
	},
	textTimer: {
		fontSize: Ratio.isTablet ? 34 : 22,
		letterSpacing: 1,
		color: Colors.pink.default,
		fontWeight: '700',
		textAlign: 'center',
	},
});
