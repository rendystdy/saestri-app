import { Dirs, FileSystem } from 'react-native-file-access';

const PhotoDir = Dirs.DocumentDir + '/photos';

export const initStorage = async() => {
	try {
		await FileSystem.mkdir(PhotoDir);
	} catch (error) {
		console.log('ERROR: Init storage failed \n', error);
	}
};

export const hasPhotosDir = async() => {
	try {
		const exists = await FileSystem.exists(PhotoDir);
		if (exists) { return true; }
		return false;
	} catch (error) {
		console.log('ERROR: Checking filesystem');
	}
};

export const getImageFromDisk = async(fileName:string): Promise<string> => {
	try {
		const file = await FileSystem.readFile(PhotoDir + `/${fileName}`, 'base64');
		if (!file) { throw 'ERROR: File not found'; }
		return file;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	} catch (error:any) {
		return error;
	}
};

export const getImageListFromDisk = async(): Promise<string[]> => {
	return await FileSystem.ls(PhotoDir);
};
