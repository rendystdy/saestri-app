import {
	ScrollView, View, TouchableOpacity, Image, EventEmitter, DeviceEventEmitter, BackHandler, Platform,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { Dayjs } from 'dayjs';
import { useKeepAwake } from '@sayem314/react-native-keep-awake';

import { Colors, Images } from '@constant';
import { Actions } from '@store';
import { Container, Text, Header, Modal } from '@components';
import { NavigationHelper, useAppDispatch, useAppSelector } from '@helpers';

import styles from './styles';
import TimerItem from './components/TimerItem';
import DashedLine from 'react-native-dashed-line';

export interface IDataContraction {
	uid: number,
	contractionTime: {
		start: null | Dayjs,
		end: null | Dayjs;
		duration: number,
	},
	intervalTime: {
		start: null | Dayjs,
		end: null | Dayjs;
		duration: number,
	},
	startAt: Dayjs,
	timestamp: number,
	status: ITimerStatus,
	isActive: boolean;
	isSuspended: boolean;
}

export type ITimerStatus = 'contraction' | 'interval' | 'finished';

const availableTimerStatus: ITimerStatus[] = ['contraction', 'interval'];

export type ModalType = 'actual_contraction' | 'prepare_hospitalization' | 'false_contraction';

const modalContent = {
	actual_contraction: 'Actual Contraction !.\n\n Labor is imminent. Call your  provider/clinic/hospital and get ready to leave.',
	prepare_hospitalization: 'Prepare for hospitalization.',
	false_contraction: 'False Contraction !.\n\n Try to take a short break or change your position.',
};

const ContractionTimer = ({ props, route }: any) => {
	useKeepAwake();
	const [hasStarted, setStarted] = useState<boolean>(false);
	const [visible, setVisible] = useState<boolean>(false);
	const [visibleReset, setVisibleReset] = useState<boolean>(false);
	const [visibleStop, setVisibleStop] = useState<boolean>(false);
	const [isStop, setIsStop] = useState(false);
	const [modalType, setModalType] = useState<ModalType>();

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
		DeviceEventEmitter.addListener('show-warning', (type: ModalType) => {
			setVisible(true);
			setModalType(type);
		});

		const backHandler = BackHandler.addEventListener(
			'hardwareBackPress',
			backAction,
		);

		return (() => {
			backHandler.remove();
			suspendTimerDispatch();
		});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		if (hasStarted && counter === 1) {
			addTimerDispatch();
		}

		if (counter % 2 === 0 && counter > 1 && hasStarted) {
			updateTimerDispatch();
		}

		if (counter % 2 !== 0 && counter > 1 && !isSuspended) {
			addTimerRowDispatch();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [hasStarted, counter]);

	const backAction = () => {
		if (route.name === 'ContractionTimer') {

			NavigationHelper.replace('Home');
			return true;
		}
		return true;
	};

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
			setIsStop(true);
		}
		setVisibleStop(false);
	};

	const resetBtnHandler = () => {
		if (counter > 0 || isSuspended) {
			setStarted(false);
			resetCounterDispatch();
			resetTimerDispatch();
		}
		setVisibleReset(false);
	};

	const renderStartStopBtn = () => {
		const hasTimer = currentTimer.length > 0;
		if (!hasTimer) { return <Images.img_contractionStart />; }
		if (counter % 2 === 0) { return <Images.img_contractionStart />; }
		if (counter % 2 !== 0) { return <Images.img_contractionPause />; }
		return null;
	};

	const renderModalContent = () => {
		if (modalType) { return modalContent[modalType]; }
		return '';
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
					<DashedLine
						dashLength={ 4 }
						dashThickness={ 3 }
						dashGap={ 5 }
						dashColor={ Colors.gray.darkGray }
						axis='vertical'
						style={ styles.dottedLine }
					/>
					{ /* <View style={ styles.dottedLine } /> */ }
				</View>
			</View>
			<View style={ styles.footer }>
				<Image
					source={ Images.img_pregnant }
					style={ { width: 176, height: 211, position: 'absolute', bottom: 0, left: -15, zIndex: -1 } }
					resizeMode='contain' />
				<View style={ { flex: 1 } } />
				<TouchableOpacity
					style={ { alignItems: 'flex-end' } }
					onPress={ startBtnHandler }>
					{ renderStartStopBtn() }
				</TouchableOpacity>
				<View style={ [styles.row, { flex: 1 }] }>
					<TouchableOpacity
						style={ [styles.startStopBtn, { marginRight: 19 }] }
						onPress={ () => setVisibleStop(true) }>
						<Images.ic_stop
							height={ 32 }
							width={ 32 } />
					</TouchableOpacity>
					<TouchableOpacity
						style={ [styles.startStopBtn, { marginRight: 16 }] }
						onPress={ () => setVisibleReset(true) }>
						<Images.ic_reset
							height={ 32 }
							width={ 32 } />
					</TouchableOpacity>
				</View>
			</View>
			<Modal
				visible={ visible }
				onPressBack={ () => setVisible(false) }
				onPressClose={ () => setVisible(false) }
				onPressAgree={ () => setVisible(false) }
				titleAgree='close'
				textContent={ renderModalContent() }
			/>
			<Modal
				visible={ visibleReset }
				onPressBack={ () => setVisibleReset(!visibleReset) }
				onPressClose={ () => setVisibleReset(!visibleReset) }
				onPressAgree={ resetBtnHandler }
				titleAgree='Ok'
				titleBack='Cancel'
				textContent='Are you sure you want to reset the counter ?'
			/>
			<Modal
				visible={ visibleStop }
				onPressBack={ () => setVisibleStop(!visibleStop) }
				onPressClose={ () => setVisibleStop(!visibleStop) }
				onPressAgree={ stopBtnHandler }
				titleAgree='Ok'
				titleBack='Cancel'
				textContent='Are you sure want to stop counter?'
			/>
		</Container>
	);
};

export default ContractionTimer;
