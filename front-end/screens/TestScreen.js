import React, { Component } from "react";
import { graphql, compose } from "react-apollo";
import gql from "graphql-tag";
import update from "immutability-helper";
import Wisard from "../components/wizard/Wizard";

class TestScreen extends Component {
  state = {
    question: {
      name:
        'На какие электроустановки распространяются "правила технической эксплуатации электроустановок потребителей"?',
      answer: [
        {
          id_answer: 0,
          name: "Напряжением до 500 кВ включительно",
          checked: false
        },
        {
          id_answer: 1,
          name: "Напряжением до 350 кВ включительно",
          checked: false
        },
        {
          id_answer: 2,
          name: "Напряжением до 220 кВ включительно",
          checked: false
        },
        {
          id_answer: 3,
          name: "Напряжением до 110 кВ включительно",
          checked: false
        }
      ]
    }
  };
  _handleChecked = ({ id_answer, checked }) => {
    if (this.state.id === undefined) {
      this.setState(
        update(this.state, {
          question: { answer: { [id_answer]: { checked: { $set: checked } } } },
          id: { $set: id_answer }
        })
      );
    } else {
      this.setState(
        update(this.state, {
          question: {
            answer: {
              [id_answer]: { checked: { $set: checked } },
              [this.state.id]: {
                checked: {
                  $set: false
                }
              }
            }
          },
          id: { $set: id_answer }
        })
      );
    }
  };

  render() {
    return (
      <Wisard
        question={this.state.question}
        answer={this.state.question.answer}
        handleChecked={this._handleChecked}
      />
    );
  }
}
export default TestScreen;
