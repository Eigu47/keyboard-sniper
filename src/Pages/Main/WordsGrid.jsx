import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import useInterval from "../../hooks/useInterval";
import useWords from "../../hooks/useWords";
import { setIsFlipped, setWord } from "../../store/gameSlice";

import MainCell from "./MainCell";

function WordsGrid({ pause }) {
  const { activeWords, playing } = useSelector((state) => state.game);
  const { getRandomWord, getEmptyCell } = useWords();
  const dispatch = useDispatch();
  const intervalRef = useRef(2000);

  useInterval(
    () => {
      const randomWord = getRandomWord();
      const emptyCell = getEmptyCell(activeWords);

      dispatch(setWord({ word: randomWord, id: emptyCell }));
      dispatch(setIsFlipped({ id: emptyCell, flipped: true }));
    },
    pause ? null : playing ? intervalRef.current : null
  );

  useInterval(
    () => {
      intervalRef.current -= 200;
    },
    pause ? null : playing && intervalRef.current >= 1000 ? 10000 : null
  );

  useInterval(
    () => {
      intervalRef.current -= 100;
    },
    pause
      ? null
      : playing && intervalRef.current >= 600 && intervalRef.current < 1500
      ? 10000
      : null
  );

  useInterval(
    () => {
      intervalRef.current -= 10;
    },
    pause
      ? null
      : playing && intervalRef.current > 300 && intervalRef.current < 600
      ? 10000
      : null
  );

  return (
    <div className="grid grid-rows-3 grid-cols-3 gap-1 p-1 md:gap-3 md:p-2 h-full">
      {activeWords.map((word, i) => (
        <MainCell key={i} id={i} word={word} pause={pause} />
      ))}
    </div>
  );
}

export default WordsGrid;
