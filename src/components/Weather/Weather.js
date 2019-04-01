import React from "react";
import { View, Text, StyleSheet } from "react-native";
import PropTypes from "prop-types";
import WeatherHeader from "./WeatherHeader";
import WeatherBody from "./WeatherBody";
import * as middlewares from "../../../utils/middlewares";
import { BACKGROUND_COLOR, TEXT_COLOR } from "../../../utils/constant";

export default (Weather = ({ forecastWeather }) => {
  const weatherInformation = middlewares.analysisData(forecastWeather);
  return (
    <View style={styles.weatherContainer}>
      <WeatherHeader
        temperature={weatherInformation[0][0].main.temp}
        mainWeather={weatherInformation[0][0].weather[0].main}
      />
      <WeatherBody weatherInformation={weatherInformation} />
    </View>
  );
});
Weather.propTypes = {
  forecastWeather: PropTypes.array.isRequired
};

const styles = StyleSheet.create({
  weatherContainer: {
    flex: 1,
    backgroundColor: BACKGROUND_COLOR
  },
  tempText: {
    fontSize: 20,
    color: TEXT_COLOR
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
