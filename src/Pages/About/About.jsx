import React, { useEffect, useRef, useState } from "react";
import AboutKeyboard from "./AboutKeyboard";
import AboutCell from "./AboutCell";
import useInterval from "../../hooks/useInterval";
import { useDispatch, useSelector } from "react-redux";
import useWords from "../../hooks/useWords";
import {
  resetTyped,
  setIsFlipped,
  setTyped,
  setWord,
} from "../../store/gameSlice";

const WITH = [
  { name: "REACT", typed: "REACT.JS" },
  { name: "REDUX", typed: "REDUX TOOLKIT" },
  { name: "TAILWIND", typed: "TAILWIND CSS" },
  { name: "FIREBASE", typed: "FIREBASE" },
];

function About() {
  const { mode } = useSelector((state) => state.game);
  const { getEmptyCell } = useWords();
  const { activeWords } = useSelector((state) => state.game);
  const showIndexRef = useRef(0);
  const dispatch = useDispatch();
  const [width, setWidth] = useState(window.innerWidth);
  const checkWidth = width < 1024;
  const [backText, setBackText] = useState("");

  useInterval(
    () => {
      dispatch(setWord({ word: "EIGUCHI PABLO", id: 4 }));
      dispatch(setIsFlipped({ id: 4, flipped: true }));
      setBackText("Click in the middle to back");
    },
    !activeWords[4] && mode === "about" ? 100 : null,
    "timeout"
  );

  useInterval(
    () => {
      const i = showIndexRef.current;
      const emptyCell = getEmptyCell(activeWords);

      dispatch(resetTyped());
      dispatch(setTyped(WITH[i].typed));
      dispatch(setWord({ word: WITH[i].name, id: emptyCell }));
      dispatch(setIsFlipped({ id: emptyCell, flipped: true }));

      showIndexRef.current++;
      if (showIndexRef.current >= WITH.length) showIndexRef.current = 0;
    },
    mode === "about" ? 2000 : null
  );

  useEffect(() => {
    window.addEventListener("resize", () => setWidth(window.innerWidth));
    return () =>
      window.removeEventListener("resize", () => setWidth(window.innerWidth));
  }, []);

  return (
    <>
      <main className="relative container mx-auto md:mt-20 mt-10 bg-slate-300 basis-3/4 min-h-[18rem] md:min-h-[25rem] 2xl:min-h-[30rem] rounded-xl">
        {
          <p
            className={`absolute left-2 text-xs md:text-lg text-slate-100 font-mono ${
              checkWidth ? "-top-6" : "-bottom-8"
            }`}
          >
            {backText}
          </p>
        }
        <div className="grid grid-rows-3 grid-cols-3 gap-1 p-1 md:gap-3 md:p-2 h-full">
          {activeWords.map((word, i) => (
            <AboutCell key={i} id={i} word={word} />
          ))}
        </div>
      </main>
      <AboutKeyboard />
    </>
  );
}

export default About;
