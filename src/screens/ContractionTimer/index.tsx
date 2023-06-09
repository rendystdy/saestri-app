import { ScrollView, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';

import styles from './styles';
import { Container, Header, Text } from '@components';
import { NavigationHelper, useTimer } from '@helpers';
import TotalCounting from './components/TotalCounting';
import { Colors, Images } from '@constant';
import Timer from './components/Timer';
import dayjs from 'dayjs';

export interface IDataContraction {
  contractionDuration: number,
  intervalDuration: number,
  timestamp: number,
  timerType: 'contraction' | 'interval',
}

const ContractionTimer = () => {
  const [dataContractions, setDataContractions] = useState<IDataContraction[]>([
    {
      contractionDuration: 10000,
      intervalDuration: 0,
      timestamp: 0,
      timerType: 'contraction',
    },
    {
      contractionDuration: 10000,
      intervalDuration: 0,
      timestamp: 0,
      timerType: 'contraction',
    },
  ]);

  const { getHours, getMinutes, getSeconds, toggleStart } = useTimer({
    onToggle: index => {
      // updateTimerData(index);
    },
  });

  // const updateTimerData = (index: number) => {
  //   const dataByIndex = dataContractions[index];

  //   if (dataByIndex.status) {
  //     dataByIndex.intervalDuration = getSeconds();
  //   } else {
  //     dataByIndex.contractionDuration = getSeconds();
  //     dataByIndex.timestamp = dayjs().unix();
  //   }

  //   setDataContractions(dataContractions);
  // };

  // const [timer, setTimer] = useState(0);
  return (
    <Container
      noPadding
      noScroll>
      <Header
        title='Contraction Timer'
        isBack
        icon='history'
        onPressLeft={ () => NavigationHelper.pop(1) }
        onPressRight={ () => NavigationHelper.pop(1) }
      />
      <View style={ styles.container }>
        <TotalCounting />
        <View style={ [styles.row, { marginBottom: 29, justifyContent: 'space-around' }] }>
          <Text style={ styles.textTitleTimer }>Contraction</Text>
          <Text style={ [styles.textTitleTimer, { color: Colors.gray.veryDark }] }>Interval</Text>
        </View>
        <View>
          <Text>{ getSeconds() }</Text>
        </View>
        <View style={ { height: 343 } }>
          <ScrollView style={ { flex: 1 } }>
            <View style={ [styles.row, { paddingHorizontal: 10 }] }>
              <View>
                <Timer timerType={ dataContractions[1].timerType } />
              </View>
              <View style={ styles.dotted }>
                <View style={ styles.wrapperCircle }>
                  <View style={ styles.circle }>
                    <Text style={ styles.textCircle }>1</Text>
                  </View>
                  <View style={ styles.circle }>
                    <Text style={ styles.textCircle }>1</Text>
                  </View>
                  <View style={ styles.circle }>
                    <Text style={ styles.textCircle }>1</Text>
                  </View>
                </View>
                <Images.dotted />
              </View>
              <View>
                <Timer
                  isRight
                  timerType={ dataContractions[1].timerType } />
              </View>
            </View>
          </ScrollView>
        </View>

        <TouchableOpacity onPress={ () => toggleStart(1) }>
          <Text>Start</Text>
        </TouchableOpacity>
      </View>
    </Container>
  );
};

export default ContractionTimer;
