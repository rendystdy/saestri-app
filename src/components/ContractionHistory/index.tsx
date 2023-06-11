import React from 'react';
import { FlatList, View } from 'react-native';
import HistoryItem from './HistoryItem';
import { styles } from './style';

interface IContractionHistoryProps {
	isDelete: boolean,
	data: any;
}

const ContractionHistoryList: React.FC<IContractionHistoryProps> = ({ isDelete, data }) => {

	return (
		<FlatList
			data={ data }
			contentContainerStyle={ { paddingHorizontal: 34 } }
			nestedScrollEnabled={ true }
			ItemSeparatorComponent={ () => <View style={ { height: 16 } } /> }
			renderItem={ ({ item, index }) => (
				<HistoryItem
					id={ index }
					date={ item.date }
					contractionCount={ item.contractionCount }
					isDelete={ isDelete }
				/>
			) }
		/>
	);
};

export default ContractionHistoryList;
