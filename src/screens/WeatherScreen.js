import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { API_KEY } from "../../utils/WeatherAPIKey";
import Weather from "../components/Weather";

import { YellowBox } from "react-native";
YellowBox.ignoreWarnings(["Remote debugger"]);

export default class WeatherScreen extends React.Component {
  state = {
    isLoading: true,
    weatherInfo: null,
    error: null
  };

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      position => {
        this.fetchWeather(position.coords.latitude, position.coords.longitude);
      },
      error => {
        this.setState({
          error: "Error Getting Weather Condtions"
        });
      }
    );
  }

  fetchWeather(lat, lon) {
    fetch(
      `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&APPID=${API_KEY}&units=metric`
    )
      .then(res => res.json())
      .then(json => {
        this.setState({
          weatherInfo: json,
          isLoading: false
        });
      })
      .catch(err => {
        console.log(err, "error");
      });
  }

  render() {
    const { isLoading, weatherInfo } = this.state;
    return (
      <View style={styles.container}>
        {isLoading ? (
          <View style={styles.loadingContainer}>
            <Text style={styles.loadingText}>Fetching The Weather</Text>
          </View>
        ) : (
          <Weather weatherInfo={weatherInfo} />
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#344046"
  },
  loadingContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#c4ced1"
  },
  loadingText: {
    fontSize: 30
  }
});
