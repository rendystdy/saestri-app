import { Dispatch } from 'redux';

import { Dispatches } from '@constant';
import { GalleryInterface } from '@interfaces';
import { NavigationHelper } from '@helpers';
import { EntriesEntity } from 'src/interfaces/gallery';

export default {
	deletePhotos: (payload: EntriesEntity[]) => (dispatch: Dispatch) => {
		dispatch({
			type: Dispatches.DELETE_IMAGE,
			payload,
		});
	},
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

	updateCaption: (payload: GalleryInterface.UpdateCaption) => (dispatch: Dispatch) => {
		dispatch({
			type: Dispatches.EDIT_CAPTION,
			payload: payload,
		});
	},

};
