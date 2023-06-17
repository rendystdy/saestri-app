
import { PermissionsAndroid } from 'react-native';

export const hasStoragePermission = async() => {
	try {
		const granted = await PermissionsAndroid.requestMultiple(
			[
				PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
				PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
			]
		);
	} catch (error) {
		console.log('failed permission, ', error);
		return false;
	}
	const readGranted = await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE);
	const writeGranted = await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE);
	if (!readGranted || !writeGranted) {
		console.log('Read or write permissions have not been granted');
		return false;
	} else {
		return true;
	}
};
