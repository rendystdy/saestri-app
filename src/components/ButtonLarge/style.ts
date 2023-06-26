import { Colors } from '@constant';
import { Ratio } from '@helpers';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
	container: {
		backgroundColor: Colors.blue.light,
		width: Ratio.isTablet ? 360 : 180,
		height: Ratio.isTablet ? 210 : 105,
		borderRadius: 24,
		padding: 14,
		shadowColor: Colors.black.default,
		shadowOffset: {
			width: 0,
			height: 1,
		},
		shadowOpacity: 0.5,
		elevation: 6,
		shadowRadius: 2,
		marginBottom: 15,
	},
	textTitle: {
		fontSize: Ratio.isTablet ? 24 : 12,
		color: Colors.white.default,
		letterSpacing: 1,
	},
	icons: {
		alignSelf: 'flex-end',
	},
});

export default styles;
