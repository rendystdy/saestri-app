import { FlatList, View } from 'react-native';
import React, { useState, useEffect } from 'react';

import styles from './style';
import {
	Button, Container, Header, Modal, Text,
} from '@components';
import { NavigationHelper, hasStoragePermission, useAppDispatch, useAppSelector } from '@helpers';
import { GalleryInterface } from '@interfaces';
import dayjs from 'dayjs';
import _ from 'lodash';
import ItemGallery from './components/ItemGallery';
import { Colors } from '@constant';
import Icons from 'react-native-vector-icons/FontAwesome';
import { EntriesEntity } from 'src/interfaces/gallery';
import { Actions } from '@store';

const MiniGallery = () => {
	
	const [deleteMode, setDeleteMode] = useState(false);

	const [deletedEntry, setDeletedEntry] = useState<EntriesEntity[]>([]);

	const deleteDispatch = useAppDispatch(Actions.galleryAction.deletePhotos);

	const { listGallery } = useAppSelector(state => state.galleryReducers);

	const [deleteModal, setDeleteModal] = useState<boolean>(false);

	const [visible, setVisible] = useState(false);

	useEffect(() => {
		hasStoragePermission();
	}, []);

	const groupedImages = () => {
		const resultGroupByMonth = _.groupBy(listGallery, ({ date }) => {
			const d = dayjs(date).format('MMMM YYYY');
			return d;
		});

		const newDataGallery = _.map(resultGroupByMonth, (group, item) => {
			return {
				date: item,
				entries: group,
			};
		});

		// return newDataGalle1ry;
		return newDataGallery;
	};

	const renderItemByDate = ({ item }: GalleryInterface.IItemList) => {
		return (
			<View>
				<Text style={ styles.textDate }>{ item.date }</Text>
				<FlatList
					data={ item.entries }
					numColumns={ 2 }
					style={ { margin: 8 } }
					columnWrapperStyle={ { justifyContent: 'space-between' } }
					keyExtractor={ (entry, index) => index.toString() }
					renderItem={ rendyItemGallery }
				/>
			</View>
		);
	};

	const rendyItemGallery = ({ item }: GalleryInterface.IItemGallery) => {
		const isChecked = deletedEntry.some(entry => item.uid === entry.uid);
		return (
			<ItemGallery
				item={ item }
				onChecked={ deleteCheckboxHandler }
				isChecked={ isChecked }
				isDeleteMode={ deleteMode }
				onPressDetail={ () => NavigationHelper.push('DetailGallery', { ...item }) }
			/>
		);
	};

	const deleteCheckboxHandler = (item: EntriesEntity, isChecked: boolean) => {
		if (isChecked) {
			setDeletedEntry([...deletedEntry.filter(entry => entry.uid !== item.uid)]);
		} else {
			setDeletedEntry([...deletedEntry, item]);
		}
	};

	const deleteBtnHandler = () => {
		setDeleteModal(true);
	};

	const deleteModalHandler = () => {
		deleteDispatch(deletedEntry);
		setDeleteModal(false);
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
				onPressLeft={ () => NavigationHelper.replace('Home') }
				icon='gallery'
				onPressRight={ () => setDeleteMode(!deleteMode) }
			/>
			<FlatList
				data={ groupedImages() }
				nestedScrollEnabled
				keyExtractor={ (entry, i) => i.toString() }
				renderItem={ renderItemByDate }
			/>
			<View style={ styles.footer }>
				{ deleteMode && <Button
					backgroundColor={ Colors.blue.light }
					text='Hapus'
					onPress={ () => setVisible(true) }
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
			<Modal
				visible={ deleteModal }
				onPressBack={ () => setDeleteModal(false) }
				onPressClose={ () => setDeleteModal(false) }
				onPressAgree={ () => deleteModalHandler() }
				titleAgree='Yakin'
				titleBack='Kembali'
				textContent='Apakah anda yakin untuk menghapus gambar?'
			/>
		</Container>
	);
};

export default MiniGallery;
