import { AsyncStorage } from "react-native";
import { platform, iosClientId, androidClientId, API_URL } from "./constant";
import { Google } from "expo";
import axios from "axios";

export const onSignIn = async userInfo => {
  try {
    await AsyncStorage.setItem("userData", JSON.stringify(userInfo));
  } catch (error) {
    console.log("Something went wrong", error);
  }
};

export const onSignOut = async () => {
  try {
    await AsyncStorage.removeItem("userData");
  } catch (error) {}
};

export const isSignedIn = async () => {
  try {
    let userData = await AsyncStorage.getItem("userData");
    let data = JSON.parse(userData);
    await axios
      .post(`${API_URL}/user/auth`, { token: data.token })
      .then(res => {
        if (res.status !== 200) {
          return null;
        }
      })
      .catch(error => {
        console.log(error);
        return null;
      });
    return data;
  } catch (error) {
    console.log("Something went wrong", error);
  }
};

export const signInWithGoogleAsync = async () => {
  try {
    const { type, idToken } = await Google.logInAsync({
      clientId: platform === "android" ? androidClientId : iosClientId
    });
    if (type === "success") {
      return { idToken: idToken, platform: platform };
    } else {
      return { cancelled: true };
    }
  } catch (e) {
    return { error: true };
  }
};

export const authenticate = user => {
  if (user !== null) return true;
};
