import {
	ScrollView, View, TouchableOpacity, Image, EventEmitter, DeviceEventEmitter,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { Dayjs } from 'dayjs';

import { Colors, Images } from '@constant';
import { Actions } from '@store';
import { Container, Text, Header, Modal } from '@components';
import { NavigationHelper, useAppDispatch, useAppSelector } from '@helpers';

import styles from './styles';
import TimerItem from './components/TimerItem';

export interface IDataContraction {
	uid?: number,
	contractionTime: {
		start: null | Dayjs,
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
	const [visible, setVisible] = useState<boolean>(false);
	const [visibleReset, setVisibleReset] = useState<boolean>(false);

	const addTimerDispatch = useAppDispatch(Actions.timerAction.addTimer);
	const addTimerRowDispatch = useAppDispatch(Actions.timerAction.addNewTimeRow);
	const suspendTimerDispatch = useAppDispatch(Actions.timerAction.suspendTimer);
	const resetTimerDispatch = useAppDispatch(Actions.timerAction.resetTimer);
	const resumeTimerDispatch = useAppDispatch(Actions.timerAction.resumeTimer);
	const resetCounterDispatch = useAppDispatch(Actions.timerAction.resetCounter);
	const increseCounterDispatch = useAppDispatch(Actions.timerAction.increaseCounter);
	const stopTimerDispatch = useAppDispatch(Actions.timerAction.stopTimer);

	const updateTimerDispatch = useAppDispatch(Actions.timerAction.updateTimer);

	const { currentTimer, isSuspended, counter } = useAppSelector(state => state.timerReducers);

	useEffect(() => {
		DeviceEventEmitter.addListener('show-warning', () => {
			setVisible(true);
		});
		return (() => {
			suspendTimerDispatch();
		});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
	
	useEffect(() => {
		if (hasStarted && counter === 1) {
			addTimerDispatch();
		}

		if (counter % 2 === 0 && counter > 1) {
			updateTimerDispatch();
		}

		if (counter % 2 !== 0 && counter > 1 && !isSuspended) {
			addTimerRowDispatch();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [hasStarted, counter]);

	const startBtnHandler = () => {
		setStarted(true);
		increseCounterDispatch();
		if (isSuspended) {
			resumeTimerDispatch();
		}
	};

	const stopBtnHandler = () => {
		if (counter > 0) {
			stopTimerDispatch();
		}
	};

	const resetBtnHandler = () => {
		if (counter > 0 || isSuspended) {
			setStarted(false);
			resetCounterDispatch();
			resetTimerDispatch();
			setVisibleReset(false);
		}
	};
	
	const renderStartStopBtn = () => {
		const hasTimer = currentTimer.length > 0;
		if (!hasTimer) { return  <Images.img_contractionStart />; }
		if (counter % 2 === 0) { return  <Images.img_contractionStart />; }
		if (counter % 2 !== 0) { return <Images.img_contractionPause />; }
		return null;
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
				{ /* <TotalCounting /> */ }
				<View style={ [styles.row, { marginBottom: 29, justifyContent: 'space-around' }] }>
					<Text style={ styles.textTitleTimer }>Contraction</Text>
					<Text style={ [styles.textTitleTimer, { color: Colors.gray.veryDark }] }>Rest</Text>
				</View>

				<View style={ styles.timerContainer }>
					<ScrollView style={ { flex: 1 } } >
						{
							currentTimer.map((contraction, index) => <TimerItem
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
				<Image
					source={ Images.img_contractionTimer }
					style={ { width: 176, height: 211, position: 'absolute', bottom: 0, left: -15 } }
					resizeMode='contain' />
				<TouchableOpacity
					style={ { alignItems: 'flex-end', width: '70%' } }
					onPress={ startBtnHandler }>
					{ renderStartStopBtn() }
				</TouchableOpacity>
				<View style={ styles.row }>
					<TouchableOpacity
						style={ [styles.startStopBtn, { marginRight: 19 }] }
						onPress={ stopBtnHandler }>
						<Images.ic_stop
							height={ 22 }
							width={ 22 } />
						<Text style={ { fontSize: 11, color: Colors.white.default, letterSpacing: 1 } }>
							stop
						</Text>
					</TouchableOpacity>
					<TouchableOpacity
						style={ [styles.startStopBtn, { marginRight: 16 }] }
						onPress={ () => setVisibleReset(true) }>
						<Images.ic_reset
							height={ 22 }
							width={ 22 } />
						<Text style={ { fontSize: 11, color: Colors.white.default, letterSpacing: 1 } }>
							reset
						</Text>
					</TouchableOpacity>
				</View>
			</View>
			<Modal
				visible={ visible }
				onPressBack={ () => setVisible(false) }
				onPressClose={ () => setVisible(false) }
				onPressAgree={ () => setVisible(false) }
				titleAgree='tutup'
				textContent='Anda mengalami kontraksi
lebih dari 5 menit.
Segera menuju fasilitas kesehatan!' />
			<Modal
				visible={ visibleReset }
				onPressBack={ () => setVisibleReset(!visibleReset) }
				onPressClose={ () => setVisibleReset(!visibleReset) }
				onPressAgree={ resetBtnHandler }
				titleAgree='Yakin'
				titleBack='Kembali'
				textContent='Apakah anda yakin untuk melakukan
				reset counter?' />
		</Container>
	);
};

export default ContractionTimer;
