import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import useInterval from "../../hooks/useInterval";
import { setLanguage, setMode, setPlaying } from "../../store/gameSlice";
import { Outlet, useNavigate } from "react-router-dom";

import MenuCell from "./MenuCell";
import MENU from "../../constants/menu";
import MenuKeyboard from "./MenuKeyboard";
import MenuLife from "./MenuLife";

function Menu() {
  const { mode, language } = useSelector((state) => state.game);
  const [letters, setLetters] = useState("");
  const [isFlipped, setIsFlipped] = useState({ id: null, flipAll: false });
  const [lngFlip, setLngFlip] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function handleMouseEnter(id, letters) {
    if (id === 2) setLetters(language.toUpperCase());

    if (!mode && id !== 2) {
      setLetters(letters);

      setIsFlipped({ id, flipAll: false });
    }
  }

  function handleMouseLeave(id) {
    if (!mode) {
      setLetters("");

      if (id === 2) return;
      setIsFlipped({ id: null, flipAll: false });
    }
  }

  function handleLanguage() {
    setLngFlip(true);
    setLetters("");
    setIsFlipped({ id: 2, flipAll: false });
  }

  useInterval(
    () => {
      const LNG =
        language === "English"
          ? "Spanish"
          : language === "Spanish"
          ? "Portuguese"
          : "English";

      dispatch(setLanguage(LNG));

      setLetters(LNG.toUpperCase());
      setIsFlipped({ id: null, flipAll: false });
      setLngFlip(false);
    },
    lngFlip ? 300 : null,
    "timeout"
  );

  function handleClick(id, name) {
    if (!mode && name && id !== 2) {
      setIsFlipped({ id, flipAll: true });
      dispatch(setMode(name));
    }

    if (name === "record") navigate("/record");
    if (name === "ranking") navigate("/ranking");
    if (name === "howtoplay") navigate("/howtoplay");
    if (name === "about") setIsFlipped({ id, flipAll: true });
    if (name === "language") handleLanguage();
  }

  useInterval(
    () => {
      setIsFlipped({ id: null, flipAll: false });
    },
    !mode ? 0 : null,
    "timeout"
  );

  useInterval(
    () => {
      if (mode === "easy" || mode === "normal" || mode === "hard")
        dispatch(setPlaying(true));

      if (mode === "record") setIsFlipped({ id: null, flipAll: "noAnim" });
      if (mode === "ranking") setIsFlipped({ id: null, flipAll: "noAnim" });
      if (mode === "howtoplay") setIsFlipped({ id: null, flipAll: "noAnim" });
      if (mode === "about") navigate("/about");
    },
    mode ? 500 : null,
    "timeout"
  );

  return (
    <>
      <Outlet />
      <main className="relative container mx-auto md:mt-20 mt-10 bg-slate-300 basis-3/4 min-h-[18rem] md:min-h-[25rem] 2xl:min-h-[30rem] rounded-xl">
        <MenuLife />
        <div className="grid grid-rows-3 grid-cols-3 gap-1 p-1 md:gap-3 md:p-2 h-full">
          {MENU.map((menu) => (
            <MenuCell
              key={menu.id}
              menu={menu}
              handleMouseEnter={handleMouseEnter}
              handleMouseLeave={handleMouseLeave}
              handleClick={handleClick}
              isFlipped={isFlipped}
              language={language}
            />
          ))}
        </div>
      </main>
      <MenuKeyboard letters={letters} />
    </>
  );
}

export default Menu;
