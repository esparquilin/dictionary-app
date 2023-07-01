import {
  View,
  TextInput,
  StyleSheet,
  useColorScheme,
  Text,
} from "react-native";
import { useState } from "react";

import Icon from "react-native-vector-icons/Ionicons";
import { fetchWord } from "../utils/fetchWord";
import { colors } from "../utils/colors";

import { WordData, WordNotFound } from "../interfaces/interfaces";

interface Searcher {
  word: string;
  setWord: React.Dispatch<React.SetStateAction<string>>;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setWordData: React.Dispatch<
    React.SetStateAction<undefined | WordData[] | WordNotFound>
  >;
}

const Searcher: React.FC<Searcher> = ({
  word,
  setWord,
  setIsLoading,
  setWordData,
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const scheme = useColorScheme();

  let backgroundFocused;
  let backgroundNotFocused;
  if (scheme === "dark") {
    backgroundFocused = colors.darkTheme.background2;
    backgroundNotFocused = colors.darkTheme.background;
  } else {
    backgroundFocused = colors.lightTheme.background2;
    backgroundNotFocused = colors.lightTheme.background;
  }

  return (
    <View style={styles.searchBar}>
      <TextInput
        style={[
          styles.textInput,
          {
            borderColor:
              scheme === "dark"
                ? colors.darkTheme.text2
                : colors.lightTheme.text2,
            color:
              scheme === "dark"
                ? colors.darkTheme.text
                : colors.lightTheme.text,
            backgroundColor: isFocused
              ? backgroundFocused
              : backgroundNotFocused,
          },
        ]}
        onFocus={() => {
          setIsFocused(true);
        }}
        onBlur={() => {
          setIsFocused(false);
        }}
        placeholder="Write your word!"
        placeholderTextColor={
          scheme === "dark" ? colors.darkTheme.text2 : colors.lightTheme.text2
        }
        cursorColor={
          scheme === "dark" ? colors.darkTheme.text2 : colors.lightTheme.text2
        }
        onChangeText={(text) => setWord(text)}
        value={word}
      />
      <Icon
        size={24}
        name="search"
        style={[
          styles.searchIcon,
          {
            color:
              scheme === "dark"
                ? colors.darkTheme.text
                : colors.lightTheme.text,
            backgroundColor:
              scheme === "dark"
                ? colors.darkTheme.background2
                : colors.lightTheme.background2,
          },
        ]}
        onPress={() => {
          fetchWord(word, setWordData, setIsLoading);
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 16,
  },
  textInput: {
    borderWidth: 1,
    fontSize: 18,
    padding: 10,
    borderRadius: 6,
    flex: 1,
  },
  searchIcon: {
    marginRight: 12,
    padding: 12,
    borderRadius: 12,
  },
});

export default Searcher;
