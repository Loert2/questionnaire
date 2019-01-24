import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";
import { CheckBox } from "react-native-elements";
import { graphql, compose } from "react-apollo";
import gql from "graphql-tag";
import update from "immutability-helper";

class QuestionForm extends Component {
  render() {
    const { data, answer, step } = this.props;
    const question = data && data.ticket && data.ticket.question;
    const number_of_question =
      data && data.ticket && data.ticket.number_of_question;
    const { container, text } = styles;
    return (
      <View style={container}>
        <Text style={text}>
          Вопрос {step}/{number_of_question}: {question && question.name}
        </Text>
        {question &&
          question.answer &&
          question.answer.edges &&
          question.answer.edges.map(el => (
            <View>
              <CheckBox
                key={el.node.id}
                title={el.node.name}
                checkedIcon="dot-circle-o"
                uncheckedIcon="circle-o"
                checkedColor="#ffff4f"
                checked={el.node.id_answer === answer ? true : false}
                onPress={checked =>
                  this.props.handleChecked({
                    id_answer: el.node.id_answer
                  })
                }
              />
            </View>
          ))}
      </View>
    );
  }
}

const TICKET = gql`
  query Ticket($id_ticket: Int!, $number: Int!) {
    ticket(id: $id_ticket) {
      number_of_question
      question(id: $id_ticket, number: $number) {
        name
        answer {
          edges {
            node {
              id_answer
              name
            }
          }
        }
      }
    }
  }
`;
const ticket = graphql(TICKET, {
  options: ({ id_ticket, step }) => ({
    variables: { id_ticket, number: step }
  })
});

export default compose(ticket)(QuestionForm);

const styles = StyleSheet.create({
  container: {
    paddingTop: 5
  },
  error: {
    color: "red",
    textAlign: "center"
  },
  text: {
    padding: 23,
    color: "#000000",
    fontSize: 18
  }
});
