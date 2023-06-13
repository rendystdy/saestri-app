import dayjs, { Dayjs } from 'dayjs';
import { padLeft } from './numbers';

const parseDuration = (startTime?: Dayjs|null, endTime?:Dayjs|null) => {
	if (!endTime) { return 0; }
	return Math.abs(dayjs(startTime).diff(dayjs(endTime), 's'));
};

const parseTime = (seconds: number) => {
	const parseSeconds = padLeft(Math.floor(seconds % 60), 2);
	const parseMinutes = padLeft(Math.floor((seconds % 3600) / 60), 2);
	const parseHours = padLeft(Math.floor(seconds / 3600), 2);

	return `${parseHours}:${parseMinutes}:${parseSeconds}`;
};

export { parseDuration, parseTime };
