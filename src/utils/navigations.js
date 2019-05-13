import React from "react";
import { Platform, StatusBar } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import {
  createBottomTabNavigator,
  createSwitchNavigator,
  createStackNavigator,
  createAppContainer
} from "react-navigation";
import CalendarScreen from "../screens/CalendarScreen";
import WeatherScreen from "../screens/WeatherScreen";
import LocationScreen from "../screens/LocationScreen";
import NewsScreen from "../screens/NewsScreen";
import AuthScreen from "../screens/AuthScreen";

const headerStyle = {
  marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
};

export const SignedOut = createStackNavigator(
  {
    AuthScreen: {
      screen: AuthScreen,
      navigationOptions: {
        title: "AuthScreen",
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
    News: {
      screen: NewsScreen
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
        if (routeName === "News") {
          iconSize = 25;
          iconName = `ios-images`;
        } else if (routeName === "Calendar") {
          iconSize = 25;
          iconName = `ios-calendar`;
        } else if (routeName === "Weather") {
          iconSize = 25;
          iconName = `ios-partly-sunny`;
        } else if (routeName === "Location") {
          iconSize = 25;
          iconName = `ios-apps`;
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
