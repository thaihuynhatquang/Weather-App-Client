import React, { Component } from "react";
import {
  View,
  TouchableOpacity,
  Text,
  UIManager,
  Platform,
  StyleSheet,
  LayoutAnimation,
  Image,
  Dimensions
} from "react-native";
import {
  TEXT_COLOR,
  INACTIVE_TEXT_COLOR,
  TEXT_LARGE_SIZE,
  TEXT_MEDIUM_SIZE,
  TEXT_SMALL_SIZE
} from "../../utils/constant";

export class WeatherBodyCurrentDetails extends Component {
  constructor() {
    super();

    this.state = { expanded: false };

    if (Platform.OS === "android") {
      UIManager.setLayoutAnimationEnabledExperimental(true);
    }
  }

  changeLayout = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    this.setState({ expanded: !this.state.expanded });
  };
  render() {
    const WIDTH = Dimensions.get("window").width;
    return (
      <View style={{ flex: 1 }}>
        <View
          style={{
            height: this.state.expanded ? null : 0,
            overflow: "hidden",
            zIndex: 1000,
            alignItems: "center"
          }}
        >
          <Image
            style={{ height: WIDTH * 0.8, width: WIDTH * 0.8 }}
            resizeMode="center"
            source={{
              uri:
                "https://www.upsieutoc.com/images/2019/03/29/snow---day-01.png"
            }}
          />
        </View>
        <TouchableOpacity activeOpacity={0.8} onPress={this.changeLayout}>
          {!this.state.expanded ? (
            <Text style={styles.expandText}>View Details</Text>
          ) : (
            <Text style={styles.expandText}>Collapse</Text>
          )}
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  expandText: {
    alignSelf: "center",
    color: INACTIVE_TEXT_COLOR,
    fontSize: TEXT_SMALL_SIZE,
    // fontStyle: "italic",
    marginBottom: 15,
    marginTop: 15
  }
});
