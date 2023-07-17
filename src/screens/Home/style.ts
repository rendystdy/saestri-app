import { Colors } from '@constant';
import { Ratio } from '@helpers';
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
		width: Ratio.isTablet ? 78 : 58,
		height: Ratio.isTablet ? 78 : 58,
		borderRadius: Ratio.isTablet ? 78 : 58 / 2,
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
		paddingRight: Ratio.isTablet ? 42 : 12,
		alignItems: 'center',
		justifyContent: Ratio.isTablet ? 'flex-end' : 'flex-end',
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
	rectangle: {
		zIndex: -1,
		backgroundColor: Colors.blue.light,
		position: 'absolute',
		bottom: 0,
		// right: Ratio.isTablet ? 0 : -10,
		right: 0,
		left: 0,
		width: '100%',
		resizeMode: 'stretch',
		height: 102,
		// borderTopLeftRadius: 24,.
	},
	imgHome: {
		height: '70%', width: 221, position: 'absolute', left: Ratio.isTablet ? -20 : -35, bottom: 0,
		zIndex: 2,
	},
});

export default styles;
