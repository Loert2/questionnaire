import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Dimensions
} from "react-native";
import { Icon } from "expo";

class FieldForm extends Component {
  state = {
    full_name: "",
    e_mail: "",
    password: ""
  };
  _handleSubmit = event => {
    event.preventDefault();
    this.props.onPress(this.state);
  };

  render() {
    const { error, button, auth } = this.props;
    const {
      topStrip,
      icon,
      container,
      containerInput,
      submitButton,
      submitButtonText,
      lineAngular
    } = styles;
    return (
      <View style={container}>
        {auth === true && (
          <View style={topStrip}>
            <Icon.Ionicons name="md-book" style={icon} />
          </View>
        )}
        <View style={containerInput}>
          {this.props.fileds.map(el => (
            <TextInput
              key={el.label + el.type + this.props[el.name]}
              placeholder={el.label}
              style={styles.input}
              placeholderTextColor="#000000"
              textContentType={el.type}
              secureTextEntry={el.secure}
              autoCapitalize="none"
              value={this.props[el.name]}
              onChangeText={value => this.setState({ [el.name]: value })}
            />
          ))}
          {error !== 0 && <Text style={styles.error}>{error}</Text>}
          <TouchableOpacity style={submitButton} onPress={this._handleSubmit}>
            <Text style={submitButtonText}>{button}</Text>
          </TouchableOpacity>
        </View>
        <View style={lineAngular} />
      </View>
    );
  }
}
export default FieldForm;

const styles = StyleSheet.create({
  container: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
    backgroundColor: "#ffff4f"
  },
  containerInput: {
    paddingTop: 23
  },
  input: {
    marginTop: 15,
    marginBottom: 15,
    marginLeft: 60,
    marginRight: 60,
    marginTop: 10,
    borderColor: "#000000",
    borderWidth: 0,
    borderBottomWidth: 1,
    fontSize: 18
  },
  submitButton: {
    backgroundColor: "#f8f32b",
    borderColor: "#000000",
    borderRadius: 15,
    paddingTop: 18,
    paddingBottom: 18,
    marginLeft: 100,
    marginRight: 100,
    marginTop: 15,
    fontFamily: "space-mono"
  },
  submitButtonText: {
    color: "#000000",
    textAlign: "center",
    fontFamily: "space-mono",
    fontSize: 18
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
    borderColor: "#000000"
  },
  lineAngular: {
    transform: [{ rotate: "-55deg" }],
    position: "absolute",
    marginTop: 450,
    marginLeft: 240,
    paddingTop: 20,
    paddingBottom: 20,
    width: 250,
    backgroundColor: "#f8f32b"
  }
});
