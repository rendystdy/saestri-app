import { ActivityIndicator, StyleSheet, TouchableOpacity, View } from 'react-native';
import React, { useRef, useState } from 'react';
import { Camera, useCameraDevices } from 'react-native-vision-camera';
import { Colors, Images } from '@constant';
import { Header } from '@components';
import { NavigationHelper } from '@helpers';
import {  useIsFocused } from '@react-navigation/native';

const CameraGallery = () => {
	const [cameraPos, setCameraPos] = useState<'back'|'front'>('back');

	const devices = useCameraDevices();
	const cameraRef = useRef<Camera>(null);
	const	cameraDevice = devices[cameraPos];
	const focused = useIsFocused();

	const takePhoto = async() => {
		if (cameraRef.current) {
			const result = await cameraRef.current.takePhoto({});
			
			NavigationHelper.push('AddPhoto', { path: result.path });
		}
	};

	if (cameraDevice == null) {
		return (
			<View style={ { flex: 1, justifyContent: 'center', alignItems: 'center' } }>
				<ActivityIndicator
					size={ 'large' }
					color={ Colors.blue.light } />
			</View>
		);
	}

	const cameraToggler = () => {
		if (cameraPos === 'back') {
			setCameraPos('front');
		} else {
			setCameraPos('back');
		}
	};

	return (
		<View style={ styles.container }>
			<Header
				color={ Colors.white.default }
				title='Mini Gallery'
				isBack
				onPressLeft={ () => NavigationHelper.replace('MiniGallery') }
			/>
			<Camera
				ref={ cameraRef }
				style={ styles.camera }
				device={ cameraDevice }
				isActive={ focused }
				photo
			/>
			<View style={ styles.footer } >
				<TouchableOpacity
					onPress={ () => NavigationHelper.pop(1) }
					style={ styles.buttonContainer }>
					<Images.ic_gallery_btn />
				</TouchableOpacity>
				<TouchableOpacity
					onPress={ takePhoto }
					style={ styles.buttonContainer }>
					<Images.ic_capture_btn />
				</TouchableOpacity>
				<TouchableOpacity
					onPress={ cameraToggler }
					style={ styles.buttonContainer }>
					<Images.ic_switch_camera />
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
		display: 'flex',
		flexDirection: 'row',
	},
	textCamera: {
		fontSize: 16,
		color: Colors.blue.light,
		textAlign: 'center',
		letterSpacing: 1,
		fontWeight: '500',
	},
	buttonContainer: {
		display: 'flex',
		alignItems: 'center',
		marginBottom: 20,
	},
	captureText: {
		fontSize: 24,
	},
});
