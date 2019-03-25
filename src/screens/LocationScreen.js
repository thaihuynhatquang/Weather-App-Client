import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Location from "../components/Location";

export default class LocationScreen extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Location />
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
