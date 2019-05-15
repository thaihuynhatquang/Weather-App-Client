import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Weather from "../components/Weather/Weather";
import { connect } from "react-redux";
import { loadWeatherInformation } from "../store/actions/weatherAction";
import { loadLocationInformation } from "../store/actions/locationAction";
import { loadNewsInformation } from "../store/actions/newsWeatherAction";

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
          this.props.fetchNewsInformation(coords);
        })
        .catch(error => {
          console.log(error);
        });
    }
  }

  getLocation() {
    return new Promise(function(resolve, reject) {
      navigator.geolocation.getCurrentPosition(resolve, reject);
    });
  }

  render() {
    const { isWeatherLoading, weatherInformation, navigation } = this.props;
    return (
      <View style={styles.container}>
        {isWeatherLoading ? null : (
          <Weather
            forecastWeather={weatherInformation}
            navigation={navigation}
          />
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
  fetchLocationInformation: coords => dispatch(loadLocationInformation(coords)),
  fetchNewsInformation: coords => dispatch(loadNewsInformation(coords))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WeatherScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BACKGROUND_COLOR
  }
});
