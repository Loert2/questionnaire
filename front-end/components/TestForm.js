import React, { Component } from "react";
import { graphql, compose } from "react-apollo";
import gql from "graphql-tag";
import update from "immutability-helper";
import Actions from "./Actions";
import QuestionForm from "./QuestionForm";
import { View, StyleSheet, Dimensions } from "react-native";

class TestForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      step: 1,
      answer: {
        id_question: null,
        id_answer: null
      },
      answer_user: []
    };
    this.goNext = this.goNext.bind(this);
    this.goPrevious = this.goPrevious.bind(this);
    this.submitBtn = this.submitBtn.bind(this);
  }

  _handleChecked = ({ id_question, id_answer }) => {
    this.setState({
      answer: { id_question, id_answer }
    });
  };

  goNext() {
    const {
      step,
      answer: { id_question, id_answer },
      answer_user
    } = this.state;
    const { id_user, id_ticket, addAns, upAns } = this.props;
    const id_answer_user =
      answer_user[step - 1] && answer_user[step - 1].id_answer_user;
    if (id_answer_user === undefined) {
      addAns({
        id_user,
        id_ticket,
        id_question,
        id_answer
      }).then(res => {
        const answerUserId = res.data.AddAnswerUser.answer_user.id_answer_user;
        this.setState(
          update(this.state, {
            answer_user: {
              $push: [{ id_answer_user: answerUserId }]
            }
          })
        );
      });
    } else {
      upAns({
        id_answer_user,
        id_answer
      });
    }
    this.setState(
      update(this.state, {
        step: { $set: step + 1 },
        answer: { id_question: { $set: null }, id_answer: { $set: null } }
      })
    );
  }

  goPrevious() {
    const { step, answer_user } = this.state;
    const { idAnsUsCollbeck } = this.props;
    const id_answer_user =
      answer_user[step - 2] && answer_user[step - 2].id_answer_user;
    this.setState(
      update(this.state, {
        step: { $set: step - 1 },
        answer: { id_question: { $set: null }, id_answer: { $set: null } }
      })
    );
    idAnsUsCollbeck(id_answer_user);
  }

  async submitBtn() {
    const {
      answer: { id_question, id_answer }
    } = this.state;
    const { id_user, id_ticket, addAns, addRes, endBtn } = this.props;
    await addAns({
      id_user,
      id_ticket,
      id_question,
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
    const { container, transparent } = styles;
    const { id_ticket, data, modalOpen } = this.props;
    const number_of_question =
      data && data.ticket && data.ticket.number_of_question;
    const old_answer =
      data && data.one_answer_user && data.one_answer_user.id_answer;
    return (
      <View style={[container, modalOpen && transparent]}>
        <QuestionForm
          step={step}
          answer={
            old_answer !== null && answer.id_answer === null
              ? old_answer
              : answer.id_answer
          }
          id_ticket={id_ticket}
          handleChecked={this._handleChecked}
        />
        <Actions
          step={step}
          lastStep={number_of_question}
          previousBtn={this.goPrevious}
          nextBtn={this.goNext}
          submitBtn={this.submitBtn}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height
  },
  transparent: {
    opacity: 0.7,
    backgroundColor: "#000000"
  }
});

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

const answerAdd = graphql(ANSWER_MUTATION, {
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

const TICK_AND_ANS_US = gql`
  query Ticket($id_ticket: Int!, $id_answer_user: Int!) {
    ticket(id: $id_ticket) {
      number_of_question
    }
    one_answer_user(id_answer_user: $id_answer_user) {
      id_answer
    }
  }
`;

const tickAndAns = graphql(TICK_AND_ANS_US, {
  options: ({ id_ticket, id_answer_user }) => ({
    variables: { id_ticket, id_answer_user }
  })
});

const ANSWERUP_MUTATION = gql`
  mutation updateAnswer($inputUpAnswerUser: AnswerUpUserInput!) {
    UpdateAnswerUser(input: $inputUpAnswerUser) {
      error
    }
  }
`;

const answerUp = graphql(ANSWERUP_MUTATION, {
  props: ({ mutate }) => ({
    upAns: inputUpAnswerUser => mutate({ variables: { inputUpAnswerUser } })
  })
});

export default compose(
  answerAdd,
  answerUp,
  res,
  tickAndAns
)(TestForm);
