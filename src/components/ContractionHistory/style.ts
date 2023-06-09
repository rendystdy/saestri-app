import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
	container: {
		marginVertical: 8,
		marginHorizontal: 16,
	},
	itemDetail: {
		marginTop: 8,
		borderWidth: 1,
	},
	item: {
		padding: 8,
		
		borderRadius: 18,
		borderWidth: 2,
		borderColor: '#D6D6D6',
		flex: 1,
		flexDirection: 'row',
		alignContent: 'center',
	},
	itemCheckbox: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		marginRight: 3,
	},
	dateText: {
		fontSize: 14,
	},
	contractionCountText: {
		fontSize: 18,
	},
});
