import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  FlatList,
  Platform
} from "react-native";
import { Button } from "react-native-elements";
import Item from "./Item";
import { updateNewsInformation } from "../../store/actions/newsWeatherAction";
import { connect } from "react-redux";
import {
  BACKGROUND_COLOR,
  TEXT_COLOR,
  TEXT_SMALL_SIZE
} from "../../utils/constant";

class News extends React.Component {
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

const styles = StyleSheet.create({});
