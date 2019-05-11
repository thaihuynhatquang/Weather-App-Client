import React, { Component } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import {
  TEXT_LARGE_SIZE,
  TEXT_MEDIUM_SIZE,
  TEXT_SMALL_SIZE
} from "../../utils/constant";
import WeatherBodyCurrentDetails from "./WeatherBodyCurrentDetails";

var _ = require("lodash");
export default class WeatherBodyCurrent extends Component {
  render() {
    const { information } = this.props;
    return (
      <View style={styles.cardCurrentInformation}>
        <View style={styles.currentInformation}>
          <View>
            <Text style={styles.currentDay}>Today</Text>
            <Text style={styles.temperature}>
              {_.round(information.item[0].main.temp)}˚
            </Text>
            <Text style={styles.description}>
              {information.item[0].weather[0].description}
            </Text>
          </View>
          <Image
            style={{
              height: 50,
              width: 50
            }}
            source={{
              uri: `http://openweathermap.org/img/w/${
                information.item[0].weather[0].icon
              }.png`
            }}
          />
        </View>
        <WeatherBodyCurrentDetails />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  cardCurrentInformation: {
    flex: 0,
    backgroundColor: "#055929",
    shadowColor: "gray",
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 5,
    flexDirection: "column",
    paddingTop: 20,
    paddingLeft: 20,
    paddingRight: 20,
    borderRadius: 5
  },
  currentInformation: {
    flex: 0,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  currentDay: {
    color: "white",
    fontSize: TEXT_LARGE_SIZE,
    fontWeight: "bold",
    marginBottom: 5
  },
  temperature: {
    color: "white",
    fontSize: TEXT_LARGE_SIZE * 2
  },
  datetime: {
    fontSize: TEXT_SMALL_SIZE,
    color: "white",
    marginBottom: 5
  },
  description: {
    fontSize: TEXT_MEDIUM_SIZE,
    color: "white",
    marginBottom: 5
  },
  expandText: {
    alignSelf: "center",
    color: "white",
    fontSize: TEXT_SMALL_SIZE,
    fontStyle: "italic",
    marginBottom: 15,
    marginTop: 15
  }
});
