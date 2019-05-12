import React from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import Calendar from "../components/Calendar/Calendar";
import { connect } from "react-redux";
import { logoutUser } from "../store/actions/authAction";
import { onSignOut } from "../utils/auth";

class CalendarScreen extends React.Component {
  _onLogout = () => {
    this.props.onLogout();
    onSignOut().then(() => this.props.navigation.navigate("SignedOut"));
  };
  render() {
    return (
      <View style={styles.container}>
        <Calendar />
        <Button
          backgroundColor="#03A9F4"
          title="SIGN OUTTTT"
          onPress={() => this._onLogout()}
        />
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
)(CalendarScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  }
});
