import React from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import PostNews from "../components/News/PostNews";

class PostNewsScreen extends React.Component {
  render() {
    const { navigation } = this.props;
    return (
      <View style={styles.container}>
        <PostNews navigation={navigation} />
      </View>
    );
  }
}

export default PostNewsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  }
});
