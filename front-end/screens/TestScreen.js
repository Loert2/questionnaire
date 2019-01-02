import React, { Component } from "react";
import QuestionForm from "../components/QuestionForm";
import { graphql, compose } from "react-apollo";
import gql from "graphql-tag";
import TestScreen from "./TestScreen";

class TestScreen extends Component {
  state = {};

  render() {
    return <QuestionForm />;
  }
}
export default TestScreen;
