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
  TEXT_SMALL_SIZE
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
          onPress={() => this.viewDetailNewsInformation(navigation, item)}
        >
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              backgroundColor: BACKGROUND_COLOR,
              justifyContent: "center"
            }}
          >
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
                  ~{this.props.item.distance}km
                </Text>
              </View>
            </View>
          </View>
        </TouchableOpacity>
        <View
          style={{
            height: 1,
            marginTop: 20,
            marginBottom: 20,
            backgroundColor: "white"
          }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  title: {
    color: TEXT_COLOR,
    padding: 5,
    fontSize: TEXT_MEDIUM_SIZE
  },
  authorName: {
    color: TEXT_COLOR,
    padding: 5,
    fontSize: TEXT_MEDIUM_SIZE,
    fontWeight: "600"
  },
  datetime: {
    fontSize: (TEXT_SMALL_SIZE * 3) / 4,
    color: TEXT_COLOR,
    paddingLeft: 5,
    fontStyle: "italic",
    opacity: 0.8
  },
  distance: {
    fontSize: (TEXT_SMALL_SIZE * 3) / 4,
    color: TEXT_COLOR,
    paddingRight: 5,
    fontStyle: "italic",
    opacity: 0.8
  }
});
