/* eslint-disable @typescript-eslint/no-explicit-any */
import { Dispatches } from '@constant';
import dayjs from 'dayjs';
import { TimerState } from 'src/interfaces/timers';

const initialState: TimerState = {
	currentTimer: [],
	loading: false,
};

type Actions = { type: string; payload: any };

const timerReducers = (
	state = initialState,
	action: Actions,
): TimerState => {
	const { type, payload } = action;
	switch (type) {
		case Dispatches.ADD_NEW_TIMER:
			return {
				...state,
				currentTimer: [
					...state.currentTimer,
					payload,
				],
			};
		case Dispatches.UPDATE_TIMER:
			const shallowTimer = [...state.currentTimer];
			const lastTimer = shallowTimer[shallowTimer.length - 1];
			lastTimer.contractionTime.end = new Date();
			lastTimer.intervalTime.start = new Date();
			lastTimer.status = 'interval';
			return {
				...state,
				currentTimer: [
					...shallowTimer,
				],
			};

		case Dispatches.ADD_ANOTHER_TIMER:
			const timers = state.currentTimer;
			const lt = timers[timers.length - 1];
			lt.isActive = false;
			return {
				...state,
				currentTimer: [
					...timers,
					payload,
				],
			};
		case Dispatches.CLEAR_CONTACT:
			return {
				...state,
			};
		case Dispatches.LOGOUT:
			return initialState;
		default:
			return state;
	}
};

export default timerReducers;
