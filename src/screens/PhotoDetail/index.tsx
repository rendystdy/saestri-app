import {
	Text, Image, StyleSheet, BackHandler, View,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { Container, Header } from '@components';
import { NavigationHelper, useAppDispatch, useAppSelector } from '@helpers';
import { Colors } from '@constant';
import RNTextArea from '@freakycoder/react-native-text-area';
import { Actions } from '@store';
import dayjs from 'dayjs';
import RNPrint from 'react-native-print';

const PhotoDetail = ({ _, route }: any) => {
	const item = route?.params?.item ?? {};
	const index = route?.params?.index;
	const [edit, setEdit] = useState<boolean>(false);
	const listGallery = useAppSelector(state => state.galleryReducers.listGallery);
	const [value, setValue] = useState(item.title);
	const [valueCaption, setValueCaption] = useState(item.caption);
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
			caption: valueCaption,
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

	const handlePrint = async () => {
		const html = `<head>
		<link rel="stylesheet"
						href="https://fonts.googleapis.com/css?family=Tangerine">
		<style>
			body {
				font-family: 'Helvetica';
				font-size: 12px;
				background-image: url('/${ route?.params.path }');
				background-repeat: no-repeat;
				background-size: contain;
			}
			@font-face {
				font-family: Satisfy;
				src: url(Satisfy-Regular.ttf);
			}
			@font-face {
				font-family: ComicNeue-Regular;
				src: url(ComicNeue-Regular.ttf);
			}
			header{
				font-family: Satisfy;
				font-size: 24pt;
				color: brown;
				margin-top: 2em;
				padding-left: 2em;
			}
			footer {
				font-family: 'Tangerine', serif;
				height: 50px;
				background-color: #fff;
				display: flex;
				justify-content: center;
				padding: 0 20px;
			}
	
			h1{
				font-family: 'Satisfy';
			}
			table {
				width: 100%;
				border-collapse: collapse;
			}
			th, td {
				border: 1px solid #000;
				padding: 5px;
			}
			@media print {
				body {
					font-family: 'Helvetica';
					font-size: 12px;
					background-image: url('pregnancy-journal-background.jpg');
					background-repeat: no-repeat;
					background-size: contain;
				}
				@font-face {
					font-family: Satisfy;
					src: url(Satisfy-Regular.ttf);
				}
				@font-face {
					font-family: 'ComicNeue-Regular';
					src: url(ComicNeue-Regular.ttf);
				}
				header{
					font-family: Satisfy;
					font-size: 24pt;
					color: brown;
					margin-top: 2em;
					padding-left: 2em;
				}
				table {
					width: 100%;
					border-collapse: collapse;
					border: none;
				}
				th, td {
					border: none;
				}
				footer {
				font-family: 'Tangerine', serif;
				height: 50px;
				background-color: #fff;
				display: flex;
				justify-content: center;
				padding: 0 20px;
			}
	
			}
	
		</style>
	</head>
	<body>
		<header>
			<h1>Pregnancy Journal.</h1>
		</header>
		<table>
			<tr>
				<td width='18%' height='310px'>&nbsp;</td>
				<td width='64%'><img src='require(${ route?.params?.path })' alt='usg-bung'></td> 
				<td width='18%'>&nbsp;</td>
			</tr>
			
		</table>
		<div style='padding-top: 16%;'>&nbsp</div>
		<div style='padding-top: 20px; width: 100%; text-align: center; padding-bottom: 30px; font-family: Satisfy; font-size: 20pt;'>
			Thoughts & Feelings
		</div>
		<table>
			<tr>
				<td width='22%' height='310px'>&nbsp</td>
				<td width='64%' style='padding-top: 0; font-family: ComicNeue-Regular; font-size: 14pt;vertical-align: top; text-align: justify;'>
					<div>
						<b>${ item.title }</b>
					</div>
					<div style='font-size: 11pt; color:grey;'>
						<small>20 jan 2023 19:30:56</small>
					</div>
					<div style='margin-top: 5px;'>
						<p>
							${ item.caption }
						</p>
					</div>
				</td>
				<td width='14%'>&nbsp</td>
			</tr>
		</table>
		<footer>
			<p>documented by SAESTRI-Apps &copy 2023 </p>
		</footer>
	</body>
	</html>`;

		await RNPrint.print({
			html: html,
		});
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
							style={ [style.textareaContainer, { marginBottom: 12 }] }
							charCountColor={ Colors.white.default }
							placeholderTextColor={ Colors.white.default }
							exceedCharCountColor={ Colors.white.default }
							textAlignVertical='top'
							textInputStyle={ { color: Colors.white.default } }
							value={ value }
							onChangeText={ (text: string) => setValue(text) }
						/>
						<RNTextArea
							style={ style.textareaContainer }
							charCountColor={ Colors.white.default }
							placeholderTextColor={ Colors.white.default }
							exceedCharCountColor={ Colors.white.default }
							textAlignVertical='top'
							textInputStyle={ { color: Colors.white.default } }
							value={ valueCaption }
							onChangeText={ (text: string) => setValueCaption(text) }
						/>
					</View>
				) : (
					<View>
						<Text onPress={ handlePrint }>PRINT HTML</Text>
						<Text style={ style.textCaption }>
							{ item.title }
						</Text>
						<Text style={ style.textCaption }>
							{ item.caption }
						</Text>
						<Text style={ style.textDate }>{ dayjs(item.date).format('DD MMM YYYY HH:mm:ss') }</Text>
					</View>
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
		color: Colors.black.default,
	},
	wrapperInput: {
		padding: 16,
	},
	textareaContainer: {
		backgroundColor: Colors.blue.light,
		height: 167,
		borderRadius: 12,
	},
	textDate: {
		color: Colors.black.default,
		fontSize: 12,
		fontWeight: '500',
		paddingHorizontal: 18,
	},
});

export default PhotoDetail;
