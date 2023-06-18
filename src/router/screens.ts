import {
	Home,
	ContractionTimer,
	ContractionHistoryScreen,
	Splash,
	MiniGallery,
	CameraGallery,
	AddPhoto,
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
] as const;
