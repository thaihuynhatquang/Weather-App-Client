import React, { Component } from "react";
import { View, Text, StyleSheet, Dimensions, FlatList } from "react-native";
import { Button, ListItem } from "react-native-elements";

import {
  BACKGROUND_COLOR,
  TEXT_COLOR,
  TEXT_LARGE_SIZE
} from "../../../utils/constant";
var screen = Dimensions.get("screen");
const listCity = [
  { name: "Hurzuf" },
  { name: "Novinki" },
  { name: "Gorkhā" },
  { name: "State of Haryāna" },
  { name: "Holubynka" },
  { name: "Bāgmatī Zone" },
  { name: "Mar’ina Roshcha" },
  { name: "Republic of India" },
  { name: "Kathmandu" },
  { name: "Laspi" },
  { name: "Merida" }
];
export default class SearchModal extends Component {
  render() {
    return (
      <View style={styles.modalContainer}>
        <View style={styles.innerContainer}>
          <Text>This is content inside of modal component</Text>
          <FlatList
            keyExtractor={(item, index) => index.toString()}
            data={listCity}
            renderItem={item => {
              return (
                <View>
                  <Text>{item.item.name}</Text>
                </View>
              );
            }}
          />

          <Button
            onPress={() => this.props.closeSearchModal()}
            title="Close modal"
            buttonStyle={{
              backgroundColor: "transparent"
            }}
            titleStyle={{
              color: TEXT_COLOR,
              fontSize: TEXT_LARGE_SIZE
            }}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  innerContainer: {
    backgroundColor: BACKGROUND_COLOR,
    width: screen.width * 0.9,
    height: screen.height * 0.7,
    padding: 20
  }
});
