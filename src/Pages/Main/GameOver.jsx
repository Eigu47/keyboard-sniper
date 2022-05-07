import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import useInterval from "../../hooks/useInterval";
import useLocalStorage from "../../hooks/useLocalStorage";
import { resetStore } from "../../store/gameSlice";
import empty from "../../constants/emptyLocalStorage";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../API/firebase-config";

function GameOver({ flipped, setFlipped }) {
  const { mode, score, missed, wrong, language } = useSelector(
    (state) => state.game
  );
  const { storedValue, setValue } = useLocalStorage("KEYBOARD_SNIPER", empty);
  const [delay, setDelay] = useState(false);
  const [input, setInput] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const current = { mode, score, missed, wrong, language };
  const record = storedValue.find((value) => value.mode === mode);
  const recordBroken = score < record.score;

  if (score > record.score) {
    const newRecord = [
      ...storedValue.filter((value) => value.mode !== mode),
      current,
    ];
    setValue(newRecord);
  }

  function handlePlayAgain() {
    setFlipped((prev) => !prev);
    setDelay(true);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (/^[\w ]{3,15}$/gi.test(input) && input.trim()) {
      setError("submited");
      setLoading(true);
      await addDoc(collection(db, mode), { name: input, score });
      setLoading(false);
    } else setError(true);
  }

  useInterval(
    () => {
      dispatch(resetStore());
    },
    delay ? 200 : null,
    "timeout"
  );

  return (
    <div className={`flip-inside ${!flipped && "flip"}`}>
      <div className="flip-card__front flex flex-col justify-center">
        <div className="flex flex-col w-11/12 xl:w-8/12 2xl:w-1/2 p-3 md:p-6 border-2 md:border-[6px] mx-auto bg-slate-800 rounded-lg border-white text-center font-mono text-slate-100">
          <h3 className="text-3xl md:text-6xl">Game Over</h3>
          <p className="text-xl md:text-2xl">
            {mode.charAt(0).toUpperCase() + mode.slice(1)} Mode
          </p>
          <p className="text-xl md:text-2xl mb-3 md:mb-5">{language}</p>
          <div className="flex justify-evenly">
            <div className="flex flex-col justify-center">
              {!recordBroken && (
                <h4 className="text-2xl md:text-4xl">NEW PERSONAL</h4>
              )}
              <h4 className="text-2xl md:text-4xl">
                {recordBroken ? "SCORE" : "RECORD"}
              </h4>
              <p className="text-2xl md:text-3xl">{score}</p>
              {recordBroken && (
                <h4 className="text-2xl md:text-4xl mt-6">BEST</h4>
              )}
              {recordBroken && (
                <p className="text-2xl md:text-3xl">{record.score}</p>
              )}
            </div>
            <div className="flex gap-6 justify-center items-center">
              <div className="flex flex-col gap-6">
                <h4 className="text-2xl md:text-3xl text-right">Missed:</h4>
                <h4 className="text-2xl md:text-3xl text-right">Wrong:</h4>
              </div>
              <div className="flex flex-col gap-6">
                <p className="text-2xl md:text-3xl">{missed}</p>
                <p className="text-2xl md:text-3xl">{wrong}</p>
              </div>
            </div>
          </div>
          <form className="relative flex gap-3 justify-center items-center mx-auto w-full lg:w-1/2 h-16 my-6 mt-6 md:mt-12">
            {error !== "submited" ? (
              <>
                <label
                  htmlFor="score"
                  className={`absolute -top-2 left-1 ${
                    error && "text-red-500"
                  }`}
                >
                  {loading
                    ? "Submiting your score"
                    : error
                    ? "Enter valid name"
                    : "Submit your score"}
                </label>
                <input
                  type="text"
                  id="score"
                  className="w-full h-fit px-2 text-slate-900 text-xl md:text-2xl rounded"
                  placeholder="Enter your name"
                  onChange={(e) => setInput(e.target.value)}
                  disabled={loading}
                />
                <button
                  type="submit"
                  className="ml-3 py-2 px-3 rounded-lg bg-slate-500 hover:bg-sky-600 transition-colors disabled:bg-gray-600"
                  onClick={handleSubmit}
                  disabled={loading}
                >
                  Submit
                </button>
              </>
            ) : (
              <p className="text-3xl">Thanks for playing!</p>
            )}
          </form>
          <button
            type="button"
            className="w-fit mx-auto my-3 py-2 px-6 bg-slate-500 hover:bg-sky-600 transition-colors rounded-lg text-2xl"
            onClick={handlePlayAgain}
          >
            Try again?
          </button>
        </div>
      </div>
      <div className="flip-card__back bg-transparent"></div>
    </div>
  );
}

export default GameOver;
