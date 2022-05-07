import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Modal from "../components/Modal";
import useInterval from "../hooks/useInterval";
import { db } from "../API/firebase-config";
import { useDispatch } from "react-redux";
import { setMode } from "../store/gameSlice";

function Ranking() {
  const [flipped, setFlipped] = useState(false);
  const [back, setBack] = useState(false);
  const [displayMode, setDisplayMode] = useState("normal");
  const [rank, setRank] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    (async function () {
      const dataNormal = await getDocs(collection(db, "normal"));
      const rankNormal = dataNormal.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      const normal = rankNormal.sort((a, b) => b.score - a.score);

      const dataEasy = await getDocs(collection(db, "easy"));
      const rankEasy = dataEasy.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      const easy = rankEasy.sort((a, b) => b.score - a.score);

      const dataHard = await getDocs(collection(db, "hard"));
      const rankHard = dataHard.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      const hard = rankHard.sort((a, b) => b.score - a.score);

      setRank({ normal, easy, hard });
    })();
  }, []);

  function handleEasy() {
    setDisplayMode("easy");
  }

  function handleNormal() {
    setDisplayMode("normal");
  }

  function handleHard() {
    setDisplayMode("hard");
  }

  function handleClick() {
    setFlipped(false);
    setBack(true);
  }

  const display =
    displayMode === "normal"
      ? rank.normal
      : displayMode === "easy"
      ? rank.easy
      : rank.hard;

  useInterval(
    () => {
      setFlipped(true);
    },
    location.pathname === "/ranking" ? 10 : null,
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
            className="flex flex-col justify-around items-center w-11/12 xl:w-8/12 2xl:w-1/2 p-3 md:p-6 border-2 md:border-[6px] mx-auto bg-slate-800 rounded-lg border-slate-100 text-center font-mono text-slate-100"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-3xl md:text-6xl mb-3 md:mb-6">Ranking</h3>
            <div className="flex justify-between gap-2 md:px-10 w-full items-center">
              <button
                type="button"
                className={`py-1 w-44 bg-slate-500 hover:bg-sky-600 transition-colors rounded-lg text-lg md:text-2xl ${
                  displayMode === "easy" && "bg-blue-600"
                }`}
                onClick={handleEasy}
              >
                Easy Mode
              </button>
              <button
                type="button"
                className={`py-1 w-44 bg-slate-500 hover:bg-sky-600 transition-colors rounded-lg text-lg md:text-2xl ${
                  displayMode === "normal" && "bg-blue-600"
                }`}
                onClick={handleNormal}
              >
                Normal Mode
              </button>
              <button
                type="button"
                className={`py-1 w-44 bg-slate-500 hover:bg-sky-600 transition-colors rounded-lg text-lg md:text-2xl ${
                  displayMode === "hard" && "bg-blue-600"
                }`}
                onClick={handleHard}
              >
                Hard Mode
              </button>
            </div>
            <ul className="flex flex-col h-[45vh] w-full md:px-10 mt-5 md:mt-10 overflow-auto">
              {display?.map((rank, i) => {
                return (
                  <li
                    className={`flex w-full md:px-10 odd:bg-slate-700 ${
                      i === 0
                        ? "text-2xl md:text-4xl py-2"
                        : "text-xl md:text-3xl"
                    }`}
                    key={rank.id}
                  >
                    <span className="w-1/12">{i + 1}.</span>
                    <span className="mx-6">{rank.name}</span>
                    <span className="flex-1 text-right">{rank.score}</span>
                  </li>
                );
              })}
              {!display && (
                <li className="flex w-full md:px-10 odd:bg-slate-700 text-2xl py-2">
                  <span className="w-1/12">1.</span>
                  <span className="mx-6">LOADING...</span>
                  <span className="flex-1 text-right">0</span>
                </li>
              )}
            </ul>
            <button
              type="button"
              className="w-fit mx-auto my-3 py-2 px-6 bg-slate-500 hover:bg-sky-600 transition-colors rounded-lg text-xl"
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

export default Ranking;
