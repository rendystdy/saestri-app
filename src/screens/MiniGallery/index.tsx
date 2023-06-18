import { FlatList, View } from 'react-native';
import React, { useState, useEffect } from 'react';

import styles from './style';
import { Button, Container, Header, Text } from '@components';
import {
	NavigationHelper, getImageListFromDisk, hasPhotosDir, hasStoragePermission, initStorage, useAppSelector,
} from '@helpers';
import { GalleryInterface } from '@interfaces';
import dayjs from 'dayjs';
import _ from 'lodash';
import ItemGallery from './components/ItemGallery';
import { Colors } from '@constant';
import { Dirs, FileSystem } from 'react-native-file-access';
import Icons from 'react-native-vector-icons/FontAwesome';

const MiniGallery = () => {
	const [data, setdata] = useState<GalleryInterface.IDataGallery[]>([]);
	const [visibleButtonDelete, setVisibleButtonDelete] = useState(false);
	const { listGallery } = useAppSelector(state => state.galleryReducers);
	const [images, setImages] = useState<string[]>();

	useEffect(() => {
		handleGroupByDate();
		hasStoragePermission();
		getImages();
	}, []);

	const handleGroupByDate = () => {
		const resultGroupByMonth = _.groupBy(listGallery, ({ date }) => {
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

	const getImages = async () => {
		const hasInit = await hasPhotosDir();
		if (!hasInit) {
			await initStorage();
		}
		const imagesFromStorage = await getImageListFromDisk();
		setImages(imagesFromStorage);
	};

	const renderItemByDate = ({ item }: GalleryInterface.IItemList) => {
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

	const rendyItemGallery = ({ item }: GalleryInterface.IItemGallery) => {
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
			<View>
				<Button
					backgroundColor={ Colors.blue.light }
					onPress={ () => NavigationHelper.push('CameraGallery') }
					buttonStyle={ styles.button }
				>
					<Icons
						name='camera'
						color={ Colors.white.default }
						size={ 24 } />
				</Button>
			</View>
		</Container>
	);
};

export default MiniGallery;
