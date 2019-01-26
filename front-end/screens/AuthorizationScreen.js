import React, { Component } from "react";
import FieldForm from "../components/FieldForm";
import { graphql, compose } from "react-apollo";
import gql from "graphql-tag";
import user from "../query/UserQuery";

class AuthorisationScreen extends Component {
  state = {};
  fileds = [
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
    }
  ];

  _handleAuhtSubmit = ({ e_mail, password }) => {
    const { data, update, navigation } = this.props;
    update({ e_mail, password }).then(res => {
      if (res.data.UserSignIn.error === null) {
        this.setState({ error: "" });
        navigation.push("Test");
        data.refetch();
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
        onPress={this._handleAuhtSubmit}
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

export default compose(
  sIn,
  user
)(AuthorisationScreen);
