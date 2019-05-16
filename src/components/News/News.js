import React from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ScrollView,
  RefreshControl,
  ActivityIndicator,
  AsyncStorage
} from "react-native";
import Item from "./Item";
import {
  updateNewsInformation,
  loadNewsInformation
} from "../../store/actions/newsWeatherAction";
import { connect } from "react-redux";
import {
  BACKGROUND_COLOR,
  TEXT_COLOR,
  TEXT_LARGE_SIZE,
  ACTIVE_TINT_COLOR
} from "../../utils/constant";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const isCloseToBottom = ({ layoutMeasurement, contentOffset, contentSize }) => {
  const paddingToBottom = 10;
  return (
    layoutMeasurement.height + contentOffset.y >=
    contentSize.height + paddingToBottom
  );
};

class News extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      refreshing: false,
      updating: false,
      order: "location",
      isLogin: null
    };
  }

  componentDidMount = async () => {
    const data = await this.getDataFromAsyncStorage();
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

  postNews = navigation => {
    navigation.navigate("PostNewsScreen");
  };

  _onUpdate = async () => {
    const { news, coords, offset, fetchUpdateNewsInformation } = this.props;

    if (this.state.updating || offset <= 0) {
      return;
    }

    if (news) {
      let data = {
        coords: coords,
        offset: offset - 1
      };
      this.setState({ updating: true });
      await fetchUpdateNewsInformation(data);
      this.setState({ updating: false });
    }
  };

  _onRefresh = async () => {
    let data = {
      coords: this.props.coords
    };

    this.setState({ refreshing: true });
    await this.props.fetchUpdateNewsInformation(data);
    this.setState({ refreshing: false });
  };

  render() {
    const { isUpdating, news, navigation, isNewsLoading } = this.props;
    return (
      <View
        style={{ flex: 1, paddingTop: 20, backgroundColor: BACKGROUND_COLOR }}
      >
        {this.state.isLogin ? (
          <MaterialCommunityIcons
            onPress={() => this.postNews(navigation)}
            size={TEXT_LARGE_SIZE * 2.5}
            name={"cloud-upload"}
            color={ACTIVE_TINT_COLOR}
            style={styles.addButton}
          />
        ) : null}

        {isNewsLoading ? null : (
          <ScrollView
            showsVerticalScrollIndicator={false}
            refreshControl={
              <RefreshControl
                refreshing={this.state.refreshing}
                onRefresh={() => this._onRefresh()}
              />
            }
            onScroll={({ nativeEvent }) => {
              if (isCloseToBottom(nativeEvent)) {
                this._onUpdate();
              }
            }}
            scrollEventThrottle={400}
          >
            {news.length === 0 ? <Text>No data</Text> : null}
            {news.map(item => (
              <Item
                navigation={navigation}
                item={item}
                key={item._id.toString()}
              />
            ))}
            {isUpdating ? (
              <ActivityIndicator size="small" color={TEXT_COLOR} />
            ) : null}
          </ScrollView>
        )}
      </View>
    );
  }
}

const mapStateToProps = state => ({
  coords: state.locationReducer.coords,
  isUpdating: state.newsReducer.isUpdating,
  offset: state.newsReducer.nextOffset,
  news: state.newsReducer.news,
  total: state.newsReducer.total,
  userInfo: state.authReducer.userInfo
});

const mapDispatchToProps = dispatch => ({
  fetchUpdateNewsInformation: data => dispatch(updateNewsInformation(data)),
  fetchLoadNewsInformation: data => dispatch(loadNewsInformation(data))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(News);

const styles = StyleSheet.create({
  addButton: {
    zIndex: 1000,
    position: "absolute",
    top: "90%",
    left: "80%",
    shadowColor: "gray",
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 5
  }
});
