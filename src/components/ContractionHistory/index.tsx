import React from 'react';
import dayjs from 'dayjs';
import { FlatList } from 'react-native';
import HistoryItem from './HistoryItem';

const DATA = [
	{
		date: dayjs().format('DD MMM YYYY'),
		contractionCount: 2,
	},
	{
		date: dayjs().subtract(1, 'D')
			.format('DD MMM YYYY'),
		contractionCount: 3,
	},
	{
		date: dayjs().subtract(2, 'D')
			.format('DD MMM YYYY'),
		contractionCount: 1,
	},
	{
		date: dayjs().subtract(3, 'D')
			.format('DD MMM YYYY'),
		contractionCount: 5,
	},
	{
		date: dayjs().subtract(4, 'D')
			.format('DD MMM YYYY'),
		contractionCount: 6,
	},
	{
		date: dayjs().subtract(5, 'D')
			.format('DD MMM YYYY'),
		contractionCount: 7,
	},
];
const ContractionHistoryList:React.FC = () => {

	return (
		<FlatList
			data={ DATA }
			renderItem={ ({ item, index }) => <HistoryItem
				id={ index }
				date={ item.date }
				contractionCount={ item.contractionCount } /> }
		/>
	);
};

export default ContractionHistoryList;
