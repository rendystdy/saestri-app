import { ScrollView, View, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import dayjs, { Dayjs } from 'dayjs';

import { Colors, Images } from '@constant';
import { Actions } from '@store';
import { Container, Text, Header } from '@components';
import { NavigationHelper, useAppDispatch, useAppSelector } from '@helpers';

import styles from './styles';
import TotalCounting from './components/TotalCounting';
import TimerItem from './components/TimerItem';

export interface IDataContraction {
	uid?: number,
	contractionTime: {
		start:null | Dayjs,
		end: null | Dayjs;
	},
	intervalTime: {
		start: null | Dayjs,
		end: null | Dayjs;
	},
	startAt: Dayjs,
	timestamp: number,
	status: ITimerStatus,
	isActive: boolean;
	isSuspended: boolean;
}

export type ITimerStatus = 'contraction' | 'interval' | 'finished';

const availableTimerStatus: ITimerStatus[] = ['contraction', 'interval'];

// ANOTHER APPROACH
/*
	we log each event into individual data then we can restructure in ui this is
	should be easier since we avoid using unneccesary flag or statuses i guess ?
	contractions [
		{type: contraction, timestamp: 10231, duration: 2031024},
		{type: interval, timestamp: 10231, duration: 2031024},
		{type: contraction, timestamp: 10231, duration: 2031024},
		{type: interval, timestamp: 10231, duration: 2031024},
		{type: contraction, timestamp: 10231, duration: 2031024},
		{type: interval, timestamp: 10231, duration: 2031024},
	]
*/

const ContractionTimer = () => {
	const [hasStarted, setStarted] = useState<boolean>(false);
	const [currentTimerStatus, setTimerStatus] = useState<ITimerStatus>();

	const addTimerDispatch = useAppDispatch(Actions.timerAction.addTimer);
	const addTimerRowDispatch = useAppDispatch(Actions.timerAction.addNewTimeRow);
	const suspendTimerDispatch = useAppDispatch(Actions.timerAction.suspendTimer);
	const resetTimerDispatch = useAppDispatch(Actions.timerAction.resetTimer);
	const resumeTimerDispatch = useAppDispatch(Actions.timerAction.resumeTimer);
	const resetCounterDispatch = useAppDispatch(Actions.timerAction.resetCounter);
	const increseCounterDispatch = useAppDispatch(Actions.timerAction.increaseCounter);

	const updateTimerDispatch = useAppDispatch(Actions.timerAction.updateTimer);

	const { currentTimer, isSuspended, counter } = useAppSelector(state => state.timerReducers);

	useEffect(() => {
		getLastTimerStatus();
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		if (currentTimerStatus === 'contraction' && hasStarted && counter === 1) {
			addTimerDispatch();
		}

		if (currentTimerStatus === 'interval' && hasStarted) {
			updateTimerDispatch();
		}

		if (currentTimerStatus === 'contraction' && hasStarted && counter % 2 > 0 && counter > 1) {
			addTimerRowDispatch();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [currentTimerStatus, hasStarted, counter]);

	const getLastTimerStatus = () => {
		if (currentTimer.length > 0) {
			const lastTimer = currentTimer[currentTimer.length - 1];
			setTimerStatus(lastTimer.status);
		} else {
			resetCounterDispatch();
		}
	};

	console.log(currentTimerStatus, counter);

	const startBtnHandler = () => {
		setStarted(true);
		toggleTimerStatus();
		increseCounterDispatch();
		if (isSuspended) {
			resumeTimerDispatch();
		}
	};

	const toggleTimerStatus = () => {
		if (!currentTimerStatus) {
			setTimerStatus('contraction');
			return;
		}
		let pointer = availableTimerStatus.indexOf(currentTimerStatus ?? 'contraction');
		// increment the counter but dont let exceed the max index
		pointer = ++pointer % availableTimerStatus.length;
		setTimerStatus(availableTimerStatus[pointer]);
	};

	const stopBtnHandler = () => {
		suspendTimerDispatch();
	};

	const resetBtnHandler = () => {
		if (hasStarted) {
			setStarted(false);
			setTimerStatus(undefined);
			resetCounterDispatch();
			resetTimerDispatch();
		}
	};

	return (
		<Container
			noPadding
			noScroll>
			<Header
				title='Contraction Timer'
				isBack
				icon='history'
				onPressLeft={ () => NavigationHelper.pop(1) }
				onPressRight={ () => NavigationHelper.push('ContractionHistory') }
			/>
			<View style={ styles.container }>
				<TotalCounting />
				<View style={ [styles.row, { marginBottom: 29, justifyContent: 'space-around' }] }>
					<Text style={ styles.textTitleTimer }>Contraction</Text>
					<Text style={ [styles.textTitleTimer, { color: Colors.gray.veryDark }] }>Interval</Text>
				</View>

				<View style={ styles.timerContainer }>
					<ScrollView style={ { flex: 1 } } >
						{
							currentTimer.map((contraction, index) => <TimerItem
								timerStatus={ currentTimerStatus }
								item={ contraction }
								count={ index + 1 }
								key={ index }
							/>)
						}
					</ScrollView>
					<View style={ styles.dottedLine }>
						<Images.dotted />
					</View>
				</View>
			</View>
			<View style={ styles.footer }>
				<TouchableOpacity
					style={ styles.startStopBtn }
					onPress={ startBtnHandler }>
					<Text style={ { fontSize: 14 } }>
						{
							!hasStarted && 'Start'
						}
						{
							hasStarted && 'Pause'
						}
					</Text>
				</TouchableOpacity>
				<TouchableOpacity
					style={ styles.startStopBtn }
					onPress={ stopBtnHandler }>
					<Text style={ { fontSize: 14 } }>
						stop
					</Text>
				</TouchableOpacity>
				<TouchableOpacity
					style={ styles.startStopBtn }
					onPress={ resetBtnHandler }>
					<Text style={ { fontSize: 14 } }>
						reset
					</Text>
				</TouchableOpacity>
			</View>
		</Container>
	);
};

export default ContractionTimer;
