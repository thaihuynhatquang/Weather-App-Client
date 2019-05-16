import React from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import Profile from "../components/Profile";
import { connect } from "react-redux";
import { logoutUser } from "../store/actions/authAction";
import { onSignOut } from "../utils/auth";

class ProfileScreen extends React.Component {
  _onLogout = () => {
    this.props.onLogout();
    onSignOut().then(() => this.props.navigation.navigate("SignedOut"));
  };
  render() {
    return (
      <View style={styles.container}>
        <Profile logout={this._onLogout} />
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
)(ProfileScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  }
});
