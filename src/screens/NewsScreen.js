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
    const { isNewsLoading, navigation } = this.props;
    return (
      <View style={styles.container}>
        <News isNewsLoading={isNewsLoading} navigation={navigation} />
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
    backgroundColor: BACKGROUND_COLOR
  }
});
