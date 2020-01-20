import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from "react-native"
import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createDrawerNavigator } from 'react-navigation-drawer';
import { createBottomTabNavigator } from "react-navigation"
import { Ionicons } from '@expo/vector-icons';
import HomeScreen from './screen/HomeScreen';
import SettingsScreen from './screen/SettingsScreen';
import LoginScreen from './screen/LoginScreen';
import WelcomeScreen from './screen/AppSwitchNavigator/WelcomSceen';
import LoadingScreen from './screen/AppSwitchNavigator/LoadingScreen';
import BooksReadingScreen from "./screen/HomeTabNavigator/BooksReadingScreen"
import BooksReadScreen from "./screen/HomeTabNavigator/BooksReadScreen"
import * as firebase from 'firebase/app';
import firebaseConfig from './config/config';
import colors from './assets/colors';
import CustomDrawerComponent from "./screen/DrawerNavigator/CustomDrawerComponent"
import { Provider } from 'react-redux';
import store from './redux/store';
import BooksCountContainer from "./redux/containers/BooksCountContainer"
import { ActionSheetProvider } from "@expo/react-native-action-sheet"
const HomeTabNavigator = createBottomTabNavigator({
  HomeScreen: {
    screen: HomeScreen,
    navigationOptions: {
      tabBarLabel: 'Total Books',
      tabBarIcon: ({ tintColor }) => (
        <BooksCountContainer
          color={tintColor} type="books">
        </BooksCountContainer>
      )
    },
  },
  BooksReadingScreen: {
    screen: BooksReadingScreen,
    navigationOptions: {
      tabBarLabel: 'Books Reading',
      tabBarIcon: ({ tintColor }) => (
        <BooksCountContainer
          color={tintColor} type="booksReading">
        </BooksCountContainer>
      ),
    }
  },
  BooksReadScreen: {
    screen: BooksReadScreen,
    navigationOptions: {
      tabBarLabel: 'Books Read',
      tabBarIcon: ({ tintColor }) => (
        <BooksCountContainer
          color={tintColor} type="booksRead">
        </BooksCountContainer>
      )
    }
  },
},
  {
    tabBarOptions: {
      style: {
        backgroundColor: colors.bgMain
      },
      activeTintColor: colors.logoColor,
      inactiveTintColor: colors.bgTextInput
    }
  }
)

HomeTabNavigator.navigationOptions = ({ navigation }) => {
  const { routeName } = navigation.state.routes[navigation.state.index]
  switch (routeName) {
    case 'HomeScreen':
      return {
        headerTitle: 'Total Books'
      }
    case 'BooksReadingScreen':
      return {
        headerTitle: "Books Reading"
      }
    case 'BooksReadScreen':
      return {
        headerTitle: "Books Read"
      }
    default:
      return {
        title: 'Book Worm'
      }
  }
}

const HomeStackNavigator = createStackNavigator({
  HomeTabNavigator: {
    screen: HomeTabNavigator,
    navigationOptions: ({ navigation }) => {
      return {
        headerLeft: (
          <Ionicons name="ios-menu" size={30} color={colors.logoColor} onPress={() => navigation.openDrawer()} style={{ marginLeft: 10 }} />
        )
      }
    }
  }
}, {
  defaultNavigationOptions: {
    headerStyle: {
      backgroundColor: colors.bgMain
    },
    headerTintColor: colors.textWhite
  },
  headerLayoutPreset: 'center'
})

const AppDrawerNavigator = createDrawerNavigator({
  HomeStackNavigator: {
    screen: HomeStackNavigator,
    navigationOptions: {
      title: "Home",
      drawerIcon: () => <Ionicons name="ios-home" size={24}></Ionicons>
    }
  },
  SettingsScreen: {
    screen: SettingsScreen,
    navigationOptions: {
      title: 'Settings',
      drawerIcon: () => <Ionicons name="ios-settings" size={24}></Ionicons>
    },
  },
},
  {
    contentComponent: CustomDrawerComponent
  });

const LoginStackNavigator = createStackNavigator(
  {
    WelcomeScreen: {
      screen: WelcomeScreen,
      navigationOptions: {
        header: null,
      },
    },
    LoginScreen: {
      screen: LoginScreen,
      navigationOptions: {
        title: 'Login',
      },
    },
  },
  {
    mode: 'modal',
    defaultNavigationOptions: {
      headerStyle: {
        backgrounColor: '#000000',
      },
    },
  }
);

const AppSwitchNavigator = createSwitchNavigator({
  LoadingScreen,
  LoginStackNavigator,
  AppDrawerNavigator,
});

const AppContainer = createAppContainer(AppSwitchNavigator);

class App extends React.Component {
  constructor(props) {
    super(props);
    this.initializeFirebase();
    this.state = { counter: 0 }
    this.increaseCounter = this.increaseCounter.bind(this)
    this.decreaseCounter = this.decreaseCounter.bind(this)
  }

  increaseCounter = () => {
    this.setState({
      counter: this.state.counter + 1
    })
  }
  decreaseCounter = () => {
    this.setState({
      counter: this.state.counter - 1
    })
  }

  initializeFirebase = () => {
    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    }
  };

  render() {
    return (
      <Provider store={store}>
        <ActionSheetProvider>
          <AppContainer></AppContainer>
        </ActionSheetProvider>

      </Provider>

    )
  }
}

export default App;