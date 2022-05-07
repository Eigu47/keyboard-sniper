import Modal from "../components/Modal";
import useLocalStorage from "../hooks/useLocalStorage";
import empty from "../constants/emptyLocalStorage";
import { useState } from "react";
import useInterval from "../hooks/useInterval";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setMode } from "../store/gameSlice";

function Record() {
  const { storedValue } = useLocalStorage("KEYBOARD_SNIPER", empty);
  const [back, setBack] = useState(false);
  const [flipped, setFlipped] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const normal = storedValue.find((val) => val.mode === "normal");
  const easy = storedValue.find((val) => val.mode === "easy");
  const hard = storedValue.find((val) => val.mode === "hard");

  const [displayMode, setDisplayMode] = useState(normal);

  function handleEasy() {
    setDisplayMode(easy);
  }

  function handleNormal() {
    setDisplayMode(normal);
  }

  function handleHard() {
    setDisplayMode(hard);
  }

  function handleClick() {
    setFlipped(false);
    setBack(true);
  }

  useInterval(
    () => {
      setFlipped(true);
    },
    location.pathname === "/record" ? 10 : null,
    "timeout"
  );

  useInterval(
    () => {
      dispatch(setMode(undefined));
      navigate("/");
    },
    back ? 200 : null,
    "timeout"
  );

  return (
    <Modal handleClick={handleClick}>
      <div className={`flip-inside ${!flipped && "flip"}`}>
        <div className="flip-card__front flex flex-col justify-center">
          <div
            className="flex flex-col justify-around items-center w-11/12 xl:w-8/12 2xl:w-1/2 p-3 md:p-6 border-2 md:border-[6px] md:pt-12 mx-auto bg-slate-800 rounded-lg border-slate-100 text-center font-mono text-slate-100"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between gap-2 md:px-10 w-full items-center">
              <button
                type="button"
                className={`py-1 w-44 bg-slate-500 hover:bg-sky-600 transition-colors rounded-lg text-lg md:text-2xl ${
                  displayMode === easy && "bg-blue-600"
                }`}
                onClick={handleEasy}
              >
                Easy Mode
              </button>
              <button
                type="button"
                className={`py-1 w-44 bg-slate-500 hover:bg-sky-600 transition-colors rounded-lg text-lg md:text-2xl ${
                  displayMode === normal && "bg-blue-600"
                }`}
                onClick={handleNormal}
              >
                Normal Mode
              </button>
              <button
                type="button"
                className={`py-1 w-44 bg-slate-500 hover:bg-sky-600 transition-colors rounded-lg text-lg md:text-2xl ${
                  displayMode === hard && "bg-blue-600"
                }`}
                onClick={handleHard}
              >
                Hard Mode
              </button>
            </div>
            <h3 className="text-2xl md:text-4xl mt-6 md:mt-12">
              Highest score
            </h3>
            <p className="text-2xl md:text-4xl mt-2">{displayMode.score}</p>
            <p className="text-2xl md:text-4xl mt-4 md:mt-8">
              {displayMode.language}
            </p>
            <div className="flex flex-col gap-6 sm:flex-row justify-around w-full my-4 md:my-8">
              <div className="flex flex-col">
                <h4 className="text-2xl md:text-4xl">
                  Missed: {displayMode.missed}
                </h4>
              </div>
              <div className="flex flex-col">
                <h4 className="text-2xl md:text-4xl">
                  Wrong: {displayMode.wrong}
                </h4>
              </div>
            </div>
            <button
              type="button"
              className="w-fit mx-auto mt-6 md:mt-12 mb-4 py-2 px-6 bg-slate-500 hover:bg-sky-600 transition-colors rounded-lg text-2xl"
              onClick={handleClick}
            >
              Back to menu
            </button>
          </div>
        </div>
        <div className="flip-card__back" />
      </div>
    </Modal>
  );
}

export default Record;
