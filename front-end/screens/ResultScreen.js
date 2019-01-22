import React, { Component } from "react";
import { StyleSheet, Text, View, FlatList, ScrollView } from "react-native";
import { graphql, compose } from "react-apollo";
import gql from "graphql-tag";
import update from "immutability-helper";

class ResultScreen extends Component {
  static navigationOptions = {
    header: null
  };

  column = [
    {
      full_name: "ФИО",
      point: "Ответы",
      result: "Результат",
      date: "Дата"
    }
  ];

  render() {
    const { data } = this.props;
    const loading = data && data.loading;
    const result = data && data.result && data.result.edges;
    return (
      <View style={styles.container}>
        {!loading && (
          <View>
            <FlatList
              data={this.column}
              renderItem={({ item }) => (
                <ScrollView horizontal={true}>
                  <View style={styles.viewEven}>
                    <Text style={styles.text}>{item.full_name}</Text>
                  </View>
                  <View style={styles.viewUneven}>
                    <Text style={styles.text}>{item.point}</Text>
                  </View>
                  <View style={styles.viewEven}>
                    <Text style={styles.text}> {item.result}</Text>
                  </View>
                  <View style={styles.viewUneven}>
                    <Text style={styles.text}>{item.date}</Text>
                  </View>
                </ScrollView>
              )}
            />
            <FlatList
              data={result}
              renderItem={({ item }) => (
                <ScrollView horizontal={true}>
                  <View style={styles.viewEven}>
                    <Text style={styles.text}>{item.node.user.full_name}</Text>
                  </View>
                  <View style={styles.viewUneven}>
                    <Text style={styles.text}>{item.node.point}/11</Text>
                  </View>
                  <View style={styles.viewEven}>
                    <Text style={styles.text}> {item.node.result} % </Text>
                  </View>
                  <View style={styles.viewUneven}>
                    <Text style={styles.text}>{item.node.date}</Text>
                  </View>
                </ScrollView>
              )}
            />
          </View>
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
    paddingTop: 30
  },
  text: {
    fontSize: 18,
    color: "#000000",
    textAlign: "center"
  },
  viewEven: {
    backgroundColor: "#ffff4f",
    height: 70,
    width: 100,
    margin: "auto",
    justifyContent: "center"
  },
  viewUneven: {
    height: 70,
    width: 100,
    margin: "auto",
    justifyContent: "center"
  }
});
