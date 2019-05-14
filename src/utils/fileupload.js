import React, { Component } from "react";
import { ImagePicker, Camera, Permissions, } from 'expo';
import { API_URL } from "./constant";
import { View, Image, Button } from "react-native";
import axios from "axios";
export default class FileUpload extends React.Component {
  state = {
    image: null,//phục vụ cho việc hiển thị trên màn hình
    imageFile: null,//phục vụ cho việc gửi lên server
    hasCameraPermission: null,
    hasExplorePermission: null,
    type: Camera.Constants.Type.back,
  };
  async componentDidMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    const { statusa } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    this.setState({ hasCameraPermission: status === 'granted' });
    this.setState({ hasExplorePermission: statusa === 'granted' });
  }

  render() {
    let { image } = this.state;

    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Button
          icon={{ name: 'ios-camera' }}
          title="Open Camera"
          onPress={this._pickImageFromCamera.then(r => console.log(r)).catch(e => console.log(e))}
        />
        <Button
          icon={{ name: 'ios-camera' }}
          title="Open Library"
          onPress={this._pickImageFromExplorer.then(r => console.log(r)).catch(e => console.log(e))}
        />
        <Button
          icon={{ name: 'ios-camera' }}
          title="Upload"
          onPress={this._uploadNews().then(r => console.log(r)).catch(e => console.log(e))}
        />
        {image &&
          <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
      </View>
    );
  }

  _pickImageFromCamera = async () => {
    let result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
    });

    if (!result.cancelled) {
      console.log("result" + result);
      this.setState({ image: result.uri });
      this.setState({ imageFile: result });
      return Promise.resolve(result);
    }
    return Promise.reject();
  };

  _pickImageFromExplorer = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3],
    });


    if (!result.cancelled) {
      console.log("result" + result);
      this.setState({ image: result.uri });
      // this.setState({ imageFile: result });
      return Promise.resolve(result);
    }
    return Promise.reject();
  };

  _uploadNews = () => {
    const bodyFormData = new FormData();
    bodyFormData.append('name', 'avatar');
    bodyFormData.append('fileData', {
      uri: this.state.image,
      type: "image",
      name: "hihi"
    });

    fetch(API_URL + '/news/new_post', {
      method: 'post',
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      body: bodyFormData
    }).then(response => {
      console.log("image uploaded")
    }).catch(err => {
      console.log(err)
    })
  }
}
