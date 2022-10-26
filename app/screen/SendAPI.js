import {
  View,
  Text,
  Button,
  StyleSheet,
  Alert,
  ToastAndroid,
  ActivityIndicator,
  Platform,
} from "react-native";
// import axios from "axios";
import React from "react";

const Toast = (message) => {
  ToastAndroid.showWithGravityAndOffset(
    message,
    ToastAndroid.LONG,
    ToastAndroid.BOTTOM,
    25,
    50
  );
};

const SendAPI = () => {
  const UploadRequest = async () => {
    try {
      // Create form submission for post and upload files
      const input = {
        userId: "wm123",
        detailList: [
          { name: "Android Conference" },
          { name: "Client Meeting" },
        ],
      };
      const formData = new FormData();
      formData.append("jsonpayload", input);
      let options = {
        method: "POST",
        body: formData,
        headers: {
          Accept: "application/json",
          "Content-Type": "multipart/form-data",
        },
      };
      const baseUrl = "http://192.168.1.5";
      const response = await fetch(`${baseUrl}:61421/COMP1424CW`, options);
      console.log(response);
      const json = await response.json();
      reposeAPI(json);
      return response;
    } catch (error) {
      Toast(error.message);
      console.log(error);
    }
  };
  const reposeAPI = (data) => {
    const message =
      "User Data:" +
      "\n\n" +
      "ID" +
      ":\t" +
      data.userId +
      "\n\n" +
      "Name" +
      ":\t" +
      data.names;
    Alert.alert("Add New Trip", message, [
      { text: "Receive 'Res'", onPress: () => console.log("Receive") },
      { text: "CLose", onPress: () => console.log("CLose") },
    ]);
  };

  return (
    <View style={styles.container}>
      {/* <ActivityIndicator /> */}
      <Button title="Upload" onPress={UploadRequest} />
    </View>
  );
};

export default SendAPI;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
