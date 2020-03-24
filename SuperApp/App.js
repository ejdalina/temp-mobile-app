/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  StatusBar,
} from 'react-native';
import {
  Colors,
} from 'react-native/Libraries/NewAppScreen';
import MyWebComponent from './WebContainer';
import ChatRoomComponent from './ChatSample';

const App = () => {
  return (
    // <StatusBar barStyle="dark-content" />
    <SafeAreaView style={{ flex: 1 }}>
      {/* <ChatRoomComponent /> */}
      <MyWebComponent />
    </SafeAreaView>
  )
};

export default App;
