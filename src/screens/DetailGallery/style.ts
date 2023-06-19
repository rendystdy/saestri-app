import { Colors } from '@constant';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
	container: {
		backgroundColor: Colors.gray.light,
	},
	wrapper: {
		paddingTop: 75,
	},
	image: {
		width: '100%',
		height: 500,
	},
	title: {
		fontSize: 16,
		fontWeight: '500',
		color: Colors.gray.darkGray,
	},
});

export default styles;
