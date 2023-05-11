import React from "react";
import { Text } from "react-native";

export function MeeraText(props: Text["props"]) {
  return (
    <Text
      //   children={props.children} same thing with next line
      {...props}
      style={[props.style, { fontFamily: "meera", fontSize: 20 }]}
      // this is adding styles to my styles that i already did in other component
    />
  );
}
