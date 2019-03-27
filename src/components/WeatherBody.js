import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default WeatherBody = () => (
  <View style={styles.bodyContainer}>
    <Text>Hello</Text>
  </View>
)

styles = StyleSheet.create({
  bodyContainer: {
    flex: 2,
    flexDirection: "row",
    alignItems: "flex-start",
    alignContent: "flex-start",
    justifyContent: "center",
    // alignItems: "flex-start",
    // justifyContent: "flex-end",
  },
})
