import { Text, StyleSheet, useColorScheme } from "react-native";

import { colors } from "../utils/colors";

function ReusableText({ children, style }: { children: string; style?: any }) {
  const scheme = useColorScheme();

  return (
    <Text
      style={[
        {
          color:
            scheme === "dark" ? colors.darkTheme.text : colors.lightTheme.text,
        },
        style,
      ]}
    >
      {children}
    </Text>
  );
}

const styles = StyleSheet.create({});

export default ReusableText;
