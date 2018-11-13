/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native';
// import { useStrict } from "mobx";
import { StackNavigator } from "react-navigation";
import { Provider } from 'react-redux';

import Home from './src/screens/Home'
import Pages from './src/screens/Pages'
import EditInfo from './src/screens/EditInfo'
import UploadImage from './src/screens/UploadImage'

import createStore from './src/store/createStore'

const store = createStore()

type Props = {};
export default class App extends Component<Props> {
  render() {
    return (
      <Provider store={store}>
        <AppNavigator />
      </Provider>
    );
  }
}

// useStrict(true);

const HomeNavigator = StackNavigator({
  Home: {screen: Home},
  Pages: {screen: Pages},
  EditInfo: {screen: EditInfo},
  UploadImage: {screen: UploadImage}
}, {
  headerMode: "none"
});

const AppNavigator = StackNavigator({
  Main: { screen: HomeNavigator }
},{
  headerMode: "none"
});

export { AppNavigator };