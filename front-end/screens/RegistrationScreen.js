import React, { Component } from "react";
import FieldForm from "../components/FieldForm";
import { graphql, compose } from "react-apollo";
import gql from "graphql-tag";

class RegistrationScreen extends Component {
  state = {};
  fileds = [
    {
      name: "full_name",
      label: "ФИО",
      type: "none",
      secure: false
    },
    {
      name: "e_mail",
      label: "Электронная почта",
      type: "emailAddress",
      secure: false
    },
    {
      name: "password",
      label: "Пароль",
      type: "password",
      secure: true
    },
    {
      name: "confirmPassword",
      label: "Подтвердить пароль",
      type: "password",
      secure: true
    }
  ];

  _handleRegSubmit = ({ e_mail, full_name, password, confirmPassword }) => {
    if (password === confirmPassword) {
      this.props.reg({ e_mail, full_name, password }).then(res => {
        this.props.navigation.push("Test");
      });
      this.setState({ error: "" });
    } else {
      this.setState({ error: "Пароли не совпадают" });
    }
  };

  render() {
    return (
      <FieldForm
        fileds={this.fileds}
        button="Зарегестрироваться"
        onPress={this._handleRegSubmit}
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
    reg: inputUp => mutate({ variables: { inputUp } })
  })
});
export default compose(up)(RegistrationScreen);
