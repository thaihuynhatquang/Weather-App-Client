import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  LayoutAnimation
} from "react-native";
import {
  TEXT_COLOR,
  TEXT_MEDIUM_SIZE,
  TEXT_SMALL_SIZE,
  TEXT_LARGE_SIZE
} from "../../utils/constant";
import WeatherBodyFutureDetails from "./WeatherBodyFutureDetails";
var _ = require("lodash");

export default class WeatherBodyFuture extends Component {
  constructor() {
    super();
    this.state = { expanded: false };
  }

  changeLayout = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    this.setState({ expanded: !this.state.expanded });
  };

  render() {
    const { information } = this.props;

    return (
      <View style={styles.cardFutureInformation}>
        <TouchableOpacity
          style={styles.futureInformation}
          activeOpacity={0.8}
          onPress={this.changeLayout}
        >
          <View>
            <Text style={styles.datetime}>
              {information[0].datetime.fullDate}
            </Text>
            <Text style={styles.temperature}>
              {_.round(information[0].main.temp)}˚
            </Text>
            <Text style={styles.description}>{information[0].description}</Text>
          </View>
          <Image
            style={{
              height: 50,
              width: 50
            }}
            source={{
              uri: `http://openweathermap.org/img/w/${
                information[0].weather[0].icon
              }.png`
            }}
          />
        </TouchableOpacity>
        <WeatherBodyFutureDetails
          expanded={this.state.expanded}
          information={information}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  cardFutureInformation: {
    flex: 0,
    flexDirection: "column",
    paddingTop: 20,
    paddingLeft: 20,
    paddingRight: 20
  },
  futureInformation: {
    flex: 0,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  datetime: {
    fontSize: TEXT_SMALL_SIZE,
    color: TEXT_COLOR,
    marginBottom: 5
  },
  temperature: {
    color: TEXT_COLOR,
    fontSize: TEXT_LARGE_SIZE * 2
  },
  description: {
    fontSize: TEXT_MEDIUM_SIZE,
    fontWeight: "bold",
    color: TEXT_COLOR,
    marginBottom: 5
  }
});
