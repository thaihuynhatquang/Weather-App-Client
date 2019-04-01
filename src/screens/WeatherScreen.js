import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { API_KEY } from "../../utils/WeatherAPIKey";
import Weather from "../components/Weather/Weather";
// import { currentWeather, forecastWeather } from "../../utils/SampleData";
import { connect } from "react-redux";
import { loadWeatherInformation } from "../store/actions/index";
class WeatherScreen extends React.Component {
  componentDidMount() {
    this.props.fetchWeatherInformation();
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
    const { isLoading, weatherInformation } = this.props;
    return (
      <View style={styles.container}>
        {!isLoading ? (
          <View style={styles.loadingContainer}>
            <Text style={styles.loadingText}>Fetching The Weather</Text>
          </View>
        ) : // <Weather forecastWeather={weatherInformation.list} />
        null}
        <Text>Hello</Text>
      </View>
    );
  }
}

const mapStateToProps = state => {
  console.log(state, "hello");
  return {
    weatherInformation: state.weatherReducer.weatherInformation,
    isLoading: state.weatherReducer.isLoading
  };
};
const mapDispatchToProps = dispatch => {
  return {
    fetchWeatherInformation: () => dispatch(loadWeatherInformation())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WeatherScreen);

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
