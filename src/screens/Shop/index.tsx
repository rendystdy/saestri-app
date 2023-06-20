import React, { useEffect } from 'react';
import { BackHandler, View, TouchableOpacity, Linking } from 'react-native';

import { Container, Header, Text } from '@components';
import { NavigationHelper } from '@helpers';
import styles from './style';

const urls = ['https://wa.me/6282132228078'];
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Shop = ({ _, route }:any) => {
  
	useEffect(() => {
		const backHandler = BackHandler.addEventListener(
			'hardwareBackPress',
			backAction,
		);

		return () => {
			backHandler.remove();
		};
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
  
	const backAction = () => {
		if (route.name === 'Shop') {

			NavigationHelper.pop(1);
			return true;
		}
		return false;
	};

	const openWaBtnHandler = async(url: string) => {
		await Linking.openURL(url);
	};

	return (
		<Container
			noPadding
			noScroll
			nestedScrollEnabled
			contentContainerStyle={ styles.container }>
			<Header
				title='Shop'
				isBack
				onPressLeft={ () => NavigationHelper.replace('Home') }
			/>
			{
				urls.map((url, index) => {
					return (
						<TouchableOpacity
							key={ index }
							style={ styles.whatsappBtn }
							onPress={ () => openWaBtnHandler(url) }
						>
							<Text style={ styles.btnText }>Chat via Whatsapp</Text>
						</TouchableOpacity>
					);
				})
			}
		
		</Container>
	);
};

export default Shop;
