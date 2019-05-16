import React from "react";
import { Platform, StatusBar, Dimensions } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import {
  createBottomTabNavigator,
  createSwitchNavigator,
  createStackNavigator,
  createAppContainer,
  createDrawerNavigator
} from "react-navigation";
import ProfileScreen from "../screens/ProfileScreen";
import FavoriteScreen from "../screens/FavoriteScreen";
import WeatherScreen from "../screens/WeatherScreen";
import LocationScreen from "../screens/LocationScreen";
import NewsScreen from "../screens/NewsScreen";
import NewsDetailScreen from "../screens/NewsDetailScreen";
import PostNewsScreen from "../screens/PostNewsScreen";
import AuthScreen from "../screens/AuthScreen";
import {
  TEXT_COLOR,
  BACKGROUND_COLOR,
  ACTIVE_TINT_COLOR,
  INACTIVE_TINT_COLOR
} from "./constant";

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
      headerStyle: {
        backgroundColor: BACKGROUND_COLOR
      },
      headerTintColor: ACTIVE_TINT_COLOR,
      headerTitleStyle: { color: ACTIVE_TINT_COLOR, fontWeight: "bold" }
    }
  },
  NewsDetailScreen: {
    screen: NewsDetailScreen,
    navigationOptions: {
      headerStyle: {
        backgroundColor: BACKGROUND_COLOR
      },
      headerTintColor: ACTIVE_TINT_COLOR,
      headerTitleStyle: { color: ACTIVE_TINT_COLOR, fontWeight: "bold" }
    }
  },
  PostNewsScreen: {
    screen: PostNewsScreen,
    navigationOptions: {
      headerStyle: {
        backgroundColor: BACKGROUND_COLOR
      },
      headerTintColor: ACTIVE_TINT_COLOR,
      headerTitleStyle: { color: ACTIVE_TINT_COLOR, fontWeight: "bold" }
    }
  }
});

export const Radar = createStackNavigator({
  LocationScreen: {
    screen: LocationScreen,
    navigationOptions: {
      title: "Radar",
      headerStyle: {
        backgroundColor: ACTIVE_TINT_COLOR
      },
      headerTintColor: BACKGROUND_COLOR,
      headerTitleStyle: { color: BACKGROUND_COLOR, fontWeight: "bold" }
    }
  }
});

export const SignedIn = createBottomTabNavigator(
  {
    News: {
      screen: News
    },
    Weather: {
      screen: WeatherScreen
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
      // activeTintColor: "#2e8733",
      activeTintColor: ACTIVE_TINT_COLOR,
      // inactiveTintColor: "#d2d3dd",
      inactiveTintColor: INACTIVE_TINT_COLOR,
      style: {
        // backgroundColor: "#f2f3f8",
        backgroundColor: BACKGROUND_COLOR
        // borderTopColor: "#f2f3f8"
      }
    }
  }
);

export const SignedInDrawer = createDrawerNavigator(
  {
    SignedIn: {
      screen: SignedIn
    }
  },
  {
    drawerPosition: "left",
    contentComponent: FavoriteScreen,
    drawerType: "front",
    drawerWidth: (Dimensions.get("window").width * 2) / 3,
    edgeWidth: (Dimensions.get("window").width * 1) / 4,
    drawerOpenRoute: "LeftSideMenu",
    drawerCloseRoute: "LeftSideMenuClose",
    drawerToggleRoute: "LeftSideMenuToggle"
  }
);

export const SignedInDrawer2 = createDrawerNavigator(
  {
    SignedIn: {
      screen: SignedInDrawer
    }
  },
  {
    drawerPosition: "right",
    contentComponent: ProfileScreen,
    drawerWidth: (Dimensions.get("window").width * 2) / 3,
    edgeWidth: (Dimensions.get("window").width * 1) / 4,
    drawerOpenRoute: "RightSideMenu",
    drawerCloseRoute: "RightSideMenuClose",
    drawerToggleRoute: "RightSideMenuToggle",
    drawerType: "front",
    drawerLockMode: "locked-closed"
  }
);

export const createRootNavigator = (signedIn = false) => {
  return createAppContainer(
    createSwitchNavigator(
      {
        SignedIn: {
          screen: SignedInDrawer2
        },
        SignedOut: {
          screen: SignedOut
        }
      },
      {
        // initialRouteName: signedIn ? "SignedIn" : "SignedOut"
        initialRouteName: "SignedIn"
      }
    )
  );
};
