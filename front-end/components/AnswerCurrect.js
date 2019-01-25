import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ScrollView,
  TouchableOpacity
} from "react-native";
import { graphql, compose } from "react-apollo";
import gql from "graphql-tag";

class AnswerCurrect extends Component {
  render() {
    const loading = data && data.loading;
    return (
      <View>
        {!loading && (
          <FlatList
            data={answer}
            renderItem={({ item }) => (
              <View style={styles.viewUneven}>
                <Text style={styles.text}>{item.node.name}</Text>
              </View>
            )}
          />
        )}
      </View>
    );
  }
}

const ANSWER = gql`
  query Answer($id_question: Int!) {
    question(id: $id_question) {
      answer {
        name
      }
    }
  }
`;
const answer = graphql(ANSWER, {
  options: ({ $id_question }) => ({
    variables: { $id_question }
  })
});

export default compose(answer)(AnswerCurrect);

const styles = StyleSheet.create({
  text: {
    fontSize: 18,
    color: "#000000",
    textAlign: "center"
  },
  viewUneven: {
    height: 70,
    width: 100,
    margin: "auto",
    justifyContent: "center"
  }
});
