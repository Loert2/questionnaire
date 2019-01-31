import React from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import { Icon } from "expo";

const Actions = ({ step, lastStep, previousBtn, nextBtn, submitBtn }) => {
  return (
    <View style={styles.container}>
      {step > 1 && (
        <TouchableOpacity style={styles.previousBtn} onPress={previousBtn}>
          <Icon.Ionicons name={"md-arrow-back"} size={25} color={"#000000"} />
        </TouchableOpacity>
      )}
      {step < lastStep && (
        <TouchableOpacity
          style={styles.nextBtn}
          onPress={nextBtn}
          disabled={nextBtn.disabled}
        >
          <Icon.Ionicons
            name={"md-arrow-forward"}
            size={25}
            color={"#000000"}
          />
        </TouchableOpacity>
      )}
      {step === lastStep && (
        <TouchableOpacity
          style={styles.submitBtn}
          onPress={submitBtn}
          disabled={submitBtn.disabled}
        >
          <Text style={styles.buttonText}>Завершить тест</Text>
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
    backgroundColor: "#ffff4f",
    borderRadius: 10,
    marginLeft: 70,

    zIndex: 1,
    position: "absolute",
    paddingTop: 12,
    paddingBottom: 12,
    paddingLeft: 24,
    paddingRight: 24
  },
  nextBtn: {
    backgroundColor: "#ffff4f",
    borderRadius: 10,
    marginLeft: 270,

    zIndex: 2,
    position: "absolute",
    paddingTop: 12,
    paddingBottom: 12,
    paddingLeft: 24,
    paddingRight: 24
  },
  buttonText: {
    color: "#000000",
    textAlign: "center"
  },
  submitBtn: {
    backgroundColor: "#00cc00",
    borderRadius: 10,
    marginTop: 60,
    marginLeft: 135,
    zIndex: 2,
    position: "absolute",
    paddingTop: 12,
    paddingBottom: 12,
    paddingLeft: 24,
    paddingRight: 24
  }
});
