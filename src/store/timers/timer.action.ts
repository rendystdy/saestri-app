import { Dispatch } from 'redux';

import { Dispatches } from '@constant';
import { IDataContraction } from 'src/screens/ContractionTimer';
import dayjs from 'dayjs';

export const generateInitialData = ():IDataContraction => ({
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

export default {
	addTimer: () => (dispatch: Dispatch) => {
		dispatch({
			type: Dispatches.ADD_NEW_TIMER,
			payload: generateInitialData(),
		});
	},
	updateTimer: (timerId: number) => (dispatch: Dispatch) => {
		dispatch({
			type: Dispatches.UPDATE_TIMER,
			payload: timerId,
		});
	},
	addNewTimeRow: () => (dispatch:Dispatch) => {
		dispatch({
			type: Dispatches.ADD_ANOTHER_TIMER,
			payload: generateInitialData(),
		});
	},
	suspendTimer: () => (dispatch:Dispatch) => {
		dispatch({ type: Dispatches.SUSPEND_TIMER });
	},
	stopTimer: () => (dispatch: Dispatch) => {
		dispatch({ type: Dispatches.STOP_TIMER });
	},
	resetTimer: () => (dispatch:Dispatch) => {
		dispatch({ type: Dispatches.RESET_TIMER });
	},
	resumeTimer: () => (dispatch:Dispatch) => {
		dispatch({ type: Dispatches.RESUME_TIMER });
	},
	increaseCounter: () => (dispatch:Dispatch) => {
		dispatch({ type: Dispatches.INCREASE_COUNTER });
	},
	resetCounter: () => (dispatch:Dispatch) => {
		dispatch({ type: Dispatches.RESET_COUNTER });
	},

	removeHistoryItem: (payload: any) => (dispatch:Dispatch) => {
		dispatch({ type: Dispatches.REMOVE_HISTORY_ITEM, payload });
	},
	incrementDuration: ({ timerId, value, status }:{timerId: string, value:number, status:string}) => (dispatch: Dispatch) => {
		dispatch({ type: Dispatches.INCREMENT_DURATION, payload: { timerId, value, status } });
	},
	tickTimer: ({ timerId, value, status }:{timerId: string, value:number, status:string}) => (dispatch: Dispatch) => {
		dispatch({ type: Dispatches.TICK_TIMER, payload: { timerId, value, status } });
	},
};
