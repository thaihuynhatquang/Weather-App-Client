import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  Alert,
  Image
} from "react-native";
import { connect } from "react-redux";
import {
  loadWeatherInformation,
  loadCityInformation,
  clearListCity
} from "../../store/actions/weatherAction";
import { Button, SearchBar } from "react-native-elements";
import {
  BACKGROUND_COLOR,
  TEXT_COLOR,
  TEXT_LARGE_SIZE,
  TEXT_MEDIUM_SIZE
} from "../../utils/constant";

var screen = Dimensions.get("screen");

class SearchModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      error: null,
      searchValue: null
    };
  }

  updateSearch = searchValue => {
    this.setState({ searchValue });
  };

  searchCity = () => {
    const city = this.state.searchValue;
    if (!city) {
      Alert.alert("At least 2 letters");
    } else {
      check = city.match(/([A-Za-z])/g);
      if (check && check.length > 2) {
        this.props.fetchListCityInformation(city);
      } else {
        Alert.alert("At least 2 letters");
      }
    }
    this.search.clear();
  };

  onChooseCity = city => {
    this.props.clearListCity();
    this.props.fetchWeatherInformation(city.coord);
  };

  onCloseSearchModal = () => {
    this.props.closeSearchModal();
    this.props.clearListCity();
  };

  render() {
    const { listCity, isLoading } = this.props;
    const { searchValue } = this.state;
    return (
      <KeyboardAvoidingView
        style={styles.modalContainer}
        keyboardVerticalOffset={Platform.select({ ios: 5, android: -500 })}
        behavior="padding"
      >
        <View style={styles.innerContainer}>
          <SearchBar
            ref={search => (this.search = search)}
            placeholder="Type Here..."
            onChangeText={this.updateSearch}
            showLoading={isLoading}
            autoCorrect={false}
            value={searchValue}
            containerStyle={{
              backgroundColor: "transparent",
              borderTopWidth: 0,
              borderBottomWidth: 0,
              padding: 0
            }}
            errorMessage={"At least 2 letters"}
            errorStyle={{
              color: "#cacbd5",
              fontStyle: "italic"
            }}
            inputContainerStyle={{
              backgroundColor: "#055929",
              borderRadius: 3
            }}
            inputStyle={{
              color: "white"
            }}
          />
          <FlatList
            data={listCity}
            renderItem={({ item }) => (
              <Button
                onPress={() => this.onChooseCity(item)}
                title={item.name + ", " + item.country + " "}
                titleStyle={{
                  color: "#2e8733"
                }}
                icon={
                  <Image
                    style={{
                      height: 11,
                      width: 16
                    }}
                    source={{
                      uri: `http://openweathermap.org/images/flags/${item.country.toLowerCase()}.png`
                    }}
                  />
                }
                rightIcon={true}
                type="clear"
              />
            )}
            keyExtractor={item => item.id.toString()}
          />

          <View style={styles.button}>
            <Button
              onPress={() => this.searchCity()}
              loading={isLoading}
              title="Search"
              buttonStyle={{
                backgroundColor: "#055929",
                marginRight: 15
              }}
              titleStyle={{
                color: "white",
                fontSize: TEXT_MEDIUM_SIZE
              }}
            />
            <Button
              onPress={() => this.onCloseSearchModal()}
              title="Close"
              buttonStyle={{
                backgroundColor: "#055929",
                marginLeft: 15
              }}
              titleStyle={{
                color: "white",
                fontSize: TEXT_MEDIUM_SIZE
              }}
            />
          </View>
        </View>
      </KeyboardAvoidingView>
    );
  }
}
const mapStateToProps = state => ({
  listCity: state.weatherReducer.listCity,
  isLoading: state.weatherReducer.isLoadingCity
});

const mapDispatchToProps = dispatch => ({
  fetchWeatherInformation: location =>
    dispatch(loadWeatherInformation(location)),
  fetchListCityInformation: cityName => dispatch(loadCityInformation(cityName)),
  clearListCity: () => dispatch(clearListCity())
});

export default connect(
  mapStateToProps,
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
  button: {
    flexDirection: "row",
    justifyContent: "center",
    borderRadius: 3,
    padding: 4
  }
});
