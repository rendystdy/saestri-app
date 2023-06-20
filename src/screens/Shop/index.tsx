import React from 'react';

import { Container, Header } from '@components';
import { NavigationHelper } from '@helpers';
import _ from 'lodash';

const MiniGallery = () => {

	return (
		<Container
			noPadding
			noScroll
			nestedScrollEnabled
			contentContainerStyle={ }>
			<Header
				title='Mini Gallery'
				isBack
				onPressLeft={ () => NavigationHelper.replace('Home') }
			/>
		
		</Container>
	);
};

export default MiniGallery;
