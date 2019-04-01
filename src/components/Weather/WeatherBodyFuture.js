import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import {
  TEXT_COLOR,
  TEXT_MEDIUM_SIZE,
  TEXT_SMALL_SIZE
} from "../../../utils/constant";

export default class WeatherBodyFuture extends Component {
  render() {
    const { information } = this.props;

    return (
      <View style={styles.cardFutureInformation}>
        <View>
          <Text style={styles.datetime}>
            {information.item[0].datetime.fullDate}
          </Text>
          <Text style={styles.description}>
            {information.item[0].weather[0].description}
          </Text>
        </View>
        <MaterialCommunityIcons
          size={35}
          name={"weather-lightning"}
          color="#344046"
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  cardFutureInformation: {
    flex: 0,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 20,
    borderRadius: 2
  },
  datetime: {
    fontSize: TEXT_SMALL_SIZE,
    color: TEXT_COLOR,
    marginBottom: 5
  },
  description: {
    fontSize: TEXT_MEDIUM_SIZE,
    color: TEXT_COLOR,
    marginBottom: 5
  }
});
