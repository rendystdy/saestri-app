import { StyleSheet, View } from 'react-native';
import React, { useEffect } from 'react';
import dayjs from 'dayjs';

import { Text } from '@components';
import { Colors } from '@constant';
import { useTimer } from '@helpers';

interface ITimer {
  isRight?: boolean | undefined;
  timerType?: 'contraction' | 'interval';
}

const Timer: React.FC<ITimer> = ({ isRight, timerType }) => {
  const dateNow = dayjs().format('D MMM YYYY');
  const timeNow = dayjs().format('HH:mm');

  useEffect(() => {
    if (timerType === 'interval' && isRight) {
      resetTime();
      toggleStart(1);
    } else {
      toggleStart(1);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timerType]);

  const { getSeconds, toggleStart, resetTime, getHours, getMinutes } = useTimer({
    onToggle: () => {
      console.log('test');
    },
  });

  if (isRight) {
    return (
      <View style={ [styles.row, { marginTop: 39 }] }>
        <Text style={ [styles.textTimer, { color: Colors.blue.blueTimer }] }>{ `${ getHours() }:${ getMinutes() }:${ getSeconds() }` }</Text>
        <View style={ [styles.wrapperDate, { marginLeft: 11, marginRight: 0 }] }>
          <Text style={ styles.textDateAndTime }>{ dateNow }</Text>
          <Text style={ styles.textDateAndTime }>{ timeNow }</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={ [styles.row, { marginBottom: 39 }] }>
      <View style={ styles.wrapperDate }>
        <Text style={ styles.textDateAndTime }>{ dateNow }</Text>
        <Text style={ styles.textDateAndTime }>{ timeNow }</Text>
      </View>
      <Text style={ styles.textTimer }>{ `${ getHours() }:${ getMinutes() }:${ getSeconds() }` }</Text>
    </View>
  );
};

export default Timer;

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  textDateAndTime: {
    fontSize: 8,
    fontWeight: '500',
    letterSpacing: 1,
    color: Colors.gray.darkGray,
  },
  wrapperDate: {
    marginRight: 11,
  },
  textTimer: {
    fontSize: 24,
    letterSpacing: 1,
    color: Colors.pink.default,
    fontWeight: '700',
    textAlign: 'center',
  },
});
