import React from 'react';
import { Image, View, Text, TouchableOpacity } from 'react-native';
import Checkbox from '@react-native-community/checkbox';
import styles from '../style';
import { EntriesEntity } from 'src/interfaces/gallery';
import { NavigationHelper } from '@helpers';

type Props = {
	item: EntriesEntity,
	onChecked: (item: EntriesEntity, isChecked: boolean) => void;
	isChecked: boolean;
	isDeleteMode: boolean,
	index: number;
};

const ItemGallery: React.FC<Props> = ({ item, onChecked, isChecked, isDeleteMode, index }) => {

	const onPressHandler = () => {
		NavigationHelper.push('PhotoDetail', { path: item.image, item, index });
	};

	return (
		<TouchableOpacity
			onPress={ onPressHandler }
			style={ styles.wrapperItemGallery }>
			{
				isDeleteMode &&
				<View style={ styles.wrapperCheckbox }>
					<Checkbox
						value={ isChecked }
						style={ styles.checkbox }
						onValueChange={ () => onChecked(item, isChecked) }
					/>
				</View>
			}
			<TouchableOpacity onPress={ onPressHandler }>
				<Image
					source={ { uri: item.image } }
					resizeMode='cover'
					style={ styles.image } />
			</TouchableOpacity>
			<Text
				style={ styles.titleImage }
				numberOfLines={ 2 }>{ item.title }</Text>
		</TouchableOpacity>
	);
};

export default ItemGallery;
