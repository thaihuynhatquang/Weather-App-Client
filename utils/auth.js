import { AsyncStorage } from "react-native";
import { isAndroid } from "./constant";
export const USER_KEY = "auth-demo-key";

export const onSignIn = () => AsyncStorage.setItem(USER_KEY, "true");

export const onSignOut = () => AsyncStorage.removeItem(USER_KEY);

export const isSignedIn = () => {
  return new Promise((resolve, reject) => {
    AsyncStorage.getItem(USER_KEY)
      .then(res => {
        if (res !== null) {
          resolve(true);
        } else {
          resolve(false);
        }
      })
      .catch(err => reject(err));
  });
};

const androidClientId =
  "1006888220040-3vua1st0dqarg1tlnkgbe15je1m99nl5.apps.googleusercontent.com";
const iosClientId =
  "1006888220040-905i11ihfvjq25cik2h0q7fsjpsg6vfj.apps.googleusercontent.com";

export const signInWithGoogleAsync = async () => {
  try {
    const {
      type,
      user,
      accessToken,
      idToken,
      refreshToken
    } = await Google.logInAsync({
      clientId: isAndroid() ? androidClientId : iosClientId
    });
    const { name, email } = user;
    if (type === "success") {
      console.log("Logged in!", `Username: ${name}\nEmail: ${email}`);
      return { accessToken };
    } else {
      // type === 'cancel'
      console.log("canceled", "You have cancelled the authentication");
      return { cancelled: true };
    }
  } catch (e) {
    return { error: true };
  }
};

export const authenticate = user => {
  if (user !== null) return true;
};
