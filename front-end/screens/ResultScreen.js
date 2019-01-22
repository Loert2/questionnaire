import React, { Component } from "react";
import { StyleSheet, Text, View, FlatList } from "react-native";
import { graphql, compose } from "react-apollo";
import gql from "graphql-tag";
import update from "immutability-helper";

class ResultScreen extends Component {
  static navigationOptions = {
    header: null
  };

  render() {
    const { data } = this.props;
    const loading = data && data.loading;
    const result = data && data.result && data.result.edges;
    return (
      <View style={styles.container}>
        {!loading && (
          <FlatList
            data={result}
            renderItem={({ item }) => (
              <Text style={styles.text}>
                {item.node.user && item.node.user.full_name} {item.node.point}{" "}
                {item.node.result}% {item.node.date}
              </Text>
            )}
          />
        )}
      </View>
    );
  }
}

const RESULT_DATA = gql`
  query Result {
    result {
      edges {
        node {
          point
          result
          date
          user {
            full_name
          }
        }
      }
    }
  }
`;

const res_data = graphql(RESULT_DATA);

export default compose(res_data)(ResultScreen);

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
