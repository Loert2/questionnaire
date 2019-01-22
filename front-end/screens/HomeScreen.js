import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";

export default class HomeScreen extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Тест по электробезопасности</Text>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#ffff4f",
    marginTop: 150,
    marginBottom: 350
  },
  text: {
    color: "#000000",
    fontSize: 32,
    lineHeight: 50,
    textAlign: "center",
    fontFamily: "space-mono"
  }
});
