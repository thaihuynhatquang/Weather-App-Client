import React from "react";
import { View, Image, Dimensions, StyleSheet, Alert } from "react-native";
import { Input, Button } from "react-native-elements";
import { connect } from "react-redux";
import { onSignIn, authenticate, signInWithGoogleAsync } from "../utils/auth";
import { loginUser } from "../store/actions/authAction";
import { API_URL } from "../utils/constant";
const WIDTH = Dimensions.get("window").width;

class AuthScreen extends React.Component {
  _loginGoogle = () => {
    signInWithGoogleAsync().then(item => {
      if (item.cancelled) return;
      this._onLogin(item);
    });
  };

  _onLogin = async item => {
    await this.props.onLogin({ token: item.idToken, platform: item.platform });

    if (this.props.loginError !== null) {
      console.log(this.props.loginError);
      Alert.alert("Authenticate Error");
    } else {
    }
  };

  shouldComponentUpdate(nextProps) {
    if (nextProps.userInfo !== this.props.userInfo) {
      console.log(nextProps.userInfo, "user information");
      onSignIn(nextProps.userInfo).then(() =>
        nextProps.navigation.navigate("SignedIn")
      );
      return true;
    }
    return false;
  }

  render() {
    return (
      <View style={styles.container}>
        <Image
          style={styles.logo}
          source={{ uri: `${API_URL}/img/logo.png` }}
          resizeMode="center"
        />
        <View style={styles.googleButtonLogin}>
          <Button
            buttonStyle={{ paddingHorizontal: 32, paddingVertical: 15 }}
            style={{ marginLeft: -13 }}
            onPress={() => this._loginGoogle()}
            icon={
              <Image
                style={{
                  height: 30,
                  width: 30
                }}
                source={{ uri: `${API_URL}/img/google.png` }}
              />
            }
            title="Continue with Google"
            titleStyle={{
              fontSize: 20
            }}
            type="clear"
          />
        </View>
        <View style={styles.facebookButtonLogin}>
          <Button
            buttonStyle={{ paddingHorizontal: 16, paddingVertical: 15 }}
            onPress={() => this._loginGoogle()}
            icon={
              <Image
                style={{
                  height: 30,
                  width: 30
                }}
                source={{ uri: `${API_URL}/img/facebook.png` }}
              />
            }
            title="Continue with Facebook"
            titleStyle={{
              fontSize: 20,
              color: "white"
            }}
            type="clear"
          />
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  userInfo: state.authReducer.userInfo,
  loginError: state.authReducer.error
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
  facebookButtonLogin: {
    marginTop: 20,
    backgroundColor: "#4267b2",
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
