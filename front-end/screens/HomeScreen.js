import React, { Component } from "react";
import { StyleSheet, Text, View, Dimensions } from "react-native";
import { graphql, compose } from "react-apollo";
import gql from "graphql-tag";
import user from "../query/UserQuery";

class HomeScreen extends Component {
  componentWillReceiveProps(nextProps) {
    const { navigation, data } = nextProps;
    const user = data && data.user;
    data.refetch();
    if (data.loading === false && user !== null) {
      navigation.push("Test");
    }
  }

  render() {
    const { container, text, lineMain, lineAngular, img } = styles;
    return (
      <View style={container}>
        <View style={lineMain}>
          <Text style={text}>Тест по электробезопасности</Text>
        </View>
        <View style={lineAngular} />
      </View>
    );
  }
}

export default compose(user)(HomeScreen);

const styles = StyleSheet.create({
  container: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height
  },
  lineMain: {
    flexGrow: 1,
    backgroundColor: "#ffff4f",
    marginTop: 150,
    marginBottom: 400
  },
  lineAngular: {
    transform: [{ rotate: "-55deg" }],
    position: "absolute",
    marginTop: 450,
    marginLeft: 240,
    paddingTop: 20,
    paddingBottom: 20,
    width: 250,
    backgroundColor: "#ffff4f"
  },
  text: {
    color: "#000000",
    fontSize: 32,
    lineHeight: 50,
    textAlign: "center",
    fontFamily: "space-mono"
  }
});
