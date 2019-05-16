import React from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import Favorite from "../components/Favorite";
import { connect } from "react-redux";
import { logoutUser } from "../store/actions/authAction";
import { onSignOut } from "../utils/auth";

class FavoriteScreen extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Favorite />
      </View>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  onLogout: () => dispatch(logoutUser())
});

export default connect(
  null,
  mapDispatchToProps
)(FavoriteScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  }
});
