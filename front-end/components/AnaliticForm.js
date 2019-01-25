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
//import AnswerCurrect from "./AnswerCurrect";

export default class AnaliticForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id_question: null
    };
    this.openAnswerCurrect = this.openAnswerCurrect.bind(this);
  }

  openAnswerCurrect(id_question) {
    this.setState({ id_question });
  }

  column = [
    {
      answer: "Ответы пользователя",
      answerUser: "Ответы билета"
    }
  ];

  render() {
    const { id_question } = this.state;
    const { data, id_user } = this.props;
    const loading = data && data.loading;
    const answer = data && data.answer && data.answer.edges;
    const answer_user = data && data.answer_user && data.answer_user.edges;
    return (
      <View style={styles.container}>
        {!loading && (
          <View>
            <FlatList
              data={this.column}
              renderItem={({ item }) => (
                <ScrollView horizontal={true}>
                  <View style={styles.viewEven}>
                    <Text style={styles.text}>{item.answer}</Text>
                  </View>
                  <View style={styles.viewUneven}>
                    <Text style={styles.text}>{item.answerUser}</Text>
                  </View>
                </ScrollView>
              )}
            />
            <ScrollView horizontal={true}>
              <FlatList
                data={answer_user}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    style={styles.viewEven}
                    onPress={this.openAnswerCurrect({
                      item: { node: id_question }
                    })}
                  >
                    <Text style={styles.text}>{item.node.name}</Text>
                  </TouchableOpacity>
                )}
              />
            </ScrollView>
          </View>
        )}
      </View>
    );
  }
}

//TO-DO фрагмент 76 строки
// {id_question === null && (
//   <AnswerCurrect id_question={id_question} />
// )}

// const ANSWER_USER = gql`
//   query AnswerUser($id_ticket: Int!, $id_user: Int!) {
//         answer_user(id_ticket: $id_ticket, id_user: $id_user) {
//           edges {
//             node {
//               id_question
//               name
//             }
//           }
//         }
//       }
//     }
//   }
// `;
// const answer_user = graphql(ANSWER_USER, {
//   options: ({ id_ticket, id_user }) => ({
//     variables: { id_ticket, id_user }
//   })
// });

// export default compose(answer_user)(AnaliticForm);

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
