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

class AnaliticForm extends Component {
  column = [
    {
      number_question: "№",
      answer: "Ответы пользователя",
      answerUser: "Ответы билета"
    }
  ];

  render() {
    const { data } = this.props;
    const loading = data && data.loading;
    const answer_user = data && data.answer_user && data.answer_user.edges;
    return (
      <View>
        {!loading && (
          <View>
            <FlatList
              data={this.column}
              renderItem={({ item }) => (
                <ScrollView horizontal={true}>
                  <View style={styles.viewNumber}>
                    <Text style={styles.text}>{item.number_question}</Text>
                  </View>
                  <View style={styles.viewUneven}>
                    <Text style={styles.text}>{item.answer}</Text>
                  </View>
                  <View style={styles.viewEven}>
                    <Text style={styles.text}>{item.answerUser}</Text>
                  </View>
                </ScrollView>
              )}
            />
            <FlatList
              data={answer_user}
              renderItem={({ item }) => (
                <ScrollView horizontal={true}>
                  <View style={styles.viewNumber}>
                    <Text style={styles.text}>
                      {item.node.question.number_question}
                    </Text>
                  </View>
                  <View style={styles.viewUneven}>
                    <Text style={styles.text}>
                      {item.node.answer_name.name}
                    </Text>
                  </View>
                  <View style={styles.viewEven}>
                    <Text style={styles.text}>
                      {item.node.answer_correct.name}
                    </Text>
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

const ANSWER_UNCORRECT_USER = gql`
  query AnswerUser($id_ticket: Int, $id_user: Int) {
    answer_user(id_ticket: $id_ticket, id_user: $id_user) {
      edges {
        node {
          question {
            number_question
          }
          answer_name {
            name
          }
          answer_correct {
            name
          }
        }
      }
    }
  }
`;
const ans_unc_user = graphql(ANSWER_UNCORRECT_USER, {
  options: ({ id_ticket, id_user }) => ({
    variables: { id_ticket, id_user }
  })
});

export default compose(ans_unc_user)(AnaliticForm);

const styles = StyleSheet.create({
  text: {
    fontSize: 18,
    color: "#000000",
    textAlign: "center"
  },
  viewNumber: {
    backgroundColor: "#ffff4f",
    height: 70,
    width: 40,
    margin: "auto",
    justifyContent: "center"
  },
  viewEven: {
    backgroundColor: "#008000",
    height: 70,
    width: 180,
    margin: "auto",
    justifyContent: "center"
  },
  viewUneven: {
    backgroundColor: "#FF0000",
    height: 70,
    width: 180,
    margin: "auto",
    justifyContent: "center"
  }
});
