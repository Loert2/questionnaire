import React from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";

const Actions = ({ step, lastStep, previousBtn, nextBtn, submitBtn }) => {
  return (
    <View style={styles.container}>
      {step > 1 && (
        <TouchableOpacity
          style={styles.previousBtn}
          onPress={previousBtn.onClickHandler}
        >
          <Text style={styles.buttonText}>"Назад"</Text>
        </TouchableOpacity>
      )}
      {step < lastStep && (
        <TouchableOpacity
          style={styles.nextBtn}
          onPress={nextBtn.onClickHandler}
          disabled={nextBtn.disabled}
        >
          <Text style={styles.buttonText}>"Вперед"</Text>
        </TouchableOpacity>
      )}
      {step === lastStep && (
        <TouchableOpacity
          style={styles.nextBtn}
          onPress={submitBtn.onClickHandler}
          disabled={submitBtn.disabled}
        >
          <Text style={styles.buttonText}>"Завершить тест"</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default Actions;

const styles = StyleSheet.create({
  container: {
    marginTop: 10
  },
  previousBtn: {
    borderColor: "#000000",
    borderWidth: 1
  },
  nextBtn: {
    marginLeft: 30,
    borderColor: "#000000",
    borderWidth: 1
  },
  buttonText: {
    color: "#000000",
    textAlign: "center"
  }
});
