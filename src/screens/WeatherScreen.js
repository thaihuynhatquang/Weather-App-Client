import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { API_KEY } from "../../utils/WeatherAPIKey";
import Weather from "../components/Weather";
import { currentWeather, forecastWeather } from "../../utils/SampleData"

import { YellowBox } from "react-native";

//This line igrone warning in debugger mode
YellowBox.ignoreWarnings(["Remote debugger"]);

export default class WeatherScreen extends React.Component {
  state = {
    isLoading: true,
    currentWeather: null,
    forecastWeather: null,
    error: null
  };

  //Use fixed data, will be replaced later
  componentDidMount() {
    this.setState({
      isLoading: false,
      currentWeather: currentWeather,
      forecastWeather: forecastWeather
    })
  }

  // componentDidMount() {
  //   navigator.geolocation.getCurrentPosition(
  //     position => {
  //       this.fetchWeather(position.coords.latitude, position.coords.longitude);
  //     },
  //     error => {
  //       this.setState({
  //         error: "Error Getting Weather Condtions"
  //       });
  //     }
  //   );
  // }

  // fetchWeather(lat, lon) {
  //   fetch(
  //     `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&APPID=${API_KEY}&units=metric`
  //   )
  //     .then(res => res.json())
  //     .then(json => {
  //       this.setState({
  //         currentWeather: json,
  //         isLoading: false
  //       });
  //     })
  //     .catch(err => {
  //       console.log(err, "error");
  //     });
  // }

  render() {
    const { isLoading, currentWeather } = this.state;
    return (
      <View style={styles.container}>
        {isLoading ? (
          <View style={styles.loadingContainer}>
            <Text style={styles.loadingText}>Fetching The Weather</Text>
          </View>
        ) : (
            <Weather forecastWeather={forecastWeather.list} />
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
