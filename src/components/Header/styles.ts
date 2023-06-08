import { Colors } from '@constant';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
	container: {
		position: 'absolute',
		top: 0,
		left: 0,
		right: 0,
		height: 75,
		flexDirection: 'row',
		alignItems: 'center',
		zIndex: 10,
		justifyContent: 'space-between',
		paddingRight: 16,
	},
	title: {
		fontSize: 16,
		color: Colors.gray.veryDark,
		fontWeight: '600',
		letterSpacing: 1,
	},
	wrapperRight: {
		// width: 43,
		borderRadius: 8,
		padding: 10,
		backgroundColor: Colors.pink.default,
		alignItems: 'center',
		justifyContent: 'center',
	},
	textRight: {
		fontSize: 8,
		color: Colors.white.default,
		letterSpacing: 1,
	},
});

export default styles;
