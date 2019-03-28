import React from "react";
import { View, Text, StyleSheet } from "react-native";
import PropTypes from "prop-types";
import WeatherHeader from "./WeatherHeader";
import WeatherBody from "./WeatherBody";
import * as middlewares from '../../utils/middlewares';

export default (Weather = ({ forecastWeather }) => {
  console.log(forecastWeather, "weather forecast");
  const weatherInformation = middlewares.analysisData(forecastWeather)
  console.log(weatherInformation, "weather information")
  return (
    <View style={styles.weatherContainer}>
      <WeatherHeader
        temperature={weatherInformation[0][0].main.temp}
        mainWeather={weatherInformation[0][0].weather[0].description}
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
    paddingLeft: 30,
    paddingRight: 30,
    paddingTop: 30,
    backgroundColor: "#c4ced1"
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
