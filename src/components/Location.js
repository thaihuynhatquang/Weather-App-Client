import React from "react";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import { MapView } from "expo";
import {
  BACKGROUND_COLOR,
  TEXT_COLOR,
  TEXT_LARGE_SIZE
} from "../utils/constant";
export default class Location extends React.Component {
  render() {
    const { latitude, longitude } = this.props;
    if (latitude) {
      return (
        <MapView
          showsUserLocation
          showsMyLocationButton
          showsCompass
          loadingEnabled
          showsScale
          style={{ flex: 1 }}
          initialRegion={{
            latitude,
            longitude,
            latitudeDelta: 180,
            longitudeDelta: 180
          }}
        >
          <MapView.UrlTile
            urlTemplate={
              "http://tile.openweathermap.org/map/temp_new/{z}/{x}/{y}.png?appid=15db80d08721eec4d9cd77e4fcbfb163"
            }
            maximumZ={19}
            flipY={false}
          />
        </MapView>
      );
    }
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <ActivityIndicator size="large" color={TEXT_COLOR} />
        <Text style={styles.loadingText}>Getting Location Data...</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  loadingText: {
    marginTop: 20,
    fontSize: TEXT_LARGE_SIZE,
    color: TEXT_COLOR
  }
});
