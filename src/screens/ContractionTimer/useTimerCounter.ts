import React, { useState } from 'react';

const useTimerCounter = () => {
	const [counter, setCounter] = useState<number>(0);
  
	const increaseCounter = () => {
		setCounter(counter + 1);
	};

	return {
		counter,
		increaseCounter,
	};
};
export default useTimerCounter;
