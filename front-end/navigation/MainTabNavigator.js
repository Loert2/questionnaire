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
import ResultScreen from "../screens/ResultScreen";

const HomeStack = createStackNavigator({
  Home: { screen: HomeScreen },
  Authorization: { screen: AuthorizationScreen },
  Registration: { screen: RegistrationScreen },
  Test: { screen: TestScreen },
  Result: { screen: ResultScreen }
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

const ResultStack = createStackNavigator({
  Results: ResultScreen
});

ResultStack.navigationOptions = {
  tabBarLabel: ({ focused }) => (
    <TabBarText focused={focused} name={"Результаты"} />
  ),
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={"md-clipboard"} />
  )
};

const ButtomHome = createBottomTabNavigator({
  HomeStack,
  AuthorizationStack,
  RegistrationStack,
  ResultStack
});

export default ButtomHome;
