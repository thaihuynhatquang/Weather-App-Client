import React from "react";
import News from "../components/News/News";
import { connect } from "react-redux";
import {
  BACKGROUND_COLOR,
  TEXT_COLOR,
  TEXT_LARGE_SIZE
} from "../utils/constant";
import { StyleSheet, ActivityIndicator, Text, View } from "react-native";

class NewsScreen extends React.Component {
  render() {
    const { isNewsLoading } = this.props;
    return (
      <View style={styles.container}>
        {isNewsLoading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color={TEXT_COLOR} />
            <Text style={styles.loadingText}>Getting News Data...</Text>
          </View>
        ) : (
          <News />
        )}
      </View>
    );
  }
}

const mapStateToProps = state => ({
  isNewsLoading: state.newsReducer.isLoading
});

export default connect(mapStateToProps)(NewsScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  loadingContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: BACKGROUND_COLOR
  },
  loadingText: {
    marginTop: 20,
    fontSize: TEXT_LARGE_SIZE,
    color: TEXT_COLOR
  }
});
