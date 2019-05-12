import React from "react";
import { View, Text, ActivityIndicator } from "react-native";
import { ButtonGroup } from "react-native-elements";
import { MapView } from "expo";
import {
  TEXT_MEDIUM_SIZE,
  TEXT_COLOR,
  TEXT_LARGE_SIZE,
  TEXT_SMALL_SIZE
} from "../utils/constant";
class Location extends React.Component {
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
    const { coords } = this.props;
    const { layerType, selectedRadarTypeIndex } = this.state;
    const buttons = ["Cloud", "Wind", "Temperature", "Pressure"];
    return (
      <View style={{ flex: 1 }}>
        <MapView
          showsUserLocation={true}
          userLocationAnnotationTitle="Your Current Location"
          style={{ flex: 1 }}
          region={{
            latitude: coords.lat,
            longitude: coords.lon,
            latitudeDelta: 120,
            longitudeDelta: 120
          }}
        >
          <MapView.Marker
            title="Your Weather of Location "
            coordinate={{
              latitude: coords.lat,
              longitude: coords.lon
            }}
          />
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
          textStyle={{ fontSize: TEXT_SMALL_SIZE }}
        />
      </View>
    );
  }
}

export default Location;
