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
  TEXT_SMALL_SIZE
} from "../../../utils/constant";
import { connect } from "react-redux";

class WeatherBodyCurrentDetails extends Component {
  constructor() {
    super();
    this.state = { expanded: false };
    if (Platform.OS === "android") {
      UIManager.setLayoutAnimationEnabledExperimental(true);
    }
  }

  changeLayout = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    this.setState({ expanded: !this.state.expanded });
  };

  render() {
    const WIDTH = Dimensions.get("window").width;
    const hourlyWeatherInformation = this.props.weatherInformation.list;
    return (
      <View style={{ flex: 1 }}>
        <View
          style={{
            height: this.state.expanded ? null : 0,
            overflow: "hidden",
            alignItems: "center"
          }}
        >
          <Image
            style={{ height: WIDTH * 0.7, width: WIDTH * 0.7 }}
            resizeMode="center"
            source={{
              uri:
                "https://www.upsieutoc.com/images/2019/03/29/snow---day-01.png"
            }}
          />
          <FlatList
            horizontal={true}
            data={hourlyWeatherInformation}
            keyExtractor={(item, index) => item.dt.toString()}
            renderItem={i => {
              let hourly = i.item;
              return (
                <View style={styles.hourly}>
                  <Text style={styles.textHourly}>
                    {hourly.datetime.fullDate}
                  </Text>
                  <Text style={styles.textHourly}>{hourly.datetime.hour}</Text>
                  <MaterialCommunityIcons
                    size={25}
                    name={"weather-rainy"}
                    color={TEXT_COLOR}
                    style={{ margin: 5 }}
                  />
                  <Text style={styles.textHourly}>
                    {_.round(hourly.main.temp)}˚C
                  </Text>
                </View>
              );
            }}
          />
        </View>
        <TouchableOpacity activeOpacity={0.8} onPress={this.changeLayout}>
          {!this.state.expanded ? (
            <Text style={styles.expandText}>View Details</Text>
          ) : (
            <Text style={styles.expandText}>Collapse</Text>
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
    color: INACTIVE_TEXT_COLOR,
    fontSize: TEXT_SMALL_SIZE,
    // fontStyle: "italic",
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
    color: TEXT_COLOR
  }
});
