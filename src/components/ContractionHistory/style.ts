import { Colors } from '@constant';
import { Ratio } from '@helpers';
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
		flex: 1,
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
		fontSize: Ratio.isTablet ? 20 : 14,
		color: Colors.gray.darkGray,
	},
	contractionCountText: {
		fontSize: Ratio.isTablet ? 28 : 18,
		color: Colors.gray.darkGray,
	},
	col: {
		flex: 1,
		flexDirection: 'column',
	},
	row: {
		flexDirection: 'row',
		alignItems: 'center',
	},
	wrapperDashedLine: {},
	wrapperContent: {
		marginTop: 21,
		borderWidth: 1,
		marginLeft: 26,
		borderRadius: 12,
		borderColor: Colors.gray.border,
		padding: 10,
		flex: 1,
		flexDirection: 'row',
		backgroundColor: 'white',
		
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
		fontSize: Ratio.isTablet ? 20 : 12,
		letterSpacing: 1,
		fontWeight: '500',
		color: Colors.pink.default,
		marginBottom: 12,
	},
});
