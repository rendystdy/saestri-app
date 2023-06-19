/* eslint-disable @typescript-eslint/no-explicit-any */
import { Dispatches } from '@constant';
import { GalleryInterface } from '@interfaces';
import dayjs from 'dayjs';

const initialState: GalleryInterface.GalleryState = {
	listGallery: [],
	listGalleryGroupByMonth: [],
	loading: false,
};

type Actions = { type: string; payload: any };

const timerReducers = (
	state = initialState,
	action: Actions,
): GalleryInterface.GalleryState => {
	const { type, payload } = action;

	switch (type) {
		case Dispatches.ADD_PHOTO:
			return {
				...state,
				listGallery: [...state.listGallery, payload],
			};
		case Dispatches.SET_LOADING:
			return {
				...state,
				loading: payload,
			};
		case Dispatches.DELETE_IMAGE:
			const ids: number[] = payload.map((item:any) => item.uid);
			
			return {
				...state,
				listGallery: state.listGallery.filter(item => !ids.includes(item.uid ?? 0)),
				loading: false,
			};
		
		default:
			return state;
	}
};

export default timerReducers;
