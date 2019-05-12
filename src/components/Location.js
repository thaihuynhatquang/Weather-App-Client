import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  Dimensions
} from "react-native";
import { ButtonGroup } from "react-native-elements";
import { MapView } from "expo";
import {
  BACKGROUND_COLOR,
  TEXT_COLOR,
  TEXT_LARGE_SIZE
} from "../utils/constant";
export default class Location extends React.Component {
  constructor() {
    super();
    this.state = {
      layerType: "temp_new",
      selectedRadarTypeIndex: 2
    };
    this.chooseRadarType = this.chooseRadarType.bind(this);
  }

  chooseRadarType(selectedRadarTypeIndex) {
    this.setState({ selectedRadarTypeIndex });
    switch (selectedRadarTypeIndex) {
      case 0:
        this.setState({ layerType: "clouds_new" });
        return;
      case 1:
        this.setState({ layerType: "wind_new" });
        return;
      case 2:
        this.setState({ layerType: "temp_new" });
        return;
      case 3:
        this.setState({ layerType: "pressure_new" });
        return;
      default:
        return;
    }
  }

  render() {
    const { latitude, longitude } = this.props;
    const { layerType, selectedRadarTypeIndex } = this.state;
    const buttons = ["Cloud", "Wind", "Temperature", "Pressure"];
    if (latitude) {
      return (
        <View style={{ flex: 1 }}>
          <MapView
            showsUserLocation
            showsCompass
            showsScale
            style={{ flex: 1 }}
            initialRegion={{
              latitude,
              longitude,
              latitudeDelta: 120,
              longitudeDelta: 120
            }}
          >
            <MapView.UrlTile
              urlTemplate={
                "http://tile.openweathermap.org/map/" +
                layerType +
                "/{z}/{x}/{y}.png?appid=15db80d08721eec4d9cd77e4fcbfb163"
              }
              maximumZ={19}
              flipY={false}
            />
          </MapView>
          <ButtonGroup
            style={{
              flex: 1
            }}
            onPress={this.chooseRadarType}
            selectedIndex={selectedRadarTypeIndex}
            buttons={buttons}
            containerStyle={{ height: 30 }}
          />
        </View>
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
