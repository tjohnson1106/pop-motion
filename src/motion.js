import React from "react";
import { View } from "react-native";

import { keyframes, stagger } from "popmotion";
import { duration } from "moment";
import { inflate } from "zlib";

const COUNT = 5;
const DURATION = 4000;
const initialPhase = { scale: 0, opacity: 1 };
const constructAnimations = () => [...Array(COUNT).keys()].map(() => initialPhase);

class Motion extends Component {
  state = {
    animations: constructAnimations()
  };

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
    return {};
  }
}

export default Motion;
