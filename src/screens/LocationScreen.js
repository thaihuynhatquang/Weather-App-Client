import React from "react";
import { StyleSheet, ActivityIndicator, Text, View } from "react-native";
import Location from "../components/Location";
import { connect } from "react-redux";
import {
  BACKGROUND_COLOR,
  TEXT_COLOR,
  TEXT_LARGE_SIZE
} from "../utils/constant";
class LocationScreen extends React.Component {
  render() {
    const { isLocationLoading, coords } = this.props;
    return (
      <View style={styles.container}>
        {isLocationLoading ? null : <Location coords={coords} />}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BACKGROUND_COLOR
  }
});

const mapStateToProps = state => ({
  coords: state.locationReducer.coords,
  isLocationLoading: state.locationReducer.isLoading
});

export default connect(mapStateToProps)(LocationScreen);
