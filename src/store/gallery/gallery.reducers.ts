/* eslint-disable @typescript-eslint/no-explicit-any */
import { Dispatches } from '@constant';
import { GalleryInterface } from '@interfaces';

// const DUMMY_DATA = [{ date: '2023-06-20T14:29:42.618Z', image: 'file:///data/user/0/com.saestriapp/cache/mrousavy4997210653534093267.jpg', title: 'testiing update lagi ya 11', uid: 1687271382 }, { date: '2023-06-20T17:03:38.709Z', image: 'file:///data/user/0/com.saestriapp/cache/mrousavy5266769746314562303.jpg', title: 'testing malam hari 22', uid: 1687280618 }, { date: '2023-06-22T03:16:36.234Z', image: 'file:///data/user/0/com.saestriapp/cache/mrousavy64341813071561399.jpg', title: 'testing 123', uid: 1687403796 }, { caption: 'test description 1 ya', date: '2023-06-26T03:14:16.396Z', image: 'file:///data/user/0/com.saestriapp/cache/mrousavy8985848159532894205.jpg', title: 'test caption 1 lagi', uid: 1687749256 }];

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
		case Dispatches.EDIT_CAPTION:
			const findIndex = state.listGallery.findIndex((item => item.uid === payload.uid));
			const newListGallery = state.listGallery;
			
			newListGallery[findIndex].title = payload.title;
			newListGallery[findIndex].caption = payload.caption;

			return {
				...state,
				listGallery: newListGallery,
				loading: false,
			};
		
		default:
			return state;
	}
};

export default timerReducers;
