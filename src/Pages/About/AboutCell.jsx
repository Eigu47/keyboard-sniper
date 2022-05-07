import { useDispatch, useSelector } from "react-redux";
import { SiReact, SiRedux, SiTailwindcss, SiFirebase } from "react-icons/si";
import { useEffect, useState } from "react";
import useInterval from "../../hooks/useInterval";
import {
  removeWordById,
  resetStore,
  setIsFlipped,
  setWord,
} from "../../store/gameSlice";
import { useNavigate } from "react-router-dom";
import MENU from "../../constants/menu";

const WITH = [
  { name: "REACT", icon: <SiReact /> },
  { name: "REDUX", icon: <SiRedux /> },
  { name: "TAILWIND", icon: <SiTailwindcss /> },
  { name: "FIREBASE", icon: <SiFirebase /> },
];

const delay = 3500;

function AboutCell({ word, id }) {
  const { isFlipped, mode, language } = useSelector((state) => state.game);
  const [icon, setIcon] = useState("");
  const [front, setFront] = useState("");
  const [back, setBack] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (id === 4) return;
    if (word) setIcon(WITH.find((name) => name.name === word).icon);
    if (!word) setIcon(undefined);
  }, [word, id]);

  useInterval(
    () => {
      dispatch(removeWordById(id));
    },
    word && id !== 4 ? delay : null
  );

  useInterval(
    () => {
      dispatch(setIsFlipped({ id, flipped: false }));
    },
    word && id !== 4 ? delay - 200 : null
  );

  const mid = id === 4 ? "cursor-pointer" : "";

  useInterval(
    () => {
      setFront("BACK TO MENU");
    },
    mode === "about" && id === 4 ? 200 : null,
    "timeout"
  );

  function handleMouseEnter() {
    if (id === 4 && !back) dispatch(setIsFlipped({ id: 4, flipped: false }));
  }

  function handleMouseLeave() {
    if (id === 4 && !back) dispatch(setIsFlipped({ id: 4, flipped: true }));
  }

  function handleClick() {
    if (id === 4 && !back) {
      dispatch(resetStore());
      dispatch(setWord({ word: null, id: 4 }));
      dispatch(setIsFlipped({ id: "all", flipped: false }));
      dispatch(setIsFlipped({ id: 4, flipped: true }));
    }
  }

  useInterval(
    () => {
      setBack(true);
      setFront(id === 4 && "PLAY");
      dispatch(setIsFlipped({ id: "all", flipped: true }));
      dispatch(setIsFlipped({ id: 4, flipped: false }));
    },
    !mode ? 500 : null,
    "timeout"
  );

  useInterval(
    () => {
      navigate("/");
    },
    !mode ? 800 : null,
    "timeout"
  );

  const backSide = back && id !== 4 ? MENU[id].front : "";

  return (
    <div
      className={`flip-container select-none ${mid}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
    >
      <div
        className={`flip-inside text-2xl sm:text-5xl xl:text-6xl 2xl:text-7xl text-slate-100 text-center font-mono ${
          isFlipped[id] && "flip"
        }`}
      >
        <div className="flip-card__front flex items-center rounded-lg bg-slate-800">
          <p className="mx-auto">{front}</p>
        </div>
        <div
          className={`flip-card__back flex flex-col justify-evenly items-center rounded-lg ${
            id === 4 || back ? "bg-slate-800" : "bg-slate-600"
          }  ${id === 2 && "!justify-center"}`}
        >
          {id === 2 && back && (
            <p className="mx-auto text-xl sm:text-4xl xl:text-6xl 2xl:text-7xl">
              {language.toUpperCase()}
            </p>
          )}
          <p
            className={`mx-auto ${
              !back &&
              "text-xl sm:text-4xl md:text-5xl xl:text-6xl 2xl:text-7xl"
            }`}
          >
            {back ? backSide : word}
          </p>
          {!back && id !== 4 && <p>{icon}</p>}
        </div>
      </div>
    </div>
  );
}

export default AboutCell;
