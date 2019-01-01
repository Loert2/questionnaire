import React from "react";
import {
  createStackNavigator,
  createBottomTabNavigator
} from "react-navigation";
import TabBarIcon from "../components/TabBarIcon";

import HomeScreen from "../screens/HomeScreen";
import AuthorizationScreen from "../screens/AuthorizationScreen";
import RegistrationScreen from "../screens/RegistrationScreen";

const HomeStack = createStackNavigator({
  Home: { screen: HomeScreen },
  Authorization: { screen: AuthorizationScreen },
  Registration: { screen: RegistrationScreen }
});

HomeStack.navigationOptions = {
  tabBarLabel: "Home",
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={"md-information-circle"} />
  )
};

const LinksStack = createStackNavigator({
  Links: LinksScreen
});

LinksStack.navigationOptions = {
  tabBarLabel: "Links",
  tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name={"md-link"} />
};

const SettingsStack = createStackNavigator({
  Settings: SettingsScreen
});

SettingsStack.navigationOptions = {
  tabBarLabel: "Settings",
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={"md-options"} />
  )
};

export default createBottomTabNavigator({
  HomeStack,
  AuthorizationStack,
  Registration
});
