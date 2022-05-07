import { useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import Modal from "../components/Modal";
import useInterval from "../hooks/useInterval";
import { setMode } from "../store/gameSlice";

function HowToPlay() {
  const [flipped, setFlipped] = useState(false);
  const [back, setBack] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  function handleClick() {
    setFlipped(false);
    setBack(true);
  }

  useInterval(
    () => {
      setFlipped(true);
    },
    location.pathname === "/howtoplay" ? 10 : null,
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
            <h3 className="text-3xl md:text-6xl mb-8 md:mb-16">How to Play</h3>
            <ul className="flex flex-col text-xl md:text-4xl gap-4">
              <li>-Choose language in the front menu</li>
              <li>-Select game dificulty</li>
              <li>-Type words from the screen</li>
              <li>
                -Press <span className="font-semibold text-sky-500">ENTER</span>{" "}
                or <span className="font-semibold text-sky-500">SPACE</span>
              </li>
              <li>-Have fun!</li>
            </ul>
            <button
              type="button"
              className="w-fit mx-auto my-3 mt-8 md:mt-16 py-2 px-6 bg-slate-500 hover:bg-sky-600 transition-colors rounded-lg text-xl"
              onClick={handleClick}
            >
              Back to menu
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
}

export default HowToPlay;
