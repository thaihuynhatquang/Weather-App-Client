import { AsyncStorage } from "react-native";
import { platform, iosClientId, androidClientId } from "./constant";
import { Google } from "expo";

export const onSignIn = userInfo =>
  AsyncStorage.setItem("token", userInfo.token);

export const onSignOut = () => AsyncStorage.removeItem("token");

export const isSignedIn = () => {
  return new Promise((resolve, reject) => {
    AsyncStorage.getItem("token")
      .then(res => {
        if (res !== null && res !== "") {
          resolve(true);
        } else {
          resolve(false);
        }
      })
      .catch(err => reject(err));
  });
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
