import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import PropTypes from "prop-types";
import { weatherConditions } from "../../utils/WeatherConditions";

const Weather = ({ weatherInfo }) => {
  console.log(weatherInfo);
  return (
    <View style={styles.weatherContainer}>
      <View style={styles.headerContainer}>
        <Text style={styles.textTitle}>Weather</Text>
        <View style={styles.iconTitle}>
          <View style={{ flexDirection: "row" }}>
            <Text style={styles.textTitle}>{weatherInfo.main.temp}˚</Text>
            <MaterialCommunityIcons
              size={20}
              name={"weather-sunny"}
              color="#344046"
            />
          </View>
          <Text style={[styles.textTitle, { fontSize: 20 }]}>
            {weatherInfo.weather[0].description}
          </Text>
        </View>
      </View>
      {/* <View style={styles.bodyContainer}>
        <Text style={styles.title}>{weatherConditions[weatherInfo].title}</Text>
        <Text style={styles.subtitle}>
          {weatherConditions[weatherInfo].subtitle}
        </Text>
      </View> */}
    </View>
  );
};

Weather.propTypes = {
  weatherInfo: PropTypes.object.isRequired
};

const styles = StyleSheet.create({
  weatherContainer: {
    flex: 1,
    paddingLeft: 30,
    paddingRight: 30,
    paddingTop: 30,
    backgroundColor: "#c4ced1"
  },
  headerContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between"
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
  },
  tempText: {
    fontSize: 20,
    color: "#344046"
  },
  bodyContainer: {
    flex: 2,
    alignItems: "flex-start",
    justifyContent: "flex-end",
    paddingLeft: 25,
    marginBottom: 40
  },
  subtitle: {
    fontSize: 24,
    color: "#fff"
  }
});

export default Weather;
