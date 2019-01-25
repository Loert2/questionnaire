import React, { Component } from "react";
import { Text, View, Dimensions, StyleSheet } from "react-native";
import { graphql, compose } from "react-apollo";
import gql from "graphql-tag";
import ResultForm from "../components/ResultForm";

class ResultScreen extends Component {
  componentDidMount() {
    const { data } = this.props;
    data.refetch();
  }

  static navigationOptions = {
    header: null
  };

  column = [
    {
      full_name: "ФИО",
      point: "Ответы",
      result: "Результат",
      date: "Дата"
    }
  ];

  render() {
    const { data } = this.props;
    const { container, textError, lineAngular } = styles;
    const user = data && data.user;
    const id_user = user && user.id_user;
    return (
      <View style={container}>
        {user !== null ? (
          <ResultForm id_user={id_user} />
        ) : (
          <Text style={textError}>
            Для просмотра результатов войдите в систему
          </Text>
        )}
        <View style={lineAngular} />
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

const user = graphql(USER);

export default compose(user)(ResultScreen);

const styles = StyleSheet.create({
  container: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height
  },
  textError: {
    marginTop: 150,
    color: "#000000",
    fontSize: 32,
    lineHeight: 50,
    textAlign: "center",
    fontFamily: "space-mono"
  },
  lineAngular: {
    transform: [{ rotate: "-55deg" }],
    position: "absolute",
    marginTop: 535,
    marginLeft: 240,
    paddingTop: 20,
    paddingBottom: 20,
    width: 250,
    backgroundColor: "#ffff4f"
  }
});
