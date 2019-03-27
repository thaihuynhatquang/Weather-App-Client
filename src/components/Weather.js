import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import PropTypes from "prop-types";
import WeatherHeader from './WeatherHeader'
import WeatherBody from './WeatherBody';

const Weather = ({ forecastWeather }) => {
  console.log(forecastWeather, "weather forecast");
  const currentWeather = forecastWeather[0];
  console.log(currentWeather)
  return (
    <View style={styles.weatherContainer}>
      <WeatherHeader temperature={currentWeather.main.temp} mainWeather={currentWeather.weather[0].main} />
      <WeatherBody />
      {/* <View style={styles.bodyContainer}>
        <Text style={styles.title}>{currentWeather.name}</Text>
        <Text style={styles.subtitle}>
          {currentWeather.name}
        </Text>
      </View> */}
    </View>
  );
};

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

export default Weather;
