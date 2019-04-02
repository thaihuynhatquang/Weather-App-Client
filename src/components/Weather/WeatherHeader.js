import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
var _ = require("lodash");
import {
  TEXT_COLOR,
  TEXT_TITLE,
  TEXT_MEDIUM_SIZE
} from "../../../utils/constant";

export default class WeatherHeader extends Component {
  render() {
    const { temperature, mainWeather, city, country } = this.props;
    return (
      <View style={styles.headerContainer}>
        <View style={{ flex: 1, alignItems: "flex-start" }}>
          <Text style={styles.textTitle}>Weather</Text>
          <Text style={styles.textSubTitle}>
            {city}, {country}
          </Text>
        </View>
        <View style={styles.iconTitle}>
          <View style={{ flexDirection: "row" }}>
            <Text style={styles.textTitle}>{_.round(temperature)}˚</Text>
            <MaterialCommunityIcons
              size={25}
              name={"weather-lightning-rainy"}
              color={TEXT_COLOR}
            />
          </View>
          <Text style={[styles.textTitle, { fontSize: 15 }]}>
            {mainWeather}
          </Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  headerContainer: {
    flex: 0,
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    paddingLeft: 30,
    paddingRight: 30,
    paddingTop: 30
  },
  textTitle: {
    fontSize: TEXT_TITLE,
    color: TEXT_COLOR
  },
  textSubTitle: {
    fontSize: TEXT_MEDIUM_SIZE,
    color: TEXT_COLOR
  },
  iconTitle: {
    flex: 1,
    flexDirection: "column",
    alignItems: "flex-end"
  }
});
