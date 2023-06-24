import {
	ActivityIndicator,
	Image, Keyboard, Text, TouchableOpacity, View,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import { Button, Container, Header } from '@components';
import { NavigationHelper, useAppDispatch, useAppSelector } from '@helpers';
import RNTextArea from '@freakycoder/react-native-text-area';

import styles from './style';
import { Colors } from '@constant';
import { GalleryInterface } from '@interfaces';
import dayjs from 'dayjs';
import { Actions } from '@store';

const AddPhoto = ({ _, route }: any) => {
	const pathUrl = `file://${ route?.params?.path }`;
	const galleryActionDispatch = useAppDispatch(Actions.galleryAction.addPhoto);
	const [captionText, setCaptionText] = useState<string>('');
	const [titleText, setTitleText] = useState<string>('');

	const { loading } = useAppSelector(state => state.galleryReducers);

	useEffect(() => {
		const hideSubscription = Keyboard.addListener('keyboardDidHide', () => {
			Keyboard.dismiss();
		});

		return () => {
			hideSubscription.remove();
		};
	}, []);

	const handleSavePhoto = () => {
		const payload: GalleryInterface.EntriesEntity = {
			image: pathUrl,
			title: titleText,
			caption: captionText,
			uid: dayjs().unix(),
			date: dayjs(),
		};

		galleryActionDispatch(payload);
	};

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
					source={ { uri: pathUrl } }
					style={ styles.image }
					resizeMode='cover'
				/>
				<View style={ styles.wrapperRetake }>
					<TouchableOpacity
						onPress={ () => NavigationHelper.pop(1) }
					>
						<Text style={ styles.textRetake }>Retake</Text>
					</TouchableOpacity>
				</View>
				<View style={ styles.wrapperTextArea }>
					<RNTextArea
						style={ styles.titleTextAreaContainer }
						charCountColor={ Colors.white.default }
						placeholderTextColor={ Colors.white.default }
						exceedCharCountColor={ Colors.white.default }
						maxCharLimit={ 100 }
						textAlignVertical='top'
						textInputStyle={ { color: Colors.white.default } }
						placeholder={ 'Title' }
						value={ titleText }
						onChangeText={ (text: string) => setTitleText(text) }
					/>
					<RNTextArea
						style={ styles.textareaContainer }
						charCountColor={ Colors.white.default }
						placeholderTextColor={ Colors.white.default }
						exceedCharCountColor={ Colors.white.default }
						maxCharLimit={ 500 }
						textAlignVertical='top'
						textInputStyle={ { color: Colors.white.default } }
						placeholder={ 'Caption' }
						value={ captionText }
						onChangeText={ (text: string) => setCaptionText(text) }
					/>
				</View>
				<View style={ { marginBottom: 24 } }>
					<Button
						backgroundColor={ Colors.blue.input }
						onPress={ handleSavePhoto }
						buttonStyle={ styles.button }
					>
						{ !loading && <Text style={ styles.textStyle }>Save</Text> }
						{ loading && <ActivityIndicator
							size={ 'small' }
							color={ Colors.white.default } /> }
					</Button>
				</View>
			</View>
		</Container>
	);
};

export default AddPhoto;
