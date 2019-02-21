/**
 * @format
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

// Okay, so, apparently RN uses an old javascript core (JSC) on android causing
// it to not recognize things that are needed for newer react native projects
// The solution is to polyfill Symbol (in this case using the following code:
// symbol polyfills:
global.Symbol = require('core-js/es6/symbol');
require('core-js/fn/symbol/iterator');
// collection fn polyfills
require('core-js/fn/map');
require('core-js/fn/set');
require('core-js/fn/array/find');
// See: https://github.com/facebook/react-native/issues/15902

//Note: You must import firebase before any other code runs due to a bug in
//  firebase versions greater than 5.0.2
//  This fixes the "Objects are not valid as a React child" bug
import firebase from 'firebase';
import { AppRegistry, Platform } from 'react-native';
import App from './src/App';
import { name as appName } from './app.json';

AppRegistry.registerComponent(appName, () => App);
