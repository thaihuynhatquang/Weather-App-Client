import React from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import Calendar from "../components/Calendar/Calendar";
import { onSignOut } from "../utils/auth";

export default ({ navigation }) => (
  <View style={styles.container}>
    <Calendar />
    <Button
      backgroundColor="#03A9F4"
      title="SIGN OUTTTT"
      onPress={() => onSignOut().then(() => navigation.navigate("SignedOut"))}
    />
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  }
});
