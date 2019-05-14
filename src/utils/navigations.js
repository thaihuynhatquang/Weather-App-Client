import React from "react";
import { Platform, StatusBar } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import {
  createBottomTabNavigator,
  createSwitchNavigator,
  createStackNavigator,
  createAppContainer,
  HeaderBackButton
} from "react-navigation";
import CalendarScreen from "../screens/CalendarScreen";
import WeatherScreen from "../screens/WeatherScreen";
import LocationScreen from "../screens/LocationScreen";
import NewsScreen from "../screens/NewsScreen";
import NewsDetailScreen from "../screens/NewsDetailScreen";
import PostNewsScreen from "../screens/PostNewsScreen";
import AuthScreen from "../screens/AuthScreen";
import { TEXT_COLOR } from "./constant";

export const SignedOut = createStackNavigator(
  {
    AuthScreen: {
      screen: AuthScreen,
      navigationOptions: {
        title: "AuthScreen"
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

export const News = createStackNavigator({
  NewsScreen: {
    screen: NewsScreen,
    navigationOptions: {
      title: "News",
      headerTintColor: TEXT_COLOR,
      headerTitleStyle: { color: TEXT_COLOR }
    }
  },
  NewsDetailScreen: {
    screen: NewsDetailScreen,
    navigationOptions: {
      headerTintColor: TEXT_COLOR,
      headerTitleStyle: { color: TEXT_COLOR }
    }
  },
  PostNewsScreen: {
    screen: PostNewsScreen,
    navigationOptions: {
      headerTintColor: TEXT_COLOR,
      headerTitleStyle: { color: TEXT_COLOR }
    }
  }
});

export const Weather = createStackNavigator(
  {
    WeatherScreen: {
      screen: WeatherScreen,
      navigationOptions: {
        title: "Weather"
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

export const Radar = createStackNavigator(
  {
    LocationScreen: {
      screen: LocationScreen,
      navigationOptions: {
        title: "Radar"
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
      screen: Weather
    },
    News: {
      screen: News
    },
    Radar: {
      screen: Radar
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
        } else if (routeName === "Radar") {
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
      activeTintColor: "#2e8733",
      inactiveTintColor: "#d2d3dd",
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
