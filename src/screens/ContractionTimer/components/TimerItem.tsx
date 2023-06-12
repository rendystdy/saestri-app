import React from 'react';
import { View, StyleSheet } from 'react-native';

import { Text } from '@components';
import { Colors } from '@constant';

import Timer from './Timer';
import { IDataContraction, ITimerStatus } from '..';

type Props = {
  item: IDataContraction,
  count: number,
  timerStatus?: ITimerStatus
}

const TimerItem: React.FC<Props> = ({
	item,
	count,
	timerStatus,
}) => {
  
	return (
		<View style={ [styles.row, { paddingHorizontal: 10 }] }>
			<Timer
				item={ item }
				timerStatus={ timerStatus } />
			<View style={ styles.dotted }>
				<View style={ styles.wrapperCircle }>
					<View style={ styles.circle }>
						<Text style={ styles.textCircle }>{ count }</Text>
					</View>
				</View>
			</View>
			
		</View>
	);
};

const styles = StyleSheet.create({
	row: {
		flex: 1,
	},
	dotted: { position: 'absolute', top: 0, left: 0, right: 0, alignItems: 'center' },
	circle: {
		width: 36,
		height: 36,
		borderRadius: 36 / 2,
		backgroundColor: Colors.blue.light,
		alignItems: 'center',
		justifyContent: 'center',
		marginBottom: 42,
	},
	textCircle: {
		color: Colors.white.default,
		fontSize: 24,
		textAlign: 'center',
		fontWeight: '700',
	},
	wrapperCircle: { position: 'absolute', zIndex: 1 },

});

export default TimerItem;
