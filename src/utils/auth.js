import { AsyncStorage } from "react-native";
import { platform, iosClientId, androidClientId } from "./constant";
import { Google } from "expo";

export const onSignIn = async userInfo => {
  try {
    await AsyncStorage.setItem("token", userInfo.token);
  } catch (error) {}
};

export const onSignOut = () => AsyncStorage.removeItem("token");

export const isSignedIn = async () => {
  // return true;
  try {
    const value = await AsyncStorage.getItem("token");
    if (value !== null && value !== "") {
      return true;
    } else {
      return false;
    }
  } catch (error) {}
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
