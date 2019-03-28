import React from "react";
import { View, Text, StyleSheet } from "react-native";
import {
  TEXT_COLOR,
  INACTIVE_TEXT_COLOR,
  TEXT_LARGE_SIZE,
  TEXT_MEDIUM_SIZE,
  TEXT_SMALL_SIZE
} from "../../utils/constant";
var _ = require("lodash");
export default (WeatherBodyCurrent = props => {
  const { information } = props;
  return (
    <View style={styles.cardCurrentInformation}>
      <View style={styles.currentInformation}>
        <View style={styles.currentDay}>
          <Text style={{ color: "white", fontSize: TEXT_SMALL_SIZE }}>
            Today
          </Text>
        </View>
        <View>
          <Text style={styles.temperature}>
            {_.round(information.item[0].main.temp)}˚
          </Text>
          <Text style={styles.description}>
            {information.item[0].weather[0].description}
          </Text>
        </View>
        <View>
          <Text>Day la icon</Text>
        </View>
      </View>
      <Text style={styles.expandText}>View Hourly Forecast</Text>
    </View>
  );
});

const styles = StyleSheet.create({
  cardCurrentInformation: {
    flex: 0,
    backgroundColor: "white",
    shadowColor: "gray",
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    flexDirection: "column",
    paddingTop: 20,
    paddingLeft: 20,
    paddingRight: 20,
    borderRadius: 2,
    zIndex: 10
  },
  currentInformation: {
    flex: 0,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  currentDay: {
    position: "absolute",
    paddingTop: 10,
    paddingBottom: 10,
    paddingRight: 20,
    paddingLeft: 20,
    backgroundColor: "#373b3d",
    top: -40,
    borderRadius: 2
  },
  temperature: {
    color: TEXT_COLOR,
    fontSize: TEXT_LARGE_SIZE
  },
  datetime: {
    fontSize: TEXT_SMALL_SIZE,
    color: TEXT_COLOR,
    marginBottom: 5
  },
  description: {
    fontSize: TEXT_MEDIUM_SIZE,
    color: TEXT_COLOR,
    marginBottom: 5
  },
  expandText: {
    alignSelf: "center",
    color: INACTIVE_TEXT_COLOR,
    fontSize: TEXT_SMALL_SIZE,
    fontStyle: "italic",
    marginBottom: 15,
    marginTop: 15
  }
});
