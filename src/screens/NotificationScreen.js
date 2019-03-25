import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Notification from "../components/Notification";

export default class NotificationScreen extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Notification />
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
