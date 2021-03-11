import React from "react";
import { View, Image } from "react-native";

function TappyTails({ tailsBottom, tailsLeft }) {
  const tailsWidth = 80;
  const tailsHeight = 80;

  return (
    <View>
      <Image
        style={{
          height: tailsHeight,
          width: tailsWidth,
          position: "absolute",
          bottom: tailsBottom - tailsHeight / 2,
          left: tailsLeft - tailsWidth / 2,
        }}
        source={require("../images/tails.png")}
      />
    </View>
  );
}

export default TappyTails;
