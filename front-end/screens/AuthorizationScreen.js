import React, { Component } from "react";
import FieldForm from "../components/FieldForm";
import { graphql, compose } from "react-apollo";
import gql from "graphql-tag";
import TestScreen from "./HomeScreen";

class AuthorisationScreen extends Component {
  state = {};
  static navigationOptions = {
    header: "Авторизация"
  };
  fileds = [
    {
      name: "e_mail",
      label: "Электронная почта",
      type: "text"
    },
    {
      name: "password",
      label: "Пароль",
      type: "password"
    }
  ];

  _handleAuhtSubmit = ({ e_mail, password }) => {
    this.props.update({ e_mail, password }).then(res => {
      if (res.data.UserSignIn.error === null) {
        this.setState({ error: "" });
        this.context.history.push("/TestScreen");
      } else {
        this.setState({ error: "Неправильный логин или пароль" });
      }
    });
  };

  render() {
    return (
      <FieldForm
        fileds={this.fileds}
        button="Войти"
        onSubmit={this._handleAuhtSubmit}
        error={this.state.error}
      />
    );
  }
}

const SIGN_DOWN_MUTATION = gql`
  mutation SignIn($inputIn: UserSignInInput!) {
    UserSignIn(input: $inputIn) {
      error
    }
  }
`;

const sIn = graphql(SIGN_DOWN_MUTATION, {
  props: ({ mutate }) => ({
    update: inputIn =>
      mutate({
        variables: { inputIn }
      })
  })
});
export default compose(sIn)(AuthorisationScreen);
