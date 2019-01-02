import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";
import { Icon } from "expo";

class FieldForm extends Component {
  state = {};
  _handleSubmit = event => {
    event.preventDefault();
    this.props.onPress(this.state);
  };

  render() {
    return (
      <View>
        <View style={styles.topStrip}>
          <Icon.Ionicons name="md-book" style={styles.icon} />
        </View>
        <View style={styles.container}>
          {this.props.fileds.map(el => (
            <TextInput
              key={el.label + el.type + this.props[el.name]}
              placeholder={el.label}
              style={styles.input}
              textContentType={el.type}
              secureTextEntry={el.secure}
              autoCapitalize="none"
              value={this.props[el.name]}
              onChangeText={value => this.setState({ [el.name]: value })}
            />
          ))}
          {this.props.error && (
            <Text style={styles.error}>{this.props.error}</Text>
          )}
          <TouchableOpacity
            style={styles.submitButton}
            onPress={this._handleSubmit}
          >
            <Text style={styles.submitButtonText}>{this.props.button}</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
export default FieldForm;

const styles = StyleSheet.create({
  container: {
    paddingTop: 23
  },
  input: {
    marginLeft: 50,
    marginRight: 50,
    marginTop: 15,
    marginBottom: 15,
    height: 40,
    borderColor: "#000000",
    borderWidth: 1,
    padding: 12
  },
  submitButton: {
    backgroundColor: "#ffff4f",
    borderColor: "#000000",
    borderRadius: 10,
    padding: 12,
    marginLeft: 100,
    marginRight: 100,
    marginTop: 15,
    borderWidth: 1
  },
  submitButtonText: {
    color: "#000000",
    textAlign: "center"
  },
  error: {
    color: "red",
    textAlign: "center"
  },
  icon: {
    fontSize: 100,
    color: "#000000",
    textAlign: "center"
  },
  topStrip: {
    backgroundColor: "#ffff4f",
    borderColor: "#000000",
    borderWidth: 1
  }
});
