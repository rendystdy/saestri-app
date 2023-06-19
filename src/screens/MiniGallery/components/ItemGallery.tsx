import React, { useState } from 'react';
import { Image, View, Text, TouchableOpacity } from 'react-native';
import Checkbox from '@react-native-community/checkbox';
import styles from '../style';
import { EntriesEntity } from 'src/interfaces/gallery';

type Props = {
	item: EntriesEntity,
	onChecked: (item: EntriesEntity, isChecked: boolean) => void;
	isChecked: boolean;
	isDeleteMode: boolean,
	onPressDetail: () => void;
};

const ItemGallery: React.FC<Props> = ({ item, onChecked, isChecked, isDeleteMode, onPressDetail }) => {

	return (
		<TouchableOpacity
			onPress={ onPressDetail }
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
			<Image
				source={ { uri: item.image } }
				resizeMode='cover'
				style={ styles.image } />
			<Text style={ styles.titleImage }>{ item.title }</Text>
		</TouchableOpacity>
	);
};

export default ItemGallery;
