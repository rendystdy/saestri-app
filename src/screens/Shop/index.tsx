import React, { useEffect } from 'react';
import { BackHandler, TouchableOpacity, Linking, Image } from 'react-native';

import { Container, Header, Text } from '@components';
import { NavigationHelper } from '@helpers';
import styles from './style';
import { Images } from '@constant';

const urls = ['6282132228078', '6282228808979'];
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Shop = ({ _, route }: any) => {

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

	const openWaBtnHandler = async (url: string) => {
		await Linking.openURL(`whatsapp://send?text=&phone=${ url }`);
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
							style={ styles.wrapper }
							onPress={ () => openWaBtnHandler(url) }
						>
							<Image
								source={ Images.ic_wa }
								style={ styles.whatsappBtn }
								resizeMode='contain' />
						</TouchableOpacity>
					);
				})
			}

		</Container>
	);
};

export default Shop;
