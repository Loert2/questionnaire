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
      answer: {
        id_answer: null
      }
    };
    this.goNext = this.goNext.bind(this);
    this.goPrevious = this.goPrevious.bind(this);
  }

  _handleChecked = ({ id_answer }) => {
    this.setState({
      answer: { id_answer }
    });
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
    const { step, answer } = this.state;
    return (
      <View>
        <QuestionForm
          step={step}
          answer={answer.id_answer}
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
