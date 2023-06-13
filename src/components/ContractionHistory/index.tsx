import React from 'react';
import { FlatList, View } from 'react-native';
import HistoryItem from './HistoryItem';
import { styles } from './style';
import { IDataContraction } from 'src/screens/ContractionTimer';
import { ITimerLog } from 'src/interfaces/timers';

interface IContractionHistoryProps {
	isDelete: boolean,
	data: ITimerLog[];
	onPressChecked: (id: number, isChecked: boolean) => void;
}

const ContractionHistoryList: React.FC<IContractionHistoryProps> = ({ isDelete, data, onPressChecked }) => {

	return (
		<FlatList
			data={ data }
			contentContainerStyle={ { paddingHorizontal: 34 } }
			nestedScrollEnabled={ true }
			keyExtractor={ (_, i) => i.toString() }
			ItemSeparatorComponent={ () => <View style={ { height: 16 } } /> }
			renderItem={ ({ item, index }) => {
				return (
					<HistoryItem
						id={ index }
						date={ item.date.toString() }
						details={ item.entries }
						contractionCount={ item.entries.length }
						sessions={ item.sessions }
						isDelete={ isDelete }
						onPressChecked={ onPressChecked }
					/>
				);
			} }
		/>
	);
};

export default ContractionHistoryList;
