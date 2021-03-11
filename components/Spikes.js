import React from "react";
import { View, Image } from "react-native";

function Spikes({
  spikesShift,
  spikesWidth,
  spikesHeight,
  gap,
  color,
  randomBottom,
}) {
  return (
    <>
      <Image
        style={{
          position: "absolute",
          width: spikesWidth,
          height: spikesHeight + 200,
          left: spikesShift,
          bottom: randomBottom + spikesHeight + gap,
          resizeMode: "stretch",
        }}
        source={require("../images/spikesTop.png")}
      />
      <Image
        style={{
          position: "absolute",
          width: spikesWidth,
          height: spikesHeight,
          left: spikesShift,
          bottom: randomBottom,
          resizeMode: "contain",
        }}
        source={require("../images/spikesBottom.png")}
      />
    </>
  );
}

export default Spikes;
