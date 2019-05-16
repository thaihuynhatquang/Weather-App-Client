import React from "react";
import {
  ScrollView,
  View,
  Image,
  Text,
  StyleSheet,
  AsyncStorage,
  RefreshControl,
  TouchableOpacity
} from "react-native";
import {
  loadWeatherInformation,
  clearListCity
} from "../store/actions/weatherAction";
import { connect } from "react-redux";
import {
  BACKGROUND_COLOR,
  BACKGROUND_THIRD_COLOR,
  ACTIVE_TINT_COLOR,
  TEXT_MEDIUM_SIZE,
  TEXT_LARGE_SIZE
} from "../utils/constant";
import { onSignIn } from "../utils/auth";

class Favorite extends React.Component {
  constructor() {
    super();
    this.state = {
      refreshing: false,
      favoritePlaces: []
    };
  }
  getDataFromAsyncStorage = async () => {
    try {
      let userData = await AsyncStorage.getItem("userData");
      let data = JSON.parse(userData);
      return data;
    } catch (error) {
      console.log(error);
    }
  };
  _onRefresh = () => {
    this.setState({ refreshing: true });
    const { favoritePlaces } = this.props;
    if (favoritePlaces && favoritePlaces !== this.state.favoritePlaces) {
      this.setState({ favoritePlaces });
    }
    this.setState({ refreshing: false });
  };
  componentDidMount = async () => {
    let data = await this.getDataFromAsyncStorage();
    const { favoritePlaces } = this.props;
    if (favoritePlaces) {
      this.setState({ favoritePlaces: favoritePlaces });
      (data.favorite = favoritePlaces), onSignIn(data);
    } else {
      this.setState({ favoritePlaces: data.favorite });
    }
  };

  onChooseCity = item => {
    this.props.clearListCity();
    this.props.fetchWeatherInformation(item.coords);
  };

  render() {
    const { favoritePlaces } = this.state;
    return (
      <ScrollView
        style={styles.container}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={this.state.refreshing}
            onRefresh={() => this._onRefresh()}
          />
        }
      >
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Your Favorite Place</Text>
        </View>
        {favoritePlaces.length === 0 ? (
          <Text style={styles.contentNoData}>No data</Text>
        ) : null}
        {favoritePlaces.map((item, index) => (
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => this.onChooseCity(item)}
            key={index}
            style={styles.contentContainer}
          >
            <Text style={styles.content}>{item.city}, </Text>
            <Text style={styles.content}>{item.country} </Text>
            <Image
              style={{
                height: 11,
                width: 16
              }}
              source={{
                uri: `http://openweathermap.org/images/flags/${item.country.toLowerCase()}.png`
              }}
            />
          </TouchableOpacity>
        ))}
      </ScrollView>
    );
  }
}

const mapStateToProps = state => ({
  favoritePlaces: state.authReducer.favoritePlaces
});

const mapDispatchToProps = dispatch => ({
  fetchWeatherInformation: coords => dispatch(loadWeatherInformation(coords)),
  clearListCity: () => dispatch(clearListCity())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Favorite);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BACKGROUND_COLOR
  },
  titleContainer: {
    marginTop: 60,
    marginBottom: 10,
    padding: 15,
    backgroundColor: BACKGROUND_THIRD_COLOR
  },
  title: {
    color: ACTIVE_TINT_COLOR,
    fontSize: TEXT_LARGE_SIZE,
    fontWeight: "600"
  },
  contentContainer: {
    marginTop: 10,
    padding: 15,
    backgroundColor: BACKGROUND_THIRD_COLOR,
    flexDirection: "row",
    alignItems: "center"
  },
  content: {
    color: ACTIVE_TINT_COLOR,
    fontSize: TEXT_MEDIUM_SIZE,
    fontWeight: "600"
  },
  contentNoData: {
    color: ACTIVE_TINT_COLOR,
    fontSize: TEXT_MEDIUM_SIZE,
    fontWeight: "600",
    marginLeft: 15
  }
});
