import { ContractionHistoryScreen, Home, Splash } from '@screens';

export const screens = [
	{
		name: 'Splash',
		component: Splash,
	},
	{
		name: 'Home',
		component: ContractionHistoryScreen,
	},
] as const;
