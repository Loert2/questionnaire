import React from "react";
import {
  createStackNavigator,
  createBottomTabNavigator
} from "react-navigation";
import TabBarIcon from "../components/TabBarIcon";
import TabBarText from "../components/TabBarText";

import HomeScreen from "../screens/HomeScreen";
import AuthorizationScreen from "../screens/AuthorizationScreen";
import RegistrationScreen from "../screens/RegistrationScreen";
import TestScreen from "../screens/TestScreen";

const HomeStack = createStackNavigator({
  Home: { screen: HomeScreen },
  Authorization: { screen: AuthorizationScreen },
  Registration: { screen: RegistrationScreen },
  Test: { screen: TestScreen }
});

HomeStack.navigationOptions = {
  tabBarLabel: ({ focused }) => (
    <TabBarText focused={focused} name={"Главная"} />
  ),
  tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name={"md-home"} />
};

const AuthorizationStack = createStackNavigator({
  Authorizations: AuthorizationScreen
});

AuthorizationStack.navigationOptions = {
  tabBarLabel: ({ focused }) => (
    <TabBarText focused={focused} name={"Авторизация"} />
  ),
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={"md-log-in"} />
  )
};

const RegistrationStack = createStackNavigator({
  Registrations: RegistrationScreen
});

RegistrationStack.navigationOptions = {
  tabBarLabel: ({ focused }) => (
    <TabBarText focused={focused} name={"Регистрация"} />
  ),
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={"md-arrow-up"} />
  )
};

export default createBottomTabNavigator({
  HomeStack,
  AuthorizationStack,
  RegistrationStack
});
