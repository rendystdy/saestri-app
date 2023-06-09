import { TouchableOpacity } from 'react-native';
import React from 'react';

import { Text } from '@components';
import styles from './style';
import { Images } from '@constant';

interface IButtonLarge {
  title: string | undefined,
  color: string | undefined,
  icon: string | undefined;
  onpress: () => void;
}

const ButtonLarge: React.FC<IButtonLarge> = ({
  title,
  color,
  icon,
  onpress,
}) => {
  const Icons = () => {
    switch (icon) {
      case 'gallery':
        return <Images.ic_gallery style={ styles.icons } />;
      case 'shop':
        return <Images.ic_cart style={ styles.icons } />;
      case 'history':
        return <Images.ic_history style={ styles.icons } />;
      default:
        return <Images.ic_gallery style={ styles.icons } />;
    }
  };
  return (
    <TouchableOpacity
      onPress={ onpress }
      style={ [styles.container, { backgroundColor: color }] }>
      <Icons />
      <Text style={ styles.textTitle }>{ title }</Text>
    </TouchableOpacity>
  );
};

export default ButtonLarge;
