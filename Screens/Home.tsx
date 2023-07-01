import React, { useEffect, useState } from "react";
import { View, Alert, StyleSheet, useColorScheme, Text } from "react-native";

import { fetchWord } from "../utils/fetchWord";
import { WordData, WordNotFound } from "../interfaces/interfaces";
import LoadingScreen from "../Components/LoadingScreen";
import SearchWord from "../Components/SearchWord";
import { colors } from "../utils/colors";
import Searcher from "../Components/Searcher";
import ReusableText from "../Components/ReusableText";

function Home() {
  const scheme = useColorScheme();

  const [word, setWord] = useState("Hello");
  const [wordData, setWordData] = useState<
    undefined | WordData[] | WordNotFound
  >(undefined);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchWord(word, setWordData, setIsLoading);
  }, []);

  if (isLoading) return <LoadingScreen />;

  if (wordData !== undefined && "title" in wordData) {
    return (
      <View
        style={[
          styles.container,
          {
            backgroundColor:
              scheme === "dark"
                ? colors.darkTheme.background
                : colors.lightTheme.background,
            flex: 1,
          },
        ]}
      >
        <Searcher
          word={word}
          setWord={setWord}
          setIsLoading={setIsLoading}
          setWordData={setWordData}
        />
        <View
          style={{
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <View
            style={{
              marginTop: 32,
              flexDirection: "column",
            }}
          >
            <ReusableText style={{ fontSize: 20 }}>
              {(wordData as WordNotFound)!.title}
            </ReusableText>
            <ReusableText style={{ fontSize: 16 }}>
              {(wordData as WordNotFound)!.message}
            </ReusableText>
          </View>
        </View>
      </View>
    );
  }

  if (wordData !== undefined && (wordData as WordData[]).length > 0) {
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
        <Searcher
          word={word}
          setWord={setWord}
          setIsLoading={setIsLoading}
          setWordData={setWordData}
        />
        <SearchWord wordData={wordData} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
});

export default Home;
