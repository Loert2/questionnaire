import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";
import { CheckBox } from "react-native-elements";

class QuestionForm extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>
          Вопрос {this.props.step}: {this.props.question.name}
        </Text>
        {this.props.answer &&
          this.props.answer.map(el => (
            <View>
              <CheckBox
                key={el.id_answer + el.name}
                title={el.name}
                checkedIcon="dot-circle-o"
                uncheckedIcon="circle-o"
                checkedColor="#ffff4f"
                checked={el.checked}
                onPress={checked =>
                  this.props.handleChecked({
                    id_answer: el.id_answer,
                    checked: !el.checked
                  })
                }
              />
            </View>
          ))}
        {this.props.error !== 0 && (
          <Text style={styles.error}>{this.props.error}</Text>
        )}
      </View>
    );
  }
}
export default QuestionForm;

const styles = StyleSheet.create({
  container: {
    paddingTop: 5
  },
  error: {
    color: "red",
    textAlign: "center"
  },
  text: {
    padding: 23,
    color: "#000000",
    fontSize: 18
  }
});
