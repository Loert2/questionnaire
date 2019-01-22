import React, { Component } from "react";
import { graphql, compose } from "react-apollo";
import gql from "graphql-tag";
import update from "immutability-helper";
import Actions from "./Actions";
import QuestionForm from "./QuestionForm";
import { View } from "react-native";

class TestForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      step: 1,
      answer: {
        id_answer: null
      },
      answer_user: []
    };
    this.goNext = this.goNext.bind(this);
    this.goPrevious = this.goPrevious.bind(this);
    this.submitBtn = this.submitBtn.bind(this);
  }

  _handleChecked = ({ id_answer }) => {
    this.setState({
      answer: { id_answer }
    });
  };

  //TO-DO отладить payload
  goNext() {
    const {
      step,
      answer: { id_answer }
    } = this.state;
    const { id_user, id_ticket, addAns } = this.props;
    addAns({
      id_user,
      id_ticket,
      id_answer
    }).then(res => {
      // this.setState(
      //   update(this.state, {
      //     answer_user: {
      //       $push: [{ res: { answer_user } }]
      //     }
      //   })
      // );
    });
    this.setState(update(this.state, { step: { $set: step + 1 } }));
  }

  goPrevious() {
    const { step } = this.state;
    this.setState(
      update(this.state, {
        step: { $set: step - 1 }
      })
    );
    // this.setState(
    //   update(this.state, {
    //     step: { $set: step - 1 },
    //     answer: { id_answer: { $set: this.props.data.answer.id_answer } }
    //   })
    // );
  }

  async submitBtn() {
    const {
      answer: { id_answer }
    } = this.state;
    const { id_user, id_ticket, addAns, addRes, endBtn } = this.props;
    console.log("addRes", this.props);
    await addAns({
      id_user,
      id_ticket,
      id_answer
    });
    await addRes({
      id_test: 1,
      id_user,
      id_ticket
    }).then(res => endBtn());
  }

  render() {
    const { step, answer } = this.state;
    const { id_ticket } = this.props;
    return (
      <View>
        <QuestionForm
          step={step}
          answer={answer.id_answer}
          id_ticket={id_ticket}
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

const ANSWER_MUTATION = gql`
  mutation addAnswer($inputAnswerUser: AnswerUserInput!) {
    AddAnswerUser(input: $inputAnswerUser) {
      answer_user {
        id_answer_user
      }
      error
    }
  }
`;

const answer = graphql(ANSWER_MUTATION, {
  props: ({ mutate }) => ({
    addAns: inputAnswerUser => mutate({ variables: { inputAnswerUser } })
  })
});

const RESULT_MUTATION = gql`
  mutation countingResult($inputResult: InputResult!) {
    CountingResult(input: $inputResult) {
      error
    }
  }
`;

const res = graphql(RESULT_MUTATION, {
  props: ({ mutate }) => ({
    addRes: inputResult => mutate({ variables: { inputResult } })
  })
});

export default compose(
  answer,
  res
)(TestForm);
