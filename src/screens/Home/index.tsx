import {
	Alert, BackHandler, Image, Linking, View,
} from 'react-native';
import React, { useEffect } from 'react';
import { Images } from '@constant';

import { Container, Text, ButtonLarge } from '@components';
import { Colors } from '@constant';
import styles from './style';
import dayjs from 'dayjs';
import { NavigationHelper, Ratio } from '@helpers';

const days = dayjs();

const dates = [
	{
		date: days.subtract(2, 'day')
			.date(),
		color: Colors.blue.light,
		size: Ratio.isTablet ? 68 : 48,
		opacity: 0.7,
		monthYears: dayjs().format('MMM YYYY'),
	},
	{
		date: days.subtract(1, 'day')
			.date(),
		color: Colors.pink.default,
		size: Ratio.isTablet ? 78 : 58,
		opacity: 0.9,
		monthYears: dayjs().format('MMM YYYY'),
	},
	{
		date: days.date(),
		color: Colors.blue.light,
		size: Ratio.isTablet ? 98 : 78,
		opacity: 1,
		monthYears: dayjs().format('MMM YYYY'),
	},
	{
		date: days.add(1, 'day')
			.date(),
		color: Colors.pink.default,
		size: Ratio.isTablet ? 78 : 58,
		opacity: 0.9,
		monthYears: dayjs().format('MMM YYYY'),
	},
	{
		date: days.add(2, 'day')
			.date(),
		color: Colors.blue.light,
		size: Ratio.isTablet ? 68 : 48,
		opacity: 0.7,
		monthYears: dayjs().format('MMM YYYY'),
	}];

const Home = () => {

	useEffect(() => {
		const backHandler = BackHandler.addEventListener(
			'hardwareBackPress',
			backAction,
		);

		return () => {
			backHandler.remove();
		};
	}, []);

	const backAction = () => {
		Alert.alert('Saestri', 'Apakah anda yakin ingin keluar dari Aplikasi?', [
			{
				text: 'Cancel',
				onPress: () => null,
				style: 'cancel',
			},
			{ text: 'YES', onPress: () => BackHandler.exitApp() },
		]);
		return true;

	};

	const openWaBtnHandler = async () => {
		// const url = '6282132228078';
		const url = '6282228808979';
		await Linking.openURL(`whatsapp://send?text=&phone=${ url }`);
	};

	return (
		<Container
			noPadding
			bgStatusBar={ Colors.gray.light }
			barStyle='dark-content'
			noScroll
		>
			<View style={ styles.container }>
				<View style={ { alignSelf: 'center', marginBottom: 25 } }>
					<Image
						source={ Images.new_logo }
						style={ { width: 65, height: 76 } }
						resizeMode='contain' />
				</View>
				<View style={ styles.wrapperDays }>
					{ dates.map((item, i) => (
						<View
							key={ i }>
							<View
								style={ [styles.itemDay, { marginBottom: 5, width: item.size, height: item.size, borderRadius: item.size / 2, backgroundColor: item.color, opacity: item.opacity }] }>
								{ i === 2 && <Text style={ styles.textToday }>Today</Text> }
								<Text
									style={ [styles.textItemDay, i === 2 && { fontSize: 22 }] }>
									{ item.date }
								</Text>
							</View>
							<Text style={ { textAlign: 'center', color: item.color, fontWeight: '700', shadowColor: Colors.black.default, shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.5, elevation: 6 } }>{ item.monthYears }</Text>
						</View>
					)) }
				</View>
				<View style={ styles.wrapperMenu }>
					<View>
						<ButtonLarge
							title='Contraction Timer'
							color={ Colors.blue.light }
							icon='history'
							onpress={ () => NavigationHelper.push('ContractionTimer') }
						/>
						<ButtonLarge
							title='Shop'
							color={ Colors.pink.default }
							icon='shop'
							onpress={ openWaBtnHandler }
						/>
						<ButtonLarge
							title='Baby Journey'
							color={ Colors.blue.light }
							icon='gallery'
							onpress={ () => NavigationHelper.push('MiniGallery') }
						/>
					</View>
				</View>
				<Image
					source={ Images.image_home }
					style={ styles.imgHome }
					resizeMode='contain' />
				<View style={ styles.rectangle } />
			</View>
		</Container>
	);
};

export default Home;
