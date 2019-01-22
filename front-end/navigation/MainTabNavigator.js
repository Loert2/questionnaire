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
  Home: HomeScreen,
  Authorization: AuthorizationScreen,
  Registration: RegistrationScreen,
  Test: TestScreen
});

HomeStack.navigationOptions = {
  tabBarLabel: ({ focused }) => (
    <TabBarText focused={focused} name={"Главная"} />
  ),
  tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name={"md-home"} />
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
  ResultStack
});

export default ButtomHome;
