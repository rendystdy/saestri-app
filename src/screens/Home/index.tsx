import { Alert, BackHandler, Image, View } from 'react-native';
import React, { useEffect } from 'react';
import { Images } from '@constant';

import { Container, Text, ButtonLarge } from '@components';
import { Colors } from '@constant';
import styles from './style';
import dayjs from 'dayjs';
import { NavigationHelper } from '@helpers';

const days = dayjs();

const dates = [
	{
		date: days.subtract(2, 'day')
			.date(),
		color: Colors.blue.light,
		size: 48,
		opacity: 0.7,
	},
	{
		date: days.subtract(1, 'day')
			.date(),
		color: Colors.pink.default,
		size: 58,
		opacity: 0.9,
	},
	{
		date: days.date(),
		color: Colors.blue.light,
		size: 78,
		opacity: 1,
	},
	{
		date: days.add(1, 'day')
			.date(),
		color: Colors.pink.default,
		size: 58,
		opacity: 0.9,
	},
	{
		date: days.add(2, 'day')
			.date(),
		color: Colors.blue.light,
		size: 48,
		opacity: 0.7,
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

	return (
		<Container
			noPadding
			bgStatusBar={ Colors.gray.light }
			barStyle='dark-content'
			noScroll
		>
			<View style={ styles.container }>
				<View style={ { alignSelf: 'center', marginBottom: 25 } }>
					<Images.LogoSaestri />
				</View>
				<View style={ styles.wrapperDays }>
					{ dates.map((item, i) => (
						<View
							key={ i }
							style={ [styles.itemDay, { width: item.size, height: item.size, borderRadius: item.size / 2, backgroundColor: item.color, opacity: item.opacity }] }>
							{ i === 2 && <Text style={ styles.textToday }>Today</Text> }
							<Text
								style={ [styles.textItemDay, i === 2 && { fontSize: 22 }] }>
								{ item.date }
							</Text>
						</View>
					)) }
				</View>
				<View style={ styles.wrapperMenu }>
					<Image
						source={ Images.image_home }
						style={ { height: 556, width: '45%', marginRight: 17 } }
						resizeMethod='scale'
						resizeMode='cover' />
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
							onpress={ () => console.log() }
						/>
						<ButtonLarge
							title='Baby Journey'
							color={ Colors.blue.light }
							icon='gallery'
							onpress={ () => NavigationHelper.push('MiniGallery') }
						/>
					</View>
				</View>
				<Images.rectangle style={ styles.rectangle } />
			</View>
		</Container>
	);
};

export default Home;
