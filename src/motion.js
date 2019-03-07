import React from "react";
import { View, Animated } from "react-native";

import { keyframes, stagger } from "popmotion";
import { duration } from "moment";
import { inflate } from "zlib";
import Animated from "react-native-reanimated";

const COUNT = 5;
const DURATION = 4000;
const initialPhase = { scale: 0, opacity: 1 };
const constructAnimations = () => [...Array(COUNT).keys()].map(() => initialPhase);

class Motion extends Component {
  state = {
    animations: constructAnimations()
  };

  componentDidMount() {
    this.animateCircles();
  }

  animateCircles = () => {
    const frames = Array(COUNT).fill(
      keyframes({
        values: [
          initialPhase,
          {
            scale: 2,
            opacity: 0
          }
        ],
        duration: DURATION,
        loop: Infinity,
        yoyo: Infinity
      })
    );

    stagger(frames, DURATION / COUNT).start((animations) => {
      this.setState({ animations });
    });
  };

  render() {
    return (
      <View style={styles.root}>
        {this.state.animations.map(({ opacity, state }, index) => {
          return (
            <Animated.View
              key={index}
              style={[
                styles.circle,
                {
                  transform: [{ scale }],
                  opacity
                }
              ]}
            />
          );
        })}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff"
  },
  circle: {
    backgroundColor: "gold",
    width: 200,
    height: 200,
    borderRadius: 100,
    position: "absolue"
  }
});

export default Motion;
