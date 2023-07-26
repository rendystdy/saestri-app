/**
 * @format
 */

import { AppRegistry, LogBox, Text } from 'react-native';
import App from './App';
import { name as appName } from './app.json';

LogBox.ignoreLogs(['Require cycle: src/helpers/index.ts']);
LogBox.ignoreLogs(['Require cycle: src/components/index.ts']);

Text.defaultProps = Text.defaultProps || {};
Text.defaultProps.allowFontScaling = false;

AppRegistry.registerComponent(appName, () => App);
