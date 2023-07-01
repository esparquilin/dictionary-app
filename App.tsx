import { StatusBar } from "expo-status-bar";
import { Platform, useColorScheme } from "react-native";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "./Screens/Home";
import { colors } from "./utils/colors";

const Stack = createNativeStackNavigator();

export default function App() {
  const scheme = useColorScheme();

  return (
    <>
      <StatusBar style="auto" />
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Home"
            component={Home as any}
            options={{
              headerStyle: {
                backgroundColor:
                  scheme === "dark"
                    ? colors.darkTheme.background
                    : colors.lightTheme.background,
              },
              headerTintColor:
                scheme === "dark"
                  ? colors.darkTheme.text
                  : colors.lightTheme.text,
              headerTitle: `${
                Platform.OS === "android"
                  ? "Dicctionary for android"
                  : "Dicctionay for iOs"
              }`,
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}
