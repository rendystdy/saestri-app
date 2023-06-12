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
		borderWidth: 1,
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
});
