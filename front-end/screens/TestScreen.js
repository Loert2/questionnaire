import React, { Component } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import TestForm from "../components/TestForm";
import { graphql, compose } from "react-apollo";
import gql from "graphql-tag";
import { Icon } from "expo";

class TestScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id_ticket: null
    };
    this.startBtn = this.startBtn.bind(this);
    this.endBtn = this.endBtn.bind(this);
    this.exitBtn = this.exitBtn.bind(this);
  }

  static navigationOptions = ({ navigation }) => {
    return {
      headerRight: (
        <TouchableOpacity
          style={styles.exitBtn}
          onPress={navigation.getParam("exitBtn")}
        >
          <Icon.Ionicons name={"md-exit"} size={40} color={"#000000"} />
        </TouchableOpacity>
      ),
      headerLeft: null,
      gesturesEnabled: false
    };
  };

  componentDidMount() {
    this.props.navigation.setParams({ exitBtn: this.exitBtn });
  }

  startBtn() {
    var random = Math.round(Math.random() * (4 - 2) + 2);
    console.log(random);
    this.setState({
      id_ticket: random
    });
  }

  endBtn() {
    this.setState({
      id_ticket: null
    });
  }

  exitBtn() {
    this.props.out({}).then(res => {
      this.props.navigation.push("Home");
    });
  }

  render() {
    console.log("state", this.state);
    const { id_ticket } = this.state;
    const id_user =
      this.props.data && this.props.data.user && this.props.data.user.id;
    const { startBtn, buttonText } = styles;
    return (
      <View>
        {id_ticket === null ? (
          <TouchableOpacity style={startBtn} onPress={this.startBtn}>
            <Text style={buttonText}>Начать тест</Text>
          </TouchableOpacity>
        ) : (
          <TestForm
            id_ticket={id_ticket}
            id_user={id_user}
            endBtn={this.endBtn}
          />
        )}
      </View>
    );
  }
}

const USER = gql`
  query User {
    user {
      id_user
    }
  }
`;

const SIGN_OUT_MUTATION = gql`
  mutation SignOut($inputOut: UserSignOutInput!) {
    UserSignOut(input: $inputOut) {
      error
    }
  }
`;
const out = graphql(SIGN_OUT_MUTATION, {
  props: ({ mutate }) => ({
    out: inputOut => mutate({ variables: { inputOut } })
  })
});

const user = graphql(USER);

export default compose(
  user,
  out
)(TestScreen);

const styles = StyleSheet.create({
  startBtn: {
    flexGrow: 1,
    backgroundColor: "#ffff4f",
    marginTop: 120,
    marginLeft: 105,
    marginRight: 105,
    padding: 50,
    borderRadius: 150
  },
  buttonText: {
    color: "#000000",
    fontSize: 32,
    lineHeight: 50,
    textAlign: "center",
    fontFamily: "space-mono"
  },
  exitBtn: {
    flexGrow: 1,
    backgroundColor: "#ffff4f",
    paddingTop: 9,
    paddingBottom: 9,
    paddingLeft: 24,
    paddingRight: 24
  },
  exitText: {
    color: "#000000",
    textAlign: "center"
  }
});
