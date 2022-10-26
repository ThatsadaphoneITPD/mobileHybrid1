import { TouchableOpacity, Text } from "react-native";
import React from "react";
import Icon from "react-native-vector-icons/Ionicons";
import colors from "../config/globalColor";

const Button = ({ title, onPress, ...props }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        width: 80,
        height: 80,
        backgroundColor: colors.Sunset,
        borderRadius: 40,
        position: "absolute",
        bottom: 30,
        right: 20,
        alignItems: "center",
        justifyContent: "center",
        ...props,
      }}
    >
      <Icon name="ios-add" size={40} color="white" />
      {/* <Text
        style={{
          fontSize: 16,
          lineHeight: 21,
          fontWeight: "bold",
          letterSpacing: 0.25,
          color: "white",
        }}
      >
        {title}
      </Text> */}
    </TouchableOpacity>
  );
};

export default Button;
