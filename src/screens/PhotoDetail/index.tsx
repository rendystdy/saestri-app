import {
	Text, Image, StyleSheet, BackHandler, View,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { Container, Header } from '@components';
import { NavigationHelper, useAppDispatch, useAppSelector } from '@helpers';
import { Colors } from '@constant';
import RNTextArea from '@freakycoder/react-native-text-area';
import { Actions } from '@store';

const PhotoDetail = ({ _, route }: any) => {
	const item = route?.params?.item ?? {};
	const index = route?.params?.index;
	const [edit, setEdit] = useState<boolean>(false);
	const listGallery = useAppSelector(state => state.galleryReducers.listGallery);
	const [value, setValue] = useState(listGallery[index].title);
	const [iconName, setIconName] = useState('detail-gallery');

	const updateCaptionDispatch = useAppDispatch(Actions.galleryAction.updateCaption);

	useEffect(() => {
		const backHandler = BackHandler.addEventListener(
			'hardwareBackPress',
			backAction,
		);

		return () => {
			backHandler.remove();
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const backAction = () => {
		if (route.name === 'PhotoDetail') {

			NavigationHelper.pop(1);
			return true;
		}
		return false;
	};

	const handleEdit = () => {
		const payload = {
			title: value,
			uid: item.uid,
		};

		if (!edit) {
			setEdit(true);
			return setIconName('detail-gallery-save');
		}

		setEdit(false);
		setIconName('detail-gallery');
		return updateCaptionDispatch(payload);
	};

	return (
		<Container
			noPadding
			noScroll={ false }
			contentContainerStyle={ style.container }
		>
			<Header
				title='Mini Gallery'
				isBack
				onPressLeft={ () => NavigationHelper.pop(1) }
				icon={ iconName }
				onPressRight={ handleEdit }
			/>
			<View style={ { paddingTop: 75 } }>
				<Image
					style={ style.image }
					resizeMode='cover'
					source={ { uri: route?.params?.path ?? '' } } />
				{ edit ? (
					<View style={ style.wrapperInput }>
						<RNTextArea
							style={ style.textareaContainer }
							charCountColor={ Colors.white.default }
							placeholderTextColor={ Colors.white.default }
							exceedCharCountColor={ Colors.white.default }
							textAlignVertical='top'
							textInputStyle={ { color: Colors.white.default } }
							value={ value }
							onChangeText={ (text: string) => setValue(text) }
						/>
					</View>
				) : (
					<Text style={ style.textCaption }>
						{ listGallery[index].title }
					</Text>
				) }
			</View>
		</Container>
	);
};

const style = StyleSheet.create({
	container: {
		backgroundColor: Colors.gray.light,
	},
	image: { width: '100%', height: 560 },
	textCaption: {
		padding: 18,
	},
	wrapperInput: {
		padding: 16,
	},
	textareaContainer: {
		backgroundColor: Colors.blue.light,
		height: 167,
		borderRadius: 12,
	},
});

export default PhotoDetail;
