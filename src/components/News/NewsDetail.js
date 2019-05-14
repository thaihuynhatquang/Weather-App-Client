import React from "react";
import { View, Text } from "react-native";

class NewsDetail extends React.Component {
  render() {
    const { news } = this.props;
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text>News Detail Screen</Text>
        <Text>Author: {news.authorName}</Text>
        <Text>Title: {news.title}</Text>
        <Text>content: {news.content}</Text>
      </View>
    );
  }
}

export default NewsDetail;
