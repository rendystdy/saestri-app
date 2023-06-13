import { View } from 'react-native';
import React, { useState } from 'react';
import { Button, Container } from '@components';
import styles from './style';
import { NavigationHelper, useAppDispatch, useAppSelector } from '@helpers';
import { Colors, Images } from '@constant';
import Header from '../../components/Header';
import ContractionHistoryList from '../../components/ContractionHistory';
import { Actions } from '@store';

const ContractionHistoryScreen = () => {
	const [isDelete, setIsDelete] = useState<boolean>(false);
	const timerHistories = useAppSelector(state => state.timerReducers.timerHistories);
	const removeHistoryItemDispatch = useAppDispatch(Actions.timerAction.removeHistoryItem);
	const [removeArray, setRemoveArray] = useState([]);

	const handleDelete = () => {
		setIsDelete(!isDelete);
	};

	const handleRemoveItem = () => {
		const result = timerHistories.filter(item => {
			return !removeArray.includes(item.sessions);
		});
		removeHistoryItemDispatch(result);

	};

	const onPressChecked = (id: number, isChecked: boolean) => {
		if (!removeArray.includes(id) && isChecked) {
			removeArray.push(id);
		} else if (removeArray.includes(id) && !isChecked) {
			const removeItem = removeArray.filter(item => item !== id);
			setRemoveArray(removeItem);

		}
	};

	return (
		<Container
			noScroll
			noPadding
			contentContainerStyle={ styles.container }>
			<Header
				title='Contraction History'
				onPressLeft={ () => NavigationHelper.pop(1) }
				onPressRight={ handleDelete }
				icon='delete'
				isBack
				color={ Colors.gray.light }
			/>
			<View style={ { height: 360, marginTop: 75, marginBottom: 34 } }>
				<ContractionHistoryList
					data={ timerHistories }
					onPressChecked={ onPressChecked }
					isDelete={ isDelete }
				/>
			</View>
			<Images.iamge_history style={ { alignSelf: 'flex-end', position: 'absolute', bottom: 0, right: 0, zIndex: -1 } } />
			{ isDelete && (
				<Button
					backgroundColor={ Colors.blue.light }
					text='Hapus'
					onPress={ handleRemoveItem }
					buttonStyle={ { width: 232, alignSelf: 'center', borderRadius: 16, height: 44, padding: 12, position: 'absolute', bottom: 24 } }
					textStyle={ { fontSize: 24, color: Colors.white.default, fontWeight: '700', letterSpacing: 1 } }
				/>
			) }
		</Container>
	);
};

export default ContractionHistoryScreen;
