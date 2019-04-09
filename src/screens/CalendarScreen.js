import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Calendar from "../components/Calendar/Calendar";

export default class CalendarScreen extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Calendar />
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
