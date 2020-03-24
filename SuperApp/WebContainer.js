import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Button,
  TextInput,
  ScrollView
} from 'react-native';
import { WebView } from 'react-native-webview';

class MyWebComponent extends Component {
  webView = null;

  state = {
    showMiniApp: false,
    breeds: [],
    dataToSend: 'THIS DATA IS FROM CONTAINER APP.',
  }


  renderItem = (item) => {
    return (
      <Text>{item.name}</Text>
    )
  }

  injectData = () => {
    const clientResponseCode = `window.postMessage('${this.state.dataToSend}', "*"); true`;
    return clientResponseCode;
  }

  renderMiniApp = () => {
    const { showMiniApp } = this.state;
    if (showMiniApp) {
      return (
        <View style={{ flex: 1, }}>
          <WebView
            ref={webView => (this.webView = webView)}
            source={{ uri: 'http://192.168.100.20:3000/' }}
            startInLoadingState
            javaScriptEnabledAndroid={true}
            javaScriptEnabled={true}
            onMessage={event => {
              // from client to web app
              if (this.webView) {
                this.webView.injectJavaScript(this.injectData());
              }
              // web to client
              const responseData = event.nativeEvent.data;
              if (responseData) {
                const parseData = JSON.parse(responseData);
                const { data } = JSON.parse(parseData);
                console.log('data: ', data);
                this.setState({ breeds: data });
              }
            }}
          />
          <Text> Click the get breeds button from the mini app to see the list. </Text>
          <FlatList
            style={{ flex: 1 }}
            data={this.state.breeds}
            renderItem={({ item }) => this.renderItem(item)}
            keyExtractor={item => item.id}
          />
        </View>
      )
    } else {
      return null
    }

  }

  render() {
    const { showMiniApp } = this.state;
    const buttonLabel = showMiniApp ? 'Close mini app' : 'Open mini app'
    return (
      <View style={{ flex: 1, margin: 10 }} >
        <Button
          title={buttonLabel}
          onPress={() => {
            this.setState({ showMiniApp: !showMiniApp });
          }}
        />
        {this.renderMiniApp()}

      </View>
    );
  }
}


export default MyWebComponent;