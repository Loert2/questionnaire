import React, { Component } from "react";
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";

class Form extends Component {
  state = {};

  _handleSubmit = event => {
    event.preventDefault();
    this.props.onSubmit(this.state);
  };

  render() {
    return (
      <View className="containerLog">
        <View className="container">
          {this.props.fileds.map(el => (
            <TextInput
              key={el.label + el.type + this.props[el.name]}
              placeholder={el.label}
              style={styles.input}
              textContentType={el.type}
              autoCapitalize="none"
              value={this.props[el.name]}
              onChangeText={value => this.setState({ [el.name]: value })}
            />
          ))}
          {this.props.error && (
            <Text className="error">{this.props.error}</Text>
          )}
          <TouchableOpacity
            style={stules.submitButton}
            onPress={this._handleSubmit}
          >
            <Text style={styles.submitButtonText}>{this.props.button} </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
export default Form;

const styles = StyleSheet.create({
  container: {
    paddingTop: 23
  },
  input: {
    margin: 15,
    height: 40,
    borderColor: "#7a42f4",
    borderWidth: 1
  },
  submitButton: {
    backgroundColor: "#7a42f4",
    padding: 10,
    margin: 15,
    height: 40
  },
  submitButtonText: {
    color: "white"
  }
});
