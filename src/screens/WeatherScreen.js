import React from "react";
import { StyleSheet, Text, View, ActivityIndicator } from "react-native";
import Weather from "../components/Weather/Weather";
import { connect } from "react-redux";
import { loadWeatherInformation } from "../store/actions/weatherAction";
import { loadLocationInformation } from "../store/actions/locationAction";

import {
  BACKGROUND_COLOR,
  TEXT_COLOR,
  TEXT_LARGE_SIZE
} from "../utils/constant";
class WeatherScreen extends React.Component {
  componentDidMount() {
    if (!this.props.coords) {
      this.getLocation()
        .then(res => {
          const coords = {
            lat: res.coords.latitude,
            lon: res.coords.longitude
          };
          this.props.fetchWeatherInformation(coords);
          this.props.fetchLocationInformation(coords);
        })
        .catch(error => {
          console.log(error);
          // error nay chính là error của navigator.
        });
    }
  }

  getLocation() {
    return new Promise(function(resolve, reject) {
      navigator.geolocation.getCurrentPosition(resolve, reject);
    });
  }

  render() {
    const { isWeatherLoading, weatherInformation } = this.props;
    return (
      <View style={styles.container}>
        {isWeatherLoading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color={TEXT_COLOR} />

            <Text style={styles.loadingText}>Getting Weather Data...</Text>
          </View>
        ) : (
          <Weather forecastWeather={weatherInformation} />
        )}
      </View>
    );
  }
}

const mapStateToProps = state => ({
  weatherInformation: state.weatherReducer.weatherInformation,
  isWeatherLoading: state.weatherReducer.isLoading,
  coords: state.locationReducer.coords
});

const mapDispatchToProps = dispatch => ({
  fetchWeatherInformation: location =>
    dispatch(loadWeatherInformation(location)),
  fetchLocationInformation: coords => dispatch(loadLocationInformation(coords))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WeatherScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BACKGROUND_COLOR
  },
  loadingContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: BACKGROUND_COLOR
  },
  loadingText: {
    marginTop: 20,
    fontSize: TEXT_LARGE_SIZE,
    color: TEXT_COLOR
  }
});
