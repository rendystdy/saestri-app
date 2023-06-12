import { Home, Splash, ContractionTimer, ContractionHistoryScreen } from '@screens';

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
] as const;
