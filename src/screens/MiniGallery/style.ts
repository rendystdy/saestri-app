import { Colors } from '@constant';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
	container: {
		backgroundColor: Colors.gray.light,
		flex: 1,
		paddingTop: 75,
	},
	titleImage: {
		fontSize: 10,
		letterSpacing: 1,
		color: Colors.gray.darkGray,
	},
	wrapperItemGallery: { backgroundColor: Colors.gray.light, width: '48%' },
	image: { width: '100%', height: 176 },
	textDate: {
		marginHorizontal: 8,
	},
	wrapperCheckbox: {
		position: 'absolute',
		top: 10,
		right: 10,
		zIndex: 2,
		backgroundColor: Colors.white.default,
		width: 20,
		height: 20,
		borderRadius: 6,
		alignItems: 'center',
		justifyContent: 'center',
	},
	checkbox: {
	},
	footer: {
		position: 'absolute',
		zIndex: 4,
		bottom: 0,
		left: 0,
		right: 0,
		backgroundColor: 'red',
	},
});

export default styles;
