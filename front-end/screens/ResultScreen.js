import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  FlatList
} from "react-native";
import { graphql, compose } from "react-apollo";
import gql from "graphql-tag";
import update from "immutability-helper";

class ResultScreen extends Component {
  static navigationOptions = {
    header: null
  };

  render() {
    const { data } = this.props;
    const result = data && data.result;
    return (
      <View style={styles.container}>
        <FlatList
          data={result && result.edges}
          renderItem={({ item }) => (
            <Text style={styles.text}>
              {item.node.id_user}" "{item.node.point}" "{item.node.result}" % "
            </Text>
          )}
        />
        ))}
      </View>
    );
  }
}

const RESULT = gql`
  query Result {
    result {
      edges {
        node {
          id_user
          point
          result
        }
      }
    }
  }
`;

const result = graphql(RESULT);

export default compose(result)(ResultScreen);

const styles = StyleSheet.create({
  container: {
    paddingTop: 5
  },
  text: {
    padding: 23,
    color: "#000000",
    fontSize: 18
  }
});
