import React, { Component } from "react";
import FieldForm from "../components/FieldForm";
import { graphql, compose } from "react-apollo";
import gql from "graphql-tag";
import TestScreen from "./HomeScreen";

class RegistrationScreen extends Component {
  state = {};
  static navigationOptions = {
    header: "Регистрация"
  };
  fileds = [
    {
      name: "full_name",
      label: "ФИО",
      type: "text"
    },
    {
      name: "e_mail",
      label: "Электронная почта",
      type: "text"
    },
    {
      name: "password",
      label: "Пароль",
      type: "password"
    },
    {
      name: "confirmPassword",
      label: "Подтвердить пароль",
      type: "password"
    }
  ];

  _handleRegSubmit = ({ login, name, password, confirmPassword }) => {
    if (password === confirmPassword) {
      this.props.update({ e_mail, full_name, password }).then(res => {});
      this.setState({ error: "" });
      this.context.history.push("/TestScreen");
    } else {
      this.setState({ error: "Пароль не совпадает" });
    }
  };

  render() {
    return (
      <FieldForm
        fileds={this.fileds}
        button="Зарегестрироваться"
        onSubmit={this._handleAuhtSubmit}
        error={this.state.error}
      />
    );
  }
}

const SIGN_UP_MUTATION = gql`
  mutation SignUp($inputUp: UserSignUpInput!) {
    UserSignUp(input: $inputUp) {
      error
    }
  }
`;

const up = graphql(SIGN_UP_MUTATION, {
  props: ({ mutate }) => ({
    update: inputUp => mutate({ variables: { inputUp } })
  })
});
export default compose(up)(RegistrationScreen);
