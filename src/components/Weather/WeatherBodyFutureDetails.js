var _ = require("lodash");
import React, { Component } from "react";
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  LayoutAnimation,
  Image,
  FlatList
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { TEXT_COLOR, TEXT_SMALL_SIZE } from "../../utils/constant";

class WeatherBodyFutureDetails extends Component {
  render() {
    const { information } = this.props;
    return (
      <View style={{ flex: 1 }}>
        <View
          style={{
            height: this.props.expanded ? null : 0,
            overflow: "hidden"
          }}
        >
          <FlatList
            horizontal={true}
            data={information}
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
        </View>
      </View>
    );
  }
}

export default WeatherBodyFutureDetails;

const styles = StyleSheet.create({
  expandText: {
    alignSelf: "center",
    color: TEXT_COLOR,
    fontSize: TEXT_SMALL_SIZE,
    marginBottom: 15
  },
  hourly: {
    alignItems: "center",
    padding: 5,
    margin: 6
  },
  textHourly: {
    fontSize: TEXT_SMALL_SIZE,
    color: TEXT_COLOR
  },
  textDetails: {
    fontSize: TEXT_SMALL_SIZE,
    color: TEXT_COLOR
  }
});
