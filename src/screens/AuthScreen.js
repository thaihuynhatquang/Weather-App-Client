import React from "react";
import { View, Image, Dimensions, StyleSheet } from "react-native";
import { Input, Button } from "react-native-elements";
import { connect } from "react-redux";
import { onSignIn, authenticate, signInWithGoogleAsync } from "../utils/auth";
import { loginUser } from "../store/actions/authAction";
const WIDTH = Dimensions.get("window").width;

class AuthScreen extends React.Component {
  _loginGoogle = () => {
    signInWithGoogleAsync().then(item => {
      this.props.onLogin({ token: item.idToken, platform: item.platform });
      onSignIn(this.props.token).then(() =>
        this.props.navigation.navigate("SignedIn")
      );
    });
  };

  render() {
    return (
      <View style={styles.container}>
        <Image
          style={styles.logo}
          source={require("../../assets/logo.png")}
          resizeMode="center"
        />
        <View style={styles.googleButtonLogin}>
          <Button
            buttonStyle={{ paddingHorizontal: 30, paddingVertical: 15 }}
            style={{ alignContent: "center" }}
            onPress={() => this._loginGoogle()}
            icon={
              <Image
                style={{ height: 30, width: 30 }}
                source={require("../../assets/google.png")}
              />
            }
            title="Continue with Google"
            titleStyle={{
              fontSize: 20
            }}
            type="clear"
          />
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  token: state.authReducer.userInfo.token
});

const mapDispatchToProps = dispatch => ({
  onLogin: userInfo => dispatch(loginUser(userInfo))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AuthScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f2f3f8",
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: 50
  },
  logo: {
    height: WIDTH * 0.8,
    width: WIDTH * 0.8,
    shadowColor: "gray",
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 5
  },
  googleButtonLogin: {
    marginTop: 20,
    backgroundColor: "white",
    borderRadius: 15,
    shadowColor: "gray",
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 5
  },
  text: {
    margin: 20
  }
});
