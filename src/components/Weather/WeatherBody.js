import React, { Component } from "react";
import {
  View,
  FlatList,
  ScrollView,
  StyleSheet,
  LayoutAnimation
} from "react-native";
import Modal from "react-native-modal";
import { Button } from "react-native-elements";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import WeatherBodyFuture from "./WeatherBodyFuture";
import WeatherBodyCurrent from "./WeatherBodyCurrent";
import SearchModal from "./SearchModal";
import {
  TEXT_COLOR,
  TEXT_LARGE_SIZE,
  ACTIVE_TINT_COLOR
} from "../../utils/constant";

var _ = require("lodash");

export default class WeatherBody extends Component {
  state = {
    isShowSearchModal: false,
    key: 0,
    isHideSearchBar: false
  };

  keyRerender = 0;

  openSearchModal = () => {
    this.setState({ isShowSearchModal: true });
    this.keyRerender++;
  };

  closeSearchModal() {
    this.setState({ isShowSearchModal: false });
  }

  changeStatusSearchBar = event => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.linear);
    if (event.nativeEvent.contentOffset.y <= 0) {
      this.setState({ isHideSearchBar: false });
    } else {
      this.setState({ isHideSearchBar: true });
    }
  };

  render() {
    const { weatherInformation } = this.props;
    const { isHideSearchBar } = this.state;
    return (
      <View style={styles.bodyContainer}>
        {!isHideSearchBar ? (
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
        ) : null}
        <ScrollView
          onScroll={event => this.changeStatusSearchBar(event)}
          showsVerticalScrollIndicator={false}
        >
          <FlatList
            style={{ paddingTop: 10, paddingBottom: 40 }}
            data={weatherInformation.list}
            keyExtractor={(item, index) => item[0].dt.toString()}
            renderItem={information => {
              return (
                <View style={{ marginTop: 15 }}>
                  {information.index !== 0 ? (
                    <WeatherBodyFuture information={information.item} />
                  ) : (
                    <WeatherBodyCurrent
                      futureInformation={information.item}
                      currentInformation={weatherInformation.current}
                    />
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
            <SearchModal
              keyRerender={this.keyRerender}
              closeSearchModal={() => this.closeSearchModal()}
            />
          </Modal>
        </ScrollView>
      </View>
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
    borderBottomColor: ACTIVE_TINT_COLOR,
    borderBottomWidth: 0.5,
    opacity: 0.1,
    marginLeft: 15,
    marginRight: 15,
    marginTop: 10
  }
});
