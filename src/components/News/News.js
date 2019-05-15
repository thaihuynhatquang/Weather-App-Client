import React from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { Button, Icon } from "react-native-elements";
import Item from "./Item";
import { updateNewsInformation } from "../../store/actions/newsWeatherAction";
import { connect } from "react-redux";
import {
  BACKGROUND_COLOR,
  TEXT_COLOR,
  TEXT_SMALL_SIZE,
  TEXT_LARGE_SIZE
} from "../../utils/constant";
import { MaterialCommunityIcons } from "@expo/vector-icons";

class News extends React.Component {
  postNews = navigation => {
    navigation.navigate("PostNewsScreen");
  };

  updateNews = () => {
    if (!this.props.offset) {
      console.log("khoong cana update");
      return;
    }
    let data = {
      coords: this.props.coords,
      offset: this.props.offset - 1
    };

    this.props.fetchUpdateNewsInformation(data);
  };

  render() {
    const { isUpdating, news, offset, navigation } = this.props;
    return (
      <View
        style={{ flex: 1, paddingTop: 20, backgroundColor: BACKGROUND_COLOR }}
      >
        <MaterialCommunityIcons
          onPress={() => this.postNews(navigation)}
          size={TEXT_LARGE_SIZE * 2.5}
          name={"cloud-upload"}
          color={TEXT_COLOR}
          style={styles.addButton}
        />
        <FlatList
          data={news}
          renderItem={({ item }) => (
            <Item navigation={navigation} item={item} />
          )}
          keyExtractor={item => item._id.toString()}
          ListEmptyComponent={<Text>No data</Text>}
          ListFooterComponent={
            <View>
              {offset ? (
                <Button
                  title="Show more..."
                  onPress={this.updateNews}
                  titleStyle={{
                    color: TEXT_COLOR,
                    fontSize: TEXT_SMALL_SIZE,
                    fontStyle: "italic"
                  }}
                  loading={isUpdating}
                  disabled={isUpdating}
                  loadingProps={{
                    color: TEXT_COLOR
                  }}
                  type="clear"
                />
              ) : null}
            </View>
          }
        />
      </View>
    );
  }
}

const mapStateToProps = state => ({
  coords: state.locationReducer.coords,
  isUpdating: state.newsReducer.isUpdating,
  offset: state.newsReducer.nextOffset,
  news: state.newsReducer.news
});

const mapDispatchToProps = dispatch => ({
  fetchUpdateNewsInformation: data => dispatch(updateNewsInformation(data))
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
