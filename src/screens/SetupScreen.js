import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Setup from "../components/Setup";

export default class SetupScreen extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Setup />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  }
});
