import { Colors } from '@constant';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
	container: {
		paddingTop: 99,
		backgroundColor: Colors.gray.light,
		flex: 1,
	},
	footer: {
		// height: 100,
		backgroundColor: Colors.gray.light,
		alignItems: 'center',
		justifyContent: 'space-between',
		flexDirection: 'row',
	},
	row: {
		flexDirection: 'row',
		alignItems: 'center',
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
		height: 54,
		width: 44,
		backgroundColor: Colors.pink.default,
		alignItems: 'center',
		justifyContent: 'center',
		borderRadius: 8,
		padding: 4,
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
