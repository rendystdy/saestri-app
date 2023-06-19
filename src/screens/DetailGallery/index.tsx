import { Image, Text, View } from 'react-native';
import React from 'react';

import styles from './style';
import { Container, Header } from '@components';
import { NavigationHelper } from '@helpers';

const DetailGallery = ({ _, route }: any) => {
  const title = route?.params?.title;
  const image = route?.params?.image;
  return (
    <Container
      noPadding
      contentContainerStyle={ styles.container }
    >
      <Header
        title='Mini Gallery'
        isBack
        onPressLeft={ () => NavigationHelper.pop(1) }
      />
      <View style={ styles.wrapper }>
        <Image
          resizeMode='cover'
          source={ { uri: image } }
          style={ styles.image } />
        <Text style={ styles.title }>{ title }</Text>
      </View>
    </Container>
  );
};

export default DetailGallery;
