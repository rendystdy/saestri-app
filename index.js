/**
 * @format
 */

import { AppRegistry, LogBox } from 'react-native';
import App from './App';
import { name as appName } from './app.json';

LogBox.ignoreLogs(['Require cycle: src/helpers/index.ts']);
LogBox.ignoreLogs(['Require cycle: src/components/index.ts']);

AppRegistry.registerComponent(appName, () => App);
