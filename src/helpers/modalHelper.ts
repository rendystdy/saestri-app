import { IDataContraction } from 'src/screens/ContractionTimer';
import { parseDuration } from './parseDuration';
import { DeviceEventEmitter } from 'react-native';

export const detectContractionWarning = (entries: IDataContraction[]) => {
	const lastSets = entries.slice(-3);
	const durations = lastSets.flatMap(cycle => {
		const contractionDuration = parseDuration(cycle.contractionTime.start, cycle.contractionTime.end);
		const intervalDuration = parseDuration(cycle.intervalTime.start, cycle.intervalTime.end);
		return [contractionDuration, intervalDuration];
	});
	const average = getAverage(durations);
  
	// check apakah rata rata durasi dari ketiga cycle kurang dari sama dengan 5 menit
	if (average <= 300) {
		DeviceEventEmitter.emit('show-warning');
	}
};

const getAverage = (values: number[]) => {
	const sum = values.reduce((prev, curr) => prev + curr, 0);
	return (sum / values.length) || 0;
};
