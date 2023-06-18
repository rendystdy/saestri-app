import {
	ActivityIndicator, StyleSheet, Text, TouchableOpacity, View,
} from 'react-native';
import React, { useRef, useEffect } from 'react';
import { Camera, useCameraDevices } from 'react-native-vision-camera';
import { Colors, Images } from '@constant';
import { Header } from '@components';
import { NavigationHelper } from '@helpers';

const CameraGallery = () => {
	const devices = useCameraDevices('wide-angle-camera');
	const cameraRef = useRef(null);
	const device = devices.back;

	useEffect(() => {
		async function getPermission() {
			const newCameraPermission = await Camera.requestCameraPermission();
		}
		getPermission();
	}, []);

	const takePhoto = async() => {
		const result = await cameraRef?.current?.takePhoto({
			flash: 'off',
		});

		console.log('result', result);

		if (result && result.path) {
			NavigationHelper.push('AddPhoto', { path: result.path });
		}
	};

	if (device == null) {
		return (
			<View style={ { flex: 1, justifyContent: 'center', alignItems: 'center' } }>
				<ActivityIndicator
					size={ 'large' }
					color={ Colors.blue.light } />
			</View>
		);
	}
	return (
		<View style={ styles.container }>
			<Header
				color={ Colors.white.default }
				title='Mini Gallery'
				isBack
				onPressLeft={ () => NavigationHelper.pop(1) }
			/>
			<Camera
				ref={ cameraRef }
				style={ styles.camera }
				device={ device }
				isActive={ true }
				photo={ true }
			/>
			<View style={ styles.footer } >
				<TouchableOpacity onPress={ takePhoto }>
					<Images.ic_camera />
					<Text style={ styles.textCamera }>Camera</Text>
				</TouchableOpacity>
			</View>
		</View>
	);
};

export default CameraGallery;

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	camera: {
		position: 'absolute',
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
		zIndex: 1,
	},
	footer: {
		backgroundColor: Colors.gray.light,
		position: 'absolute',
		bottom: 0,
		left: 0,
		right: 0,
		zIndex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		paddingTop: 16,
	},
	textCamera: {
		fontSize: 16,
		color: Colors.blue.light,
		textAlign: 'center',
		letterSpacing: 1,
		fontWeight: '500',
	},
});
