/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { View } from 'react-native';

import { NavigationHelper, Ratio, useAppDispatch } from '@helpers';
import { Colors } from '@constant';
import { Text } from '@components';
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
			<Text style={ { color: Colors.yellow.default, fontSize: 23, fontWeight: '700' } }>Saestri APP</Text>
		</View>
	);
}

export default Splash;
