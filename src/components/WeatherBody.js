import React from "react";
import { View, FlatList, Text, StyleSheet } from "react-native";
import WeatherBodyFuture from "./WeatherBodyFuture";
import WeatherBodyCurrent from "./WeatherBodyCurrent";
import { TEXT_COLOR } from "../../utils/constant";

var _ = require("lodash");

export default (WeatherBody = ({ weatherInformation }) => {
  return (
    <FlatList
      style={styles.bodyContainer}
      data={weatherInformation}
      keyExtractor={(item, index) => item[0].dt.toString()}
      renderItem={information => {
        return (
          <View style={{ marginTop: 15 }}>
            {information.index !== 0 ? (
              <WeatherBodyFuture information={information} />
            ) : (
              <WeatherBodyCurrent information={information} />
            )}
            {information.index > 0 ? <View style={styles.lineBreak} /> : null}
          </View>
        );
      }}
    />
  );
});

const styles = StyleSheet.create({
  bodyContainer: {
    flex: 2,
    paddingLeft: 30,
    paddingRight: 30,
    paddingTop: 40
  },

  lineBreak: {
    borderBottomColor: TEXT_COLOR,
    borderBottomWidth: 0.5,
    opacity: 0.1,
    marginLeft: 15,
    marginRight: 15,
    marginTop: 10
  }
});
