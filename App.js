import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, FlatList } from 'react-native';
import { createSwitchNavigator } from "react-navigation"
import WelcomeScreen from "./screen/AppSwitchNavigator/WelcomSceen"
import { createAppContainer, createSwitchNavigator, createStackNavigator, createDrawerNavigator } from "react-navigation"
import HomeScreen from "./screen/HomeScreen"
import LoginScreen from "./screen/LoginScreen"
import Ionicons from "@expo/vector-icons"
import SettingsScreen from "./screen/SettingsScreen"
import CustomDrawerComponent from './screen/DrawerNavigator/CustomDrawerComponent';

const App = () => {
  return (
    <AppContainer></AppContainer>
  )
}

const LoginStackNavigator = createStackNavigator({
  WelcomeScreen: {
    screen: WelcomeScreen,
    navigationOptions: {
      header: null,
      headerBackTitle: null
    }
  },
  LoginScreen
})
const AppDrawerNavigator = createDrawerNavigator({
  HomeScreen: {
    screen: HomeScreen,
    navigationOptions: {
      title: "Home",
      drawerIcon: () => (<Ionicons name="ios-home" size={24}></Ionicons>)
    }
  },
  SettingsScreen: {
    screen: SettingsScreen,
    navigationOptions: {
      title: 'Settings',
      drawerIcon: () => (<Ionicons name="ios-settings" size={24}></Ionicons>)
    }
  }
}, {
  contentComponent: CustomDrawerComponent
})

const AppSwitchNavigator = createSwitchNavigator({
  LoginStackNavigator,
  AppDrawerNavigator,
})
const AppContainer = createAppContainer(AppSwitchNavigator)

export default App