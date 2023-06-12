import { Colors } from '@constant';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
	container: {
		paddingTop: 99,
		backgroundColor: Colors.gray.light,
		flex: 1,
	},
	footer: {
		height: 100,
		alignItems: 'center',
		justifyContent: 'center',
		flexDirection: 'row',
	},
	dottedLine: {
		top: 0,
		position: 'absolute',
		zIndex: -1,
	},
	timerContainer: {
		flex: 1,
		position: 'relative',
		flexDirection: 'row',
		justifyContent: 'center',
	},
	startStopBtn: {
		height: 64,
		width: 64,
		backgroundColor: '#B4DEEB',
		alignItems: 'center',
		justifyContent: 'center',
		borderRadius: 600,
	},
	row: {
		flexDirection: 'row',
		justifyContent: 'space-between',
	},
	textTitleTimer: {
		fontSize: 12,
		lineHeight: 12,
		letterSpacing: 1,
		textAlign: 'center',
		fontWeight: '500',
		color: Colors.pink.default,
	},
});

export default styles;
