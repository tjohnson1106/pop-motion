import React, { Component } from "react";
import { View, Animated, Text, StyleSheet } from "react-native";
import { keyframes, stagger } from "popmotion";
import { FontAwesome } from "@expo/vector-icons";

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
        {this.state.animations.map(({ opacity, scale }, index) => {
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

        <View style={styles.midCircle}>
          <FontAwesome name="phone" style={styles.icon} />
          <Text style={styles.animationText}>Calling...</Text>
        </View>
      </View>
    );
  }
}

const getCircle = (radius, backgroundColor = "#7FFFD4") => ({
  backgroundColor,
  width: radius * 2,
  height: radius * 2,
  borderRadius: radius,
  position: "absolute"
});

const styles = StyleSheet.create({
  root: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff"
  },
  circle: getCircle(100),
  midCircle: {
    ...getCircle(75),
    alignItems: "center",
    justifyContent: "center"
  },
  icon: {
    color: "#fff",
    fontSize: 42,
    marginBottom: 5
  },
  animationText: {
    color: "#fff",
    fontSize: 18
  }
});

export default Motion;
