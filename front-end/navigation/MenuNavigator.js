import React, { Component } from "react";
import { createDrawerNavigator } from "react-navigation";
import HomeScreen from "../screens/HomeScreen";
import AuthorizationScreen from "../screens/AuthorizationScreen";
import RegistrationScreen from "../screens/RegistrationScreen";
import { TouchableOpacity } from "react-native";
import { Icon } from "expo";

const MenuNavigator = createDrawerNavigator(
  {
    Home: HomeScreen,
    Authorization: AuthorizationScreen,
    Registration: RegistrationScreen
  },
  {
    contentOptions: {
      activeTintColor: "#c29b00"
    }
  }
);

HomeScreen.navigationOptions = {
  drawerLabel: "Главная"
};

AuthorizationScreen.navigationOptions = {
  drawerLabel: "Авторизация"
};

RegistrationScreen.navigationOptions = {
  drawerLabel: "Регистрация"
};

MenuNavigator.navigationOptions = ({ navigation }) => {
  return {
    headerLeft: (
      <TouchableOpacity
        style={{
          flexGrow: 1,
          backgroundColor: "#fff",
          paddingTop: 8,
          paddingBottom: 8,
          paddingLeft: 24,
          paddingRight: 24
        }}
        onPress={() => {
          navigation.toggleDrawer();
        }}
      >
        <Icon.Ionicons name={"md-menu"} size={40} color={"#000000"} />
      </TouchableOpacity>
    )
  };
};

export default MenuNavigator;
