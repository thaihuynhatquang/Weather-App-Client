import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  AsyncStorage
} from "react-native";
import { Avatar, Card, ListItem, Button, Icon } from "react-native-elements";
import {
  BACKGROUND_COLOR,
  BACKGROUND_THIRD_COLOR,
  ACTIVE_TINT_COLOR,
  TEXT_MEDIUM_SIZE
} from "../utils/constant";
import { connect } from "react-redux";
class Profile extends React.Component {
  constructor() {
    super();
    this.state = {
      avatar: "",
      name: "",
      token: "",
      userID: ""
    };
  }

  componentDidMount = async () => {
    let data = await this.getDataFromAsyncStorage();
    if (data) {
      this.setState({
        avatar: data.avatar,
        name: data.name,
        token: data.token,
        userID: data.userID
      });
    }
  };

  getDataFromAsyncStorage = async () => {
    try {
      let userData = await AsyncStorage.getItem("userData");
      let data = JSON.parse(userData);
      return data;
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    const { avatar, name, userID } = this.state;
    console.log(avatar, "avatar");
    return (
      <View style={styles.container}>
        <View style={styles.content}>
          {avatar ? (
            <Avatar
              title={name}
              size="large"
              rounded
              source={{ uri: avatar }}
            />
          ) : (
            <Avatar
              size="large"
              rounded
              icon={{ name: "user", type: "font-awesome" }}
              activeOpacity={0.7}
            />
          )}
        </View>
        <View style={styles.information}>
          <Text style={styles.textInformation}>{name}</Text>
        </View>
        <View>
          <TouchableOpacity
            onPress={() => this.props.logout()}
            activeOpacity={0.8}
            style={styles.information}
          >
            <Text style={styles.textInformation}>Logout</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  userInfo: state.authReducer.userInfo
});

export default connect(
  mapStateToProps,
  null
)(Profile);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BACKGROUND_COLOR
  },
  content: {
    marginTop: 100,
    padding: 15,
    flexDirection: "row",
    backgroundColor: BACKGROUND_THIRD_COLOR
  },
  information: {
    marginTop: 10,
    padding: 15,
    backgroundColor: BACKGROUND_THIRD_COLOR
  },
  textInformation: {
    color: ACTIVE_TINT_COLOR,
    fontSize: TEXT_MEDIUM_SIZE,
    fontWeight: "600"
  }
});
