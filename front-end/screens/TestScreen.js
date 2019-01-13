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
        answer: []
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
      case 2:
        console.log("2");
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
    const { step } = this.state;
    return (
      <View>
        <QuestionForm step={step} handleChecked={this._handleChecked} />
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
