import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { gainLife, loseLife, setWrong } from "../../store/gameSlice";
import {
  removeWord,
  resetTyped,
  setTyped,
  setTypedBackspace,
} from "../../store/gameSlice";

function Keyboard({ pause }) {
  const { typed, activeWords } = useSelector((state) => state.game);
  const [width, setWidth] = useState(window.innerWidth);
  const inputRef = useRef(null);
  const dispatch = useDispatch();
  const checkWidth = width < 1024;

  useEffect(() => {
    if (pause) return;

    function handleKey(e) {
      if (/^[A-Z]$/gi.test(e.key)) {
        dispatch(setTyped(e.key.toUpperCase()));
        return;
      }
      if (e.code === "Backspace") {
        dispatch(setTypedBackspace());
        return;
      }
      if (e.code === "Space" || e.code === "Enter") {
        if (activeWords.includes(typed)) {
          dispatch(removeWord(typed));
          dispatch(gainLife());
        } else {
          dispatch(loseLife());
          dispatch(setWrong());
        }
        dispatch(resetTyped());
        return;
      }
    }

    function handleKeyMobile(e) {
      if (e.data === " " || e.keyCode === 32 || e.keyCode === 13) {
        const value = inputRef.current.value.toUpperCase().trim();
        if (activeWords.includes(value)) {
          dispatch(removeWord(value));
          dispatch(gainLife());
        } else {
          dispatch(loseLife());
          dispatch(setWrong());
        }
        dispatch(resetTyped());
        inputRef.current.value = null;
        return;
      }
    }

    const input = inputRef?.current;

    if (!checkWidth) {
      document.addEventListener("keydown", handleKey);
    } else {
      input.addEventListener("keydown", handleKeyMobile);
      input.addEventListener("input", handleKeyMobile);
    }

    return () => {
      document.removeEventListener("keydown", handleKey);
      input?.removeEventListener("keydown", handleKeyMobile);
      input?.removeEventListener("input", handleKeyMobile);
    };
  }, [dispatch, typed, activeWords, pause, checkWidth]);

  useEffect(() => {
    window.addEventListener("resize", () => setWidth(window.innerWidth));
    return () =>
      window.removeEventListener("resize", () => setWidth(window.innerWidth));
  }, []);

  useEffect(() => {
    if (window.innerWidth < 1024) inputRef.current.focus();
  }, []);

  return (
    <>
      <h3 className="relative text-center text-4xl md:text-6xl lg:text-8xl font-serif flex-1 text-slate-100 my-4 md:my-16">
        {typed}
        <span className="animate-key">_</span>
        {checkWidth && (
          <input
            type="text"
            className="absolute left-1/2 -translate-x-1/2 w-3/4 opacity-1 text-center uppercase text-slate-800"
            ref={inputRef}
          />
        )}
      </h3>
    </>
  );
}

export default Keyboard;
