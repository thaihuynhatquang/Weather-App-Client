import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { BACKGROUND_COLOR } from "../utils/constant";

class Profile extends React.Component {
  static navigationOptions = {
    drawerLabel: "Drawer"
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.content}>
          <Text>Hihih</Text>
        </View>
      </View>
    );
  }
}

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BACKGROUND_COLOR
  },
  content: {
    marginTop: 100
  }
});
