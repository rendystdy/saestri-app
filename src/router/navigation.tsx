import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { NavigationHelper } from '@helpers';
import { screens } from './screens';
import { Text } from '@components';

const Stack = createNativeStackNavigator();

const AppRouter = () => {
	return (
		<NavigationContainer ref={ NavigationHelper.navigationRef }>
			<Stack.Navigator
				initialRouteName='Home'
				screenOptions={ { headerShown: true } }>
				{
					screens.map((screen, index) => {
						return (
							<Stack.Screen
								key={ index }
								name={ screen.name }
								component={ screen.component }
								options={ {
									title: 'Contraction History',
								} }
							/>
						);
					})
				}
			</Stack.Navigator>
		</NavigationContainer>
	);
};

export default AppRouter;
