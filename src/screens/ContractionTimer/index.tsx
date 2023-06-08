import { View } from 'react-native';
import React from 'react';

import styles from './styles';
import { Container, Header, Text } from '@components';
import { NavigationHelper } from '@helpers';

const ContractionTimer = () => {
  return (
    <Container noPadding>
      <Header
        title='Contraction Timer'
        isBack
        icon='history'
        onPressLeft={ () => NavigationHelper.pop(1) }
        onPressRight={ () => NavigationHelper.pop(1) }
      />
      <View style={ styles.container }>
        <Text>Contraction Timer</Text>
      </View>
    </Container>
  );
};

export default ContractionTimer;
