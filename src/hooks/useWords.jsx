import WORDS4_EN from "../constants/4-words";
import WORDS5_EN from "../constants/5-words";
import WORDS4_ES from "../constants/4-words-ES";
import WORDS5_ES from "../constants/5-words-ES";
import WORDS4_PT from "../constants/4-words-PT";
import WORDS5_PT from "../constants/5-words-PT";
import { useSelector } from "react-redux";

function useWords() {
  const { language } = useSelector((state) => state.game);

  function getRandomWord() {
    const WORDS4 =
      language === "English"
        ? WORDS4_EN
        : language === "Spanish"
        ? WORDS4_ES
        : WORDS4_PT;

    const WORDS5 =
      language === "English"
        ? WORDS5_EN
        : language === "Spanish"
        ? WORDS5_ES
        : WORDS5_PT;

    if (Math.random() < 0.75) {
      const randomWord = WORDS4[Math.floor(Math.random() * WORDS4.length)];
      return randomWord;
    } else {
      const randomWord = WORDS5[Math.floor(Math.random() * WORDS5.length)];
      return randomWord;
    }
  }

  function getEmptyCell(activeWords) {
    const emptyCells = activeWords.reduce((total, word, i) => {
      if (word === null) {
        return [...total, i];
      }
      return total;
    }, []);

    return emptyCells[Math.floor(Math.random() * emptyCells.length)];
  }

  return { getRandomWord, getEmptyCell };
}

export default useWords;
