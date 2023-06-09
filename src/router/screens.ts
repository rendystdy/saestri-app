import { Home, Splash, ContractionTimer } from '@screens';

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
] as const;
