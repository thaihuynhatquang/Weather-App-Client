import React from "react";
import { createAppContainer } from "react-navigation";
import AppContainer from "./utils/BottomTabNavigator";

import { YellowBox } from "react-native";
YellowBox.ignoreWarnings(["Remote debugger"]);

export default class App extends React.Component {
  render() {
    return <AppContainer />;
  }
}
