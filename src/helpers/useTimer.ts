import React, { useState, useEffect } from 'react';
import { padLeft } from './numbers';
import BackgroundTimer from 'react-native-background-timer';

import { useTimer as usePrecisionTimer } from 'react-use-precision-timer';

const useTimer = () => {
	const [time, setTime] = useState(0);
	const [isRunning, setIsRunning] = useState(false);

	const timer = usePrecisionTimer({ delay: 1000 }, cb => {
		tickTime();
	});
	
	useEffect(() => {
		if (isRunning) {
			timer.start();
		} else {
			timer.stop();
		}
	}, [time, isRunning, timer]);

	const tickTime = () => {
		const elapsed = timer.getElapsedRunningTime();
		const second = Math.floor((elapsed / 1000) % 60);
		setTime(time + second);
	};

	const getHours = () => {
		return padLeft(Math.floor(time / 3600), 2);
	};

	const getMinutes = () => {
		return padLeft(Math.floor((time % 3600) / 60), 2);
	};

	const getSeconds = () => {
		return padLeft(Math.floor(time % 60), 2);
	};

	const startTimer = () => {
		setIsRunning(true);
	};

	const stopTimer = () => {
		setIsRunning(false);
	};

	const resetTime = () => {
		setTime(0);
	};

	const setTimer = (value: number) => {
		setTime(value);
	};

	return {
		startTimer,
		stopTimer,
		getHours,
		getMinutes,
		getSeconds,
		resetTime,
		setTimer,
		duration: time,
	};
  
};

export { useTimer };
