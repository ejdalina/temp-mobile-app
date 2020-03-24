import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Button,
  TextInput
} from 'react-native';
import { WebView } from 'react-native-webview';
import io from "socket.io-client";

class ChatRoomComponent extends Component {

  state = {
    chatMessage: "",
    chatMessages: []
  }

  componentDidMount() {
    this.socket = io("http://192.168.100.20:4000");
    this.socket.on("chat message", msg => {
      console.log('msg:zzz ', msg);
      this.setState({
        chatMessages: [...this.state.chatMessages, msg]
      });
    });

  }


  submitChatMessage() {
    this.socket.emit('chat message', this.state.chatMessage);
    this.setState({ chatMessage: '' });
  }
  render() {
    const chatMessages = this.state.chatMessages.map(chatMessage => (
      <Text style={{ borderWidth: 2 }}>{chatMessage}</Text>
    ));
    return (

      <View style={{ flex: 1 }}>
        <View style={styles.container}>
          {chatMessages}
          <TextInput
            style={{ height: 40, borderWidth: 2 }}
            autoCorrect={false}
            value={this.state.chatMessage}
            onChangeText={chatMessage => {
              this.setState({ chatMessage });
            }}
          />

        </View>
        <Button
          style={{ flex: 1 }}
          title="Send"
          onPress={() => this.submitChatMessage()} />
      </View>


    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
});

export default ChatRoomComponent;