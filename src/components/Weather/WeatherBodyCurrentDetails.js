var _ = require("lodash");
import React, { Component } from "react";
import {
  View,
  TouchableOpacity,
  Text,
  UIManager,
  Platform,
  StyleSheet,
  LayoutAnimation,
  Image,
  Dimensions,
  FlatList
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import {
  TEXT_COLOR,
  INACTIVE_TEXT_COLOR,
  TEXT_LARGE_SIZE,
  TEXT_MEDIUM_SIZE,
  TEXT_SMALL_SIZE,
  API_URL,
  platform
} from "../../utils/constant";
import { connect } from "react-redux";

class WeatherBodyCurrentDetails extends Component {
  constructor() {
    super();
    this.state = { expanded: true };
    // if (Platform.OS === "android") {
    //   UIManager.setLayoutAnimationEnabledExperimental(true);
    // }
  }

  changeLayout = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    this.setState({ expanded: !this.state.expanded });
  };

  render() {
    const { information } = this.props;
    const isAndroid = platform === "android" ? true : false;
    const hourlyWeatherInformation = this.props.weatherInformation.list;
    return (
      <View style={{ flex: 1 }}>
        <View
          style={{
            height: this.state.expanded ? null : 0,
            overflow: "hidden"
          }}
        >
          <FlatList
            horizontal={true}
            data={hourlyWeatherInformation}
            keyExtractor={(item, index) => item.dt.toString()}
            renderItem={i => {
              let hourly = i.item;
              return (
                <View style={styles.hourly}>
                  <Text style={styles.textHourly}>
                    {hourly.datetime.daysOfWeek}, {hourly.datetime.day}{" "}
                    {hourly.datetime.month}
                  </Text>
                  <Text style={styles.textHourly}>{hourly.datetime.hour}</Text>
                  <Image
                    style={{
                      height: 40,
                      width: 40
                    }}
                    source={{
                      uri: `http://openweathermap.org/img/w/${
                        hourly.weather[0].icon
                      }.png`
                    }}
                  />
                  <Text style={styles.textHourly}>
                    {_.round(hourly.main.temp)}˚C
                  </Text>
                </View>
              );
            }}
          />
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-around"
            }}
          >
            <View
              style={{
                flexDirection: "column",
                justifyContent: "flex-start"
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center"
                }}
              >
                <Image
                  style={{
                    height: isAndroid ? 20 : 30,
                    width: isAndroid ? 20 : 30,
                    marginLeft: !isAndroid ? 10 : null
                  }}
                  source={{
                    uri: `${API_URL}/img/weather-humidity.png`
                  }}
                />
                <Text style={styles.textHourly}>
                  Humidity: {information.humidity}%
                </Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center"
                }}
              >
                <Image
                  style={{
                    height: isAndroid ? 20 : 30,
                    width: isAndroid ? 20 : 30,
                    marginLeft: !isAndroid ? 10 : null
                  }}
                  source={{
                    uri: `${API_URL}/img/weather-cloud.png`
                  }}
                />
                <Text style={styles.textHourly}>
                  Clouds: {information.clouds}%
                </Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center"
                }}
              >
                <Image
                  style={{
                    height: isAndroid ? 20 : 30,
                    width: isAndroid ? 20 : 30,
                    marginLeft: !isAndroid ? 10 : null
                  }}
                  source={{
                    uri: `${API_URL}/img/weather-uv.png`
                  }}
                />
                <Text style={styles.textHourly}>
                  UV Index: {information.uv}
                </Text>
              </View>
            </View>

            <View
              style={{
                flexDirection: "column",
                justifyContent: "flex-end"
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center"
                }}
              >
                <Image
                  style={{
                    height: isAndroid ? 20 : 30,
                    width: isAndroid ? 20 : 30,
                    marginLeft: !isAndroid ? 10 : null
                  }}
                  source={{
                    uri: `${API_URL}/img/weather-wind.png`
                  }}
                />
                <Text style={styles.textHourly}>
                  Wind: {information.wind_speed} m/s
                </Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center"
                }}
              >
                <Image
                  style={{
                    height: isAndroid ? 20 : 30,
                    width: isAndroid ? 20 : 30,
                    marginLeft: !isAndroid ? 10 : null
                  }}
                  source={{
                    uri: `${API_URL}/img/weather-pressure.png`
                  }}
                />
                <Text style={styles.textHourly}>
                  Pressure: {information.pressure}
                </Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center"
                }}
              >
                <Image
                  style={{
                    height: isAndroid ? 20 : 30,
                    width: isAndroid ? 20 : 30,
                    marginLeft: !isAndroid ? 10 : null
                  }}
                  source={{
                    uri: `${API_URL}/img/weather-visibility.png`
                  }}
                />
                <Text style={styles.textHourly}>
                  Visibility: {information.visibility} km
                </Text>
              </View>
              <View>
                <Text />
              </View>
            </View>
          </View>
        </View>

        <TouchableOpacity activeOpacity={0.8} onPress={this.changeLayout}>
          {!this.state.expanded ? (
            <MaterialCommunityIcons
              size={20}
              name={"chevron-down"}
              color={"white"}
              style={{ alignSelf: "center" }}
            />
          ) : (
            <MaterialCommunityIcons
              size={20}
              name={"chevron-up"}
              color={"white"}
              style={{ alignSelf: "center" }}
            />
          )}
        </TouchableOpacity>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  weatherInformation: state.weatherReducer.weatherInformation,
  isLoading: state.weatherReducer.isLoading
});

export default connect(mapStateToProps)(WeatherBodyCurrentDetails);

const styles = StyleSheet.create({
  expandText: {
    alignSelf: "center",
    color: "white",
    fontSize: TEXT_SMALL_SIZE,
    marginBottom: 15
  },
  hourly: {
    alignItems: "center",
    padding: 5,
    margin: 6,
    shadowColor: "gray",
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    borderRadius: 3
  },
  textHourly: {
    fontSize: TEXT_SMALL_SIZE,
    color: "white"
  },
  textDetails: {
    fontSize: TEXT_SMALL_SIZE,
    color: "white"
  }
});
