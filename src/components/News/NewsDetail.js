import React from "react";
import { View, Text, Image, Dimensions, StyleSheet } from "react-native";
import {
  API_URL,
  TEXT_LARGE_SIZE,
  TEXT_COLOR,
  TEXT_MEDIUM_SIZE,
  TEXT_SMALL_SIZE,
  BACKGROUND_COLOR,
  ACTIVE_TINT_COLOR
} from "../../utils/constant";
import { MaterialCommunityIcons } from "@expo/vector-icons";
class NewsDetail extends React.Component {
  render() {
    const { news } = this.props;
    return (
      <View style={{ flex: 1, backgroundColor: BACKGROUND_COLOR }}>
        <Text style={styles.title}>{news.title}</Text>
        <View style={styles.authorAndTime}>
          <MaterialCommunityIcons
            size={TEXT_MEDIUM_SIZE}
            name={"account"}
            color={ACTIVE_TINT_COLOR}
          />
          <Text style={styles.author}>{news.authorName}</Text>
          <Text style={styles.time}>{news.datetime}</Text>
        </View>
        <Image
          source={{ uri: `${API_URL}/img/news/${news.picture}` }}
          style={{
            width: Dimensions.get("screen").width,
            height: (Dimensions.get("screen").width * 3) / 4,
            marginBottom: 10,
            resizeMode: "cover",
            alignSelf: "center"
          }}
        />
        <Text style={styles.content}>{news.content}</Text>
      </View>
    );
  }
}

export default NewsDetail;

const styles = StyleSheet.create({
  title: {
    color: ACTIVE_TINT_COLOR,
    marginLeft: 15,
    marginRight: 15,
    marginTop: 15,
    fontSize: (TEXT_LARGE_SIZE * 3) / 2,
    fontWeight: "600"
  },
  authorAndTime: {
    marginLeft: 15,
    marginRight: 15,
    marginTop: 5,
    marginBottom: 5,
    flexDirection: "row",
    alignItems: "center"
  },
  author: {
    fontSize: TEXT_MEDIUM_SIZE,
    color: ACTIVE_TINT_COLOR,
    fontWeight: "600",
    marginLeft: 5
  },
  time: {
    fontSize: TEXT_SMALL_SIZE,
    color: ACTIVE_TINT_COLOR,
    marginLeft: 5,
    fontStyle: "italic"
  },
  content: {
    fontSize: TEXT_MEDIUM_SIZE,
    color: ACTIVE_TINT_COLOR,
    marginLeft: 15,
    marginRight: 15
  }
});
