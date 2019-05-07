import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  FlatList,
  KeyboardAvoidingView,
  Platform
} from "react-native";
import { connect } from "react-redux";
import { loadWeatherInformation } from "../../store/actions";
import { Button, SearchBar } from "react-native-elements";
import { listCity } from "../../../utils/SampleData";
import {
  BACKGROUND_COLOR,
  TEXT_COLOR,
  TEXT_LARGE_SIZE,
  TEXT_MEDIUM_SIZE
} from "../../../utils/constant";

var screen = Dimensions.get("screen");

class SearchModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      data: [],
      error: null
    };

    this.arrayholder = listCity;
  }

  renderHeader = () => {
    return (
      <SearchBar
        placeholder="Type Here..."
        onChangeText={text => this.searchFilterFunction(text)}
        autoCorrect={false}
        value={this.state.value}
        containerStyle={{
          backgroundColor: "transparent",
          borderTopWidth: 0,
          borderBottomWidth: 0,
          padding: 0
        }}
        inputContainerStyle={{
          backgroundColor: "#373b3d",
          borderRadius: 3
        }}
      />
    );
  };

  renderSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          borderBottomWidth: 0.5,
          borderBottomColor: "#373b3d",
          opactity: 0.1
        }}
      />
    );
  };

  searchFilterFunction = text => {
    if (text === "") {
      this.setState({ value: "", data: [] });
      return;
    }
    this.setState({
      value: text
    });
    const newData = this.arrayholder.filter(item => {
      const itemData = item.name.toUpperCase();
      const textData = text.toUpperCase();
      return itemData.indexOf(textData) > -1;
    });
    this.setState({ data: newData });
  };

  onChooseCity = city => {
    this.props.fetchWeatherInformation(city.coord);
  };

  render() {
    return (
      <KeyboardAvoidingView
        style={styles.modalContainer}
        keyboardVerticalOffset={Platform.select({ ios: 5, android: -500 })}
        behavior="padding"
      >
        <View style={styles.innerContainer}>
          <FlatList
            data={this.state.data}
            renderItem={({ item }) => (
              <Text
                style={styles.listCity}
                onPress={() => this.onChooseCity(item)}
              >
                {item.name}
              </Text>
            )}
            keyExtractor={item => item.id.toString()}
            ItemSeparatorComponent={this.renderSeparator}
            ListHeaderComponent={this.renderHeader}
          />

          <View style={styles.cancelButton}>
            <Button
              onPress={() => this.props.closeSearchModal()}
              title="Close"
              buttonStyle={{
                backgroundColor: "#373b3d"
              }}
              titleStyle={{
                color: "#86939e",
                fontSize: TEXT_MEDIUM_SIZE
              }}
            />
          </View>
        </View>
      </KeyboardAvoidingView>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  fetchWeatherInformation: location =>
    dispatch(loadWeatherInformation(location))
});

export default connect(
  null,
  mapDispatchToProps
)(SearchModal);

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 3
  },
  innerContainer: {
    backgroundColor: BACKGROUND_COLOR,
    width: screen.width * 0.9,
    height: screen.height * 0.5,
    padding: 20
  },
  listCity: {
    marginTop: 10,
    marginBottom: 10,
    fontSize: TEXT_LARGE_SIZE,
    color: TEXT_COLOR
  },
  cancelButton: {
    justifyContent: "center",
    marginLeft: "35%",
    marginRight: "35%",
    borderRadius: 3,
    padding: 4
  }
});
