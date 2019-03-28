import React from "react";
import Ionicons from "react-native-vector-icons/Ionicons";
import { createBottomTabNavigator, createAppContainer } from "react-navigation";
import NotificationScreen from "../src/screens/NotificationScreen";
import CalendarScreen from "../src/screens/CalendarScreen";
import WeatherScreen from "../src/screens/WeatherScreen";
import LocationScreen from "../src/screens/LocationScreen";
import SetupScreen from "../src/screens/SetupScreen";

import { TEXT_COLOR, INACTIVE_TEXT_COLOR } from "./constant";
import IconWithBadge from "./IconWithBadge";

export default createAppContainer(
  createBottomTabNavigator(
    {
      Notification: {
        screen: NotificationScreen
      },
      Calendar: {
        screen: CalendarScreen
      },
      Weather: {
        screen: WeatherScreen
      },
      Location: {
        screen: LocationScreen
      },
      Setup: {
        screen: SetupScreen
      }
    },
    {
      defaultNavigationOptions: ({ navigation }) => ({
        tabBarIcon: ({ focused, horizontal, tintColor }) => {
          const { routeName } = navigation.state;
          let IconComponent = Ionicons;
          let iconName;
          if (routeName === "Notification") {
            return (
              <IconWithBadge
                badgeCount={3}
                name={"ios-notifications"}
                size={26}
                color={tintColor}
              />
            );
            // iconName = `ios-notifications`;
            // iconName = `notifications${focused ? "" : "-outline"}`;
            // Sometimes we want to add badges to some icons.
            // You can check the implementation below.
            // IconComponent = HomeIconWithBadge;
          } else if (routeName === "Calendar") {
            iconName = `ios-calendar`;
          } else if (routeName === "Weather") {
            iconName = `ios-thunderstorm`;
          } else if (routeName === "Location") {
            iconName = `ios-compass`;
          } else if (routeName === "Setup") {
            iconName = `ios-settings`;
          }

          // You can return any component that you like here!
          return <IconComponent name={iconName} size={25} color={tintColor} />;
        }
      }),
      initialRouteName: "Weather",
      tabBarOptions: {
        activeTintColor: TEXT_COLOR,
        inactiveTintColor: INACTIVE_TEXT_COLOR
      }
    }
  )
);
