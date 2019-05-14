import React from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import NewsDetail from "../components/News/NewsDetail";

class NewsDetailScreen extends React.Component {
  render() {
    const { navigation } = this.props;
    const news = navigation.getParam("news");
    return (
      <View style={styles.container}>
        <NewsDetail news={news} />
      </View>
    );
  }
}

export default NewsDetailScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  }
});
