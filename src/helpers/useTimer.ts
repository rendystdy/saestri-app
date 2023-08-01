import React, { useState, useEffect } from 'react';
import { padLeft } from './numbers';
import BackgroundTimer from 'react-native-background-timer';

const useTimer = () => {
	const [time, setTime] = useState(0);
	const [isRunning, setIsRunning] = useState(false);

	useEffect(() => {
		let intervalId: any;

		if (isRunning) {
			intervalId = BackgroundTimer.setTimeout(() => {
				setTime(time + 1);
			}, 1000);
		} else {
			BackgroundTimer.clearTimeout(intervalId);
		}
  
		return () => {
			BackgroundTimer.clearTimeout(intervalId);
		};

	}, [time, isRunning]);

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
