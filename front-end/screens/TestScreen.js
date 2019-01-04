import React, { Component } from "react";
import { graphql, compose } from "react-apollo";
import gql from "graphql-tag";
import update from "immutability-helper";
import Actions from "../components/Actions";
import QuestionForm from "../components/QuestionForm";
import { View } from "react-native";

class TestScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      step: 1,
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
    this.goNext = this.goNext.bind(this);
    this.goPrevious = this.goPrevious.bind(this);
  }
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

  goNext() {
    const { step } = this.state;
    switch (step) {
      case 1:
        console.log("1");
        break;
      case 2:
        console.log("2");
        break;
    }

    this.setState(update(this.state, { step: { $set: step + 1 } }));
  }

  goPrevious() {
    const { step } = this.state;
    this.setState(update(this.state, { step: { $set: step - 1 } }));
  }

  submitBtn() {
    console.log("success");
  }

  render() {
    const { step, question } = this.state;
    return (
      <View>
        <QuestionForm
          step={step}
          question={question}
          answer={question.answer}
          handleChecked={this._handleChecked}
        />
        <Actions
          step={step}
          lastStep={11}
          previousBtn={this.goPrevious}
          nextBtn={this.goNext}
          submitBtn={this.submitBtn}
        />
      </View>
    );
  }
}
export default TestScreen;
