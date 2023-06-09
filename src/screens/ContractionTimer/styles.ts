import { Colors } from '@constant';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
	container: {
		paddingTop: 99,
		backgroundColor: Colors.gray.light,
		flex: 1,
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
	dotted: { position: 'absolute', top: 0, left: 0, right: 0, alignItems: 'center', zIndex: -1 },
	circle: {
		width: 36,
		height: 36,
		borderRadius: 36 / 2,
		backgroundColor: Colors.blue.light,
		alignItems: 'center',
		justifyContent: 'center',
		marginBottom: 42,
	},
	textCircle: {
		color: Colors.white.default,
		fontSize: 24,
		textAlign: 'center',
		fontWeight: '700',
	},
	wrapperCircle: { position: 'absolute', zIndex: 1 },
});

export default styles;
