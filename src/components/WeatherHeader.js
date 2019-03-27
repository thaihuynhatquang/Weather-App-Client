import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default WeatherHeader = ({ temperature, mainWeather }) => (
  <View style={styles.headerContainer}>
    <Text style={styles.textTitle}>Weather</Text>
    <View style={styles.iconTitle}>
      <View style={{ flexDirection: "row" }}>
        <Text style={styles.textTitle}>{temperature}˚</Text>
        <MaterialCommunityIcons
          size={25}
          name={"weather-sunny"}
          color="#344046"
        />
      </View>
      <Text style={[styles.textTitle, { fontSize: 20 }]}>
        {mainWeather}
      </Text>
    </View>
  </View>
)

const styles = StyleSheet.create({
  headerContainer: {
    flex: 0,
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
  },
  textTitle: {
    fontSize: 25,
    color: "#344046",
    justifyContent: "center",
    alignContent: "center"
  },
  iconTitle: {
    flex: 1,
    flexDirection: "column",
    alignItems: "flex-end",
    alignContent: "center",
    justifyContent: "center"
  }
})

