import { Text } from '@components';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Images } from '@constant';

const CaptureButton = () => {

	return <View style={ styles.buttonContainer }>
		<Images.ic_capture_btn />
	</View>;
};

const styles = StyleSheet.create({
	buttonContainer: {
		display: 'flex',
		alignItems: 'center',
		marginBottom: 20,
	},
	captureText: {
		fontSize: 24,
	},
});

export default CaptureButton;
