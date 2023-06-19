import React, { useMemo, ReactNode, Fragment } from 'react';
import { useCameraDevices, Camera as CameraVision, CameraProps as CameraVisionProps } from 'react-native-vision-camera';
import Text from '../Text/index';

interface CameraType extends Omit<CameraVisionProps, 'isActive' | 'device'> {
	notFoundCameraComponent?: ReactNode;
	isActive?: boolean;
	cameraRef?: React.RefObject<CameraVision>;
}

const Camera = ({ notFoundCameraComponent, frameProcessor, isActive = true, cameraRef, ...props }: CameraType) => {
	const devices = useCameraDevices();
	const device = devices.back;

	const renderCamera = useMemo(() => {
		if (device) {
			return (
				<CameraVision
					ref={ cameraRef }
					photo
					frameProcessor={ frameProcessor }
					isActive={ isActive }
					device={ device }
					{ ...props }
				/>
			);
		} else {
			if (notFoundCameraComponent) {
				return notFoundCameraComponent;
			}
			return (
				<Text
					weight='700'
					size={ 16 }
					lineHeight={ 18 }
					align='center'
					style={ { flex: 5 } }>Camera not found</Text>
			);
		}

	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [device, isActive]);

	return (
		<Fragment>
			{ renderCamera }
		</Fragment>
	);
};

export default Camera;
