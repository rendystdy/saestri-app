import { ScrollView, View, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';

import styles from './styles';
import { Container, Header, Text } from '@components';
import { NavigationHelper, useAppDispatch, useAppSelector } from '@helpers';
import TotalCounting from './components/TotalCounting';
import { Colors, Images } from '@constant';
import TimerItem from './components/TimerItem';
import dayjs, { Dayjs } from 'dayjs';
import { Actions } from '@store';

export interface IDataContraction {
	uid?: number,
  contractionTime: {
		start: Dayjs | null| Date,
		end: Dayjs | null | Date
	},
  intervalTime: {
		start: Dayjs | null| Date,
		end: Dayjs | null| Date
	},
	startAt: Dayjs,
  timestamp: number,
  status: ITimerStatus,
	isActive:boolean
}

export type ITimerStatus = 'contraction' | 'interval' | 'finished'

const availableTimerStatus:ITimerStatus[] = ['contraction', 'interval'];

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
	const [counter, setCounter] = useState<number>(0);

	const addTimerDispatch = useAppDispatch(Actions.timerAction.addTimer);
	const addTimerRowDispatch = useAppDispatch(Actions.timerAction.addNewTimeRow);

	const updateTimerDispatch = useAppDispatch(Actions.timerAction.updateTimer);
	const { currentTimer } = useAppSelector(state => state.timerReducers);

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

	const startBtnHandler = () => {
		setStarted(true);
		toggleTimerStatus();
		setCounter(counter + 1);
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

	return (
		<Container
			noPadding
			noScroll>
			<Header
				title='Contraction Timer'
				isBack
				icon='history'
				onPressLeft={ () => NavigationHelper.pop(1) }
				onPressRight={ () => NavigationHelper.pop(1) }
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
						<Images.dotted/>
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
			</View>
		</Container>
	);
};

export default ContractionTimer;
