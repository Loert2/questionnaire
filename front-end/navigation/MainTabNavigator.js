import React from "react";
import {
  createStackNavigator,
  createBottomTabNavigator,
  createDrawerNavigator
} from "react-navigation";
import TabBarIcon from "../components/TabBarIcon";
import TabBarText from "../components/TabBarText";

import AuthorizationScreen from "../screens/AuthorizationScreen";
import RegistrationScreen from "../screens/RegistrationScreen";
import TestScreen from "../screens/TestScreen";
import ResultScreen from "../screens/ResultScreen";
import MenuNavigator from "./MenuNavigator";

const HomeStack = createStackNavigator({
  CustomDrawer: MenuNavigator,
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
