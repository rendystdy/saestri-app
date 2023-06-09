import { Colors } from '@constant';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: Colors.gray.light,
	},
	wrapperDays: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		paddingHorizontal: 35,
		marginBottom: 62,
	},
	itemDay: {
		backgroundColor: Colors.pink.default,
		width: 58,
		height: 58,
		borderRadius: 58 / 2,
		alignItems: 'center',
		justifyContent: 'center',
		marginHorizontal: 8,
		shadowColor: Colors.black.default,
		shadowOpacity: 0.15,
		shadowOffset: {
			width: 0,
			height: 1,
		},
		shadowRadius: 2,
		elevation: 6,
	},
	textToday: {
		color: Colors.white.default,
		fontSize: 12,
		letterSpacing: 2,
		fontWeight: '500',
	},
	textItemDay: {
		color: Colors.white.default,
		fontSize: 16,
		fontWeight: '700',
	},
	wrapperMenu: {
		flexDirection: 'row',
		marginBottom: 60,
	},
	textStartCounting: {
		fontSize: 16,
		color: Colors.blue.light,
		textAlign: 'center',
		fontWeight: '500',
	},
	icStartCounting: {
		shadowColor: Colors.black.default,
		shadowOffset: {
			width: 0, height: 1,
		},
		shadowOpacity: 1,
		elevation: 6,
		alignSelf: 'center',
	},
	rectangle: { zIndex: -1, position: 'absolute', bottom: 30, right: -16 },
});

export default styles;
