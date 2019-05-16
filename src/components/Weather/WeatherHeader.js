import React, { Component } from "react";
import { View, Text, StyleSheet, Image, AsyncStorage } from "react-native";
import { Button } from "react-native-elements";
import { connect } from "react-redux";
import { addFavoritePlace } from "../../store/actions/authAction";
import { MaterialCommunityIcons } from "@expo/vector-icons";
var _ = require("lodash");
import {
  TEXT_COLOR,
  TEXT_TITLE,
  TEXT_MEDIUM_SIZE,
  ACTIVE_TINT_COLOR,
  TEXT_LARGE_SIZE
} from "../../utils/constant";

class WeatherHeader extends Component {
  constructor(props) {
    super(props);

    this.state = {
      liked: false,
      isLogin: null
    };
  }

  componentDidMount = async () => {
    const data = await this.getDataFromAsyncStorage();
    const { information } = this.props;
    if (this.props.favoritePlaces) {
      let favoritePlaces = this.props.favoritePlaces.slice(0);
      let place = {
        city: information.name,
        country: information.country,
        coords: information.coord
      };
      if (
        _.findIndex(favoritePlaces, function(o) {
          return o.city === place.city && o.country === place.country;
        }) === -1
      ) {
        this.setState({ liked: false });
      } else {
        this.setState({ liked: true });
      }
    } else {
      let favoritePlaces = data.favorite.slice(0);
      let place = {
        city: information.name,
        country: information.country,
        coords: information.coord
      };
      if (
        _.findIndex(favoritePlaces, function(o) {
          return o.city === place.city && o.country === place.country;
        }) === -1
      ) {
        this.setState({ liked: false });
      } else {
        this.setState({ liked: true });
      }
    }
    if (this.props.userInfo && this.props.userInfo.token !== "") {
      this.setState({ isLogin: true });
    } else if (data) {
      this.setState({ isLogin: true });
    } else {
      this.setState({ isLogin: false });
    }
  };

  getDataFromAsyncStorage = async () => {
    try {
      let userData = await AsyncStorage.getItem("userData");
      let data = JSON.parse(userData);
      return data;
    } catch (error) {
      console.log(error);
    }
  };

  _onAddPlace = async () => {
    const data = await this.getDataFromAsyncStorage();
    const { information, fetchAddFavoritePlace } = this.props;
    const { liked } = this.state;

    if (this.props.favoritePlaces) {
      let favoritePlaces = this.props.favoritePlaces.slice(0);
      let place = {
        city: information.name,
        country: information.country,
        coords: information.coord
      };
      if (liked === true) {
        this.setState({ liked: false });
        for (var i = 0; i < favoritePlaces.length; i++) {
          if (
            favoritePlaces[i].city === place.city &&
            favoritePlaces[i].country === place.country
          ) {
            favoritePlaces.splice(i, 1);
          }
        }
      } else {
        this.setState({ liked: true });
        favoritePlaces.push(place);
      }
      fetchAddFavoritePlace(favoritePlaces);
    } else {
      let favoritePlaces_new = data.favorite.slice(0);
      let place = {
        city: information.name,
        country: information.country,
        coords: information.coord
      };
      if (liked === true) {
        this.setState({ liked: false });
        for (var i = 0; i < favoritePlaces_new.length; i++) {
          if (
            favoritePlaces_new[i].city === place.city &&
            favoritePlaces_new[i].country === place.country
          ) {
            favoritePlaces_new.splice(i, 1);
          }
        }
      } else {
        this.setState({ liked: true });
        favoritePlaces_new.push(place);
      }
      fetchAddFavoritePlace(favoritePlaces_new);
    }
  };

  render() {
    const { city, country, navigation } = this.props;
    return (
      <View style={styles.headerContainer}>
        <View style={{ flexDirection: "row" }}>
          <View style={{ alignItems: "flex-start" }}>
            <Text style={styles.textTitle}>Weather</Text>
            <Text style={styles.textSubTitle}>
              {city}, {country}{" "}
              {
                <Image
                  style={{
                    height: 11,
                    width: 16
                  }}
                  source={{
                    uri: `http://openweathermap.org/images/flags/${country.toLowerCase()}.png`
                  }}
                />
              }
            </Text>
          </View>
          {this.state.isLogin ? (
            <MaterialCommunityIcons
              onPress={() => this._onAddPlace()}
              size={TEXT_LARGE_SIZE * 1.5}
              name={!this.state.liked ? "star-outline" : "star"}
              color={ACTIVE_TINT_COLOR}
            />
          ) : null}
        </View>
        <View style={styles.iconTitle}>
          <View style={{ flexDirection: "row" }}>
            <Button
              onPress={() => this.props.navigation.toggleDrawer()}
              type="clear"
              icon={
                <MaterialCommunityIcons
                  size={30}
                  name={"account"}
                  color={ACTIVE_TINT_COLOR}
                />
              }
            />
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  headerContainer: {
    flex: 0,
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    paddingLeft: 30,
    paddingRight: 30,
    paddingTop: 30
  },
  textTitle: {
    fontSize: TEXT_TITLE,
    color: ACTIVE_TINT_COLOR,
    fontWeight: "bold"
  },
  textSubTitle: {
    fontSize: TEXT_MEDIUM_SIZE,
    color: ACTIVE_TINT_COLOR
  },
  iconTitle: {
    flex: 1,
    flexDirection: "column",
    alignItems: "flex-end"
  }
});

const mapStateToProps = state => ({
  information: state.weatherReducer.weatherInformation.city,
  favoritePlaces: state.authReducer.favoritePlaces,
  userInfo: state.authReducer.userInfo
});

const mapDispatchToProps = dispatch => ({
  fetchAddFavoritePlace: favoritePlaces =>
    dispatch(addFavoritePlace(favoritePlaces))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WeatherHeader);
