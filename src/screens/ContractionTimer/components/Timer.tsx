import {
	AppState, AppStateStatus, DeviceEventEmitter, StyleSheet, View,
} from 'react-native';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import dayjs, { Dayjs } from 'dayjs';

import { Text } from '@components';
import { Colors } from '@constant';
import { Actions } from '@store';
import {
	Ratio, padLeft, parseDuration, parseTime, useAppDispatch, useAppSelector,
} from '@helpers';

import { IDataContraction } from '..';
import AsyncStorage from '@react-native-community/async-storage';
import { NativeModules } from 'react-native';

interface ITimer {
	item: IDataContraction,
}

const Timer: React.FC<ITimer> = ({ item }) => {

	const appState = useRef(AppState.currentState);
	const [appStateNow, setAppState] = useState<AppStateStatus>(appState.current);
	const { currentTimer, isSuspended, counter } = useAppSelector(state => state.timerReducers);
	const tickRedux = useAppDispatch(Actions.timerAction.tickTimer);

	const _handleAppStateChange = useCallback((nextAppState:AppStateStatus) => {
		setAppState(nextAppState);
	}, []);

	useEffect(() => {
		restoreSavedTimer();
		AsyncStorage.setItem('last-timer', '');

	}, []);
	
	useEffect(() => {
		const subscription = AppState.addEventListener('change', _handleAppStateChange);

		return () => {
			subscription.remove();
		};
	}, [_handleAppStateChange]);

	useEffect(() => {
		if (appStateNow === 'background') {
			AsyncStorage.setItem('last-timer', `${Date.now()}`);
		} else {
		
		}
		
	}, [appStateNow]);

	useEffect(() => {
		DeviceEventEmitter.addListener('tick', ({ timerId, isContraction }) => {
			if (isContraction) {
				tickRedux({ timerId: timerId, value: 0, status: 'contraction' });
			} else {
				tickRedux({ timerId: timerId, value: 0, status: 'interval' });
			}
		});
	}, []);

	useEffect(() => {
		const timer = getTimer();
		if (timer && counter % 2 !== 0 && timer.isActive) {
			DeviceEventEmitter.emit('set_timer_id', { id: timer.uid, isContraction: true });
		}
		if (timer && counter % 2 === 0 && timer.isActive) {
			DeviceEventEmitter.emit('set_timer_id', { id: timer.uid, isContraction: false });
		}
	}, [counter]);
	
	const getTimer = () => {
		return currentTimer.find((search: any) => search.uid === item.uid);
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
			// setContractionTime(parseDuration(timer.contractionTime.start, !timer.contractionTime.end && timer.status === 'contraction' ? dayjs() : timer.contractionTime.end));
			// setIntervalTime(parseDuration(timer.intervalTime.start, !timer.intervalTime.end && timer.status === 'interval' ? dayjs() : timer.intervalTime.end));
		}
	};

	const getSumDuration = () => {
		const timer = getTimer();
		if (timer && timer.contractionTime.end && timer.intervalTime.end) {
			const contractionDur = dayjs(timer.contractionTime.end).diff(timer.contractionTime.start, 's');
			const intervalDur = dayjs(timer.intervalTime.end).diff(timer.intervalTime.start, 's');
			return parseTime(contractionDur + intervalDur);
		}
		return '--:--:--';
	};

	const formatDate = (date: Dayjs| Date | null, endDate:Dayjs|null) => {
		
		if (date && !endDate) {
			const elapsed = dayjs().diff(date, 's');
			return formatSeconds(elapsed);
		}
		if (date && endDate) {
			const elapsed = dayjs(endDate).diff(date, 's');
			return formatSeconds(elapsed);
		}
		return '00:00:00';
	};

	const formatSeconds = (elapsedSeconds: number) => {
		const hours = padLeft(Math.floor(elapsedSeconds / 3600), 2);
		const minutes = padLeft(Math.floor((elapsedSeconds % 3600) / 60), 2);
		const seconds = padLeft(Math.floor(elapsedSeconds % 60), 2);
		return `${hours}:${minutes}:${seconds}`;
	};

	return (
		<View style={ styles.container }>
			<View style={ [styles.contractionRow] }>
				<View style={ styles.col }>
					<View style={ [styles.wrapperDate, { width: 60 }] }>
						<Text
							style={ styles.textDateAndTime }
							numberOfLines={ 1 }> { parseTimestamp().date } </Text>
						<Text
							style={ styles.textDateAndTime }
							numberOfLines={ 1 }> { parseTimestamp().time } </Text>
					</View>
					<Text
						style={ [styles.textTimer, { width: 120, textAlign: 'left' }] }
						numberOfLines={ 1 }>{ formatDate(item.contractionTime.start, item.contractionTime.end) }</Text>
				</View>
				<View style={ [styles.col, { justifyContent: 'flex-end' }] }>
					<View style={ styles.wrapperDate }>
						<Text style={ styles.textDateAndTime }> Rest </Text>
					</View>
					<Text style={ [styles.textTimer, { color: Colors.blue.blueTimer }] }>{  formatDate(item.intervalTime.start, item.intervalTime.end) }</Text>

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
		// marginRight: 4,
	},
	textTimer: {
		fontSize: Ratio.isTablet ? 34 : 22,
		letterSpacing: 1,
		color: Colors.pink.default,
		fontWeight: '700',
		textAlign: 'center',
	},
});
