import React, { Component } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import {
  TEXT_COLOR,
  TEXT_MEDIUM_SIZE,
  TEXT_SMALL_SIZE
} from "../../utils/constant";

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
        <Image
          style={{
            height: 50,
            width: 50
          }}
          source={{
            uri: `http://openweathermap.org/img/w/${
              information.item[0].weather[0].icon
            }.png`
          }}
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
    fontWeight: "bold",
    color: TEXT_COLOR,
    marginBottom: 5
  }
});
