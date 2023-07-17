/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { Image, View } from 'react-native';

import { NavigationHelper, Ratio, useAppDispatch } from '@helpers';
import { Images } from '@constant';
import styles from './style';
import { Actions } from '@store';
function Splash() {

	const setDeviceHeight = useAppDispatch(Actions.miscAction.setDeviceHeight);

	useEffect(() => {

		setDeviceHeight(Ratio.getDeviceHeight());

		// save timeoutId to clear the timeout when the component re-renders
		const tm = setTimeout(() => {
			NavigationHelper.reset('Home');
		}, 3000);

		// clear timeout on re-render to avoid memory leaks
		return () => {
			clearTimeout(tm);
		};
	}, []);

	return (
		<View style={ styles.container }>
			<Image
				source={ Images.new_logo }
				style={ { width: 95, height: 106 } }
				resizeMode='contain' />
		</View>
	);
}

export default Splash;
