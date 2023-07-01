import React from "react";

import {
  ActivityIndicator,
  View,
  StyleSheet,
  useColorScheme,
} from "react-native";
import { colors } from "../utils/colors";

const LoadingScreen = () => {
  const scheme = useColorScheme();

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor:
            scheme === "dark"
              ? colors.darkTheme.background
              : colors.lightTheme.background,
        },
      ]}
    >
      <ActivityIndicator
        size="large"
        color={
          scheme === "dark" ? colors.darkTheme.text : colors.lightTheme.text
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default LoadingScreen;
