import React from "react";
import { View, Image, Dimensions, StyleSheet, Button } from "react-native";
import { Input } from "react-native-elements";
import { onSignIn } from "../../utils/auth";
import { TEXT_COLOR } from "../../utils/constant";

const WIDTH = Dimensions.get("window").width;

export default ({ navigation }) => (
  <View style={styles.container}>
    <View
      style={{
        backgroundColor: "#fbfbfb",
        alignItems: "center",
        paddingBottom: 60
      }}
    >
      <Image
        style={{ height: WIDTH * 0.85, width: WIDTH * 0.85 }}
        resizeMode="center"
        source={{
          uri:
            "https://www.upsieutoc.com/images/2019/04/09/Untitled-document.png"
        }}
      />
      <Input containerStyle={styles.inputContainer} placeholder="Username" />

      <Input
        containerStyle={styles.inputContainer}
        placeholder="Password"
        secureTextEntry
      />
    </View>
    <View style={styles.switchToSignup}>
      <View style={styles.registerButton}>
        <Button
          onPress={() => {
            onSignIn().then(() => navigation.navigate("SignedIn"));
          }}
          title="Register"
          color="white"
        />
      </View>
      <View style={styles.signup}>
        <Button
          onPress={() => navigation.navigate("SignUp")}
          title="New? Register here"
          color={TEXT_COLOR}
        />
      </View>
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f2f3f8"
  },
  inputContainer: {
    paddingHorizontal: 50,
    paddingVertical: 10
  },
  registerButton: {
    flex: 1,
    backgroundColor: "#055929",
    position: "absolute",
    top: -20,
    borderRadius: 10,
    paddingHorizontal: 80,
    paddingVertical: 5
  },
  switchToSignup: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  signup: {
    alignItems: "center",
    justifyContent: "center"
  }
});
