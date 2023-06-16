import { FlatList, Image, View } from 'react-native';
import React, { useState, useEffect } from 'react';

import styles from './style';
import { Button, Container, Header, Text } from '@components';
import { NavigationHelper } from '@helpers';
import dayjs from 'dayjs';
import _ from 'lodash';
import ItemGallery from './components/ItemGallery';
import { Colors } from '@constant';

const DUMMY_DATA = [
  {
    uid: dayjs().unix(),
    title: 'My first USG 1',
    image: 'https://asset-a.grid.id/crop/0x0:0x0/700x465/photo/2020/09/28/3129896145.jpg',
    date: dayjs().format(),
  },
  {
    uid: dayjs().unix(),
    title: 'My first USG 2',
    image: 'https://asset-a.grid.id/crop/0x0:0x0/700x465/photo/2020/09/28/3129896145.jpg',
    date: dayjs().format(),
  },
  {
    uid: dayjs().unix(),
    title: 'My first USG 3',
    image: 'https://asset-a.grid.id/crop/0x0:0x0/700x465/photo/2020/09/28/3129896145.jpg',
    date: dayjs('2023-05-15').format(),
  },
  {
    uid: dayjs().unix(),
    title: 'My first USG 4',
    image: 'https://asset-a.grid.id/crop/0x0:0x0/700x465/photo/2020/09/28/3129896145.jpg',
    date: dayjs('2023-05-15').format(),
  },
];

interface IItemList {
  item: IDataGallery;
}

export interface IItemGallery {
  item: EntriesEntity;
}

export interface IDataGallery {
  date: string;
  entries?: (EntriesEntity)[] | null;
}
export interface EntriesEntity {
  uid?: number;
  title: string;
  image: string;
  date?: string;
}

const MiniGallery = () => {
  const [data, setdata] = useState<IDataGallery[]>([]);
  const [visibleButtonDelete, setVisibleButtonDelete] = useState(false);

  useEffect(() => {
    handleGroupByDate();

  }, []);

  const handleGroupByDate = () => {
    const resultGroupByMonth = _.groupBy(DUMMY_DATA, ({ date }) => {
      return date;
    });

    const newDataGallery = _.map(resultGroupByMonth, (group, item) => {
      return {
        date: item,
        entries: group,
      };
    });

    // return newDataGalle1ry;
    setdata(newDataGallery);
  };

  const renderItemByDate = ({ item }: IItemList) => {
    return (
      <View>
        <Text style={ styles.textDate }>{ dayjs(item.date).format('MMM YYYY') }</Text>
        <FlatList
          data={ item.entries }
          numColumns={ 2 }
          style={ { margin: 8 } }
          columnWrapperStyle={ { justifyContent: 'space-between' } }
          keyExtractor={ (_, index) => index.toString() }
          renderItem={ rendyItemGallery }
        />
      </View>
    );
  };

  const rendyItemGallery = ({ item }: IItemGallery) => {
    return (
      <ItemGallery item={ item } />
    );
  };

  return (
    <Container
      noPadding
      noScroll
      nestedScrollEnabled
      contentContainerStyle={ styles.container }>
      <Header
        title='Mini Gallery'
        isBack
        onPressLeft={ () => NavigationHelper.pop(1) }
        icon='gallery'
        onPressRight={ () => setVisibleButtonDelete(!visibleButtonDelete) }
      />
      <FlatList
        data={ data }
        nestedScrollEnabled
        keyExtractor={ (_, i) => i.toString() }
        renderItem={ renderItemByDate }
      />
      <View style={ styles.footer }>
        { visibleButtonDelete && <Button
          backgroundColor={ Colors.blue.light }
          text='Hapus'
          onPress={ () => setVisibleButtonDelete(true) }
          buttonStyle={ { width: 232, alignSelf: 'center', borderRadius: 16, height: 44, padding: 12, position: 'absolute', bottom: 24 } }
          textStyle={ { fontSize: 24, color: Colors.white.default, fontWeight: '700', letterSpacing: 1 } }
        /> }
      </View>
    </Container>
  );
};

export default MiniGallery;
