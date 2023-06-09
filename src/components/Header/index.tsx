import { TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';

import styles from './styles';
import { Colors, Images } from '@constant';
import { Text } from '@components';

interface IHeaders {
	onPressLeft: () => void,
	onPressRight?: () => void,
	isBack?: boolean | undefined;
	title: string | undefined;
	icon?: string | undefined;
	color?: string | undefined;
}

const Headers: React.FC<IHeaders> = ({ onPressLeft, onPressRight, title, isBack, icon, color }) => {
	const SectionRight = () => {
		switch (icon) {
			case 'history':
				return (
					<TouchableOpacity
						onPress={ onPressRight }
						style={ styles.wrapperRight }>
						<Images.ic_time_machine />
						<Text style={ styles.textRight }>History</Text>
					</TouchableOpacity>
				);
			case 'delete':
				return (
					<TouchableOpacity
						onPress={ onPressRight }
						style={ styles.wrapperRight }>
						<Images.ic_delete />
						<Text style={ styles.textRight }>Delete</Text>
					</TouchableOpacity>
				);
			case 'gallery':
				return (
					<TouchableOpacity
						onPress={ onPressRight }>
						<Images.ic_delete_gallery />
					</TouchableOpacity>
				);
			case 'detail-gallery':
				return (
					<TouchableOpacity
						onPress={ onPressRight }>
						<Icon
							name='create'
							size={ 24 }
							color={ Colors.gray.veryDark } />
					</TouchableOpacity>
				);
			case 'detail-gallery-save':
				return (
					<TouchableOpacity
						onPress={ onPressRight }>
						<Icon
							name='save'
							size={ 24 }
							color={ Colors.gray.veryDark } />
					</TouchableOpacity>
				);

			default:
				return (
					<View style={ { width: 43 } } />
				);
		}
	};
	return (
		<View style={ [styles.container, { backgroundColor: color }] }>
			{ isBack && <TouchableWithoutFeedback onPress={ onPressLeft }><Images.ic_back /></TouchableWithoutFeedback> }
			<Text style={ styles.title }>{ title }</Text>
			<SectionRight />
		</View>
	);
};

export default Headers;
