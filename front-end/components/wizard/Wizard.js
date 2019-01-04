import React, { PureComponent } from "react";

import Actions from "./Actions";

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
    const { nextBtn } = this.props;
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
    nextBtn && nextBtn.onClickHandler();
  }

  goPrevious() {
    const { previousBtn } = this.props;
    const { step } = this.state;
    this.setState({ step: step - 1 });
    previousBtn && previousBtn.onClickHandler();
  }

  render() {
    const { title, steps, previousBtn, nextBtn, submitBtn } = this.props;
    const nBtn = { ...nextBtn, onClickHandler: this.goNext };
    const pBtn = { ...previousBtn, onClickHandler: this.goPrevious };
    const { step } = this.state;
    return (
      <Actions
        step={step}
        lastStep={11}
        previousBtn={pBtn}
        nextBtn={nBtn}
        submitBtn={submitBtn}
      />
    );
  }
}

export default Wizard;
