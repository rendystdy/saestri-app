import { View } from 'react-native';
import React, { useState } from 'react';
import { Button, Container } from '@components';
import styles from './style';
import { NavigationHelper } from '@helpers';
import dayjs from 'dayjs';
import { Colors, Images } from '@constant';
import Header from '../../components/Header';
import ContractionHistoryList from '../../components/ContractionHistory';

const ContractionHistoryScreen = () => {
	const [isDelete, setIsDelete] = useState<boolean>(false);

	const [data, setData] = useState([
		{
			date: dayjs().format('DD MMM YYYY'),
			contractionCount: 2,
			id: 0,
		},
		{
			date: dayjs().subtract(1, 'D')
				.format('DD MMM YYYY'),
			contractionCount: 3,
			id: 1,
		},
		{
			date: dayjs().subtract(2, 'D')
				.format('DD MMM YYYY'),
			contractionCount: 1,
			id: 2,
		},
		{
			date: dayjs().subtract(3, 'D')
				.format('DD MMM YYYY'),
			contractionCount: 5,
			id: 3,
		},
	]);

	const handleDelete = () => {
		setIsDelete(!isDelete);
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
					data={ data }
					isDelete={ isDelete } />
			</View>
			<Images.iamge_history style={ { alignSelf: 'flex-end', position: 'absolute', bottom: 0, right: 0, zIndex: -1 } } />
			{ isDelete && (
				<Button
					backgroundColor={ Colors.blue.light }
					text='Hapus'
					buttonStyle={ { width: 232, alignSelf: 'center', borderRadius: 16, height: 44, padding: 12, position: 'absolute', bottom: 24 } }
					textStyle={ { fontSize: 24, color: Colors.white.default, fontWeight: '700', letterSpacing: 1 } }
				/>
			) }
		</Container>
	);
};

export default ContractionHistoryScreen;
