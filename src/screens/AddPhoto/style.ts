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
		height: 560,
		width: '100%',
	},
	wrapperRetake: {
		padding: 16,
		alignItems: 'flex-end',
		justifyContent: 'flex-end',
	},
	textRetake: {
		paddingHorizontal: 12,
		textAlign: 'center',
		fontSize: 16,
		fontWeight: '500',
		letterSpacing: 1,
		color: Colors.gray.veryDark,
	},
	wrapperTextArea: {
		padding: 16,
	},
	titleTextAreaContainer: {
		height: 97,
		marginBottom: 12,
		backgroundColor: Colors.blue.light,
		borderRadius: 16,
		color: Colors.white.default,
		shadowColor: Colors.black.default,
	
	},
	textareaContainer: {
		height: 167,
		backgroundColor: Colors.blue.light,
		borderRadius: 16,
		color: Colors.white.default,
		shadowColor: Colors.black.default,
	
	},
	button: {
		width: 232,
		alignSelf: 'center',
		borderRadius: 16,
		height: 44,
		padding: 12,
		shadowColor: Colors.black.default,
		shadowOffset: {
			width: 0,
			height: 1,
		},
		shadowOpacity: 1,
		elevation: 4,
	},
	textStyle: { fontSize: 16, color: Colors.white.default, fontWeight: '700', letterSpacing: 1 },
});

export default styles;
