import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Location from "../components/Location";
import { Permissions } from "expo";
export default class LocationScreen extends React.Component {
  state = {
    latitude: null,
    longitude: null
  };

  async componentDidMount() {
    const { status } = await Permissions.getAsync(Permissions.LOCATION);
    if (status !== "granted") {
      const response = await Permissions.askAsync(Permissions.LOCATION);
    }
    navigator.geolocation.getCurrentPosition(
      res => {
        this.setState({
          latitude: res.coords.latitude,
          longitude: res.coords.longitude
        });
      },
      error => {
        Alert.alert("Error Getting Location");
      }
    );
  }

  render() {
    const { latitude, longitude } = this.state;
    return (
      <View style={styles.container}>
        <Location latitude={latitude} longitude={longitude} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  }
});
