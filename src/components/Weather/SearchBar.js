import React, { Component } from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import { Button } from "react-native-elements";

import { BACKGROUND_COLOR } from "../../../utils/constant";
var screen = Dimensions.get("screen");
export default class SearchModal extends Component {
  render() {
    return (
      <View style={styles.modalContainer}>
        <View style={styles.innerContainer}>
          <Text>This is content inside of modal component</Text>
          <Button
            onPress={() => this.props.closeSearchModal()}
            title="Close modal"
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  innerContainer: {
    backgroundColor: BACKGROUND_COLOR,
    width: screen.width * 0.9,
    height: screen.height * 0.7
  }
});
