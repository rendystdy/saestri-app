import { Colors } from '@constant';
import { Ratio } from '@helpers';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
	container: {
		paddingTop: 99,
		backgroundColor: Colors.gray.light,
		flex: 1,
	},
	startStopBtnStyle: {
		width: 150,
		height: 150,
		borderRadius: 150 / 2,
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: Colors.pink.default,
	},
	footer: {
		zIndex: 1,
		height: Ratio.isTablet ? 250 : 170,
		backgroundColor: Colors.gray.light,
		alignItems: 'center',
		justifyContent: 'space-between',
		flexDirection: 'row',
	},
	btnText: {
		color: 'white',
	},
	row: {
		flexDirection: 'row',
		alignItems: 'center',
	},
	dottedLine: {
		height: '100%',
		top: 0,
		position: 'absolute',
		zIndex: -1,
	},
	timerContainer: {
		zIndex: 10,
		flex: 1,
		position: 'relative',
		flexDirection: 'row',
		justifyContent: 'center',
	},
	startStopBtn: {
		height: 54,
		width: 44,
		backgroundColor: Colors.pink.default,
		alignItems: 'center',
		justifyContent: 'center',
		borderRadius: 8,
		padding: 4,
	},
	textTitleTimer: {
		fontSize: Ratio.isTablet ? 24 : 12,
		lineHeight: Ratio.isTablet ? 24 : 12,
		letterSpacing: 1,
		textAlign: 'center',
		fontWeight: '500',
		color: Colors.pink.default,
	},
});

export default styles;
