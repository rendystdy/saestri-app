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
		backgroundColor: '#25D366',
		paddingHorizontal: 48,
		paddingVertical: 12,
		borderRadius: 18,
		elevation: 7,
	},
	btnText: {
		fontSize: 18,
		color: 'white',
	},
});

export default styles;
