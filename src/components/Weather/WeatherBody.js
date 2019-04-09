import React, { Component } from "react";
import { View, FlatList, ScrollView, StyleSheet } from "react-native";
import Modal from "react-native-modal";
import { Button } from "react-native-elements";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import WeatherBodyFuture from "./WeatherBodyFuture";
import WeatherBodyCurrent from "./WeatherBodyCurrent";
import SearchModal from "./SearchModal";
import { TEXT_COLOR, TEXT_LARGE_SIZE } from "../../../utils/constant";

var _ = require("lodash");

export default class WeatherBody extends Component {
  state = {
    isShowSearchModal: false
  };

  openSearchModal = () => {
    this.setState({ isShowSearchModal: true });
  };

  closeSearchModal() {
    this.setState({ isShowSearchModal: false });
  }

  render() {
    const { weatherInformation } = this.props;
    return (
      <ScrollView style={styles.bodyContainer}>
        <Button
          icon={
            <MaterialCommunityIcons
              size={TEXT_LARGE_SIZE}
              name={"magnify"}
              color={TEXT_COLOR}
            />
          }
          title="Search city..."
          buttonStyle={{
            backgroundColor: "transparent",
            justifyContent: "flex-start",
            opacity: 0.6
          }}
          titleStyle={{
            color: TEXT_COLOR,
            fontSize: TEXT_LARGE_SIZE,
            marginLeft: 10
          }}
          onPress={() => this.openSearchModal()}
        />
        <FlatList
          style={{ paddingTop: 10, paddingBottom: 40 }}
          data={weatherInformation}
          keyExtractor={(item, index) => item[0].dt.toString()}
          renderItem={information => {
            return (
              <View style={{ marginTop: 15 }}>
                {information.index !== 0 ? (
                  <WeatherBodyFuture information={information} />
                ) : (
                    <WeatherBodyCurrent information={information} />
                  )}
                {information.index > 0 ? (
                  <View style={styles.lineBreak} />
                ) : null}
              </View>
            );
          }}
        />
        <Modal
          isVisible={this.state.isShowSearchModal}
          animationIn={"fadeIn"}
          animationOut={"fadeOut"}
        >
          <SearchModal closeSearchModal={() => this.closeSearchModal()} />
        </Modal>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  bodyContainer: {
    flex: 2,
    paddingLeft: 30,
    paddingRight: 30,
    paddingTop: 40
  },

  lineBreak: {
    borderBottomColor: TEXT_COLOR,
    borderBottomWidth: 0.5,
    opacity: 0.1,
    marginLeft: 15,
    marginRight: 15,
    marginTop: 10
  }
});
