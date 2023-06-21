import { Colors } from '@constant';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
	container: {
		backgroundColor: Colors.gray.light,
		flex: 1,
		paddingTop: 75,
		alignItems: 'center',
	},
	whatsappBtn: {
		width: '100%',
		height: '100%',
	},
	btnText: {
		fontSize: 18,
		color: 'white',
	},
	wrapper: {
		width: '70%',
		height: 96,
		shadowColor: Colors.black.default,
		shadowOffset: {
			width: 0,
			height: 1,
		},
		shadowOpacity: 1,
		elevation: 8,
	},
});

export default styles;
