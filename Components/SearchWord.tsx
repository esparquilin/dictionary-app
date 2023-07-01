import React from "react";
import { View, ScrollView, useColorScheme, StyleSheet } from "react-native";

import { WordData, WordNotFound } from "../interfaces/interfaces";

import { Audio } from "expo-av";

import { capitilizeFirst } from "../utils/transformeWords";

import Icon from "react-native-vector-icons/Ionicons";
import { colors } from "../utils/colors";

import ReusableText from "./ReusableText";

interface SearchWordProps {
  wordData: WordData[];
}

const SearchWord: React.FC<SearchWordProps> = ({ wordData }) => {
  const scheme = useColorScheme();

  const playAudio = async (soundLink: string) => {
    try {
      // Cargar el audio desde la URL
      const { sound } = await Audio.Sound.createAsync({
        uri: soundLink,
      });

      // Reproducir el audio
      await sound.playAsync();
    } catch (error) {
      console.log("Error al reproducir el audio:", error);
    }
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        {wordData.map((word, indx) => {
          return (
            <View
              key={indx}
              style={[
                styles.wordContainer,
                {
                  backgroundColor:
                    scheme === "dark"
                      ? colors.darkTheme.background2
                      : colors.lightTheme.background2,
                },
              ]}
            >
              <View style={styles.wordDataHeader}>
                <View>
                  <ReusableText style={styles.textTitle}>
                    {capitilizeFirst(word.word)}
                  </ReusableText>
                  <ReusableText>{word.phonetic}</ReusableText>
                </View>
                <View>
                  <Icon
                    style={{
                      borderRadius: 100,
                      padding: 8,
                      backgroundColor:
                        scheme === "dark"
                          ? colors.darkTheme.background
                          : colors.lightTheme.background,
                    }}
                    color={
                      scheme === "dark"
                        ? colors.darkTheme.text
                        : colors.lightTheme.text
                    }
                    size={36}
                    name="volume-high"
                    onPress={() =>
                      playAudio(
                        word.phonetics[1].audio === undefined
                          ? ""
                          : word.phonetics[1].audio
                      )
                    }
                  />
                </View>
              </View>
              <View>
                {word.meanings.map((meaning, indx) => {
                  return (
                    <View key={indx}>
                      <ReusableText style={styles.partOfSpeech}>
                        {meaning.partOfSpeech.toLocaleUpperCase()}
                      </ReusableText>
                      <View>
                        {meaning.definitions.map((definition, indx) => {
                          return (
                            <View
                              key={indx}
                              style={styles.definitionAndExampleContainer}
                            >
                              <ReusableText style={styles.definition}>
                                {capitilizeFirst(definition.definition)}
                              </ReusableText>
                              {definition.example && (
                                <ReusableText
                                  style={[
                                    styles.example,
                                    {
                                      color:
                                        scheme === "dark"
                                          ? colors.darkTheme.text2
                                          : colors.lightTheme.text2,
                                    },
                                  ]}
                                >
                                  {capitilizeFirst(definition.example)}
                                </ReusableText>
                              )}
                            </View>
                          );
                        })}
                      </View>
                    </View>
                  );
                })}
              </View>
            </View>
          );
        })}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 12,
    marginBottom: 48,
  },
  textTitle: {
    fontSize: 48,
    fontWeight: "600",
  },
  partOfSpeech: {
    fontWeight: "500",
    marginTop: 16,
    fontSize: 16,
  },
  definitionAndExampleContainer: {
    paddingBottom: 10,
    marginLeft: 8,
  },
  definition: {},
  example: {
    fontStyle: "italic",
  },
  wordContainer: {
    backgroundColor: "#ccc",
    borderRadius: 8,
    marginBottom: 12,
    padding: 12,
  },
  wordDataHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: 12,
  },
});

export default SearchWord;
