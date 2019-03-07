import React from "react";
import { View } from "react-native";

import Motion from "./src/Motion";

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Motion />
      </View>
    );
  }
}
