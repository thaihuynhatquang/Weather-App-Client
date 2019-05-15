import React, { Component } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { Button } from "react-native-elements";
import { MaterialCommunityIcons } from "@expo/vector-icons";
var _ = require("lodash");
import {
  TEXT_COLOR,
  TEXT_TITLE,
  TEXT_MEDIUM_SIZE,
  ACTIVE_TINT_COLOR
} from "../../utils/constant";

export default class WeatherHeader extends Component {
  render() {
    const { city, country, navigation } = this.props;
    return (
      <View style={styles.headerContainer}>
        <View style={{ flex: 1, alignItems: "flex-start" }}>
          <Text style={styles.textTitle}>Weather</Text>
          <Text style={styles.textSubTitle}>
            {city}, {country}{" "}
            {
              <Image
                style={{
                  height: 11,
                  width: 16
                }}
                source={{
                  uri: `http://openweathermap.org/images/flags/${country.toLowerCase()}.png`
                }}
              />
            }
          </Text>
        </View>
        <View style={styles.iconTitle}>
          <View style={{ flexDirection: "row" }}>
            <Button
              onPress={() => this.props.navigation.toggleDrawer()}
              type="clear"
              icon={
                <MaterialCommunityIcons
                  size={30}
                  name={"account"}
                  color={ACTIVE_TINT_COLOR}
                />
              }
            />
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  headerContainer: {
    flex: 0,
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    paddingLeft: 30,
    paddingRight: 30,
    paddingTop: 30
  },
  textTitle: {
    fontSize: TEXT_TITLE,
    color: ACTIVE_TINT_COLOR,
    fontWeight: "bold"
  },
  textSubTitle: {
    fontSize: TEXT_MEDIUM_SIZE,
    color: ACTIVE_TINT_COLOR
  },
  iconTitle: {
    flex: 1,
    flexDirection: "column",
    alignItems: "flex-end"
  }
});
