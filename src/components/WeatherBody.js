import React from "react";
import { View, FlatList, Text, StyleSheet } from "react-native";
var _ = require('lodash');

export default WeatherBody = ({ weatherInformation }) => {
  console.log(weatherInformation.length, "length")
  return (
    <FlatList
      style={styles.bodyContainer}
      data={weatherInformation}
      keyExtractor={(item, index) => item[0].dt.toString()}
      renderItem={(information) => {
        console.log(information)
        return (
          <View style={styles.bodyContainer}>
            {information.index !== 0 ?
              <View style={styles.cardFutureInformation}>
                <View>
                  <Text style={styles.datetime}>
                    {information.item[0].datetime.fullDate}
                  </Text>
                  <Text style={styles.description}>
                    {information.item[0].weather[0].description}
                  </Text>
                </View>
                <View>
                  <Text>Day la icon</Text>
                </View>
              </View> :
              <View style={styles.cardCurrentInformation}>
                <View style={styles.today}><Text style={{ color: "white" }}>Today</Text></View>
                <View>
                  <Text style={styles.temperature}>
                    {_.round(information.item[0].main.temp)}˚
                  </Text>
                  <Text style={styles.description}>
                    {information.item[0].weather[0].description}
                  </Text>
                </View>
                <View>
                  <Text>Day la icon</Text>
                </View>
              </View>
            }
            {information.index > 0 ?
              <View style={styles.lineBreak} /> : null}
          </View>
        )
      }}
    />
  )
}

const styles = StyleSheet.create({
  bodyContainer: {
    flex: 2,
    paddingTop: 20
  },
  cardFutureInformation: {
    flex: 0,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 20,
    borderRadius: 2
  },
  cardCurrentInformation: {
    flex: 0,
    backgroundColor: "white",
    shadowColor: 'gray',
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 20,
    borderRadius: 2
  },
  today: {
    position: "absolute",
    paddingTop: 10,
    paddingBottom: 10,
    paddingRight: 20,
    paddingLeft: 20,
    backgroundColor: "#373b3d",
    left: 20,
    top: -20,
    borderRadius: 2
  },
  datetime: {
    fontSize: 10,
    color: "#344046",
    marginBottom: 5
  },
  description: {
    fontSize: 15,
    color: "#344046",
    marginBottom: 5
  },
  temperature: {
    color: "#344046",
    fontSize: 20
  },
  lineBreak: {
    borderBottomColor: '#344046',
    borderBottomWidth: 0.5,
    opacity: 0.1,
    marginLeft: 15,
    marginRight: 15,
    marginTop: 10
  }
});
