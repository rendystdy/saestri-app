/* eslint-disable @typescript-eslint/no-explicit-any */
import { Dispatches } from '@constant';
import { detectContractionWarning } from '@helpers';
import dayjs from 'dayjs';
import { TimerState } from 'src/interfaces/timers';
import { IDataContraction } from 'src/screens/ContractionTimer';

const initialState: TimerState = {
	timerHistories: [],
	currentTimer: [],
	loading: false,
	isSuspended: false,
	counter: 0,
};

type Actions = { type: string; payload: any };

const timerReducers = (
	state = initialState,
	action: Actions,
): TimerState => {
	const { type, payload } = action;
	const shallowTimer = [...state.currentTimer];
	const lastTimer = shallowTimer[state.currentTimer.length - 1];

	switch (type) {
		case Dispatches.INCREMENT_DURATION:
			const timers = shallowTimer.map(timer => {
				if (timer.uid === payload.timerId) {
					if (payload.status === 'contraction') {
						timer.contractionTime.duration = payload.value;
					} else {
						timer.intervalTime.duration = payload.value;
					}
				}
				return timer;
			});
			return {
				...state,
				currentTimer: timers,
			};
		case Dispatches.TICK_TIMER:
			const updated_timer = shallowTimer.map(timer => {
				if (timer.uid === payload.timerId) {
					if (payload.status === 'contraction') {
						timer.contractionTime.currentDate = new Date();
					} else {
						timer.intervalTime.currentDate = new Date();
					}
				}
				return timer;
			});
			return {
				...state,
				currentTimer: updated_timer,
			};
		case Dispatches.ADD_NEW_TIMER:
			return {
				...state,
				currentTimer: [
					...state.currentTimer,
					payload,
				],
			};
		case Dispatches.UPDATE_TIMER:
			lastTimer.contractionTime.end = dayjs();
			lastTimer.intervalTime.start = dayjs();
			lastTimer.status = 'interval';
			return {
				...state,
				currentTimer: [
					...shallowTimer,
				],
			};
		case Dispatches.ADD_ANOTHER_TIMER:
			lastTimer.isActive = false;
			lastTimer.intervalTime.end = dayjs();
			if (shallowTimer.length % 3 === 0) { // Entry adalah kelipatan ke 3
				detectContractionWarning(shallowTimer);
			}
			return {
				...state,
				currentTimer: [
					...shallowTimer,
					payload,
				],
			};
		case Dispatches.STOP_TIMER:
			if (lastTimer && lastTimer.status === 'contraction' && lastTimer.isActive) {
				lastTimer.contractionTime.end = dayjs();
				lastTimer.intervalTime.start = dayjs();
				lastTimer.intervalTime.end = dayjs();
			}
			if (lastTimer && lastTimer.status === 'interval' && lastTimer.isActive) {
				lastTimer.intervalTime.end = dayjs();
			}
			if (lastTimer) { lastTimer.isActive = false; }
			return {
				...state,
				counter: lastTimer.status === 'contraction' ? state.counter + 1 : state.counter,
				currentTimer: [
					...shallowTimer,
				],
			};
		case Dispatches.SUSPEND_TIMER:
			return {
				...state,
				isSuspended: shallowTimer.length > 0,
				currentTimer: [
					...shallowTimer,
				],
			};
		case Dispatches.RESET_TIMER:
			if (lastTimer && lastTimer.status === 'contraction' && lastTimer.isActive) {
				lastTimer.contractionTime.end = dayjs();
			}
			if (lastTimer && lastTimer.status === 'interval' && lastTimer.isActive) {
				lastTimer.intervalTime.end = dayjs();
			}
			if (lastTimer) { lastTimer.isActive = false; }
			return {
				...state,
				timerHistories: [...state.timerHistories,
					{
						date: dayjs(),
						entries: [...shallowTimer],
						sessions: dayjs().unix(),
					},
				],
				currentTimer: [],
			};
		case Dispatches.RESUME_TIMER:
			if (!lastTimer) {
				return {
					...state,
				};
			}
			lastTimer.isActive = true;
			return {
				...state,
				isSuspended: false,
				currentTimer: [...shallowTimer],
			};
		case Dispatches.INCREASE_COUNTER:
			if (state.counter === 0) {
				return {
					...state,
					currentTimer: [...state.currentTimer, generateInitialData()],
					counter: state.counter + 1,
				};
			}
			if (state.counter % 2 !== 0 && state.counter > 0) {

				lastTimer.contractionTime.end = dayjs();
				lastTimer.intervalTime.start = dayjs();
				lastTimer.status = 'interval';
				return {
					...state,
					currentTimer: [...shallowTimer],
					counter: state.counter + 1,
				};
			}
		
			if (state.counter % 2 === 0 && state.counter > 0) {
				lastTimer.isActive = false;
				lastTimer.intervalTime.end = dayjs();
				if (shallowTimer.length % 3 === 0) { // Entry adalah kelipatan ke 3
					detectContractionWarning(shallowTimer);
				}
				return {
					...state,
					currentTimer: [...shallowTimer, generateInitialData()],
					counter: state.counter + 1,
				};
			}

			return {
				...state,
			};
		case Dispatches.RESET_COUNTER:
			return {
				...state,
				counter: 0,
			};
		case Dispatches.REMOVE_HISTORY_ITEM:
			return {
				...state,
				timerHistories: payload,
			};
		default:
			return state;
	}
};

const generateInitialData = ():IDataContraction => ({
	contractionTime: {
		startDate: new Date(),
		currentDate: null,
		start: dayjs(),
		end: null,
		duration: 0,
	},
	intervalTime: {
		startDate: new Date(),
		currentDate: null,
		start: null,
		end: null,
		duration: 0,
	},
	uid: dayjs().unix(),
	status: 'contraction',
	timestamp: 0,
	startAt: dayjs(),
	isActive: true,
	isSuspended: false,
});

export default timerReducers;
