import { Colors } from '@constant';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
	container: {
		paddingVertical: 15,
		paddingHorizontal: 12,
		borderRadius: 20,
		borderWidth: 2,
		borderColor: Colors.gray.border,
		backgroundColor: Colors.gray.light,
	},
	itemDetail: {
		marginTop: 8,
		flexDirection: 'row',
		paddingLeft: 46,
	},
	item: {
		flexDirection: 'row',
		alignContent: 'center',
	},
	itemCheckbox: {
		// display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		marginRight: 15,
	},
	dateText: {
		fontSize: 14,
		color: Colors.gray.darkGray,
	},
	contractionCountText: {
		fontSize: 18,
		color: Colors.gray.darkGray,
	},
	row: {
		flexDirection: 'row',
		alignItems: 'center',
	},
	wrapperDashedLine: {},
	wrapperContent: {
		marginTop: 21,
		width: 214,
		borderWidth: 1,
		marginLeft: 26,
		borderRadius: 26,
		borderColor: Colors.gray.border,
		padding: 10,
	},
	wrpperCircleNumber: {
		width: 36,
		height: 36,
		backgroundColor: Colors.blue.light,
		borderRadius: 36 / 2,
		alignItems: 'center',
		justifyContent: 'center',
		position: 'absolute',
		top: 40,
		left: -20,
		zIndex: 2,
	},
	texNumber: {
		fontSize: 24,
		textAlign: 'center',
		fontWeight: '700',
		color: Colors.white.default,
	},
	textTitle: {
		fontSize: 11,
		letterSpacing: 1,
		fontWeight: '500',
		color: Colors.blue.light,
	},
});
