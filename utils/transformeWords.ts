export const capitilizeFirst = (word: string) => {
  return word.toUpperCase().slice(0, 1) + word.toLowerCase().slice(1);
};
