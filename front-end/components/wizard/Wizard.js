import React, { PureComponent } from "react";

import Actions from "./Actions";
import QuestionForm from "../QuestionForm";
import { View } from "react-native";

class Wizard extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      step: 1
    };
    this.goNext = this.goNext.bind(this);
    this.goPrevious = this.goPrevious.bind(this);
  }

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

    this.setState({ step: step + 1 });
  }

  goPrevious() {
    const { step } = this.state;
    this.setState({ step: step - 1 });
  }

  submitBtn() {
    console.log("success");
  }
  render() {
    const { step } = this.state;
    return (
      <View>
        <QuestionForm
          step={step}
          question={this.props.question}
          answer={this.props.answer}
          handleChecked={this.props.handleChecked}
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

export default Wizard;
