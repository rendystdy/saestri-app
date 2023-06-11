import { TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import React from 'react';

import styles from './styles';
import { Images } from '@constant';
import { Text } from '@components';

interface IHeaders {
  onPressLeft: () => void,
  onPressRight: () => void,
  isBack?: boolean | undefined;
  title: string | undefined;
  icon: string | undefined;
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

      default:
        return (
          <TouchableOpacity
            onPress={ onPressRight }
            style={ styles.wrapperRight }>
            <Images.ic_time_machine />
            <Text style={ styles.textRight }>History</Text>
          </TouchableOpacity>
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
