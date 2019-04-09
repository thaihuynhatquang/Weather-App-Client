import React from "react";
import { Platform, StatusBar } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import {
  createBottomTabNavigator,
  createSwitchNavigator,
  createStackNavigator,
  createAppContainer
} from "react-navigation";
import CalendarScreen from "../src/screens/CalendarScreen";
import WeatherScreen from "../src/screens/WeatherScreen";
import LocationScreen from "../src/screens/LocationScreen";
import NoteScreen from "../src/screens/NoteScreen";
import SignInScreen from "../src/screens/SignInScreen";
import SignUpScreen from "../src/screens/SignUpScreen";
import { TEXT_COLOR, INACTIVE_TEXT_COLOR } from "./constant";

const headerStyle = {
  marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
};

export const SignedOut = createStackNavigator(
  {
    SignUp: {
      screen: SignUpScreen,
      navigationOptions: {
        title: "Sign Up",
        headerStyle
      }
    },
    SignIn: {
      screen: SignInScreen,
      navigationOptions: {
        title: "Sign In",
        headerStyle
      }
    }
  },
  {
    headerMode: "none",
    navigationOptions: {
      headerVisible: false
    }
  }
);

export const SignedIn = createBottomTabNavigator(
  {
    Weather: {
      screen: WeatherScreen
    },
    Note: {
      screen: NoteScreen
    },
    Location: {
      screen: LocationScreen
    },
    Calendar: {
      screen: CalendarScreen
    }
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, horizontal, tintColor }) => {
        const { routeName } = navigation.state;
        let IconComponent = Ionicons;
        let iconName;
        let iconSize;
        if (routeName === "Note") {
          iconSize = 25;
          iconName = `ios-list-box`;
        } else if (routeName === "Calendar") {
          iconSize = 25;
          iconName = `ios-calendar`;
        } else if (routeName === "Weather") {
          iconSize = 25;
          iconName = `ios-partly-sunny`;
        } else if (routeName === "Location") {
          iconSize = 25;
          iconName = `ios-compass`;
        }
        // You can return any component that you like here!
        return (
          <IconComponent name={iconName} size={iconSize} color={tintColor} />
        );
      }
    }),
    initialRouteName: "Weather",
    tabBarOptions: {
      activeTintColor: "#787b8c",
      inactiveTintColor: "#d2d3dd",
      showLabel: false,
      style: {
        backgroundColor: "#f2f3f8",
        borderTopColor: "#f2f3f8"
      }
    }
  }
);

export const createRootNavigator = (signedIn = false) => {
  return createAppContainer(
    createSwitchNavigator(
      {
        SignedIn: {
          screen: SignedIn
        },
        SignedOut: {
          screen: SignedOut
        }
      },
      {
        initialRouteName: signedIn ? "SignedIn" : "SignedOut"
      }
    )
  );
};
