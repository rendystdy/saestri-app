import { Text, Image, StyleSheet, BackHandler } from 'react-native';
import React, { useEffect } from 'react';
import { Container, Header } from '@components';
import { NavigationHelper } from '@helpers';
import { Colors } from '@constant';

const PhotoDetail = ({ _, route }: any) => {
	const item = route?.params?.item ?? {};

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
	
	return (
		<Container
			noPadding
			noScroll
			nestedScrollEnabled
			contentContainerStyle={ style.container }
		>
			<Header
				title='Mini Gallery'
				isBack
				onPressLeft={ () => NavigationHelper.pop(1) }
			/>

			<Image
				style={ style.image }
				resizeMode='cover'
				source={ { uri: route?.params?.path ?? '' } } />
			<Text style={ style.textCaption }>
				{ item.title }
			</Text>
		</Container>
	);
};

const style = StyleSheet.create({
	container: {
		backgroundColor: Colors.gray.light,
		flex: 1,
		paddingTop: 75,
	},
	image: { width: '100%', height: '70%' },
	textCaption: {
		padding: 18,
	},
});

export default PhotoDetail;
