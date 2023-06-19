import { Text, Image, StyleSheet } from 'react-native';
import React, { useRef } from 'react';
import { Container, Header } from '@components';
import { NavigationHelper } from '@helpers';
import { Colors } from '@constant';

const PhotoDetail = ({ _, route }: any) => {
	const item = route?.params?.item ?? {};
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
