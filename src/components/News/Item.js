import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  TouchableHighlight
} from "react-native";
import {
  API_URL,
  TEXT_COLOR,
  BACKGROUND_COLOR,
  TEXT_MEDIUM_SIZE,
  TEXT_SMALL_SIZE,
  ACTIVE_TINT_COLOR,
  BACKGROUND_THIRD_COLOR
} from "../../utils/constant";

export default class Item extends Component {
  viewDetailNewsInformation = (navigation, item) => {
    navigation.navigate("NewsDetailScreen", {
      news: item
    });
  };
  render() {
    const { navigation, item } = this.props;
    return (
      <View style={{ flex: 1, flexDirection: "column" }}>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => this.viewDetailNewsInformation(navigation, item)}
        >
          <View style={styles.container}>
            <Image
              source={{ uri: `${API_URL}/img/news/${this.props.item.picture}` }}
              style={{
                width: 120,
                height: 90,
                margin: 10,
                resizeMode: "cover",
                alignSelf: "center"
              }}
            />
            <View
              style={{
                flex: 1,
                flexDirection: "column",
                justifyContent: "center"
              }}
            >
              <Text style={styles.authorName}>
                {this.props.item.authorName}
              </Text>
              <Text style={styles.title}>{this.props.item.title}</Text>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between"
                }}
              >
                <Text style={styles.datetime}>{this.props.item.datetime}</Text>
                <Text style={styles.distance}>
                  ~{this.props.item.distance}m
                </Text>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: BACKGROUND_THIRD_COLOR,
    justifyContent: "center",
    margin: 10
    // shadowColor: "gray",
    // shadowOffset: { width: 2, height: 2 },
    // shadowOpacity: 0.4,
    // shadowRadius: 5,
    // borderRadius: 3
  },
  title: {
    color: ACTIVE_TINT_COLOR,
    padding: 5,
    fontSize: TEXT_MEDIUM_SIZE
  },
  authorName: {
    color: ACTIVE_TINT_COLOR,
    padding: 5,
    fontSize: TEXT_MEDIUM_SIZE,
    fontWeight: "600"
  },
  datetime: {
    fontSize: (TEXT_SMALL_SIZE * 3) / 4,
    color: ACTIVE_TINT_COLOR,
    paddingLeft: 5,
    fontStyle: "italic",
    opacity: 0.8
  },
  distance: {
    fontSize: (TEXT_SMALL_SIZE * 3) / 4,
    color: ACTIVE_TINT_COLOR,
    paddingRight: 5,
    fontStyle: "italic",
    opacity: 0.8
  }
});
