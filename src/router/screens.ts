import {
	Home,
	ContractionTimer,
	ContractionHistoryScreen,
	Splash,
	MiniGallery,
	CameraGallery,
	AddPhoto,
	DetailGallery,
	PhotoDetail,
	Shop,
} from '@screens';

export const screens = [
	{
		name: 'Splash',
		component: Splash,
	},
	{
		name: 'Home',
		component: Home,
	},
	{
		name: 'ContractionTimer',
		component: ContractionTimer,
	},
	{
		name: 'ContractionHistory',
		component: ContractionHistoryScreen,
	},
	{
		name: 'MiniGallery',
		component: MiniGallery,
	},
	{
		name: 'CameraGallery',
		component: CameraGallery,
	},
	{
		name: 'AddPhoto',
		component: AddPhoto,
	},
	{
		name: 'DetailGallery',
		component: DetailGallery,
	},
	{
		name: 'PhotoDetail',
		component: PhotoDetail,
	},
	{
		name: 'Shop',
		component: Shop,
	},
] as const;
