/* eslint-disable @typescript-eslint/no-explicit-any */
import { Dispatches } from '@constant';
import { GalleryInterface } from '@interfaces';
import dayjs from 'dayjs';

const initialState: GalleryInterface.GalleryState = {
	listGallery: [
		{
			uid: dayjs().unix(),
			title: 'My first USG 1',
			image: 'https://asset-a.grid.id/crop/0x0:0x0/700x465/photo/2020/09/28/3129896145.jpg',
			date: dayjs().format(),
		},
		{
			uid: dayjs().unix(),
			title: 'My first USG 2',
			image: 'https://asset-a.grid.id/crop/0x0:0x0/700x465/photo/2020/09/28/3129896145.jpg',
			date: dayjs().format(),
		},
		{
			uid: dayjs().unix(),
			title: 'My first USG 3',
			image: 'https://asset-a.grid.id/crop/0x0:0x0/700x465/photo/2020/09/28/3129896145.jpg',
			date: dayjs('2023-05-15').format(),
		},
		{
			uid: dayjs().unix(),
			title: 'My first USG 4',
			image: 'https://asset-a.grid.id/crop/0x0:0x0/700x465/photo/2020/09/28/3129896145.jpg',
			date: dayjs('2023-05-15').format(),
		},
	],
	listGalleryGroupByMonth: [],
	loading: false,
};

type Actions = { type: string; payload: any };

const timerReducers = (
	state = initialState,
	action: Actions,
): GalleryInterface.GalleryState => {
	const { type, payload } = action;

	const addPhoto = [...state.listGallery, payload];

	switch (type) {
		case Dispatches.ADD_PHOTO:
			return {
				...state,
				listGallery: addPhoto,
			};
		case Dispatches.SET_LOADING:
			return {
				...state,
				loading: payload,
			};
		
		default:
			return state;
	}
};

export default timerReducers;
