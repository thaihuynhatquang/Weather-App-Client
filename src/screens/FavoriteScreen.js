import React from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import Favorite from "../components/Favorite";
import { connect } from "react-redux";

export default class FavoriteScreen extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Favorite />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  }
});
