import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, View, TouchableOpacity, Modal } from 'react-native';
import { Camera as CameraVision, PhotoFile } from 'react-native-vision-camera';

import Camera from './camera';

type CameraWidgetProps = {
	isActive: boolean,
	onCapture: (photo: PhotoFile) => void;
	onClose: () => void;
};

const CameraWidget: React.FC<CameraWidgetProps> = ({
	isActive,
	onCapture,
	onClose,
	...props
}) => {

	const cameraRef = useRef<CameraVision>(null);

	const onPress = async() => {
		if (cameraRef.current) {
			const capturedImg = await cameraRef.current.takePhoto({
				qualityPrioritization: 'quality',
				skipMetadata: true,
			});
		
			onCapture(capturedImg);
		}

	};
	return (
		<Camera
			style={ [StyleSheet.absoluteFill, { flex: 1 }] }
			photo={ true }
			cameraRef={ cameraRef }
			isActive={ isActive }
			format={ {
				photoHeight: 3000,
				photoWidth: 3000,
				videoHeight: 3000,
				videoWidth: 3000,
				isHighestPhotoQualitySupported: false,
				maxISO: 1500,
				minISO: 100,
				fieldOfView: 128,
				colorSpaces: ['yuv'],
				supportsPhotoHDR: true,
				supportsVideoHDR: false,
				frameRateRanges: [{ minFrameRate: 70, maxFrameRate: 100 }],
				autoFocusSystem: 'phase-detection',
				videoStabilizationModes: ['standard'],
				pixelFormat: '420v',
				maxZoom: 3,
			} }
		/>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: 'black',
	},
	text: {
		color: 'white',
		fontSize: 11,
		fontWeight: 'bold',
		textAlign: 'center',
	},
	buttonWrapper: {
		position: 'absolute',
		bottom: 50,
		left: 0,
		right: 0,
	},
	button: {
		width: 50,
		height: 50,
		borderRadius: 100,
		backgroundColor: '#fff',
		justifyContent: 'center',
		alignItems: 'center',
		alignSelf: 'center',
	},
});

export default CameraWidget;
