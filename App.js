import React from "react";
import AppContainer from "./utils/BottomTabNavigator";
import { Provider } from "react-redux";

import configureStore from "./src/store/configureStore";
import { YellowBox } from "react-native";

const store = configureStore();

//This line igrone warning in debugger mode
YellowBox.ignoreWarnings(["Remote debugger"]);

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <AppContainer />
      </Provider>
    );
  }
}
