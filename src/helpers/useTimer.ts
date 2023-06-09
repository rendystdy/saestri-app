import React, { useState, useEffect } from 'react';

interface UseTimerProps {
  onToggle: (index: number) => void,
}

const useTimer = ({ onToggle }: UseTimerProps) => {
	const [time, setTime] = useState(0);
	const [isRunning, setIsRunning] = useState(false);

	useEffect(() => {
		let intervalId: any;

		if (isRunning) {
			intervalId = setInterval(() => {
				setTime(time + 1);
			}, 100);
		}
  
		return () => {
			clearInterval(intervalId);
		};

	}, [time, isRunning]);

	const getHours = () => {
		return Math.floor(time / 36000);
	};
	const getMinutes = () => {
		return Math.floor((time % 36000) / 600);
	};
	const getSeconds = () => {
		return Math.floor((time % 600) / 10);
	};

	const toggleStart = (index: number) => {
		onToggle(index);
		setIsRunning(!isRunning);
	};

	const resetTime = () => {
		setTime(0);
	};

	return {
		toggleStart,
		getHours,
		getMinutes,
		getSeconds,
		resetTime,
	};
  
};

export { useTimer };
