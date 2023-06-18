import { Dispatch } from 'redux';

import { Dispatches } from '@constant';
import { GalleryInterface } from '@interfaces';
import { NavigationHelper } from '@helpers';

export default {
	addPhoto: (payload: GalleryInterface.EntriesEntity) => (dispatch: Dispatch) => {
		dispatch({
			type: Dispatches.SET_LOADING,
			payload: true,
		});
		setTimeout(() => {
			dispatch({
				type: Dispatches.ADD_PHOTO,
				payload: payload,
			});
			dispatch({
				type: Dispatches.SET_LOADING,
				payload: false,
			});
			NavigationHelper.push('MiniGallery');
		}, 2000);
	},

};
