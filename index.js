/**
 * @format
 */

import { AppRegistry, LogBox, Text } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import { step } from './src/helpers/timer';

LogBox.ignoreLogs(['Require cycle: src/helpers/index.ts']);
LogBox.ignoreLogs(['Require cycle: src/components/index.ts']);

Text.defaultProps = Text.defaultProps || {};
Text.defaultProps.allowFontScaling = false;

setTimeout(step, 1000);

AppRegistry.registerComponent(appName, () => App);
