import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";
import { graphql, compose } from "react-apollo";
import gql from "graphql-tag";

class HomeScreen extends Component {
  componentDidMount() {
    const { data, navigation } = this.props;
    const user = data && data.user;
    if (user !== null) {
      navigation.push("Test");
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Тест по электробезопасности</Text>
      </View>
    );
  }
}

const USER = gql`
  query User {
    user {
      id_user
    }
  }
`;

const user = graphql(USER);

export default compose(user)(HomeScreen);

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
