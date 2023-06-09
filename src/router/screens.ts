import { Home, Splash, ContractionTimer,ContractionHistoryScreen } from '@screens';

export const screens = [
	{
		name: 'Splash',
		component: Splash,
	},
	{
		name: 'Home',
		component: ContractionHistoryScreen,
	},
	{
		name: 'ContractionTimer',
		component: ContractionTimer,
	},
] as const;
