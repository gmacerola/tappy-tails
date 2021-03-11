import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableWithoutFeedback,
  ImageBackground,
} from "react-native";
import TappyTails from "./components/TappyTails";
import Spikes from "./components/Spikes";

export default function App() {
  const screenWidth = Dimensions.get("screen").width;
  const screenHeight = Dimensions.get("screen").height;
  const tailsLeft = screenWidth / 6;
  const gravity = 3;
  let gameTimerId;
  let spikesLeftTimerId;
  let spikesRightTimerId;
  const spikesWidth = 60;
  const spikesHeight = 300;
  const gap = 200;

  //Tails falling for sure
  const [tailsBottom, setTailsBottom] = useState(screenHeight / 2);
  useEffect(() => {
    if (tailsBottom > 0) {
      gameTimerId = setInterval(() => {
        setTailsBottom((tailsBottom) => tailsBottom - gravity);
      }, 30);

      return () => {
        clearInterval(gameTimerId);
      };
    }
  }, [tailsBottom]);

  //Tails jumping
  const jump = () => {
    if (!isGameOver && tailsBottom < screenHeight) {
      setTailsBottom((tailsBottom) => tailsBottom + 50);
    }
  };

  //Start left(first) spikes
  const [spikesLeft, setSpikesLeft] = useState(screenWidth);
  const [spikesLeftNegHeight, setSpikesLeftNegHeight] = useState(0);
  const [score, setScore] = useState(0);
  useEffect(() => {
    if (spikesLeft > -spikesWidth) {
      spikesLeftTimerId = setInterval(() => {
        setSpikesLeft((spikesLeft) => spikesLeft - 5);
      }, 30);

      return () => {
        clearInterval(spikesLeftTimerId);
      };
    } else {
      setSpikesLeft(screenWidth);
      setSpikesLeftNegHeight(-Math.random() * 100);
      setScore((score) => score + 1);
    }
  }, [spikesLeft]);

  //Start right(second) spikes
  const [spikesRight, setSpikesRight] = useState(
    screenWidth + screenWidth / 2 + 50
  );
  const [spikesRightNegHeight, setSpikesRightNegHeight] = useState(0);
  useEffect(() => {
    if (spikesRight > -spikesWidth) {
      spikesRightTimerId = setInterval(() => {
        setSpikesRight((spikesRight) => spikesRight - 5);
      }, 30);

      return () => {
        clearInterval(spikesRightTimerId);
      };
    } else {
      setSpikesRight(screenWidth);
      setSpikesRightNegHeight(-Math.random() * 100);
      setScore((score) => score + 1);
    }
  }, [spikesRight]);

  //Check for collisions
  useEffect(() => {
    if (
      ((tailsBottom < spikesLeftNegHeight + spikesHeight + 40 ||
        tailsBottom > spikesLeftNegHeight + spikesHeight + gap - 30) &&
        spikesLeft > tailsLeft - 40 &&
        spikesLeft < tailsLeft + 40) ||
      ((tailsBottom < spikesRightNegHeight + spikesHeight + 40 ||
        tailsBottom > spikesRightNegHeight + spikesHeight + gap - 30) &&
        spikesRight > tailsLeft - 30 &&
        spikesRight < tailsLeft + 30)
    ) {
      gameOver();
    }
  });

  //Game over
  const [isGameOver, setIsGameOver] = useState(false);
  const gameOver = () => {
    clearInterval(gameTimerId);
    clearInterval(spikesLeftTimerId);
    clearInterval(spikesRightTimerId);
    setIsGameOver(true);
  };

  return (
    <TouchableWithoutFeedback onPress={jump}>
      <View style={styles.container}>
        <View style={styles.backgroundContainer}>
          <ImageBackground
            style={styles.backgroundImage}
            source={require("./images/tappyTailsBackground.png")}
          >
            {isGameOver && (
              <Text
                style={{
                  color: "white",
                  fontSize: 100,
                  position: "absolute",
                  marginTop: screenHeight / 2,
                  marginLeft: screenWidth / 2,
                }}
              >
                {score}
              </Text>
            )}
          </ImageBackground>

          <TappyTails tailsBottom={tailsBottom} tailsLeft={tailsLeft} />
          <Spikes
            spikesHeight={spikesHeight}
            spikesWidth={spikesWidth}
            spikesShift={spikesLeft}
            randomBottom={spikesLeftNegHeight}
            gap={gap}
            color={"green"}
          />
          <Spikes
            spikesHeight={spikesHeight}
            spikesWidth={spikesWidth}
            spikesShift={spikesRight}
            randomBottom={spikesRightNegHeight}
            gap={gap}
            color={"yellow"}
          />
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  backgroundContainer: {
    flex: 1,
    position: "absolute",
    top: 0,
    left: 0,
    width: "150%",
    height: "100%",
  },
  backgroundImage: {
    flex: 1,
    width: null,
    height: null,
  },
});
