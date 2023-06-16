import React, { useState } from 'react';
import { Image, View, Text } from 'react-native';
import { IItemGallery } from '..';
import Checkbox from '@react-native-community/checkbox';
import styles from '../style';

const ItemGallery = ({ item }: IItemGallery) => {
  const [toggleCheckBox, setToggleCheckBox] = useState<boolean>(false);
  return (
    <View style={ styles.wrapperItemGallery }>
      <View style={ styles.wrapperCheckbox }>
        <Checkbox
          value={ toggleCheckBox }
          style={ styles.checkbox }
          onValueChange={ () => setToggleCheckBox(!toggleCheckBox) }
        />
      </View>
      <Image
        source={ { uri: item.image } }
        resizeMode='cover'
        style={ styles.image } />
      <Text style={ styles.titleImage }>{ item.title }</Text>
    </View>
  );
};

export default ItemGallery;
