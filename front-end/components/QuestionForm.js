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
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     question: {}
  //   };
  // }
  // componentDidMount() {
  //   const { step } = this.props;
  //   const questions =
  //     this.props.data &&
  //     this.props.data.ticket &&
  //     this.props.data.ticket.question;
  //   this.setState({ question: questions });
  // }
  render() {
    //  console.log("state", this.state);
    console.log("data", this.props.data);
    const question =
      this.props.data &&
      this.props.data.ticket &&
      this.props.data.ticket.question;
    return (
      <View style={styles.container}>
        <Text style={styles.text}>
          Вопрос {this.props.step}: {question && question.name}
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
                checked={false}
                onPress={checked =>
                  this.props.handleChecked({
                    id_answer: el.node.id_answer,
                    checked: !el.checked
                  })
                }
              />
            </View>
          ))}
        {this.props.error !== 0 && (
          <Text style={styles.error}>{this.props.error}</Text>
        )}
      </View>
    );
  }
}

const TICKET = gql`
  query Ticket($id_ticket: Int!, $number: Int!) {
    ticket(id: $id_ticket) {
      question(id: $id_ticket, number: $number) {
        name
        answer {
          edges {
            node {
              id
              name
            }
          }
        }
      }
    }
  }
`;
const ticket = graphql(TICKET, {
  options: ({ step }) => ({
    variables: { id_ticket: 2, number: step }
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
