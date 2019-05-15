import React, { Component } from "react";
import { ImagePicker, Camera, Permissions } from "expo";
import { API_URL, TEXT_COLOR, TEXT_LARGE_SIZE } from "../../utils/constant";
import {
  View,
  Image,
  Dimensions,
  StyleSheet,
  Text,
  TextInput,
  Alert
} from "react-native";
import { Button } from "react-native-elements";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scrollview";
import axios from "axios";
export default class PostNews extends Component {
  state = {
    image: null,
    title: "",
    content: "",
    hasCameraPermission: null,
    hasExplorePermission: null,
    type: Camera.Constants.Type.back
  };
  async componentDidMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    const { statusa } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    this.setState({ hasCameraPermission: status === "granted" });
    this.setState({ hasExplorePermission: statusa === "granted" });
  }
  _pickImageFromCamera = async () => {
    let result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3]
    });

    if (!result.cancelled) {
      this.setState({ image: result.uri });
      return Promise.resolve(result);
    }
    return Promise.reject();
  };

  _pickImageFromExplorer = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3]
    });

    if (!result.cancelled) {
      this.setState({ image: result.uri });
      return Promise.resolve(result);
    }
    return Promise.reject();
  };

  _uploadNews = navigation => {
    const { title, content, image } = this.state;
    const bodyFormData = new FormData();
    const uri = this.state.image;
    if (uri != null) {
      const uriParts = uri.split('.');
      const fileType = uriParts[uriParts.length - 1];
      bodyFormData.append('photo', {
        uri,
        name: `photo.${fileType}`,
        type: `image/${fileType}`,
      });
    }
    bodyFormData.append("title", title);
    bodyFormData.append("content", content);
    bodyFormData.append("lat", 105);
    bodyFormData.append("lon", 21);
    bodyFormData.append("image", image);
    console.log(bodyFormData, "day la data")
    // let userData = await AsyncStorage.getItem("userData");
    axios({
      method: "post",
      url: `${API_URL}/news/newpost`,
      data: bodyFormData,
      config: { headers: { "Content-Type": "multipart/form-data" } }
    })
      .then(response => {
        Alert.alert("Upload successfully");
      })
      .catch(response => {
        console.log(response);
      });
    navigation.goBack();
  };

  render() {
    const { image } = this.state;
    const { navigation } = this.props;
    return (
      <KeyboardAwareScrollView>
        <View style={styles.containerText}>
          <Text style={styles.label}>Title: </Text>
          <TextInput
            style={styles.text}
            numberOfLines={2}
            placeholder={"Enter title"}
            multiline={true}
            onChangeText={title => this.setState({ title })}
          />
        </View>
        <View style={styles.containerText}>
          <Text style={styles.label}>Content: </Text>
          <TextInput
            style={styles.text}
            numberOfLines={4}
            placeholder={"Enter content"}
            multiline={true}
            onChangeText={content => this.setState({ content })}
          />
        </View>
        <View style={styles.buttons}>
          <Button
            style={styles.buttonLibrary}
            title="From Library"
            buttonStyle={{
              backgroundColor: TEXT_COLOR
            }}
            onPress={() =>
              this._pickImageFromExplorer()
                .then(r => console.log(r))
                .catch(e => console.log(e))
            }
            type="solid"
          />
          <Button
            style={styles.buttonPhoto}
            title="Take A Photo"
            buttonStyle={{
              backgroundColor: TEXT_COLOR
            }}
            onPress={() =>
              this._pickImageFromCamera()
                .then(r => console.log(r))
                .catch(e => console.log(e))
            }
            type="solid"
          />
        </View>
        {image ? (
          <Image style={styles.images} source={{ uri: image }} />
        ) : (
            <Image
              source={require("../../../assets/choose-image-white.png")}
              style={styles.images}
            />
          )}
        <View style={styles.buttons}>
          <Button
            style={styles.uploadButton}
            title="Upload"
            onPress={() => this._uploadNews(navigation)}
            buttonStyle={{
              backgroundColor: TEXT_COLOR
            }}
            type="solid"
          />
        </View>
      </KeyboardAwareScrollView>
    );
  }
}

styles = StyleSheet.create({
  containerText: {
    flex: 1,
    marginLeft: 15,
    marginRight: 15,
    marginTop: 5,
    marginBottom: 5,
    alignItems: "baseline"
  },
  label: {
    color: TEXT_COLOR,
    fontSize: TEXT_LARGE_SIZE,
    fontWeight: "600",
    marginLeft: 15,
    marginRight: 15,
    marginTop: 5
  },
  text: {
    fontSize: TEXT_LARGE_SIZE,
    color: TEXT_COLOR,
    marginLeft: 15,
    marginRight: 15,
    marginTop: 5,
    marginBottom: 5
  },
  images: {
    width: Dimensions.get("screen").width,
    height: (Dimensions.get("screen").width * 3) / 4,
    marginBottom: 10,
    marginTop: 20,
    resizeMode: "cover",
    alignSelf: "center"
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "center"
  },
  buttonLibrary: {
    marginHorizontal: 15,
    marginVertical: 10
  },
  buttonPhoto: {
    marginHorizontal: 15,
    marginVertical: 10
  },
  uploadButton: {
    marginHorizontal: 15,
    marginVertical: 10
  }
});
