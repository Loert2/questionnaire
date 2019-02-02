import React, { Component } from "react";
import FieldForm from "../components/FieldForm";
import { graphql, compose } from "react-apollo";
import gql from "graphql-tag";
import user from "../query/UserQuery";

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
    const { data, reg, navigation } = this.props;
    const valid = /\S+@\S+\.\S+/;
    if (full_name !== "" && e_mail !== "" && password !== "") {
      if (valid.test(e_mail)) {
        if (password === confirmPassword) {
          reg({ e_mail, full_name, password }).then(res => {
            navigation.push("Test");
            data.refetch();
          });
          this.setState({ error: "" });
        } else {
          this.setState({ error: "Пароли не совпадают" });
        }
      } else {
        this.setState({ error: "Неправильный формат почты" });
      }
    } else {
      this.setState({ error: "Заполнены не все поля" });
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
export default compose(
  up,
  user
)(RegistrationScreen);
