import React, { Component } from "react";
import { Platform, StatusBar, StyleSheet, View } from "react-native";
import { AppLoading, Font } from "expo";
import AppNavigator from "./navigation/AppNavigator";
import { HttpLink, InMemoryCache } from "apollo-client-preset";
import { ApolloClient } from "apollo-client";
import { ApolloProvider } from "react-apollo";

class App extends Component {
  state = {
    isLoadingComplete: false
  };

  render() {
    if (!this.state.isLoadingComplete && !this.props.skipLoadingScreen) {
      return (
        <AppLoading
          startAsync={this._loadResourcesAsync}
          onError={this._handleLoadingError}
          onFinish={this._handleFinishLoading}
        />
      );
    } else {
      return (
        <View style={styles.container}>
          {Platform.OS === "ios" && <StatusBar barStyle="default" />}
          <ApolloProvider client={client}>
            <AppNavigator />
          </ApolloProvider>
        </View>
      );
    }
  }

  _loadResourcesAsync = async () => {
    return Font.loadAsync({
      "space-mono": require("./assets/fonts/SpaceMono-Regular.ttf")
    });
  };

  _handleLoadingError = error => {
    console.warn(error);
  };

  _handleFinishLoading = () => {
    this.setState({ isLoadingComplete: true });
  };
}
export default App;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  }
});

//server
// const client = new ApolloClient({
//   link: new HttpLink({
//     uri: "http://34.204.2.250:5000",
//     credentials: "include"
//   }),
//   cache: new InMemoryCache()
// });

//emulator
const client = new ApolloClient({
  link: new HttpLink({ uri: "http://10.0.2.2:5000", credentials: "include" }),
  cache: new InMemoryCache()
});
