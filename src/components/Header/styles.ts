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
		fontWeight: '700',
		letterSpacing: 1,
	},
	wrapperRight: {
		// width: 43,
		borderRadius: 8,
		padding: 10,
		backgroundColor: Colors.pink.default,
		alignItems: 'center',
		justifyContent: 'center',
		shadowColor: Colors.black.default,
		shadowOffset: {
			width: 0,
			height: 1,
		},
		shadowOpacity: 1,
		elevation: 6,
	},
	textRight: {
		fontSize: 8,
		color: Colors.white.default,
		letterSpacing: 1,
	},
});

export default styles;
