import React, { useState } from 'react';
import { TouchableOpacity, View } from 'react-native';
import Collapsible from 'react-native-collapsible';

import CheckBox from '@react-native-community/checkbox';
import { styles } from './style';
import HistoryItemDetails from './HistoryItemDetails';
import { Text } from '@components';
import dayjs, { Dayjs } from 'dayjs';
import { IDataContraction } from 'src/screens/ContractionTimer';

type ItemProps = {
	id: any,
	date: string,
	contractionCount: number,
	isDelete: boolean,
	details: IDataContraction[];
	onPressChecked: (id: number, isChecked: boolean) => void;
	sessions: number;
};

const HistoryItem: React.FC<ItemProps> = ({
	contractionCount,
	date,
	isDelete,
	details,
	onPressChecked,
	sessions,
}) => {

	const [isChecked, setChecked] = useState<boolean>(false);
	const [isCollapse, setCollapse] = useState<boolean>(true);

	const getTimeRange = () => {
		const startDate = details[0].startAt.format('HH:mm:ss');
		const endDate = details[details.length - 1].startAt.format('HH:mm:ss');
		return `${dayjs(date).format('DD MMM YYYY')} ${startDate} - ${endDate}`;
	};

	return (
		<View>
			<TouchableOpacity
				onPress={ () => setCollapse(!isCollapse) }
				style={ styles.container }>
				<View style={ styles.item }>
					<View style={ [styles.itemCheckbox, { opacity: isDelete ? 1 : 0 }] }>
						<CheckBox
							disabled={ !isDelete }
							value={ isChecked }
							onValueChange={ value => {
								setChecked(value);
								onPressChecked(sessions, value);
							} } />
					</View>
					<View>
						<Text style={ styles.dateText }>{ getTimeRange() }</Text>
						<Text style={ styles.contractionCountText }>Total : { contractionCount } Cycles</Text>
					</View>
				</View>

			</TouchableOpacity>
			<Collapsible collapsed={ isCollapse }>
				{ details.map((item, index: number) => (
					<HistoryItemDetails
						key={ index }
						index={ index }
						detail={ item } />
				)) }
			</Collapsible>
		</View>
	);
};

export default HistoryItem;
