import { WordData, WordNotFound } from "../interfaces/interfaces";

export const fetchWord = async (
  word: string,
  setWordData: React.Dispatch<
    React.SetStateAction<undefined | WordData[] | WordNotFound>
  >,
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
) => {
  setIsLoading(true);
  const response = await fetch(
    `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
  );
  const responseData = await response.json();
  setWordData(responseData);
  setIsLoading(false);
};
