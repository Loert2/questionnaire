import React, { Component } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { Icon } from "expo";

export default class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.autoBtn = this.autoBtn.bind(this);
    this.regBtn = this.regBtn.bind(this);
  }
  static navigationOptions = ({ navigation }) => {
    return {
      headerRight: (
        <TouchableOpacity
          style={styles.btn}
          onPress={navigation.getParam("autoBtn")}
        >
          <Text>Авторизация</Text>
        </TouchableOpacity>
      ),
      headerLeft: (
        <TouchableOpacity
          style={styles.btn}
          onPress={navigation.getParam("regBtn")}
        >
          <Text>Регистрация</Text>
        </TouchableOpacity>
      )
    };
  };

  componentDidMount() {
    this.props.navigation.setParams({
      autoBtn: this.autoBtn,
      regBtn: this.regBtn
    });
  }

  autoBtn() {
    this.props.navigation.push("Authorization");
  }

  regBtn() {
    this.props.navigation.push("Registration");
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Тест по электробезопасности</Text>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#ffff4f",
    marginTop: 200,
    marginBottom: 300
  },
  text: {
    marginTop: 20,
    color: "#000000",
    fontSize: 32,
    lineHeight: 50,
    textAlign: "center",
    fontFamily: "space-mono"
  },
  btn: {
    flexGrow: 1,
    backgroundColor: "#ffff4f",
    paddingTop: 8,
    paddingBottom: 8,
    paddingLeft: 24,
    paddingRight: 24
  }
});
