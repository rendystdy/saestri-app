import { StyleSheet, View } from 'react-native';
import React from 'react';
import { Colors } from '@constant';
import { Text } from '@components';

const TotalCounting = () => {
	return (
		<View style={ { marginBottom: 25 } }>
			<View style={ styles.container }>
				<View style={ styles.wrapper }>
					<Text style={ styles.title }>Past Hour</Text>
					<Text style={ styles.textDuration }>1 <Text style={ [styles.title, { marginBottom: 0 }] }>contraction</Text></Text>
				</View>
				<View style={ styles.wrapper }>
					<Text style={ styles.title }>AVG duration</Text>
					<Text style={ styles.textDuration }>0:01</Text>
				</View>
				<View style={ styles.wrapper }>
					<Text style={ styles.title }>AVG Frequency</Text>
					<Text style={ styles.textDuration }>0:002</Text>
				</View>
			</View>
			<View style={ styles.separator } />
		</View>
	);
};

export default TotalCounting;

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-evenly',
		marginBottom: 19,
	},
	wrapper: {
		alignItems: 'center',
	},
	separator: {
		height: 1,
		width: '85%',
		backgroundColor: Colors.gray.separator,
		alignSelf: 'center',
	},
	title: {
		fontSize: 11,
		textAlign: 'center',
		color: Colors.gray.darkGrayishPink,
		letterSpacing: 1,
		marginBottom: 13,
	},
	textDuration: {
		fontSize: 22,
		textAlign: 'center',
		fontWeight: '500',
		color: Colors.black.veryBlack,
	},
});
