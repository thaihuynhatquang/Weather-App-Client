import React from "react";
import { StyleSheet, Text, View, ActivityIndicator } from "react-native";
import Weather from "../components/Weather/Weather";
import { connect } from "react-redux";
import { loadWeatherInformation } from "../store/actions/index";
import {
  BACKGROUND_COLOR,
  TEXT_COLOR,
  TEXT_LARGE_SIZE
} from "../../utils/constant";
class WeatherScreen extends React.Component {
  _isMounted = false;

  componentDidMount() {
    this._isMounted = true;
    navigator.geolocation.getCurrentPosition(
      res => {
        let location = {
          lat: res.coords.latitude,
          lon: res.coords.longitude
        };
        if (this._isMounted) {
          this.props.fetchWeatherInformation(location);
        }
      },
      error => {
        alert("Error Getting Weather Condtions");
      }
    );
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
    const { isLoading, weatherInformation } = this.props;
    return (
      <View style={styles.container}>
        {isLoading ? (
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
  isLoading: state.weatherReducer.isLoading
});

const mapDispatchToProps = dispatch => ({
  fetchWeatherInformation: location =>
    dispatch(loadWeatherInformation(location))
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
